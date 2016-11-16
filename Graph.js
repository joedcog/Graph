var Graph = {
    equationString: "<math xmlns=\"http://www.w3.org/1998/Math/MathML\">",
    prevEquationString: "<math xmlns=\"http://www.w3.org/1998/Math/MathML\">",
    equationNumString: "<math xmlns=\"http://www.w3.org/1998/Math/MathML\">",
    prevEquationNumString: "<math xmlns=\"http://www.w3.org/1998/Math/MathML\">",
    equationDenomString: "<math xmlns=\"http://www.w3.org/1998/Math/MathML\">",
    prevEquationDenomString: "<math xmlns=\"http://www.w3.org/1998/Math/MathML\">",
    equationExpString: "<math xmlns=\"http://www.w3.org/1998/Math/MathML\">",
    prevEquationExpString: "<math xmlns=\"http://www.w3.org/1998/Math/MathML\">",
    lastAppendedMath: [],
    lastAppendedMathNum: [],
    lastAppendedMathExp: [],
    lastAppendedMathDenom: [],
    equationToEval: "",
    equationNumToEval: "",
    equationDenomToEval: "",
    equationExpToEval: "",
    minX: -10,
    maxX: 22, //not used yet, will need for zoom
    width: 0,
    resolution: 1,
    lastPressed: [],
    lastPressedNum: [],
    lastPressedDenom: [],
    lastPressedExp: [],
    initialDistanceFromOrigin: 10000,
    scale: 1,
    keypressCount: 0,
    keypressNumCount: 0,
    keypressExpCount: 0,
    keypressDenomCount: 0,
    numGraphDrawn: 0,
    yAxisPosition: 0,
    xAxisPosition: 0,
    expCount: 0,

    init: function() {

        Graph.drawGraphAxis();
        $('#minX, #maxX, #minY, #maxY').change(function() {
            Graph.clearGraph();
            Graph.drawGraphAxis();
            if (Graph.numGraphDrawn > 0) {
                Graph.drawGraph();
            }
        });
        $('#graphButton').click(function() {
            //need to create a function to validate user input
            swal({
                title: 'Are you sure?',
                text: 'Confirm your submission.',
                showCancelButton: true,
                confirmButtonText: "Confirm",
                animation: false
            }, function(isConfirm) {
                if (isConfirm) {
                    Graph.createEquation();
                    //Graph.drawGraphAxis();
                    Graph.drawGraph();
                }
            });
        });
        $('#clearButton').click(function() {
            //need to create a function to validate user input
            swal({
                title: 'Are you sure?',
                text: 'Would you like to clear all graphs?',
                showCancelButton: true,
                confirmButtonText: "Confirm",
                animation: false
            }, function(isConfirm) {
                if (isConfirm) {
                    $('#axis').empty();
                    $('#graphContents').empty();
                    Graph.drawGraphAxis();

                }
            });
        });
        
        $('#equationInput').on("input",function(e) {

            var TempToRender = $('#equationInput').val();
            console.log(TempToRender);
            //console.log(Graph.convertInputToMathML(TempToRender, e));
            Graph.equationToEval = $('#equationInput').val();
            MathJax.Hub.Queue(["Text", MathJax.Hub.getAllJax(document.getElementById('equationFormatShown'))[0],'f(x)='+TempToRender]);
        });
        $(document).keydown(function(e) {
            var plot = document.getElementsByTagName('symbol')[1];
            var box = plot.getAttribute('viewBox');
            if ($('#graphContainer').is(":focus")) {
                if ((e.which == 38) && e.shiftKey) {
                    console.log("afdas");
                    var use = document.getElementsByTagName('use')[0];
                    Graph.scale++;

                    use.setAttribute('transform', 'translate(' + (-250 * (Graph.scale - 1)) + ',' + (-250 * (Graph.scale - 1)) + ') scale(' + Graph.scale + ')');
                } else if ((e.which == 40) && e.shiftKey) {
                    console.log("afdas");
                    var use = document.getElementsByTagName('use')[0];
                    if (Graph.scale > 1) {
                        Graph.scale--;
                    }
                    use.setAttribute('transform', 'translate(' + (-250 * (Graph.scale - 1)) + ',' + (-250 * (Graph.scale - 1)) + ') scale(' + Graph.scale + ')');
                } else if (e.which == 37) {

                    boxVal = box.split(" ");
                    boxVal[0] = parseFloat(boxVal[0]) + Graph.width; //10;//Graph.scale;
                    plot.setAttribute('viewBox', boxVal[0] + " " + boxVal[1] + " 500 500");
                    Graph.updateAxisVals(37);
                } else if (e.which == 38) {
                    boxVal = box.split(" ");
                    boxVal[1] = parseFloat(boxVal[1]) + Graph.width; //10;//Graph.scale;
                    plot.setAttribute('viewBox', boxVal[0] + " " + boxVal[1] + " 500 500");
                    Graph.updateAxisVals(38);
                    e.preventDefault();
                } else if (e.which == 39) {
                    boxVal = box.split(" ");
                    boxVal[0] = parseFloat(boxVal[0]) - Graph.width; //10;//Graph.scale;
                    plot.setAttribute('viewBox', boxVal[0] + " " + boxVal[1] + " 500 500");
                    Graph.updateAxisVals(39);

                } else if (e.which == 40) {
                    boxVal = box.split(" ");
                    boxVal[1] = parseFloat(boxVal[1]) - Graph.width; //10;//Graph.scale;
                    plot.setAttribute('viewBox', boxVal[0] + " " + boxVal[1] + " 500 500");
                    Graph.updateAxisVals(40);
                    e.preventDefault();
                }


            }
        });

    },
    clearGraph: function() {
        var clearAxis = document.getElementById("axis");
        while (clearAxis.firstChild) {
            clearAxis.removeChild(clearAxis.firstChild);
        }

        var clearAxis = document.getElementById('graphContents');
        while (clearAxis.firstChild) {
            clearAxis.removeChild(clearAxis.firstChild);
        }
    },
    drawGraphAxis: function() {
        // var graphs = document.getElementsByTagName('svg')[0];
        // var svgWidth = parseInt($('#graphContainer').width());
        // var svgHeight = parseInt($('#graphContainer').height());
        // graphs.setAttribute('viewBox','0 0 '+svgHeight+' '+svgWidth);
        var svgWidth = 500;
        var svgHeight = 500;
        var use = document.getElementsByTagName('use')[0];
        use.setAttribute('transform', 'translate(0,0) scale(1)');
        var plot = document.getElementsByTagName('symbol')[1];
        var box = plot.setAttribute('viewBox', '0 0 500 500');
        var axisLines = document.getElementById('axis');
        //Graph.minX = parseInt($('#minGraphX').val());
        //Graph.maxX = parseInt($('#maxGraphX').val());
        //var widthSpace = parseFloat(((svgWidth-20)/(Math.abs(Graph.maxX) + Math.abs(Graph.minX) +1)).toFixed(2));
        //console.log(widthSpace);
        this.width = 460 / Math.abs(parseInt($('#minX').val()) - parseInt($('#maxX').val()));

        x = parseInt($('#minX').val());
        var i = 20;
        for (j = parseInt($('#minX').val()); j <= parseInt($('#maxX').val()); j++) {
            //for(var i = 20; i<= svgWidth-20; i+=this.width){

            var vertical = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            vertical.setAttribute('d', 'M' + i + ' 20 v' + (svgHeight - 40));
            if (x != 0) {
                vertical.setAttribute('stroke-width', '.5');
            } else {
                vertical.setAttribute('stroke-width', '1');
                vertical.setAttribute('id', 'yAxisLine');
                vertical.setAttribute('stroke', 'black');

            }

            axisLines.appendChild(vertical);
            //set values
            var axisVal = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            var textNode = document.createTextNode(x);
            axisVal.setAttribute('x', i);
            axisVal.setAttribute('id', "x" + x)
            if ((Math.abs(x)) % 2 == 1) {
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
            x++;
            i += this.width;
        }
        console.log(i);
        this.width = 460 / Math.abs(parseInt($('#minY').val()) - parseInt($('#maxY').val()));
        x = parseInt($('#maxY').val());
        i = 20;
        for (j = parseInt($('#maxY').val()); j >= parseInt($('#minY').val()); j--) {
            //for(var i = 20; i<= svgWidth-20; i+=this.width){

            var horizontal = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            horizontal.setAttribute('d', 'M20 ' + i + ' h' + (svgHeight - 40));
            if (x != 0) {
                horizontal.setAttribute('stroke-width', '.5');
            } else {
                horizontal.setAttribute('stroke-width', '1');
                horizontal.setAttribute('id', 'xAxisLine');
                horizontal.setAttribute('stroke', 'black');
            }

            axisLines.appendChild(horizontal);
            //set values
            var axisVal = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            var textNode = document.createTextNode(x);
            axisVal.setAttribute('y', i + 3.5);
            axisVal.setAttribute('x', 17);
            axisVal.setAttribute('id', "y" + x)
            axisVal.setAttribute('font-size', '7pt');
            axisVal.setAttribute('font-weight', 'lighter');
            axisVal.setAttribute('text-anchor', 'end');
            axisVal.setAttribute('vector-effect', 'non-scaling-stroke');
            axisVal.appendChild(textNode);
            axisLines.appendChild(axisVal);
            x--;
            i += this.width;
        }

    },

    drawGraph: function() { //bug where window isn't filled...bug where asymptotes screw things up
        Graph.numGraphDrawn++;
        var svgWidth = 500;
        var svgHeight = 500;
        var stopDraw = false;
        var high = false;
        var low = false;
        var prevXVal = "";
        var prevYVal = "";
        this.resolution = parseInt($('#resolution').val());
        var graphContent = document.getElementById('graphContents');
        //Graph.minX = parseInt($('#minGraphX').val());
        //Graph.maxX = parseInt($('#maxGraphX').val());
        //var widthSpace = parseFloat(((svgWidth-20)/(Math.abs(Graph.maxX) + Math.abs(Graph.minX) +1)).toFixed(2));
        //console.log(widthSpace);
        var xVal = parseInt($('#minX').val()); //need object variable to keep up with xVal showing in graph
        //var yVal = Math.pow(xVal,2);
        var yVal = this.evaluateEquation(xVal);
        var prevY = 0;
        this.width = 460 / Math.abs(parseInt($('#minX').val()) - parseInt($('#maxX').val()));
        Graph.yAxisPosition = 20 + (-1 * this.width * (parseInt($('#minX').val())));
        this.width = 460 / Math.abs(parseInt($('#minY').val()) - parseInt($('#maxY').val()));
        Graph.xAxisPosition = 20 + (this.width * (parseInt($('#maxY').val())));
        if (isFinite(yVal)) {
            var path = "M20 " + (Graph.xAxisPosition - parseFloat(yVal * this.width)) + " ";
        } else {
            path = "M20 " + (Graph.xAxisPosition - parseFloat(parseInt($('#maxY').val()) * this.width) * 20) + " ";
        }
        for (var i = (20); i <= (svgWidth - 20); i += this.width) {
            for (var j = 1; j <= this.resolution; j++) {
                var image = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                //var yVal = Math.pow(xVal+(j/this.resolution),2);
                var yVal = this.evaluateEquation(xVal + (j / this.resolution));

                //new
                // var dummyVal = (250-parseFloat(yVal*this.width));
                // dummyVal = dummyVal.toString();
                // if(dummyVal.indexOf("e")>-1){
                //  var numZeros = parseInt(dummyVal.substring(dummyVal.indexOf("e")+1,dummyVal.length));
                //  dummyVal = dummyVal.substring(0,dummyVal.indexOf("e"));
                //  for(var k = 0; k < numZeros; k++){
                //      dummyVal = dummyVal + "0";
                //  }
                // }
                // path += "L"+(250+parseFloat((xVal+(j/this.resolution))*(this.width)))+" "+dummyVal+" ";
                // //end new
                if ((yVal <= parseInt($('#maxY').val())) && (yVal >= parseInt($('#minY').val())) && (isFinite(yVal))) {
                    if (high) {
                        high = false;
                        path += "M" + prevXVal + " " + prevYVal + " ";
                    }
                    if (low) {
                        low = false;
                        path += "M" + prevXVal + " " + prevYVal + " ";
                    }

                    path += "L" + (Graph.yAxisPosition + parseFloat((xVal + (j / this.resolution)) * (this.width))) + " " + (Graph.xAxisPosition - parseFloat(yVal * this.width)) + " ";

                } else {
                    if (yVal > parseInt($('#maxY').val()) && isFinite(yVal)) {
                        //path += "M"+(Graph.yAxisPosition+parseFloat((xVal+(j/this.resolution))*(this.width)))+" "+20+" ";
                        high = true;
                        prevXVal = Graph.yAxisPosition + parseFloat((xVal + (j / this.resolution)) * (this.width));
                        prevYVal = (Graph.xAxisPosition - parseFloat(yVal * this.width));
                    } else if (yVal < parseInt($('#minY').val()) && isFinite(yVal)) {
                        //path += "M"+(Graph.yAxisPosition+parseFloat((xVal+(j/this.resolution))*(this.width)))+" "+480+" ";
                        prevXVal = Graph.yAxisPosition + parseFloat((xVal + (j / this.resolution)) * (this.width));
                        prevYVal = (Graph.xAxisPosition - parseFloat(yVal * this.width));
                        low = true;
                    } else if (yVal == Infinity) {
                        // if(prevY > 0){
                        //  path += "L"+(Graph.yAxisPosition+parseFloat((xVal+(j/this.resolution))*(this.width)))+" "+(Graph.xAxisPosition-parseFloat(parseInt($('#maxY').val())*this.width)*20)+" ";
                        //  console.log("a");
                        // }
                        // else if(prevY < 0){
                        //  path += "L"+(Graph.yAxisPosition+parseFloat((xVal+(j/this.resolution))*(this.width)))+" "+(Graph.xAxisPosition-parseFloat((parseInt($('#minY').val())-(parseInt($('#minY').val())*20))*this.width))+" ";
                        //  console.log("b"+(Graph.xAxisPosition-parseFloat((parseInt($('#minY').val())-(parseInt($('#minY').val())*20))*this.width)));
                        // }
                    }

                }
                prevY = yVal;
            }

            xVal++;
        }
        image.setAttribute('d', path);
        image.setAttribute('stroke-width', '2');
        image.setAttribute('stroke', 'red');
        image.setAttribute('fill-opacity', 0);
        image.setAttribute('vector-effect', 'non-scaling-stroke');
        graphContent.appendChild(image);
        //console.log(i);
    },

    createEquation: function() {

        // Graph.equationString = $('#equationInput').val();
        // var equationPar = document.createElement("p");
        // var equationTextNode = document.createTextNode(Graph.equationString);
        // equationPar.appendChild(equationTextNode);
        //document.getElementById('equationList').appendChild(equationPar);

        var equationPar = document.createElement("p");
        var equationTextNode = document.createTextNode($('[name="function"]:checked').text());
        //console.log($('[name="function"]:checked').text());
        equationPar.appendChild(equationTextNode);
        var texNode = document.createTextNode(Graph.equationString + "</math>");
        document.getElementById('equationList').appendChild(texNode);
        MathJax.Hub.Queue(function() { document.getElementById('equationList').innerHTML = Graph.equationString + "</math>" });
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    },

    evaluateEquation: function(x) {
        //THIS IS TEMPORARY BASED ON SELECTION
        if ($('input:radio:checked').length > 0) {
            var $selected = $('[name="function"]:checked');
            if ($selected.attr('id') == 'x') {
                return x;
            } else if ($selected.attr('id') == 'xSquare') {
                return Math.pow(x, 2);
            } else if ($selected.attr('id') == 'xCube') {
                return Math.pow(x, 3);
            } else if ($selected.attr('id') == 'sin') {
                return Math.sin(x);
            } else if ($selected.attr('id') == 'cos') {
                return Math.cos(x);
            } else if ($selected.attr('id') == 'tan') {
                return Math.sin(x) / Math.cos(x);
            }
        }
        // }else{
        //  swal('Error', 'An equation must be selected.');
        //  return false;
        // }
        //console.log(parseFloat(eval(((Graph.equationToEval).replace("x",x)))).toFixed(3));
        return parseFloat(parseFloat(math.eval(((Graph.equationToEval).replace("x", "("+x+")")))).toFixed(3));

    },
    
    updateAxisVals: function(direct) {
        switch (direct) {
            case 37:
                // for(var i= parseInt($('#minX').val()); i<=parseInt($('#maxX').val()); i++){
                //  var curXVal = document.getElementById('x'+i);
                //  var curVal = parseFloat(curXVal.textContent);
                //  curVal+=parseInt(this.scale);
                //  console.log(curVal);
                //  curXVal.textContent = '';
                //  var newVal = document.createTextNode(curVal);
                //  curXVal.appendChild(newVal);
                // }
                var curVal = parseInt($('#minX').val());
                curVal++;
                document.getElementById('minX').value = curVal;
                var curVal = parseInt($('#maxX').val());
                curVal++;
                document.getElementById('maxX').value = curVal;

                break;
            case 38:
                // for(var i= parseInt($('#minX').val()); i<=parseInt($('#maxX').val()); i++){
                //  var curYVal = document.getElementById('y'+i);
                //  var curVal = parseFloat(curYVal.textContent);
                //  curVal-=parseInt(this.scale);
                //  console.log(curVal);
                //  curYVal.textContent = '';
                //  var newVal = document.createTextNode(curVal);
                //  curYVal.appendChild(newVal);
                // }
                var curVal = parseInt($('#minY').val());
                curVal--;
                document.getElementById('minY').value = curVal;
                var curVal = parseInt($('#maxY').val());
                curVal--;
                document.getElementById('maxY').value = curVal;
                break;
            case 39:
                // for(var i= parseInt($('#minX').val()); i<=parseInt($('#maxX').val()); i++){
                //  var curXVal = document.getElementById('x'+i);
                //  var curVal = parseFloat(curXVal.textContent);
                //  curVal-=parseInt(this.scale);
                //  console.log(curVal);
                //  curXVal.textContent = '';
                //  var newVal = document.createTextNode(curVal);
                //  curXVal.appendChild(newVal);

                // }
                var curVal = parseInt($('#minX').val());
                curVal--;
                document.getElementById('minX').value = curVal;
                var curVal = parseInt($('#maxX').val());
                curVal--;
                document.getElementById('maxX').value = curVal;
                break;
            case 40:
                // for(var i= parseInt($('#minX').val()); i<=parseInt($('#maxX').val()); i++){
                //  var curYVal = document.getElementById('y'+i);
                //  var curVal = parseFloat(curYVal.textContent);
                //  curVal+=parseInt(this.scale);
                //  console.log(curVal);
                //  curYVal.textContent = '';
                //  var newVal = document.createTextNode(curVal);
                //  curYVal.appendChild(newVal);
                // }
                var curVal = parseInt($('#minY').val());
                curVal++;
                document.getElementById('minY').value = curVal;
                var curVal = parseInt($('#maxY').val());
                curVal++;
                document.getElementById('maxY').value = curVal;
                break;
            default:
                console.log("Encountered an error updating Axis Values");


        }
        Graph.clearGraph();
        Graph.drawGraphAxis();
        if (Graph.numGraphDrawn > 0) {
            Graph.drawGraph();
        }

    }

}

$(document).ready(function() {
    Graph.init();
});
