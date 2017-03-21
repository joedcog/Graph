"use strict";
self.addEventListener('message', function(e) {

  var dataToPost = {};
  self.postMessage({ 'msg': 'Calculating Right Sum' });
  var rightSumValue = 0;
  var equationToEval = e.data.equationToEval;
  var canIntegrate = function() {
    if (equationToEval.match(/\//g) !== null || equationToEval.match(/sqrt/g) !== null) {
      return false;
    } else {
      return true;
    }
  };
  var N = e.data.N;
  var a = e.data.a;
  var b = e.data.b;
  var xVal = b;
  var i = 0;
  var prevYVal = 0;
  var integralValue;
  var tempY = 0;
  var temporary = 0;
  var l = 0;
  var size = 350;
  if (e.data.type == "rightsum") {
    var tempRight = 0;

    for (i = 0; i < N; i++) {
      tempRight = (evaluateEquation(equationToEval, xVal) * ((b - a) / N));
      rightSumValue += tempRight;
      if (!isFinite(tempRight)) {
        rightSumValue = "diverges";
        break;
      }
      xVal = xVal - ((b - a) / N);
    }
    if (rightSumValue != "diverges") {
      rightSumValue = parseFloat(rightSumValue.toFixed(3));
      if (rightSumValue.toString().length >= 8) {
        rightSumValue = rightSumValue.toExponential(3);
      }
    }

    dataToPost.Right = rightSumValue;
  }
  if (e.data.type == "leftsum") {
    self.postMessage({ 'msg': 'Calculating Left Sum' });
    var leftSumValue = 0;
    xVal = a;
    var tempLeft = 0;
    for (i = 0; i < N; i++) {
      tempLeft = (evaluateEquation(equationToEval, xVal) * ((b - a) / N));
      leftSumValue += parseFloat(tempLeft.toFixed(6));
      if (!isFinite(tempLeft)) {
        leftSumValue = "diverges";
        break;
      }
      xVal = xVal + ((b - a) / N);
    }
    if (leftSumValue != "diverges") {
      leftSumValue = parseFloat(leftSumValue.toFixed(3));
      if (leftSumValue.toString().length >= 8) {
        leftSumValue = leftSumValue.toExponential(3);
      }
    }
    dataToPost.Left = leftSumValue;
  }
  if (e.data.type == "integral") {

    self.postMessage({ 'msg': 'Calculating Integral' });
    // if (canIntegrate()) {
    //   console.log("integrate");
    //   equationToEval.replace(/sin/g,"cos");
    // } else {
    if (Array.isArray(a) && Array.isArray(b) && a.length == b.length) {
      dataToPost.Integral = [];
      for (l = 0; l < a.length; l++) {
        integralValue = 0;
        xVal = b[l];

        tempY = 0;
        prevYVal = 0;
        for (i = 0; i < size * (b[l] - a[l]); i++) {
          if (xVal - (1 / size) < a[l]) {
            tempY = ((evaluateEquation(equationToEval, xVal) + evaluateEquation(equationToEval, a[l])) * 0.5 * (1 / size));
          } else {
            tempY = ((evaluateEquation(equationToEval, xVal) + evaluateEquation(equationToEval, xVal - (1 / size))) * 0.5 * (1 / size));
          }
          ////console.log(tempY + ' ' + (xVal-(1/size)));
          // integralValue +   = parseFloat(tempY.toFixed(6));
          // xVal = xVal - (1 / size);
          if (i > 0) {
            if (!isFinite(tempY)) {
              integralValue = "diverges";
              //console.log("asymptote in sum");
              break;
            } //else if (Math.abs((tempY - prevYVal) / (1 / size)) >= 9999999) {
            else if (isNaN(tempY)) {
              integralValue = "diverges";
              break;
            } else {
              integralValue += parseFloat(tempY.toFixed(6));

            }
          } else {
            if (isFinite(tempY) && !isNaN(tempY)) {
              integralValue += parseFloat(tempY.toFixed(6));

            } else if (isNaN(tempY)) {
              integralValue += parseFloat(evaluateEquation(equationToEval, xVal - (1 / (size * 100))) * (1 / size));
            }
          }
          xVal = xVal - (1 / size);
          prevYVal = tempY;

        }

        tempY = 0;
        prevYVal = 0;
        temporary = 0;

        if (integralValue != "diverges" && !isNaN(integralValue)) {
          //integralValue = (integralValue + temporary) / 2;

          integralValue = parseFloat(integralValue.toFixed(3));

          if (integralValue.toString().length >= 8) {
            integralValue = integralValue.toExponential(3);
          }
        }
        dataToPost.Integral.push(integralValue);
      }
    } else {
      integralValue = 0;
      xVal = b;

      tempY = 0;
      prevYVal = 0;
      for (i = 0; i < size * (b - a); i++) {
        if (xVal - (1 / size) < a) {
          tempY = ((evaluateEquation(equationToEval, xVal) + evaluateEquation(equationToEval, a)) * 0.5 * (1 / size));
        } else {
          tempY = ((evaluateEquation(equationToEval, xVal) + evaluateEquation(equationToEval, xVal - (1 / size))) * 0.5 * (1 / size));
        }
        ////console.log(tempY + ' ' + (xVal-(1/size)));
        // integralValue +   = parseFloat(tempY.toFixed(6));
        // xVal = xVal - (1 / size);
        if (i > 0) {
          if (!isFinite(tempY)) {
            integralValue = "diverges";
            //console.log("asymptote in sum");
            break;
          } //else if (Math.abs((tempY - prevYVal) / (1 / size)) >= 9999999) {
          else if (isNaN(tempY)) {
            integralValue = "diverges";
            break;
          } else {
            integralValue += parseFloat(tempY.toFixed(6));

          }
        } else {
          if (isFinite(tempY) && !isNaN(tempY)) {
            integralValue += parseFloat(tempY.toFixed(6));

          } else if (isNaN(tempY)) {
            integralValue += parseFloat(evaluateEquation(equationToEval, xVal - (1 / (size * 100))) * (1 / size));
          }
        }
        xVal = xVal - (1 / size);
        prevYVal = tempY;

      }

      tempY = 0;
      prevYVal = 0;
      temporary = 0;

      if (integralValue != "diverges" && !isNaN(integralValue)) {
        //integralValue = (integralValue + temporary) / 2;

        integralValue = parseFloat(integralValue.toFixed(3));

        if (integralValue.toString().length >= 8) {
          integralValue = integralValue.toExponential(3);
        }
      }
      dataToPost.Integral = integralValue;
    }
  }
  //}
  if (e.data.type == "areaUnderCurve") {

    self.postMessage({ 'msg': 'Calculating Integral' });
    if (Array.isArray(a) && Array.isArray(b) && a.length == b.length) {
      dataToPost.areaUnderCurve = [];
      for (l = 0; l < a.length; l++) {
        integralValue = 0;
        xVal = b[l];

        tempY = 0;
        prevYVal = 0;
        for (i = 0; i < size * (b[l] - a[l]); i++) {
          if (xVal - (1 / size) < a[l]) {
            tempY = ((evaluateEquation(equationToEval, xVal) + evaluateEquation(equationToEval, a[l])) * 0.5 * (1 / size));
          } else {
            tempY = ((evaluateEquation(equationToEval, xVal) + evaluateEquation(equationToEval, xVal - (1 / size))) * 0.5 * (1 / size));
          }
          ////console.log(tempY + ' ' + (xVal-(1/size)));
          // integralValue +   = parseFloat(tempY.toFixed(6));
          // xVal = xVal - (1 / size);
          if (i > 0) {
            if (!isFinite(tempY)) {
              integralValue = "diverges";
              //console.log("asymptote in sum");
              break;
            } //else if (Math.abs((tempY - prevYVal) / (1 / size)) >= 9999999) {
            else if (isNaN(tempY)) {
              integralValue = "diverges";
              break;
            } else {
              integralValue += parseFloat(tempY.toFixed(6));

            }
          } else {
            if (isFinite(tempY) && !isNaN(tempY)) {
              integralValue += parseFloat(tempY.toFixed(6));

            } else if (isNaN(tempY)) {
              integralValue += parseFloat(evaluateEquation(equationToEval, xVal - (1 / (size * 100))) * (1 / size));
            }
          }
          xVal = xVal - (1 / size);
          prevYVal = tempY;

        }

        tempY = 0;
        prevYVal = 0;
        temporary = 0;

        if (integralValue != "diverges" && !isNaN(integralValue)) {
          //integralValue = (integralValue + temporary) / 2;

          integralValue = parseFloat(integralValue.toFixed(3));

          if (integralValue.toString().length >= 8) {
            integralValue = integralValue.toExponential(3);
          }
        }
        dataToPost.areaUnderCurve.push(integralValue);
      }
    } else {
      integralValue = 0;
      xVal = b;

      tempY = 0;
      prevYVal = 0;
      for (i = 0; i < size * (b - a); i++) {
        if (xVal - (1 / size) < a) {
          tempY = ((evaluateEquation(equationToEval, xVal) + evaluateEquation(equationToEval, a)) * 0.5 * (1 / size));
        } else {
          tempY = ((evaluateEquation(equationToEval, xVal) + evaluateEquation(equationToEval, xVal - (1 / size))) * 0.5 * (1 / size));
        }
        ////console.log(tempY + ' ' + (xVal-(1/size)));
        // integralValue +   = parseFloat(tempY.toFixed(6));
        // xVal = xVal - (1 / size);
        if (i > 0) {
          if (!isFinite(tempY)) {
            integralValue = "diverges";
            //console.log("asymptote in sum");
            break;
          } //else if (Math.abs((tempY - prevYVal) / (1 / size)) >= 9999999) {
          else if (isNaN(tempY)) {
            integralValue = "diverges";
            break;
          } else {
            integralValue += parseFloat(tempY.toFixed(6));

          }
        } else {
          if (isFinite(tempY) && !isNaN(tempY)) {
            integralValue += parseFloat(tempY.toFixed(6));

          } else if (isNaN(tempY)) {
            integralValue += parseFloat(evaluateEquation(equationToEval, xVal - (1 / (size * 100))) * (1 / size));
          }
        }
        xVal = xVal - (1 / size);
        prevYVal = tempY;

      }

      tempY = 0;
      prevYVal = 0;
      temporary = 0;

      if (integralValue != "diverges" && !isNaN(integralValue)) {
        //integralValue = (integralValue + temporary) / 2;

        integralValue = parseFloat(integralValue.toFixed(3));

        if (integralValue.toString().length >= 8) {
          integralValue = integralValue.toExponential(3);
        }
      }
      dataToPost.areaUnderCurve = integralValue;
    }
  }

  self.postMessage(dataToPost);
});
var isInt = function(n) {
  return n === +n && n === (n | 0);
};
var pow = function(a, b) {
  try {
    var temp2 = 1 / 2 / 2 / 2 / 2 / 2 / 2 / 2 / 2 / 2 / 2;
    if (isInt(b)) {
      return Math.pow(a, b);
    } else if (a < 0 && !isInt(b)) {
      if (b % temp2 === 0) {
        return Math.pow(a, b);
      } else {
        return -1 * Math.pow(-1 * a, b);
      }
    } else {
      return Math.pow(a, b);
    }
  } catch (e) {
    return Math.pow(a, b);
  }
};
var evaluateEquation = function(equationToEval, x) {

  var a = eval(((equationToEval).replace(new RegExp("x", 'g'), "(" + x + ")")));
  if (!isNaN(a)) {
    return parseFloat(parseFloat(eval(((equationToEval).replace(new RegExp("x", 'g'), "(" + x + ")")))).toFixed(8));
  } else {
    return NaN;
  }
  //return parseFloat(parseFloat(math.eval(((equationToEval).replace(new RegExp("x", 'g'), "(" + x + ")")))).toFixed(3));
};
