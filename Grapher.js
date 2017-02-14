var Graph = function(id, equationToEval, a, b, N, type) {
  this.equationToEval = equationToEval;
  this.minX = -10;
  this.maxX = 10;
  this.minY = -10;
  this.maxY = 10;
  this.widthx = 0;
  this.widthy = 0;
  this.resolution = 1;
  this.scale = 1;
  this.yAxisPosition = 0;
  this.xAxisPosition = 0;
  this.leftSumValue = 0;
  this.rightSumValue = 0;
  this.integralValue = 0;
  this.id = id;
  this.a = a;
  this.b = b;
  this.N = N;
  this.type = type;

  this.init = function() {
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





    //this.drawGraphAxis();


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

    var svgWidth = 500;
    var svgHeight = 500;
    var use = document.getElementById('use' + this.id);
    //var useLeft = document.getElementById('useLeft');
    //var useIntegral = document.getElementById('useIntegral');
    //var useRight = document.getElementById('useRight');

    use.setAttribute('transform', 'translate(0,0) scale(1)');
    var plot = document.getElementById(this.id + 'GraphContents');
    //var plotLeft = document.getElementById('leftGraphContents');
    //var plotIntegral = document.getElementById('integralGraphContents');
    //var plotRight = document.getElementById('rightGraphContents');
    var box = plot.setAttribute('viewBox', '0 0 500 500');
    //var boxLeft = plotLeft.setAttribute('viewBox', '0 0 500 500');
    //var boxIntegral = plotIntegral.setAttribute('viewBox', '0 0 500 500');
    //var boxRight = plotRight.setAttribute('viewBox', '0 0 500 500');
    var axisLines = document.getElementById('axis' + this.id);
    //var axisLinesLeft = document.getElementById('axisLeft');
    //var axisLinesIntegral = document.getElementById('axisIntegral');
    //var axisLinesRight = document.getElementById('axisRight');

    this.widthx = 460 / Math.abs(this.minX - this.maxX);
    var vertical;
    //var verticalLeft;
    //var verticalIntegral;
    //var verticalRight;
    var axisVal;
    var textNode;
    //var textNodeLeft;
    //var textNodeIntegral;
    //var textNodeRight;
    //var axisValLeft;
    //var axisValRight;
    //var axisValIntegral;
    x = this.minX;
    var i = 20;
    for (j = this.minX; j <= this.maxX; j++) {


      vertical = document.createElementNS('http://www.w3.org/2000/svg', 'path');

      vertical.setAttribute('d', 'M' + i + ' 20 v' + (svgHeight - 40));
      if (x != 0) {
        vertical.setAttribute('stroke-width', '.5');
      } else {
        vertical.setAttribute('stroke-width', '1');
        vertical.setAttribute('id', 'yAxisLine');
        vertical.setAttribute('stroke', 'black');
      }
      //verticalLeft = vertical.cloneNode(true);
      //verticalIntegral = vertical.cloneNode(true);
      //verticalRight = vertical.cloneNode(true);
      axisLines.appendChild(vertical);
      //axisLinesLeft.appendChild(verticalLeft);
      //axisLinesIntegral.appendChild(verticalIntegral);
      //axisLinesRight.appendChild(verticalRight);
      //set values
      if (x == $('#minX').val() || x == $('#maxX').val() || x == 0) {
        axisVal = document.createElementNS('http://www.w3.org/2000/svg', 'text');

        textNode = document.createTextNode(x);
        //textNodeLeft = textNode.cloneNode(true);
        //textNodeIntegral = textNode.cloneNode(true);
        //textNodeRight = textNode.cloneNode(true);
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

        //axisValLeft = axisVal.cloneNode(true);
        //axisValIntegral = axisVal.cloneNode(true);
        //axisValRight = axisVal.cloneNode(true);
        axisVal.appendChild(textNode);
        axisLines.appendChild(axisVal);

        //axisValLeft.appendChild(textNodeLeft);
        //axisLinesLeft.appendChild(axisValLeft);

        //axisValIntegral.appendChild(textNodeIntegral);
        //axisLinesIntegral.appendChild(axisValIntegral);

        //axisValRight.appendChild(textNodeRight);
        //axisLinesRight.appendChild(axisValRight);
      }
      x++;
      i += this.widthx;
    }
    //console.log(i);
    this.widthy = 460 / Math.abs(this.minY - this.maxY);
    x = this.maxY;
    i = 20;
    var horizontal;
    //var horizontalLeft;
    //var horizontalIntegral;
    //var horizontalRight;
    for (j = this.maxY; j >= this.minY; j--) {


      horizontal = document.createElementNS('http://www.w3.org/2000/svg', 'path');

      horizontal.setAttribute('d', 'M20 ' + i + ' h' + (svgHeight - 40));

      if (x != 0) {
        horizontal.setAttribute('stroke-width', '.5');
      } else {
        horizontal.setAttribute('stroke-width', '1');
        horizontal.setAttribute('id', 'xAxisLine');
        horizontal.setAttribute('stroke', 'black');
      }
      //horizontalLeft = horizontal.cloneNode(true);
      //horizontalIntegral = horizontal.cloneNode(true);
      //horizontalRight = horizontal.cloneNode(true);
      axisLines.appendChild(horizontal);
      //axisLinesLeft.appendChild(horizontalLeft);
      //axisLinesIntegral.appendChild(horizontalIntegral);
      //axisLinesRight.appendChild(horizontalRight);
      //set values
      if (x == $('#minY').val() || x == $('#maxY').val() || x == 0) {
        axisVal = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textNode = document.createTextNode(x);
        //textNodeLeft = textNode.cloneNode(true);
        //textNodeIntegral = textNode.cloneNode(true);
        //textNodeRight = textNode.cloneNode(true);
        axisVal.setAttribute('y', i + 3.5);
        axisVal.setAttribute('x', 17);
        axisVal.setAttribute('id', "y" + x)
        axisVal.setAttribute('font-size', '7pt');
        axisVal.setAttribute('font-weight', 'lighter');
        axisVal.setAttribute('text-anchor', 'end');
        axisVal.setAttribute('vector-effect', 'non-scaling-stroke');
        //axisValLeft = axisVal.cloneNode(true);
        //axisValIntegral = axisVal.cloneNode(true);
        //axisValRight = axisVal.cloneNode(true);

        axisVal.appendChild(textNode);
        axisLines.appendChild(axisVal);

        //axisValLeft.appendChild(textNodeLeft);
        //axisLinesLeft.appendChild(axisValLeft);

        //axisValIntegral.appendChild(textNodeIntegral);
        //axisLinesIntegral.appendChild(axisValIntegral);

        //axisValRight.appendChild(textNodeRight);
        //axisLinesRight.appendChild(axisValRight);
      }
      x--;
      i += this.widthy;
    }

  };



  this.drawGraph = function() {
    var graphContent = document.getElementById(this.id + 'GraphContents');
    //var graphContentLeft = document.getElementById('leftGraphContents');
    //var graphContentIntegral = document.getElementById('integralGraphContents');
    //var graphContentRight = document.getElementById('rightGraphContents');
    var gr = this;
    var worker = new Worker('GraphWorker.js');
    worker.addEventListener('message', function(e) {
      if (e.data.error) {
        $('#popup #message').empty().append(e.data.error);
      } else if (e.data.msg) {
        $('#popup #stage').empty().append(e.data.msg);
      } else {


        var image = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        image.setAttribute('d', e.data.Main);
        image.setAttribute('stroke-width', '2');
        image.setAttribute('stroke', 'red');
        image.setAttribute('fill-opacity', 0);
        image.setAttribute('vector-effect', 'non-scaling-stroke');
        //var imageLeft = image.cloneNode(true);
        //var imageRight = image.cloneNode(true);
        //var imageIntegral = image.cloneNode(true);
        graphContent.appendChild(image);
        //graphContentLeft.appendChild(imageLeft);
        //graphContentIntegral.appendChild(imageIntegral);
        //graphContentRight.appendChild(imageRight);
        if (e.data.rect1) {
          image2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          image2.setAttribute('d', e.data.rect1);
          image2.setAttribute('stroke-width', '2');
          image2.setAttribute('stroke', 'blue');
          image2.setAttribute('fill-opacity', 0);
          image2.setAttribute('vector-effect', 'non-scaling-stroke');
          //image2Right = image2.cloneNode(true);
          graphContent.appendChild(image2);
        }
        if (e.data.rect2) {
          //graphContentRight.appendChild(image2Right);
          image3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          image3.setAttribute('d', e.data.rect2);
          image3.setAttribute('stroke-width', '2');
          image3.setAttribute('stroke', 'Green');
          image3.setAttribute('fill-opacity', 0);
          image3.setAttribute('vector-effect', 'non-scaling-stroke');

          //image3Left = image3.cloneNode(true);

          graphContent.appendChild(image3);
        }
        if (e.data.shade) {
          //graphContentLeft.appendChild(image3Left);
          image4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          image4.setAttribute('d', e.data.shade);
          image4.setAttribute('stroke-width', '2');
          image4.setAttribute('stroke', 'black');
          image4.setAttribute('fill-opacity', 0.5);
          image4.setAttribute('fill', '#999');
          image4.setAttribute('vector-effect', 'non-scaling-stroke');

          //graphContentIntegral.appendChild(image4);
          graphContent.appendChild(image4);
        }
        worker.terminate();
        gr.summations();
      }
    });
    worker.postMessage({ 'type': gr.type, 'equationToEval': gr.equationToEval, 'tinyX': gr.minX, 'largeX': gr.maxX, 'tinyY': gr.minY, 'largeY': gr.maxY, 'N': gr.N, 'a': gr.a, 'b': gr.b });


  };
  this.summations = function() {
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
          gr.integralValue = e.data.Integral;
          MathJax.Hub.Queue(function() {
            if (gr.integralValue != "diverges" && !isNaN(gr.integralValue)) {
              $('#' + gr.id + 'Sum').empty().append("`int_(" + a + ")^(" + b + ")" + gr.equationToEval + " dx = " + gr.integralValue + "`");
            } else {
              $('#' + gr.id + 'Sum').empty().append("`int_(" + a + ")^(" + b + ")" + gr.equationToEval + " dx `" + " " + gr.integralValue);
            }
          });
          MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }
        sumWork.terminate();
        $('#popup').toggleClass("none");
      }
    });
    sumWork.postMessage({ 'type': gr.type, 'equationToEval': gr.equationToEval, 'tinyX': gr.minX, 'largeX': gr.maxX, 'tinyY': gr.minY, 'largeY': gr.maxY, 'N': gr.N, 'a': gr.a, 'b': gr.b });
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
