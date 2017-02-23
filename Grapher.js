var gamma = function(z) {
  gammaEquationToEval = "(x^(a-1))*(e^-x)";
  equationToEval = gammaEquationToEval.replace("a", "(" + z + ")");
  //console.log(equationToEval);
  integralValue = 0;
  b = 5;
  var xVal = b;
  var tempY = 0;
  a = 0;
  if (z > 1) {
    do {
      tempY = ((evaluateGammaEquation(equationToEval, xVal) + evaluateGammaEquation(equationToEval, xVal)));
      xVal++;
    } while (tempY > 0.00001)
  } else {
    integralValue = 0;
    b = 20;
    var xVal = b;
    var tempY = 0;
    a = 0;
    do {
      tempY = ((evaluateGammaEquation(equationToEval, xVal) + evaluateGammaEquation(equationToEval, xVal)));
      //console.log(tempY);
      xVal--;
    } while (tempY < 0.00001 && xVal > 1)
  }

  b = xVal
  var size = 120;
  var tempY = 0;
  var prevYVal = 0;
  if (z < 1) {
    size = size / (z);
  }
  for (var i = 0; i < size * (b - a); i++) {
    if (xVal - (1 / size) < a) {
      tempY = ((evaluateGammaEquation(equationToEval, xVal) + evaluateGammaEquation(equationToEval, a)) * .5 * (1 / size));
    } else {
      tempY = ((evaluateGammaEquation(equationToEval, xVal) + evaluateGammaEquation(equationToEval, xVal - (1 / size))) * .5 * (1 / size));
    }
    if (i > 0) {
      if (!isFinite(tempY)) {
        break;
      } else if (isNaN(tempY)) {
        integralValue = "diverges";
        break;
      } else {
        integralValue += parseFloat(tempY.toFixed(20));
      }
    } else {
      if (isFinite(tempY) && !isNaN(tempY)) {
        integralValue += parseFloat(tempY.toFixed(20));

      } else if (isNaN(tempY)) {
        integralValue += parseFloat(evaluateGammaEquation(equationToEval, xVal - (1 / (size * 100))) * (1 / size));
      }
    }
    xVal = xVal - (1 / size);
    prevYVal = tempY;
  }

  tempY = 0;
  var prevYVal = 0;
  var temporary = 0;

  if (integralValue != "diverges" && !isNaN(integralValue)) {
    integralValue = parseFloat(integralValue.toFixed(3));
    if (integralValue.toString().length >= 20) {
      integralValue = integralValue.toExponential(3);
    }
  }
  return integralValue.toFixed(20).replace(/\.?0+$/, "");
}

