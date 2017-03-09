"use strict";
self.addEventListener('message', function(e) {

  var imageWidth = e.data.imageWidth;
  var imageHeight = e.data.imageHeight;
  var equationToEval = e.data.equationToEval;
  var tinyX = e.data.tinyX;
  var largeX = e.data.largeX;
  var tinyY = e.data.tinyY;
  var largeY = e.data.largeY;
  var points = e.data.points;
  var sidePadding = e.data.sidePadding;
  var TopBottomPadding = e.data.TopBottomPadding;
  //console.log(points);
  //console.log(e.data.points);
  var pointsOnGraph = e.data.pointsOnGraph;
  var i = 0,
    K = 1;
  var cx, cy, plabels;
  //resolution = parseInt($('#resolution').val());
  // resolution = 50;


  var xVal = parseFloat(tinyX); //need object variable to keep up with xVal showing in graph

  var yVal = evaluateEquation(equationToEval, xVal);
  var dataToPass = {};
  var prevY = null;
  var widthx = (imageWidth - 2 * sidePadding) / Math.abs(parseFloat(tinyX) - parseFloat(largeX));
  var resolution = widthx;
  var yAxisPosition = sidePadding + (-1 * widthx * (parseFloat(tinyX)));
  var widthy = (imageHeight - 2 * TopBottomPadding) / Math.abs(parseFloat(tinyY) - parseFloat(largeY));
  var xAxisPosition = TopBottomPadding + (widthy * (parseFloat(largeY)));

  // if (isFinite(yVal) && !isNaN(yVal) && yVal <= parseFloat(largeY) && yVal >= parseFloat(tinyY)) {
  //   var path = "M20 " + (xAxisPosition - parseFloat(yVal * widthy)) + " ";
  // } else {
  //   var path = "";
  // }
  var path = "";
  var tempM;
  var tempB;
  var tempXValue;
  if (equationToEval && equationToEval !== '') {
    for (i = (20); i < (imageWidth - 20); i += widthx) {
      for (var j = 0; j < resolution; j++) {


        yVal = evaluateEquation(equationToEval, xVal + (j / resolution));


        if (!isNaN(yVal) && yVal <= parseFloat(largeY) && yVal >= parseFloat(tinyY) && (isFinite(yVal))) {
          if ((isNaN(prevY) || path === "" || !isFinite(prevY)) && prevY >= parseFloat(tinyY) && prevY <= parseFloat(largeY)) {
            path += "M" + (yAxisPosition + parseFloat((xVal + (j / resolution)) * (widthx))) + " " + (xAxisPosition - parseFloat(yVal * widthy)) + " ";
            path += "L" + (yAxisPosition + parseFloat((xVal + (j / resolution)) * (widthx))) + " " + (xAxisPosition - parseFloat(yVal * widthy)) + " ";
            //console.log(widthy);
          } else if (prevY < parseFloat(tinyY)) { //from below window back onto window
            if (isFinite(prevY)) {
              tempM = (yVal - prevY) * resolution;
              tempB = tempM * (xVal + (j / resolution)) + (yVal);
              tempXValue = -1 * (parseFloat(tinyY) - tempB) / tempM;
              //console.log(tempM + ' ' + ' ' + tempB + ' ' + tempXValue + '  ' + (xVal + (j / resolution)) + ' ' + yVal + ' ' + (xVal + ((j - 1) / resolution)) + ' ' + prevY);
              path += "M" + (yAxisPosition + parseFloat(tempXValue * (widthx))) + " " + (xAxisPosition - parseFloat(parseFloat(tinyY) * widthy)) + " ";
              path += "L" + (yAxisPosition + parseFloat(tempXValue * (widthx))) + " " + (xAxisPosition - parseFloat(parseFloat(tinyY) * widthy)) + " ";

            }
          } else if (prevY > parseFloat(largeY)) { //from above window back onto window
            if (isFinite(prevY)) {
              tempM = (yVal - prevY) * resolution;
              tempB = tempM * (xVal + ((j - 1) / resolution)) + (yVal);
              tempXValue = -1 * (parseFloat(largeY) - tempB) / tempM;
              //console.log(tempM + ' ' + ' ' + tempB + ' ' + tempXValue + '  ' + (xVal + (j / resolution)) + ' ' + yVal + ' ' + (xVal + ((j - 1) / resolution)) + ' ' + prevY);
              path += "M" + (yAxisPosition + parseFloat(tempXValue * (widthx))) + " " + (xAxisPosition - parseFloat(parseFloat(largeY) * widthy)) + " ";
              path += "L" + (yAxisPosition + parseFloat(tempXValue * (widthx))) + " " + (xAxisPosition - parseFloat(parseFloat(largeY) * widthy)) + " ";

            }
          } else if (isNaN(prevY) || path === "" || !isFinite(prevY)) { //basically catch if graph is undefined from minX to some other xValue
            path += "M" + (yAxisPosition + parseFloat((xVal + (j / resolution)) * (widthx))) + " " + (xAxisPosition - parseFloat(yVal * widthy)) + " ";
            path += "L" + (yAxisPosition + parseFloat((xVal + (j / resolution)) * (widthx))) + " " + (xAxisPosition - parseFloat(yVal * widthy)) + " ";

          } else {
            path += "L" + (yAxisPosition + parseFloat((xVal + (j / resolution)) * (widthx))) + " " + (xAxisPosition - parseFloat(yVal * widthy)) + " ";
          }
        } else if (isNaN(yVal) && path !== "") {
          //I don't think I need to handle this as it should be handled by the check for prevY isNaN in first if
          //might show warning however and is useful for summation and integration.
        } else if (!isFinite(yVal) && path !== "") {
          if (yVal > parseFloat(largeY)) {
            //positive inf

          } else {
            //neg inf
          }
        } else if (yVal > parseFloat(largeY) && prevY < parseFloat(tinyY)) { //handle extremely fast changes that would not be graphed
          //path += "M" + (yAxisPosition + parseFloat((xVal + ((j-1) / resolution)) * (widthx))) + " " + (xAxisPosition - parseFloat(parseFloat(tinyY) * widthy)) + " ";
          //path += "L" + (yAxisPosition + parseFloat((xVal + (j / resolution)) * (widthx))) + " " + (xAxisPosition - parseFloat(parseFloat(largeY) * widthy)) + " ";
          //path += "M" + (yAxisPosition + parseFloat((xVal + (j / resolution)) * (widthx))) + " " + (xAxisPosition - parseFloat(parseFloat(largeY) * widthy)) + " ";
        } else if (yVal < parseFloat(tinyY) && prevY > parseFloat(largeY)) { //handle extremely fast changes that would not be graphed
          //path += "M" + (yAxisPosition + parseFloat((xVal + ((j-1) / resolution)) * (widthx))) + " " + (xAxisPosition - parseFloat(parseFloat(largeY) * widthy)) + " ";
          //path += "L" + (yAxisPosition + parseFloat((xVal + (j / resolution)) * (widthx))) + " " + (xAxisPosition - parseFloat(parseFloat(tinyY) * widthy)) + " ";
          //path += "M" + (yAxisPosition + parseFloat((xVal + (j / resolution)) * (widthx))) + " " + (xAxisPosition - parseFloat(parseFloat(tinyY) * widthy)) + " ";
        } else if (yVal > parseFloat(largeY) && path !== "") {
          if (prevY < parseFloat(largeY)) { //only draw if previous value was on graph and current value goes off graph

            if (isFinite(prevY)) {
              tempM = (yVal - prevY) * resolution;
              tempB = tempM * (xVal + ((j - 1) / resolution)) + (yVal);
              tempXValue = -1 * (parseFloat(largeY) - tempB) / tempM;
              //console.log(tempM + ' ' + ' ' + tempB + ' ' + tempXValue + '  ' + (xVal + (j / resolution)) + ' ' + yVal + ' ' + (xVal + ((j - 1) / resolution)) + ' ' + prevY);
              //console.log("L" + (yAxisPosition + parseFloat(tempXValue * (widthx))) + " " + (xAxisPosition - parseFloat(parseFloat(largeY) * widthy)) + " ");
              path += "L" + (yAxisPosition + parseFloat(tempXValue * (widthx))) + " " + (xAxisPosition - parseFloat(parseFloat(largeY) * widthy)) + " ";
            } else { //prevY is neg inf

            }

          }
        } else if (yVal < parseFloat(tinyY) && path !== "") {
          if (prevY > parseFloat(tinyY)) { //only draw if previous value was on graph and current value goes off graph

            if (isFinite(prevY)) {
              tempM = (yVal - prevY) * resolution;
              tempB = tempM * (xVal + ((j - 1) / resolution)) + (yVal);
              tempXValue = -1 * (parseFloat(tinyY) - tempB) / tempM;
              //console.log(tempM + ' ' + ' ' + tempB + ' ' + tempXValue + '  ' + (xVal + (j / resolution)) + ' ' + yVal + ' ' + (xVal + ((j - 1) / resolution)) + ' ' + prevY);

              path += "L" + (yAxisPosition + parseFloat(tempXValue * (widthx))) + " " + (xAxisPosition - parseFloat(parseFloat(tinyY) * widthy)) + " ";
            } else { //prevY is pos inf

            }
          }
        }
        prevY = yVal;
      }

      xVal++;
      ////console.log(xVal);
    }

    dataToPass.Main = path;
    ////console.log(path);
    ////console.log(path);
    //path = convertSciPath(path);
    ////console.log(path);
    var N = e.data.N;
    var a = e.data.a;
    var b = e.data.b;
    ////console.log(N + " " + a + " " + b);

    if (e.data.type == "rightsum") {
      xVal = b;
      path = "M" + (20 + widthx * (b - parseFloat(tinyX))) + " " + xAxisPosition;
      for (K = 1; K <= N; K++) {

        yVal = evaluateEquation(equationToEval, xVal);
        //console.log(equationToEval);
        //console.log(xVal);
        //console.log(yVal);
        if (isFinite(yVal) && !isNaN(yVal) && yVal <= parseFloat(largeY) && yVal >= parseFloat(tinyY)) {
          path = path + " v" + -1 * (parseFloat(yVal * widthy)) + " h" + (-1 * (((widthx * ((b - a) / N))))) + " v" + ((parseFloat(yVal * widthy)));
        } else {
          if (isNaN(yVal)) {
            path = "";
            break;
          }
          if (yVal > parseFloat(largeY)) {
            path = path + " v" + -1 * (parseFloat(largeY * widthy)) + " m" + (-1 * (((widthx * ((b - a) / N))))) + " 0 v" + ((parseFloat(largeY * widthy)));
          } else {
            path = path + " v" + -1 * (parseFloat(tinyY * widthy)) + " m" + (-1 * (((widthx * ((b - a) / N))))) + " 0 v" + ((parseFloat(tinyY * widthy)));
          }
        }
        xVal = xVal - ((b - a) / N);

      }
      dataToPass.rect1 = path;
    }
    if (e.data.type == "leftsum") {
      xVal = a;
      path = "M" + (20 + widthx * (a - parseFloat(tinyX))) + " " + xAxisPosition;
      for (K = 1; K <= N; K++) {

        yVal = evaluateEquation(equationToEval, xVal);
        if (isFinite(yVal) && !isNaN(yVal) && yVal <= parseFloat(largeY) && yVal >= parseFloat(tinyY)) {
          path = path + " v" + -1 * (parseFloat(yVal * widthy)) + " h" + (widthx * ((b - a) / N)) + " v" + ((parseFloat(yVal * widthy)));
        } else {
          if (isNaN(yVal)) {
            path = "";
            break;
          }
          if (yVal > parseFloat(largeY)) {
            path = path + " v" + -1 * (parseFloat(largeY * widthy)) + " m" + (widthx * ((b - a) / N)) + " 0 v" + ((parseFloat(largeY * widthy)));
          } else {
            path = path + " v" + -1 * (parseFloat(tinyY * widthy)) + " m" + (widthx * ((b - a) / N)) + " 0 v" + ((parseFloat(tinyY * widthy)));
          }

        }
        xVal = xVal + ((b - a) / N);

      }
      dataToPass.rect2 = path;
    }

    if (e.data.type == "integral" || e.data.shadeToX || e.data.type == "areaUnderCurve") {
      var highup = 0;
      if (Array.isArray(a) && Array.isArray(b) && a.length == b.length) {
        dataToPass.shade = [];
        for (i = 0; i < a.length; i++) {
          xVal = a[i];
          highup = 0;
          path = "M" + (20 + widthx * (a[i] - parseFloat(tinyX))) + " " + xAxisPosition;
          for (K = xVal; K <= b[i]; K += (1 / resolution)) {
            K = parseFloat(K.toFixed(6));

            yVal = evaluateEquation(equationToEval, K);
            if (!isNaN(yVal) && yVal <= parseFloat(largeY) && yVal >= parseFloat(tinyY)) {

              if (isFinite(yVal)) {
                path += "L" + (yAxisPosition + parseFloat((K) * (widthx))) + " " + (xAxisPosition - parseFloat(yVal * widthy)) + " ";
              } else {
                path += " V" + (xAxisPosition);
                //console.log("asymptote in shaded region");
              }
            } else {
              if (isNaN(yVal)) {
                path = "";
                //console.log(yVal + ' ' + K);
                break;
              }
              if (yVal > parseFloat(largeY)) {
                path += "L" + (yAxisPosition + parseFloat((K) * (widthx))) + " " + (xAxisPosition - parseFloat(largeY * widthy)) + " ";
              } else {
                path += "L" + (yAxisPosition + parseFloat((K) * (widthx))) + " " + (xAxisPosition - parseFloat(tinyY * widthy)) + " ";
              }
            }


          }

          if (path.length > 0) {
            //if (isFinite(yVal)) {
            // //console.log(parseFloat(yVal * widthy))
            path += "L" + (yAxisPosition + parseFloat(b[i] * (widthx))) + " " + (xAxisPosition) + " ";
            //}


            path += "z";
          }
          dataToPass.shade.push(path);
          //console.log(dataToPass.shade);
        }
      } else {


        xVal = a;
        highup = 0;
        path = "M" + (20 + widthx * (a - parseFloat(tinyX))) + " " + xAxisPosition;
        for (K = xVal; K <= b; K += (1 / resolution)) {
          K = parseFloat(K.toFixed(6));

          yVal = evaluateEquation(equationToEval, K);
          if (!isNaN(yVal) && yVal <= parseFloat(largeY) && yVal >= parseFloat(tinyY)) {

            if (isFinite(yVal)) {
              path += "L" + (yAxisPosition + parseFloat((K) * (widthx))) + " " + (xAxisPosition - parseFloat(yVal * widthy)) + " ";
            } else {
              path += " V" + (xAxisPosition);
              //console.log("asymptote in shaded region");
            }
          } else {
            if (isNaN(yVal)) {
              path = "";
              //console.log(yVal + ' ' + K);
              break;
            }
            if (yVal > parseFloat(largeY)) {
              path += "L" + (yAxisPosition + parseFloat((K) * (widthx))) + " " + (xAxisPosition - parseFloat(largeY * widthy)) + " ";
            } else {
              path += "L" + (yAxisPosition + parseFloat((K) * (widthx))) + " " + (xAxisPosition - parseFloat(tinyY * widthy)) + " ";
            }
          }


        }

        if (path.length > 0) {
          //if (isFinite(yVal)) {
          // //console.log(parseFloat(yVal * widthy))
          path += "L" + (yAxisPosition + parseFloat(b * (widthx))) + " " + (xAxisPosition) + " ";
          //}


          path += "z";
        }
        dataToPass.shade = path;
      }
    }
    if (pointsOnGraph) {

      cx = [];
      cy = [];
      plabels = [];
      for (i = 0; i < pointsOnGraph.length; i++) {

        xVal = parseFloat(pointsOnGraph[i]);
        if (xVal >= parseFloat(tinyX) && xVal <= parseFloat(largeX)) {
          yVal = evaluateEquation(equationToEval, xVal);
          if (!isNaN(yVal) && yVal <= parseFloat(largeY) && yVal >= parseFloat(tinyY) && (isFinite(yVal))) {
            cx.push(yAxisPosition + parseFloat(xVal * (widthx)));
            cy.push(xAxisPosition - parseFloat(yVal * widthy));
            plabels.push("(" + xVal + ", " + yVal + ")");
          } else {
            cx.push(null);
            cy.push(null);
            plabels.push(null);
          }
        } else {
          cx.push(null);
          cy.push(null);
          plabels.push(null);
        }
      }
      dataToPass.pcgx = cx;
      dataToPass.pcgy = cy;
      dataToPass.pglabels = plabels;
    }
  }
  if (points) {

    cx = [];
    cy = [];
    plabels = [];
    for (i = 0; i < points.length; i++) {
      xVal = points[i].match(/-{0,1}[\d\.]+/g)[0];
      if (xVal >= parseFloat(tinyX) && xVal <= parseFloat(largeX)) {
        yVal = points[i].match(/-{0,1}[\d\.]+/g)[1];
        if (!isNaN(yVal) && yVal <= parseFloat(largeY) && yVal >= parseFloat(tinyY) && (isFinite(yVal))) {
          cx.push(yAxisPosition + parseFloat(xVal * (widthx)));
          cy.push(xAxisPosition - parseFloat(yVal * widthy));
          plabels.push("(" + xVal + ", " + yVal + ")");
        } else {
          cx.push(null);
          cy.push(null);
          plabels.push(null);
        }
      } else {
        cx.push(null);
        cy.push(null);
        plabels.push(null);
      }
    }
    dataToPass.pcx = cx;
    dataToPass.pcy = cy;
    dataToPass.plabels = plabels;
  }
  self.postMessage(dataToPass);
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