var evaluateGammaEquation = function(equationToEval, x) {
  x = x.toFixed(6);
  var a = math.eval(((equationToEval).replace(new RegExp("x", 'g'), "(" + x + ")")));
  if (!isNaN(a)) {

    return parseFloat(parseFloat(math.eval(((equationToEval).replace(new RegExp("x", 'g'), "(" + x + ")")))));
  } else {
    return NaN
  }
}
var beta = function(z, zz) {
  return (gamma(z) * gamma(zz)) / gamma(z + zz);
}
var Graph = function(aobj) {
  if (aobj.render) {
    this.render = aobj.render;
  } else {
    this.render = "svg";
  }
  if (aobj.type) {
    this.type = aobj.type;
    if (this.type.toLowerCase() == "normal") {
      if (aobj.stdev) {
        this.stdev = parseFloat(aobj.stdev);
      } else {
        this.stdev = 1;
      }
      if (aobj.mean) {
        this.mean = parseFloat(aobj.mean);
      } else {
        this.mean = 0;
      }
      this.equationToEval = '(1 / sqrt(2 * o^2 * pi) * e^(-1 * ((x - u)^2) / (2 * o^2)))';
      this.equationToEval = this.equationToEval.replace(new RegExp("o", 'g'), "(" + this.stdev + ")");
      this.equationToEval = this.equationToEval.replace(new RegExp("u", 'g'), "(" + this.mean + ")");
    } else if (this.type.toLowerCase() == "arcsine") {
      this.equationToEval = '1/(pi*sqrt(x(1-x)))';
    } else if (this.type.toLowerCase() == "exponential") {
      if (aobj.lambda) {
        this.lambda = parseFloat(aobj.lambda);
      } else {
        this.lambda = 1;
      }
      this.equationToEval = '(lambda * e ^ (-lambdax))';
      this.equationToEval = this.equationToEval.replace(new RegExp("lambda", 'g'), "(" + this.lambda + ")");
    } else if (this.type.toLowerCase() == "chi-square") {
      if (aobj.degreesOfFreedom) {
        this.degreesOfFreedom = parseFloat(aobj.degreesOfFreedom);
      } else {
        this.degreesOfFreedom = 1;
      }
      this.gammaVal = gamma(this.degreesOfFreedom / 2);
      this.equationToEval = '((x^((k/2)-1))*(e^(-x/2)))/((2^(k/2))*' + this.gammaVal + ')';
      this.equationToEval = this.equationToEval.replace(new RegExp("k", 'g'), "(" + this.degreesOfFreedom + ")");
    } else if (this.type.toLowerCase() == "f") {
      if (aobj.degreesOfFreedom) {
        this.degreesOfFreedom = parseFloat(aobj.degreesOfFreedom);
      } else {
        this.degreesOfFreedom = 1;
      }
      if (aobj.degreesOfFreedom2) {
        this.degreesOfFreedom2 = parseFloat(aobj.degreesOfFreedom2);
      } else {
        this.degreesOfFreedom2 = 1;
      }
      this.betaVal = beta(this.degreesOfFreedom / 2, this.degreesOfFreedom2 / 2);
      this.equationToEval = '(sqrt((((ax)^(a))*(b^b))/((ax+b)^(a+b))))/(x*' + this.betaVal + ')';
      this.equationToEval = this.equationToEval.replace(new RegExp("a", 'g'), "(" + this.degreesOfFreedom + ")");
      this.equationToEval = this.equationToEval.replace(new RegExp("b", 'g'), "(" + this.degreesOfFreedom2 + ")");
    }
  } else {
    this.type = "null";
  }
  if (aobj.equationToEval) {
    this.equationToEval = aobj.equationToEval;
  } else {
    if (this.type.toLowerCase() == 'cartesian' || this.type.toLowerCase() == 'leftsum' || this.type.toLowerCase() == 'rightsum' || this.type.toLowerCase() == 'integral' || !this.type) {
      throw ("You must submit an equation to evaluate.");
    } else if (this.type == 'normal') {
      if (aobj.stdev) {
        this.stdev = parseFloat(aobj.stdev);
      } else {
        this.stdev = 1;
      }
      if (aobj.mean) {
        this.mean = parseFloat(aobj.mean);
      } else {
        this.mean = 0;
      }
      this.equationToEval = '(1 / sqrt(2 * o^2 * pi) * e^(-1 * ((x - u)^2) / (2 * o^2)))';
      this.equationToEval = this.equationToEval.replace(new RegExp("o", 'g'), "(" + this.stdev + ")");
      this.equationToEval = this.equationToEval.replace(new RegExp("u", 'g'), "(" + this.mean + ")");
    } else if (this.type.toLowerCase() == "arcsine") {
      this.equationToEval = '1/(pi*sqrt(x(1-x)))';
    } else if (this.type.toLowerCase() == "exponential") {
      if (aobj.lambda) {
        this.lambda = parseFloat(aobj.lambda);
      } else {
        this.lambda = 1;
      }
      this.equationToEval = '(lambda * e ^ (-lambdax))';
      this.equationToEval = this.equationToEval.replace(new RegExp("lambda", 'g'), "(" + this.lambda + ")");
    } else if (this.type.toLowerCase() == "chi-square") {
      if (aobj.degreesOfFreedom) {
        this.degreesOfFreedom = parseFloat(aobj.degreesOfFreedom);
      } else {
        this.degreesOfFreedom = 1;
      }
      this.gammaVal = gamma(this.degreesOfFreedom / 2);
      this.equationToEval = '((x^((k/2)-1))*(e^(-x/2)))/((2^(k/2))*' + this.gammaVal + ')';
      this.equationToEval = this.equationToEval.replace(new RegExp("\k", 'g'), "(" + this.degreesOfFreedom + ")");
    } else if (this.type.toLowerCase() == "f") {
      if (aobj.degreesOfFreedom) {
        this.degreesOfFreedom = parseFloat(aobj.degreesOfFreedom);
      } else {
        this.degreesOfFreedom = 1;
      }
      if (aobj.degreesOfFreedom2) {
        this.degreesOfFreedom2 = parseFloat(aobj.degreesOfFreedom2);
      } else {
        this.degreesOfFreedom2 = 1;
      }
      this.betaVal = beta(this.degreesOfFreedom / 2, this.degreesOfFreedom2 / 2);
      this.equationToEval = '(sqrt((((ax)^(a))*(b^b))/((ax+b)^(a+b))))/(x*' + this.betaVal + ')';
      this.equationToEval = this.equationToEval.replace(new RegExp("a", 'g'), "(" + this.degreesOfFreedom + ")");
      this.equationToEval = this.equationToEval.replace(new RegExp("b", 'g'), "(" + this.degreesOfFreedom2 + ")");
    } else {
      this.equationToEval = '';
    }
  }
  if (aobj.showXAxisGrid || aobj.showYAxisGrid == false) {
    this.showXAxisGrid = aobj.showXAxisGrid;
  } else {
    this.showXAxisGrid = true;
  }
  if (aobj.showYAxisGrid || aobj.showYAxisGrid == false) {
    this.showYAxisGrid = aobj.showYAxisGrid;
  } else {
    this.showYAxisGrid = true;
  }
  if (aobj.labelPoints) {
    this.labelPoints = aobj.labelPoints;
  }
  if (aobj.title) {
    this.title = aobj.title;
  } else {
    this.title = "Cartesian Graph";
  }
  if (aobj.desc) {
    this.desc = aobj.desc;
  } else {
    this.desc = "The graph of a function";
  }
  if (aobj.drawAxis == true || aobj.drawAxis == false) {
    this.drawAxis = aobj.drawAxis;
  } else {
    this.drawAxis = true;
  }
  if (aobj.points) {
    this.points = aobj.points;
  }
  if (aobj.pointsOnGraph) {
    this.pointsOnGraph = aobj.pointsOnGraph;
  }
  if (aobj.pointRadius) {
    this.pointRadius = aobj.pointRadius;
  } else {
    this.pointRadius = 3;
  }
  if (aobj.minX || aobj.minY == 0) {
    this.minX = aobj.minX;
  } else {
    this.minX = -10;
  }
  if (aobj.maxX || aobj.minY == 0) {
    this.maxX = aobj.maxX;
  } else {
    this.maxX = 10;
  }
  if (aobj.minY || aobj.minY == 0) {
    this.minY = aobj.minY;
  } else {
    this.minY = -10;
  }
  if (aobj.maxY || aobj.maxY == 0) {
    this.maxY = aobj.maxY;
  } else {
    this.maxY = 10;
  }
  if (aobj.id) {
    this.id = aobj.id;
  }
  if (aobj.a || aobj.a == 0) {
    if (Array.isArray(aobj.a)) {
      this.a = [];
      for (var i = 0; i < aobj.a.length; i++) {
        this.a[i] = parseFloat(aobj.a[i]);
      }
    } else {
      this.a = parseFloat(aobj.a);
    }
  } else {
    this.a = this.minX;
  }
  if (aobj.b || aobj.b == 0) {
    if (Array.isArray(aobj.b)) {
      this.b = [];
      for (var i = 0; i < aobj.b.length; i++) {
        this.b[i] = parseFloat(aobj.b[i]);
      }
    } else {
      this.b = parseFloat(aobj.b);
    }
  } else {
    this.b = this.a + 2;
  }
  if (aobj.N || aobj.N == 0) {
    this.N = parseFloat(aobj.N);
  } else {
    this.N = 4;
  }
  if (aobj.svgWidth || aobj.svgWidth == 0) {
    this.svgWidth = aobj.svgWidth;
  } else {
    this.svgWidth = 500;
  }
  if (aobj.svgHeight || aobj.svgHeight == 0) {
    this.svgHeight = aobj.svgHeight;
  } else {
    this.svgHeight = 500;
  }
  if (aobj.sidePadding || aobj.sidePadding == 0) {
    this.sidePadding = aobj.sidePadding;
  } else {
    this.sidePadding = 20;
  }
  if (aobj.TopBottomPadding || aobj.TopBottomPadding == 0) {
    this.TopBottomPadding = aobj.TopBottomPadding;
  } else {
    this.TopBottomPadding = 20;
  }
  if (aobj.xScale || aobj.xScale == 0) {
    this.xScale = aobj.xScale;
  } else {
    this.xScale = 1;
  }
  if (aobj.yScale || aobj.yScale == 0) {
    this.yScale = aobj.yScale;
  } else {
    this.yScale = 1;
  }
  if (aobj.shadeToX) {
    this.shadeToX = aobj.shadeToX;
  } else {
    this.shadeToX = false;
  }
  this.widthx = 0;
  this.widthy = 0;
  //this.resolution = 1;
  this.scale = 1;
  this.yAxisPosition = 0;
  this.xAxisPosition = 0;
  this.leftSumValue = 0;
  this.rightSumValue = 0;
  this.integralValue = 0;


  this.init = function() {
    if (this.render == "svg") {
      var figure = document.createElement('figure');
      figure.setAttribute('id', this.id + "figure");
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.setAttribute('viewBox', "0 0 500 500");
      var axisSym = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
      axisSym.setAttribute('id', this.id + "AxisSymbol");

      var axisG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      axisG.setAttribute('id', "axis" + this.id);
      axisG.setAttribute('stroke', "#999999");
      var graphG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttribute('id', 'use' + this.id);
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#' + this.id + 'GraphContents');
      var graphsym = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
      graphsym.setAttribute('id', this.id + 'GraphContents');
      graphsym.setAttribute('viewBox', "0 0 500 500");
      graphsym.setAttribute('width', '100%');
      graphsym.setAttribute('height', '100%');



      graphG.appendChild(use);
      svg.appendChild(axisSym);
      svg.appendChild(axisG);
      svg.appendChild(graphG);
      svg.appendChild(graphsym);
      figure.appendChild(svg);
      if (this.type == 'integral' || this.type == 'leftsum' || this.type == 'rightsum') {
        var figcap = document.createElement('figcaption');
        figcap.setAttribute('id', this.id + 'Sum');
        figure.appendChild(figcap);
      }

      document.getElementById(this.id).appendChild(figure);
      if (this.drawAxis) {
        this.drawGraphAxis();
      }

      if (Array.isArray(this.equationToEval)) {
        for (var i = 0; i < this.equationToEval.length; i++) {
          this.drawGraph(this.equationToEval[i]);
          this.summations(this.equationToEval[i]);
        }
      } else {
        this.drawGraph(this.equationToEval);
        this.summations(this.equationToEval);
      }
    } else if (this.render == "canvas") {
      var figure = document.createElement('figure');
      figure.setAttribute('id', this.id + "figure");
      var canvas = document.createElement('canvas');
      canvas.setAttribute('id', this.id + "canvas");
      canvas.setAttribute('width', 500);
      canvas.setAttribute('height', 500);
      figure.appendChild(canvas);
      this.ctx = canvas.getContext("2d");
      document.getElementById(this.id).appendChild(figure);
      if (this.drawAxis) {
        this.canvasDrawGraphAxis();
      }
      if (Array.isArray(this.equationToEval)) {
        for (var i = 0; i < this.equationToEval.length; i++) {
          this.drawGraph(this.equationToEval[i]);
          this.summations(this.equationToEval[i]);
        }
      } else {
        this.drawGraph(this.equationToEval);
        this.summations(this.equationToEval);
      }
    }





    // $(document).keydown(function(e) {
    //     var plot = document.getElementsByTagName('symbol')[1];
    //     var box = plot.getAttribute('viewBox');
    //     if ($('#graphContainer').is(":focus")) {
    //         if ((e.which == 38) && e.shiftKey) {
    //             console.log("afdas");
    //             var use = document.getElementsByTagName('use')[0];
    //             this.scale++;

    //             use.setAttribute('transform', 'translate(' + (-250 * (this.scale - 1)) + ',' + (-250 * (this.scale - 1)) + ') scale(' + this.scale + ')');
    //         } else if ((e.which == 40) && e.shiftKey) {
    //             console.log("afdas");
    //             var use = document.getElementsByTagName('use')[0];
    //             if (this.scale > 1) {
    //                 this.scale--;
    //             }
    //             use.setAttribute('transform', 'translate(' + (-250 * (this.scale - 1)) + ',' + (-250 * (this.scale - 1)) + ') scale(' + this.scale + ')');
    //         } else if (e.which == 37) {

    //             boxVal = box.split(" ");
    //             boxVal[0] = parseFloat(boxVal[0]) + this.width; //10;//this.scale;
    //             plot.setAttribute('viewBox', boxVal[0] + " " + boxVal[1] + " 500 500");
    //             this.updateAxisVals(37);
    //         } else if (e.which == 38) {
    //             boxVal = box.split(" ");
    //             boxVal[1] = parseFloat(boxVal[1]) + this.width; //10;//this.scale;
    //             plot.setAttribute('viewBox', boxVal[0] + " " + boxVal[1] + " 500 500");
    //             this.updateAxisVals(38);
    //             e.preventDefault();
    //         } else if (e.which == 39) {
    //             boxVal = box.split(" ");
    //             boxVal[0] = parseFloat(boxVal[0]) - this.width; //10;//this.scale;
    //             plot.setAttribute('viewBox', boxVal[0] + " " + boxVal[1] + " 500 500");
    //             this.updateAxisVals(39);

    //         } else if (e.which == 40) {
    //             boxVal = box.split(" ");
    //             boxVal[1] = parseFloat(boxVal[1]) - this.width; //10;//this.scale;
    //             plot.setAttribute('viewBox', boxVal[0] + " " + boxVal[1] + " 500 500");
    //             this.updateAxisVals(40);
    //             e.preventDefault();
    //         }


    //     }
    // });

  };
  this.clearGraph = function() {
    var clearAxis = document.getElementById(this.id + 'GraphContents');
    while (clearAxis.firstChild) {
      clearAxis.removeChild(clearAxis.firstChild);
    }

  };
  this.drawGraphAxis = function() {


    var use = document.getElementById('use' + this.id);

    use.setAttribute('transform', 'translate(0,0) scale(1)');
    var plot = document.getElementById(this.id + 'GraphContents');
    var box = plot.setAttribute('viewBox', '0 0 ' + this.svgWidth + ' ' + this.svgHeight);
    var axisLines = document.getElementById('axis' + this.id);

    this.widthx = (this.svgWidth - 2 * this.sidePadding) / (Math.abs(this.minX - this.maxX) / this.xScale);
    var vertical;

    var axisVal;
    var textNode;

    x = this.minX;
    var i = this.sidePadding;
    if (this.showYAxisGrid) {
      for (j = this.minX; j <= this.maxX; j += this.xScale) {


        vertical = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        vertical.setAttribute('d', 'M' + i + ' 20 v' + (this.svgHeight - 2 * this.TopBottomPadding));
        if (x.toFixed(6) != 0) {
          vertical.setAttribute('stroke-width', '.5');
        } else {
          vertical.setAttribute('stroke-width', '1');
          vertical.setAttribute('id', 'yAxisLine');
          vertical.setAttribute('stroke', 'black');
        }

        axisLines.appendChild(vertical);

        //set values
        if (x == this.minX || x == this.maxX || x.toFixed(6) == 0) {
          axisVal = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          x = parseFloat(x.toFixed(6));
          textNode = document.createTextNode(x);

          axisVal.setAttribute('x', i);
          axisVal.setAttribute('id', "x" + x)

          if ((Math.abs(x)) % 2 == 0) {
            axisVal.setAttribute('y', 7);
          } else {
            axisVal.setAttribute('y', 17);
          }
          axisVal.setAttribute('font-size', '7pt');
          axisVal.setAttribute('font-weight', 'lighter');
          axisVal.setAttribute('text-anchor', 'middle');
          axisVal.setAttribute('vector-effect', 'non-scaling-stroke');


          axisVal.appendChild(textNode);
          axisLines.appendChild(axisVal);


        }
        x += this.xScale;
        i += this.widthx;
      }
    }

    this.widthy = (this.svgWidth - 2 * this.sidePadding) / (Math.abs(this.minY - this.maxY) / this.yScale);
    x = this.maxY;
    i = this.sidePadding;

    var horizontal;
    if (this.showXAxisGrid) {
      for (j = this.maxY; j >= this.minY; j -= this.yScale) {


        horizontal = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        horizontal.setAttribute('d', 'M20 ' + i + ' h' + (this.svgHeight - 2 * this.sidePadding));

        if (x.toFixed(6) != 0) {
          horizontal.setAttribute('stroke-width', '.5');
        } else {
          horizontal.setAttribute('stroke-width', '1');
          horizontal.setAttribute('id', 'xAxisLine');
          horizontal.setAttribute('stroke', 'black');
        }

        axisLines.appendChild(horizontal);

        //set values
        if (x == this.minY || x == this.maxY || x.toFixed(6) == 0) {
          x = parseFloat(x.toFixed(6));
          axisVal = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          textNode = document.createTextNode(x);

          axisVal.setAttribute('y', i + 3.5);
          axisVal.setAttribute('x', 17);
          axisVal.setAttribute('id', "y" + x)
          axisVal.setAttribute('font-size', '7pt');
          axisVal.setAttribute('font-weight', 'lighter');
          axisVal.setAttribute('text-anchor', 'end');
          axisVal.setAttribute('vector-effect', 'non-scaling-stroke');

          axisVal.appendChild(textNode);
          axisLines.appendChild(axisVal);


        }
        x -= this.yScale;
        i += this.widthy;
      }
    }

  };
  this.canvasDrawGraphAxis = function() {

    this.widthx = (this.svgWidth - 2 * this.sidePadding) / (Math.abs(this.minX - this.maxX) / this.xScale);
    var vertical;
    var ctx = this.ctx;

    var axisVal;
    var textNode;

    x = this.minX;
    var i = this.sidePadding;
    if (this.showYAxisGrid) {
      for (j = this.minX; j <= this.maxX; j += this.xScale) {
        vertical = "";
        ctx.beginPath();
        ctx.moveTo(i, 20);
        ctx.lineTo(i, (this.svgHeight - this.TopBottomPadding));
        //vertical.setAttribute('d', 'M' + i + ' 20 v' + (this.svgHeight - 2 * this.TopBottomPadding));
        if (x.toFixed(6) != 0) {
          ctx.strokeStyle = "rgba(153, 153, 153, 0.5)";

        } else {
          ctx.strokeStyle = "black";
        }




        //set values
        if (x == this.minX || x == this.maxX || x.toFixed(6) == 0) {
          x = parseFloat(x.toFixed(6));
          if ((Math.abs(x)) % 2 == 0) {
            y = 7;
          } else {
            y = 17;
          }
          ctx.font = '7pt Arial';
          ctx.textAlign = 'center';
          ctx.fillText(x, i, y);
        }
        x += this.xScale;
        i += this.widthx;
        ctx.stroke();
      }
    }

    this.widthy = (this.svgWidth - 2 * this.sidePadding) / (Math.abs(this.minY - this.maxY) / this.yScale);
    x = this.maxY;
    i = this.sidePadding;

    var horizontal;
    if (this.showXAxisGrid) {
      for (j = this.maxY; j >= this.minY; j -= this.yScale) {
        horizontal = "";
        ctx.beginPath();
        ctx.moveTo(20, i);
        ctx.lineTo((this.svgHeight - this.sidePadding), i);

        //horizontal.setAttribute('d', 'M20 ' + i + ' h' + (this.svgHeight - 2 * this.sidePadding));

        if (x.toFixed(6) != 0) {
          ctx.strokeStyle = "rgba(153, 153, 153, 0.5)";
        } else {
          ctx.strokeStyle = "black";
        }


        //set values
        if (x == this.minY || x == this.maxY || x.toFixed(6) == 0) {
          x = parseFloat(x.toFixed(6));
          ctx.font = '7pt Arial';
          ctx.textAlign = 'end';
          ctx.fillText(x, 17, i + 3.5);
        }
        x -= this.yScale;
        i += this.widthy;
        ctx.stroke();
      }
    }

  };


  this.drawGraph = function(equationToEval) {
    var graphContent = document.getElementById(this.id + 'GraphContents');
    var gr = this;
    var ctx = gr.ctx;
    if (gr.render == "svg") {
      var worker = new Worker('GraphWorker.js');
      worker.addEventListener('message', function(e) {
        if (e.data.error) {
          $('#popup #message').empty().append(e.data.error);
        } else if (e.data.msg) {
          $('#popup #stage').empty().append(e.data.msg);
        } else {

          if (e.data.Main) {
            var image = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            image.setAttribute('d', e.data.Main);
            image.setAttribute('stroke-width', '2');
            image.setAttribute('stroke', 'red');
            image.setAttribute('fill-opacity', 0);
            image.setAttribute('vector-effect', 'non-scaling-stroke');

            graphContent.appendChild(image);
          }
          if (e.data.rect1) {
            image2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            image2.setAttribute('d', e.data.rect1);
            image2.setAttribute('stroke-width', '2');
            image2.setAttribute('stroke', 'blue');
            image2.setAttribute('fill-opacity', 0);
            image2.setAttribute('vector-effect', 'non-scaling-stroke');
            graphContent.appendChild(image2);
          }
          if (e.data.rect2) {
            image3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            image3.setAttribute('d', e.data.rect2);
            image3.setAttribute('stroke-width', '2');
            image3.setAttribute('stroke', 'Green');
            image3.setAttribute('fill-opacity', 0);
            image3.setAttribute('vector-effect', 'non-scaling-stroke');

            graphContent.appendChild(image3);
          }
          if (e.data.shade) {
            if (Array.isArray(e.data.shade)) {
              for (var i = 0; i < e.data.shade.length; i++) {
                image4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                image4.setAttribute('d', e.data.shade[i]);
                image4.setAttribute('stroke-width', '2');
                image4.setAttribute('stroke', 'black');
                image4.setAttribute('fill-opacity', 0.5);
                image4.setAttribute('fill', '#999');
                image4.setAttribute('vector-effect', 'non-scaling-stroke');
                graphContent.appendChild(image4);
              }
            } else {
              image4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
              image4.setAttribute('d', e.data.shade);
              image4.setAttribute('stroke-width', '2');
              image4.setAttribute('stroke', 'black');
              image4.setAttribute('fill-opacity', 0.5);
              image4.setAttribute('fill', '#999');
              image4.setAttribute('vector-effect', 'non-scaling-stroke');
              graphContent.appendChild(image4);
            }
          }
          if (e.data.pcx) {
            pointsContainer = image5 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            pointsContainer.setAttribute('id', 'pointsContainer' + gr.id)
            for (var i = 0; i < e.data.pcx.length; i++) {
              if (e.data.pcx[i] && e.data.pcy[i] && e.data.plabels[i]) {
                image5 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                image5.setAttribute('cx', e.data.pcx[i]);
                image5.setAttribute('cy', e.data.pcy[i]);
                image5.setAttribute('r', gr.pointRadius);
                image5.setAttribute('stroke-width', '2');
                image5.setAttribute('stroke', 'red');
                image5.setAttribute('fill', 'red');
                titleImage5 = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                var textNode = document.createTextNode(e.data.plabels[i]);
                titleImage5.appendChild(textNode);
                image5.appendChild(titleImage5);
                pointsContainer.appendChild(image5);

                if (gr.labelPoints) {
                  if (Array.isArray(gr.labelPoints)) {
                    if (gr.labelPoints[i]) {
                      var textNode2 = document.createTextNode(e.data.plabels[i]);
                      image6 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                      image6.setAttribute('x', parseFloat(e.data.pcx[i]) + parseFloat(gr.pointRadius) + 5);
                      image6.setAttribute('y', parseFloat(e.data.pcy[i]) + parseFloat(gr.pointRadius));
                      image6.appendChild(textNode2);
                      pointsContainer.appendChild(image6);
                    }
                  } else {
                    if (gr.labelPoints) {
                      var textNode2 = document.createTextNode(e.data.plabels[i]);
                      image6 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                      image6.setAttribute('x', parseFloat(e.data.pcx[i]) + parseFloat(gr.pointRadius) + 5);
                      image6.setAttribute('y', parseFloat(e.data.pcy[i]) + parseFloat(gr.pointRadius));
                      image6.appendChild(textNode2);
                      pointsContainer.appendChild(image6);
                    }
                  }
                }
              }

            }
            graphContent.parentNode.appendChild(pointsContainer);
          }
          worker.terminate();

        }
      });
      worker.postMessage({ 'points': gr.points, 'pointsOnGraph': gr.pointsOnGraph, 'widthx': gr.widthx, 'widthy': gr.widthy, 'xScale': gr.xScale, 'yScale': gr.yScale, 'svgWidth': gr.svgWidth, 'svgHeight': gr.svgHeight, 'sidePadding': gr.sidePadding, 'TopBottomPadding': gr.TopBottomPadding, 'type': gr.type, 'equationToEval': equationToEval, 'tinyX': gr.minX, 'largeX': gr.maxX, 'tinyY': gr.minY, 'largeY': gr.maxY, 'N': gr.N, 'a': gr.a, 'b': gr.b, 'shadeToX': gr.shadeToX });
    } else if (gr.render == "canvas") {
      var worker = new Worker('CanvasGraphWorker.js');
      worker.addEventListener('message', function(e) {
        if (e.data.error) {
          $('#popup #message').empty().append(e.data.error);
        } else if (e.data.msg) {
          $('#popup #stage').empty().append(e.data.msg);
        } else {

          if (e.data.Main) {
            ctx.strokeStyle = "red";
            eval(e.data.Main);
          }
          if (e.data.rect1) {
            ctx.strokeStyle = "blue";
            eval(e.data.rect1);
          }
          if (e.data.rect2) {
            ctx.strokeStyle = "green";
            eval(e.data.rect2);
          }
          if (e.data.shade) {
            ctx.strokeStyle = "black";
            ctx.fillStyle = "rgba(153, 153, 153, 0.5)";
            if (Array.isArray(e.data.shade)) {
              for (var i = 0; i < e.data.shade.length; i++) {
                eval(e.data.shade[i]);
              }
            } else {
              eval(e.data.shade);
            }
          }
          if (e.data.pcx) {
            for (var i = 0; i < e.data.pcx.length; i++) {

              if (e.data.pcx[i] && e.data.pcy[i] && e.data.plabels[i]) {
                //ctx.moveTo(e.data.pcx[i], e.data.pcy[i]);
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.fillStyle = "red";
                ctx.arc(e.data.pcx[i], e.data.pcy[i], gr.pointRadius, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
                if (gr.labelPoints) {
                  if (Array.isArray(gr.labelPoints)) {
                    if (gr.labelPoints[i]) {
                      ctx.beginPath();
                      ctx.font = '10pt Arial';
                      ctx.strokeStyle = "black";
                      ctx.fillStyle = "black";
                      ctx.fillText(e.data.plabels[i], parseFloat(e.data.pcx[i]) - parseFloat(gr.pointRadius) - 5, parseFloat(e.data.pcy[i]) + parseFloat(gr.pointRadius));
                    }
                  } else {
                    if (gr.labelPoints) {
                      ctx.beginPath();
                      ctx.font = '10pt Arial';
                      ctx.strokeStyle = "black";
                      ctx.fillStyle = "black";
                      ctx.fillText(e.data.plabels[i], parseFloat(e.data.pcx[i]) - parseFloat(gr.pointRadius) - 5, parseFloat(e.data.pcy[i]) + parseFloat(gr.pointRadius));
                    }
                  }
                }

              }

            }

          }
          worker.terminate();

        }
      });
      worker.postMessage({ 'points': gr.points, 'pointsOnGraph': gr.pointsOnGraph, 'widthx': gr.widthx, 'widthy': gr.widthy, 'xScale': gr.xScale, 'yScale': gr.yScale, 'svgWidth': gr.svgWidth, 'svgHeight': gr.svgHeight, 'sidePadding': gr.sidePadding, 'TopBottomPadding': gr.TopBottomPadding, 'type': gr.type, 'equationToEval': equationToEval, 'tinyX': gr.minX, 'largeX': gr.maxX, 'tinyY': gr.minY, 'largeY': gr.maxY, 'N': gr.N, 'a': gr.a, 'b': gr.b, 'shadeToX': gr.shadeToX });

    }

  };
  this.summations = function(equationToEval) {
    var N = this.N;
    var a = this.a;
    var b = this.b;
    var gr = this;
    var sumWork = new Worker("SummationWorker.js");
    sumWork.addEventListener('message', function(e) {
      if (e.data.msg) {
        $('#popup #stage').empty().append(e.data.msg);
      } else {
        if (e.data.Right) {
          gr.rightSumValue = e.data.Right;
          MathJax.Hub.Queue(function() {
            if (gr.rightSumValue != "diverges") {
              var rightSum = "<math><mstyle displaystyle='true'><msub><mi>R</mi><mi>n</mi></msub><mo>=</mo><munderover><mo>&#x2211;</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mn>" + N + "</mi></munderover><mrow><mi>f</mi><mo></mo><mrow><mo>(</mo><msub><mi>x</mi><mi>i</mi></msub><mo>)</mo></mrow><mrow><mo>(</mo><mn>" + (b - a) / N + "</mn><mo>)</mo></mrow></mstyle><mo>=</mo>";
              $('#' + gr.id + 'Sum').empty().append(rightSum + "<mn>" + gr.rightSumValue + "</mn></mrow></math>" + "<br><span>where </span><math><msub><mi>x</mi><mi>i</mi></msub><mo>=</mo><mn>" + a + "</mn><mo>+</mo><mi>i</mi><mrow><mo>(</mo><mn>" + (b - a) / N + "</mn><mo>)</mo></mrow></math>");
            } else {
              $('#' + gr.id + 'Sum').empty().append("Right Sum diverges");
            }
          });
          MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }
        if (e.data.Left) {
          gr.leftSumValue = e.data.Left;
          MathJax.Hub.Queue(function() {
            if (gr.leftSumValue != "diverges") {
              var leftSum = "<math><mstyle displaystyle='true'><msub><mi>L</mi><mi>n</mi></msub><mo>=</mo><munderover><mo>&#x2211;</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mn>" + N + "</mn></munderover><mrow><mi>f</mi><mo></mo><mrow><mo>(</mo><msub><mi>x</mi><mrow><mi>i</mi><mo>&#x2212;</mo><mn>1</mn></mrow></msub><mo>)</mo></mrow><mrow><mo>(</mo><mn>" + (b - a) / N + "</mn><mo>)</mo></mrow></mstyle><mo>=</mo>";
              $('#' + gr.id + 'Sum').empty().append(leftSum + "<mn>" + gr.leftSumValue + "</mn></mrow></math>" + "<br><span>where </span><math><msub><mi>x</mi><mi>i</mi></msub><mo>=</mo><mn>" + a + "</mn><mo>+</mo><mi>i</mi><mrow><mo>(</mo><mn>" + (b - a) / N + "</mn><mo>)</mo></mrow></math>");
            } else {
              $('#' + gr.id + 'Sum').empty().append("Left Sum diverges");
            }
          });
          MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }
        if (e.data.Integral) {
          if (Array.isArray(e.data.Integral)) {
            gr.integralValue = [];
            var toDisplayInt = "`";
            var toDisplaySum = "";
            var finalValue;
            for (var i = 0; i < e.data.Integral.length; i++) {
              if (i == e.data.Integral.length - 1) {
                toDisplayInt = toDisplayInt + "int_(" + a[i] + ")^(" + b[i] + ")(" + equationToEval + ") dx = ";
              } else {
                toDisplayInt = toDisplayInt + "int_(" + a[i] + ")^(" + b[i] + ")(" + equationToEval + ") dx + ";
              }
            }
            for (var i = 0; i < e.data.Integral.length; i++) {
              gr.integralValue[i] = e.data.Integral[i];
              if (gr.integralValue[i] != "diverges" && !isNaN(gr.integralValue[i])) {
                if (i == e.data.Integral.length - 1) {
                  toDisplaySum = toDisplaySum + gr.integralValue[i] + " = ";
                } else {
                  toDisplaySum = toDisplaySum + gr.integralValue[i] + " + ";
                }
              } else {
                if (i == e.data.Integral.length - 1) {
                  toDisplaySum = toDisplaySum + '"' + gr.integralValue[i] + '" = ';
                } else {
                  toDisplaySum = toDisplaySum + '"' + gr.integralValue[i] + '" + ';
                }
              }
            }

            finalValue = gr.evaluateEquation(toDisplaySum.replace("=", ""));

            MathJax.Hub.Queue(function() {

              $('#' + gr.id + 'Sum').empty().append(toDisplayInt + toDisplaySum + finalValue + "`");

            });
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
          } else {
            gr.integralValue = e.data.Integral;
            MathJax.Hub.Queue(function() {
              if (gr.integralValue != "diverges" && !isNaN(gr.integralValue)) {
                $('#' + gr.id + 'Sum').empty().append("`int_(" + a + ")^(" + b + ")" + equationToEval + " dx = " + gr.integralValue + "`");
              } else {
                $('#' + gr.id + 'Sum').empty().append("`int_(" + a + ")^(" + b + ")" + equationToEval + " dx `" + " " + gr.integralValue);
              }
            });
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
          }
        }
        sumWork.terminate();
        $('#popup').toggleClass("none");
      }
    });
    sumWork.postMessage({ 'type': gr.type, 'equationToEval': equationToEval, 'tinyX': gr.minX, 'largeX': gr.maxX, 'tinyY': gr.minY, 'largeY': gr.maxY, 'N': gr.N, 'a': gr.a, 'b': gr.b });
  };

  this.createEquation = function() {
    MathJax.Hub.Queue(function() { document.getElementById('equationList').innerHTML = "`f(x)=" + this.equationToEval + "`" });
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

  };


  this.evaluateEquation = function(x) {
    var a = math.eval(((this.equationToEval).replace(new RegExp("x", 'g'), "(" + x + ")")));
    if (!isNaN(a)) {
      return parseFloat(parseFloat(math.eval(((this.equationToEval).replace(new RegExp("x", 'g'), "(" + x + ")")))).toFixed(3));
    } else {
      return NaN
    }
    //return parseFloat(parseFloat(math.eval(((this.equationToEval).replace(new RegExp("x", 'g'), "(" + x + ")")))).toFixed(3));
  };

  this.updateAxisVals = function(direct) {
    switch (direct) {
      case 37:
        var curVal = this.minX;
        curVal++;
        document.getElementById('minX').value = curVal;
        var curVal = this.maxX;
        curVal++;
        document.getElementById('maxX').value = curVal;

        break;
      case 38:
        var curVal = this.minY;
        curVal--;
        document.getElementById('minY').value = curVal;
        var curVal = this.maxY;
        curVal--;
        document.getElementById('maxY').value = curVal;
        break;
      case 39:
        var curVal = this.minX;
        curVal--;
        document.getElementById('minX').value = curVal;
        var curVal = this.maxX;
        curVal--;
        document.getElementById('maxX').value = curVal;
        break;
      case 40:
        var curVal = this.minY;
        curVal++;
        document.getElementById('minY').value = curVal;
        var curVal = this.maxY;
        curVal++;
        document.getElementById('maxY').value = curVal;
        break;
      default:
        console.log("Encountered an error updating Axis Values");


    }
    this.clearGraph();
    this.drawGraphAxis();
    if (this.numGraphDrawn > 0) {
      this.drawGraph();
    }

  }
  this.init();

}

// $(document).ready(function() {
//     this.init();
// });
