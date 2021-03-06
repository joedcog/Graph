"use strict";
var Grapher = function(aobj) {
  
  //Functions-----------------------------------------------------------------------------------------------
  //Determine if a number is a float
  var i = 0,
    j = 0,
    k = 0,
    counter = 0; //so many for loops that I'll just declare this here

  var isFloat = function(n) {
    return n === +n && n !== (n | 0);
  };
  //Determine if a number is an integer
  var isInt = function(n) {
    return n === +n && n === (n | 0);
  };
  //pow() is used when evaluating equations and is never directly called
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
  //Simple factorial loop
  var factorial = function(n, step) {
    n = parseInt(n);
    var f = 1;
    if (n < 0) {
      n = n * -1;
    }
    for (i = n; i > 1; i = i - step) {
      f = f * i;
    }
    console.log(f);
    return f;
  };
  //Approximation for Gamma function at z
  //Checks if z is integer and then returns (z-1)! from the stored array of values or calculates it
  //Checks if z is float and takes advantage of special form Gamma(z/2)
  //If all else fails then integrate the gamma function from 0 to the first xValue where Gamma(xValue) < 0.00001
  var gamma = function(z) {
    var gammaEquation = "(x^(a-1))*(e^-x)";
    var equation, integralValue, a, b;
    var firstHundredFactVals = ["1", "2", "6", "24", "120", "720", "5040", "40320", "362880", "3628800", "39916800", "479001600", "6227020800", "87178291200", "1307674368000", "20922789888000", "355687428096000", "6402373705728000", "121645100408832000", "2432902008176640000", "51090942171709440000", "1124000727777607680000", "25852016738884976640000", "620448401733239439360000", "15511210043330985984000000", "403291461126605635584000000", "10888869450418352160768000000", "304888344611713860501504000000", "8841761993739701954543616000000", "265252859812191058636308480000000", "8222838654177922817725562880000000", "263130836933693530167218012160000000", "8683317618811886495518194401280000000", "295232799039604140847618609643520000000", "10333147966386144929666651337523200000000", "371993326789901217467999448150835200000000", "13763753091226345046315979581580902400000000", "523022617466601111760007224100074291200000000", "20397882081197443358640281739902897356800000000", "815915283247897734345611269596115894272000000000", "33452526613163807108170062053440751665152000000000", "1405006117752879898543142606244511569936384000000000", "60415263063373835637355132068513997507264512000000000", "2658271574788448768043625811014615890319638528000000000", "119622220865480194561963161495657715064383733760000000000", "5502622159812088949850305428800254892961651752960000000000", "258623241511168180642964355153611979969197632389120000000000", "12413915592536072670862289047373375038521486354677760000000000", "608281864034267560872252163321295376887552831379210240000000000", "30414093201713378043612608166064768844377641568960512000000000000", "1551118753287382280224243016469303211063259720016986112000000000000", "80658175170943878571660636856403766975289505440883277824000000000000", "4274883284060025564298013753389399649690343788366813724672000000000000", "230843697339241380472092742683027581083278564571807941132288000000000000", "12696403353658275925965100847566516959580321051449436762275840000000000000", "710998587804863451854045647463724949736497978881168458687447040000000000000", "40526919504877216755680601905432322134980384796226602145184481280000000000000", "2350561331282878571829474910515074683828862318181142924420699914240000000000000", "138683118545689835737939019720389406345902876772687432540821294940160000000000000", "8320987112741390144276341183223364380754172606361245952449277696409600000000000000", "507580213877224798800856812176625227226004528988036003099405939480985600000000000000", "31469973260387937525653122354950764088012280797258232192163168247821107200000000000000", "1982608315404440064116146708361898137544773690227268628106279599612729753600000000000000", "126886932185884164103433389335161480802865516174545192198801894375214704230400000000000000", "8247650592082470666723170306785496252186258551345437492922123134388955774976000000000000000", "544344939077443064003729240247842752644293064388798874532860126869671081148416000000000000000", "36471110918188685288249859096605464427167635314049524593701628500267962436943872000000000000000", "2480035542436830599600990418569171581047399201355367672371710738018221445712183296000000000000000", "171122452428141311372468338881272839092270544893520369393648040923257279754140647424000000000000000", "11978571669969891796072783721689098736458938142546425857555362864628009582789845319680000000000000000", "850478588567862317521167644239926010288584608120796235886430763388588680378079017697280000000000000000", "61234458376886086861524070385274672740778091784697328983823014963978384987221689274204160000000000000000", "4470115461512684340891257138125051110076800700282905015819080092370422104067183317016903680000000000000000", "330788544151938641225953028221253782145683251820934971170611926835411235700971565459250872320000000000000000", "24809140811395398091946477116594033660926243886570122837795894512655842677572867409443815424000000000000000000", "1885494701666050254987932260861146558230394535379329335672487982961844043495537923117729972224000000000000000000", "145183092028285869634070784086308284983740379224208358846781574688061991349156420080065207861248000000000000000000", "11324281178206297831457521158732046228731749579488251990048962825668835325234200766245086213177344000000000000000000", "894618213078297528685144171539831652069808216779571907213868063227837990693501860533361810841010176000000000000000000", "71569457046263802294811533723186532165584657342365752577109445058227039255480148842668944867280814080000000000000000000", "5797126020747367985879734231578109105412357244731625958745865049716390179693892056256184534249745940480000000000000000000", "475364333701284174842138206989404946643813294067993328617160934076743994734899148613007131808479167119360000000000000000000", "39455239697206586511897471180120610571436503407643446275224357528369751562996629334879591940103770870906880000000000000000000", "3314240134565353266999387579130131288000666286242049487118846032383059131291716864129885722968716753156177920000000000000000000", "281710411438055027694947944226061159480056634330574206405101912752560026159795933451040286452340924018275123200000000000000000000", "24227095383672732381765523203441259715284870552429381750838764496720162249742450276789464634901319465571660595200000000000000000000", "2107757298379527717213600518699389595229783738061356212322972511214654115727593174080683423236414793504734471782400000000000000000000", "185482642257398439114796845645546284380220968949399346684421580986889562184028199319100141244804501828416633516851200000000000000000000", "16507955160908461081216919262453619309839666236496541854913520707833171034378509739399912570787600662729080382999756800000000000000000000", "1485715964481761497309522733620825737885569961284688766942216863704985393094065876545992131370884059645617234469978112000000000000000000000", "135200152767840296255166568759495142147586866476906677791741734597153670771559994765685283954750449427751168336768008192000000000000000000000", "12438414054641307255475324325873553077577991715875414356840239582938137710983519518443046123837041347353107486982656753664000000000000000000000", "1156772507081641574759205162306240436214753229576413535186142281213246807121467315215203289516844845303838996289387078090752000000000000000000000", "108736615665674308027365285256786601004186803580182872307497374434045199869417927630229109214583415458560865651202385340530688000000000000000000000", "10329978488239059262599702099394727095397746340117372869212250571234293987594703124871765375385424468563282236864226607350415360000000000000000000000", "991677934870949689209571401541893801158183648651267795444376054838492222809091499987689476037000748982075094738965754305639874560000000000000000000000", "96192759682482119853328425949563698712343813919172976158104477319333745612481875498805879175589072651261284189679678167647067832320000000000000000000000", "9426890448883247745626185743057242473809693764078951663494238777294707070023223798882976159207729119823605850588608460429412647567360000000000000000000000", "933262154439441526816992388562667004907159682643816214685929638952175999932299156089414639761565182862536979208272237582511852109168640000000000000000000000", "93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000"];
    var firstHundredDoubleFactVals = ["1", "2", "3", "8", "15", "48", "105", "384", "945", "3840", "10395", "46080", "135135", "645120", "2027025", "10321920", "34459425", "185794560", "654729075", "3715891200", "13749310575", "81749606400", "316234143225", "1961990553600", "7905853580625", "51011754393600", "213458046676875", "1428329123020800", "6190283353629375", "42849873690624000", "191898783962510625", "1371195958099968000", "6332659870762850625", "46620662575398912000", "221643095476699771875", "1678343852714360832000", "8200794532637891559375", "63777066403145711616000", "319830986772877770815625", "2551082656125828464640000", "13113070457687988603440625", "107145471557284795514880000", "563862029680583509947946875", "4714400748520531002654720000", "25373791335626257947657609375", "216862434431944426122117120000", "1192568192774434123539907640625", "10409396852733332453861621760000", "58435841445947272053455474390625", "520469842636666622693081088000000", "2980227913743310874726229193921875", "27064431817106664380040216576000000", "157952079428395476360490147277859375", "1461479318123759876522171695104000000", "8687364368561751199826958100282265625", "81842841814930553085241614925824000000", "495179769008019818390136611716089140625", "4746884825265972078944013665697792000000", "29215606371473169285018060091249259296875", "284813089515958324736640819941867520000000", "1782151988659863326386101665566204817109375", "17658411549989416133671730836395786240000000", "112275575285571389562324404930670903477890625", "1130138339199322632554990773529330319360000000", "7297912393562140321551086320493608726062890625", "74589130387155293748629391052935801077760000000", "488960130368663401543922783473071784646213671875", "5072060866326559974906798591599634473287680000000", "33738248995437774706530672059641953140588743359375", "355044260642859198243475901411974413130137600000000", "2395415678676082004163677716234578672981800778515625", "25563186766285862273530264901662157745369907200000000", "174865344543353986303948473285124243127671456831640625", "1891675820705153808241239602722999673157373132800000000", "13114900840751548972796135496384318234575359262373046875", "143767362373591689426334209806947975159960358092800000000", "1009847364737869270905302433221592504062302663202724609375", "11213854265140151775254068364941942062476907931238400000000", "79777941814291672401518892224505807820921910393015244140625", "897108341211212142020325469195355364998152634499072000000000", "6462013286957625464523030270184970433494674741834234775390625", "73562883979319395645666688474019139929848516028923904000000000", "536347102817482913555411512425352545980058003572241486357421875", "6179282254262829234236001831817607754107275346429607936000000000", "45589503739486047652209978556154966408304930303640526340380859375", "531418273866603314144296157536314266853225679792946282496000000000", "3966286825335286145742268134385482077522528936416725791613134765625", "46764808100261091644698061863195655483083859821779272859648000000000", "352999527454840466971061863960307904899505075341088595453568994140625", "4208832729023498248022825567687608993477547383960134557368320000000000", "32122956998390482494366629620388019345854961856039062186274778466796875", "387212611070161838818099952227260027399934359324332379277885440000000000", "2987435000850314871976096554696085799164511452611632783323554397412109375", "36397985440595212848901395509362442575593829776487243652121231360000000000", "283806325080779912837729172696128150920628587998105114415737667754150390625", "3494206602297140433494533968898794487257007658542775390603638210560000000000", "27529213532835651545259729751524430639300973035816196098326553772152587890625", "342432247025119762482464328952081859751186750537191988279156544634880000000000", "2725392139750729502980713245400918633290796330545803413734328823443106201171875", "34243224702511976248246432895208185975118675053719198827915654463488000000000000"];
    if (isInt(z)) {
      if (z >= 2 && z <= 100) {
        return firstHundredFactVals[z - 2];
      } else if (z === 1 || z === 0 || z === -1) {
        return 1;
      } else {
        return factorial(z - 1, 1);
      }
    } else if (isFloat(z)) {
      if (z % 0.5 === 0) {
        var s = z * 2;
        if (s >= 3 && s <= 100) {
          return (firstHundredDoubleFactVals[s - 3] * Math.sqrt(Math.PI)) / Math.pow(2, (s - 1) / 2);
        } else if (s === 0 || s === 1 || s === 2 || s === -1) {
          return 1;
        } else {
          return (factorial(s - 2, 2) * Math.sqrt(Math.PI)) / Math.pow(2, (s - 1) / 2);
        }
      } else {



        equation = gammaEquation.replace("a", "(" + z + ")");
        integralValue = 0;
        b = 5;
        var xVal = b;
        var tempY = 0;
        a = 0;
        if (z > 1) {
          do {
            tempY = ((evaluateGammaEquation(equation, xVal) + evaluateGammaEquation(equation, xVal)));
            xVal++;
          } while (tempY > 0.00001);
        } else {
          integralValue = 0;
          b = 20;
          xVal = b;
          tempY = 0;
          a = 0;
          do {
            tempY = ((evaluateGammaEquation(equation, xVal) + evaluateGammaEquation(equation, xVal)));
            //console.log(tempY);
            xVal--;
          } while (tempY < 0.00001 && xVal > 1);
        }

        b = xVal;
        var size = 120;
        tempY = 0;
        var prevYVal = 0;
        if (z < 1) {
          size = size / (z);
        }
        for (i = 0; i < size * (b - a); i++) {
          if (xVal - (1 / size) < a) {
            tempY = ((evaluateGammaEquation(equation, xVal) + evaluateGammaEquation(equation, a)) * 0.5 * (1 / size));
          } else {
            tempY = ((evaluateGammaEquation(equation, xVal) + evaluateGammaEquation(equation, xVal - (1 / size))) * 0.5 * (1 / size));
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
              integralValue += parseFloat(evaluateGammaEquation(equation, xVal - (1 / (size * 100))) * (1 / size));
            }
          }
          xVal = xVal - (1 / size);
          prevYVal = tempY;
        }

        tempY = 0;
        prevYVal = 0;

        if (integralValue != "diverges" && !isNaN(integralValue)) {
          integralValue = parseFloat(integralValue.toFixed(3));
          if (integralValue.toString().length >= 20) {
            integralValue = integralValue.toExponential(3);
          }
        }
        return integralValue.toFixed(20).replace(/\.?0+$/, "");
      }

    } else {
      return null;
    }
  };
  //A slightly modified form of the evaluation function to allow for higher precision
  //Perhaps the other evaluate function should be the same and this should be removed
  var evaluateGammaEquation = function(equation, x) {
    x = x.toFixed(6);
    var a = eval(((equation).replace(new RegExp("x", 'g'), "(" + x + ")")));
    if (!isNaN(a)) {

      return parseFloat(parseFloat(eval(((equation).replace(new RegExp("x", 'g'), "(" + x + ")")))));
    } else {
      return NaN;
    }
  };
  //Estimate Beta function
  //Take advantage of Beta(a, b)= Gamma(a)*Gamma(b)/Gamma(a+b)
  var beta = function(z, zz) {
    return (gamma(z) * gamma(zz)) / gamma(z + zz);
  };
  var worker;
  var sumWork;
  //end Functions--------------------------------------------------------------------------------------------------
  //Object attributes----------------------------------------------------------------------------------------------
  //new structures
  if (aobj.graph !== "undefined") {
    this.graph = aobj.graph;
  } else {
    this.graph = '';
  }
  //------------------------------------------------------
  //aobj.render used to determine if rendered as canvas or as svg
  //possible values: canvas, svg
  if (aobj.render) {
    this.render = aobj.render;
  } else {
    this.render = "svg";
  }
  //aobj.type used to determine if left sum, right sum, integral, or area under the curve should be calculated and drawn
  //possible values: leftsum, rightsum, integral, areaUnderCurve
  if (aobj.type) {
    this.type = aobj.type;
  } else {
    this.type = "null";
  }
  //aobj.equation is the equation or array of equations to evaluate and render graphs
  //possible values: a valid function string, predefined function names
  //predefined names: f, studentt, normal, chi-square, arcsine, exponential

  if (typeof aobj.equation !== "undefined") {
    this.equation = aobj.equation;
  } else {
    if (this.type.toLowerCase() == 'cartesian' || this.type.toLowerCase() == 'leftsum' || this.type.toLowerCase() == 'rightsum' || this.type.toLowerCase() == 'integral' || !this.type) {
      throw ("You must submit an equation to evaluate.");
    } else {
      this.equation = '';
    }
  }
  if (aobj.graphClass) {
    this.graphClass = aobj.graphClass;
  } else {
    this.graphClass = false;
  }
  if (aobj.graphColor) {
    this.graphColor = aobj.graphColor;
  } else {
    this.graphColor = "#199C61";
  }
  if (aobj.rectColor) {
    this.rectColor = aobj.rectColor;
  } else {
    this.rectColor = "#AA0202";
  }
  if (aobj.shadeColor) {
    this.shadeColor = aobj.shadeColor;
  } else {
    this.shadeColor = "#ADD5C3";
  }
  if (typeof aobj.stdev !== "undefined") {
    this.stdev = aobj.stdev;
  } else {
    this.stdev = 1;
  }
  if (typeof aobj.mean !== "undefined") {
    this.mean = aobj.mean;
  } else {
    this.mean = 1;
  }
  if (typeof aobj.lambda !== "undefined") {
    this.lambda = aobj.lambda;
  } else {
    this.lambda = 1;
  }
  if (aobj.degreesOfFreedom) {
    this.degreesOfFreedom = aobj.degreesOfFreedom;
  } else {
    this.degreesOfFreedom = 1;
  }
  if (aobj.degreesOfFreedom2) {
    this.degreesOfFreedom2 = aobj.degreesOfFreedom2;
  } else {
    this.degreesOfFreedom2 = 1;
  }
  //aobj.showXAxisGrid determines if horizontal grid lines are drawn in the graph
  if (typeof aobj.showXAxisGrid !== "undefined") {
    if (aobj.showXAxisGrid.toLowerCase() === 'false' || aobj.showXAxisGrid === false) {
      this.showXAxisGrid = false;
    } else {
      this.showXAxisGrid = true;
    }
  } else {
    this.showXAxisGrid = true;
  }
  //aobj.showYAxisGrid determines if vertical grid lines are drawn in the graph
  if (typeof aobj.showYAxisGrid !== "undefined") {
    console.log(aobj.showYAxisGrid);
    if (aobj.showYAxisGrid.toLowerCase() === 'false' || aobj.showYAxisGrid === false) {
      this.showYAxisGrid = false;
    } else {
      this.showYAxisGrid = true;
    }
  } else {
    this.showYAxisGrid = true;
  }
  //aobj.labelPoints determines if points have text labels appearing in the graph
  if (typeof aobj.labelPoints !== "undefined") {
    this.labelPoints = aobj.labelPoints;
  } else {
    this.labelPoints = false;
  }
  if (typeof aobj.labelPointsOnGraph !== "undefined") {
    this.labelPointsOnGraph = aobj.labelPointsOnGraph;
  } else {
    this.labelPointsOnGraph = false;
  }
  //aobj.title is the title of a rendered svg... read by screenreaders
  if (aobj.title) {
    this.title = aobj.title;
  } else {
    this.title = "Cartesian Graph";
  }
  //aobj.desc is the description of a rendered svg... read by screenreaders
  if (aobj.desc) {
    this.desc = aobj.desc;
  } else {
    this.desc = "The graph of a function";
  }
  //aobj.drawAxis determines if the function to draw the axis is called at all
  //setting this to false will appear the same as setting showXAxisGrid and showYAxisGrid as false
  if (aobj.drawAxis === true || aobj.drawAxis === false) {
    this.drawAxis = aobj.drawAxis;
  } else {
    this.drawAxis = true;
  }
  //aobj.points is an array of points for example:
  //points: ['(0,1)', '(5,2)']
  if (aobj.points) {
    this.points = aobj.points;
  }
  //aobj.pointsOnGraph is an array of x values to draw points at, for example:
  //points: [1, 5, 2]
  if (aobj.pointsOnGraph) {
    this.pointsOnGraph = aobj.pointsOnGraph;
  }
  //aobj.pointRadius can be used to alter the size of dots drawn for points
  if (aobj.pointRadius) {
    this.pointRadius = aobj.pointRadius;
  } else {
    this.pointRadius = 3;
  }
  if (aobj.pointType) {
    this.pointType = aobj.pointType;
  } else {
    this.pointType = "closed";
  }
  if (aobj.pointOnGraphType) {
    this.pointOnGraphType = aobj.pointOnGraphType;
  } else {
    this.pointOnGraphType = "closed";
  }
  //aobj.minX is the lower bound on the x-axis of the window for the graph
  if (aobj.minX || aobj.minX === 0) {
    this.minX = aobj.minX;
  } else {
    this.minX = -10;
  }
  //aobj.maxX is the upper bound on the x-axis of the window for the graph
  if (aobj.maxX || aobj.maxX === 0) {
    this.maxX = aobj.maxX;
  } else {
    this.maxX = 10;
  }
  //aobj.minY is the lower bound on the y-axis of the window for the graph
  if (aobj.minY || aobj.minY === 0) {
    this.minY = aobj.minY;
  } else {
    this.minY = -10;
  }
  //aobj.maxY is the upper bound on the y-axis of the window for the graph
  if (aobj.maxY || aobj.maxY === 0) {
    this.maxY = aobj.maxY;
  } else {
    this.maxY = 10;
  }
  //aobj.id is the id of the element on the page where the graph will be appended
  //this value is also used to deterimine unique ids for the elements created
  if (aobj.id) {
    this.id = aobj.id;
  }
  //aobj.a is the lower bound or array of lower bounds on intervals of the domain of the graph
  //Using this value in combination with aobj.b and various types and shading options will render 
  //graphs with shaded regions or rectangles
  if (aobj.a || aobj.a === 0) {
    if (Array.isArray(aobj.a)) {
      this.a = [];
      for (i = 0; i < aobj.a.length; i++) {
        this.a[i] = parseFloat(aobj.a[i]);
      }
    } else {
      this.a = parseFloat(aobj.a);
    }
  } else {
    this.a = this.minX;
  }
  //aobj.b is the upper bound or array of upper bounds on intervals of the domain of the graph
  //Using this value in combination with aobj.a and various types and shading options will render 
  //graphs with shaded regions or rectangles
  if (aobj.b || aobj.b === 0) {
    if (Array.isArray(aobj.b)) {
      this.b = [];
      for (i = 0; i < aobj.b.length; i++) {
        this.b[i] = parseFloat(aobj.b[i]);
      }
    } else {
      this.b = parseFloat(aobj.b);
    }
  } else {
    this.b = this.a + 2;
  }
  //aobj.N determines the number of rectangles/intervals drawn/calculated for left and right sums
  if (aobj.N || aobj.N === 0) {
    this.N = parseFloat(aobj.N);
  } else {
    this.N = 4;
  }
  //aobj.imageWidth determines the width of the rendered image
  if (aobj.imageWidth || aobj.imageWidth === 0) {
    this.imageWidth = aobj.imageWidth;
  } else {
    this.imageWidth = 500;
  }
  //aobj.imageHeight determines the height of the rendered image
  if (aobj.imageHeight || aobj.imageHeight === 0) {
    this.imageHeight = aobj.imageHeight;
  } else {
    this.imageHeight = 500;
  }
  //aobj.sidePadding determines padding between the edge of the image and the boundaries of the graph itself
  //used to create room for surrounding text such as axis labels
  if (aobj.sidePadding || aobj.sidePadding === 0) {
    this.sidePadding = aobj.sidePadding;
  } else {
    this.sidePadding = 20;
  }
  //aobj.TopBottomPadding determines padding between the edge of the image and the boundaries of the graph itself
  //used to create room for surrounding text such as axis labels
  if (aobj.TopBottomPadding || aobj.TopBottomPadding === 0) {
    this.TopBottomPadding = aobj.TopBottomPadding;
  } else {
    this.TopBottomPadding = 20;
  }
  //aobj.xScale determines the scale for the x-axis
  //axis lines are drawn at this scale so if the window is from x = 0 to 1 and the scale is 0.1 then there will be ten lines
  if (aobj.xScale || aobj.xScale === 0) {
    this.xScale = aobj.xScale;
  } else {
    this.xScale = 1;
  }
  if (aobj.yScale || aobj.yScale === 0) {
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
    this.namedEquations();
    var figure, defs, clip, cliprect, figcap, svg, axisSym, axisG, graphG, use, graphsym, canvas;
    if (this.render == "svg") {
      figure = document.createElement('figure');
      figure.setAttribute('id', this.id + "figure");
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      clip = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
      cliprect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.setAttribute('viewBox', "0 0 " + this.imageWidth + " " + this.imageHeight);

      svg.setAttribute('width', this.imageWidth);
      svg.setAttribute('height', this.imageHeight);
      cliprect.setAttribute('x', 20);
      cliprect.setAttribute('y', 20);
      cliprect.setAttribute('width', parseFloat(this.imageWidth) - 40);
      cliprect.setAttribute('height', parseFloat(this.imageHeight) - 40);
      clip.appendChild(cliprect);
      defs.appendChild(clip);
      svg.appendChild(defs);
      axisSym = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
      axisSym.setAttribute('id', this.id + "AxisSymbol");

      axisG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      axisG.setAttribute('id', "axis" + this.id);
      axisG.setAttribute('stroke', "#999999");
      graphG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttribute('id', 'use' + this.id);
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#' + this.id + 'GraphContents');
      graphsym = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
      graphsym.setAttribute('id', this.id + 'GraphContents');
      graphsym.setAttribute('viewBox', "0 0 " + this.imageWidth + " " + this.imageHeight);
      graphsym.setAttribute('width', '100%');
      graphsym.setAttribute('height', '100%');
      graphG.appendChild(use);
      svg.appendChild(axisSym);
      svg.appendChild(axisG);
      svg.appendChild(graphG);
      svg.appendChild(graphsym);
      figure.appendChild(svg);

      if (this.type == 'integral' || this.type == 'leftsum' || this.type == 'rightsum' || this.type == 'areaUnderCurve') {
        figcap = document.createElement('figcaption');
        figcap.setAttribute('id', this.id + 'Sum');
        figure.appendChild(figcap);
      }

      document.getElementById(this.id).appendChild(figure);

      if (this.drawAxis) {
        this.drawGraphAxis();
      }

      if (Array.isArray(this.equation)) {
        for (i = 0; i < this.equation.length; i++) {
          this.drawGraph(this.equationToEval[i]);
          this.summations(this.equationToEval[i]);
        }
      } else {
        this.drawGraph(this.equationToEval);
        this.summations(this.equationToEval);
      }
    } else if (this.render == "canvas") {
      figure = document.createElement('figure');
      figure.setAttribute('id', this.id + "figure");
      canvas = document.createElement('canvas');
      canvas.setAttribute('id', this.id + "canvas");
      canvas.setAttribute('width', this.imageWidth);
      canvas.setAttribute('height', this.imageHeight);
      figure.appendChild(canvas);
      this.ctx = canvas.getContext("2d");
      if (this.type == 'integral' || this.type == 'leftsum' || this.type == 'rightsum' || this.type == 'areaUnderCurve') {
        figcap = document.createElement('figcaption');
        figcap.setAttribute('id', this.id + 'Sum');
        figure.appendChild(figcap);
      }

      document.getElementById(this.id).appendChild(figure);
      if (this.drawAxis) {
        this.canvasDrawGraphAxis();
      }
      if (Array.isArray(this.equation)) {
        for (i = 0; i < this.equation.length; i++) {
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
  this.namedEquations = function() {
    var degreesOfFreedom;
    var degreesOfFreedom2;
    var gammaVal;
    var betaVal;
    var mean;
    var stdev;
    var lambda;
    if (this.equation) {
      var splits;
      var firstPow;
      var secondPow;
      var temp;
      if (Array.isArray(this.equation)) {
        this.equationToEval = [];
        for (i = 0; i < this.equation.length; i++) {
          if (this.equation[i].toLowerCase() === "normal") {
            if (Array.isArray(this.stdev)) {
              stdev = parseFloat(this.stdev[i]);
            } else {
              stdev = parseFloat(this.stdev);
            }


            if (Array.isArray(this.mean)) {
              mean = parseFloat(this.mean[i]);
            } else {
              mean = parseFloat(this.mean);
            }

            this.equationToEval.push('(1 / sqrt(2 * o^2 * pi) * e^(-1 * ((x - u)^2) / (2 * o^2)))');
            this.equationToEval[i] = this.equationToEval[i].replace(new RegExp("o", 'g'), "(" + stdev + ")");
            this.equationToEval[i] = this.equationToEval[i].replace(new RegExp("u", 'g'), "(" + mean + ")");
          } else if (this.equation[i].toLowerCase() === "arcsine") {
            this.equationToEval.push('1/(pi*sqrt(x(1-x)))');
          } else if (this.equation[i].toLowerCase() == "exponential") {

            if (Array.isArray(this.lambda)) {
              lambda = parseFloat(this.lambda[i]);
            } else {
              lambda = parseFloat(this.lambda);
            }


            this.equationToEval.push('(lambda * e ^ (-lambdax))');
            this.equationToEval[i] = this.equationToEval[i].replace(new RegExp("lambda", 'g'), "(" + lambda + ")");
          } else if (this.equation[i].toLowerCase() == "chi-square") {

            if (Array.isArray(this.degreesOfFreedom)) {
              degreesOfFreedom = parseFloat(this.degreesOfFreedom[i]);
            } else {
              degreesOfFreedom = parseFloat(this.degreesOfFreedom);
            }

            gammaVal = gamma(degreesOfFreedom / 2);
            this.equationToEval.push('((x^((k/2)-1))*(e^(-x/2)))/((2^(k/2))*' + gammaVal + ')');
            this.equationToEval[i] = this.equationToEval[i].replace(new RegExp("\k", 'g'), "(" + degreesOfFreedom + ")");
          } else if (this.equation[i].toLowerCase() == "f") {

            if (Array.isArray(this.degreesOfFreedom)) {
              degreesOfFreedom = parseFloat(this.degreesOfFreedom[i]);
            } else {
              degreesOfFreedom = parseFloat(this.degreesOfFreedom);
            }


            if (Array.isArray(this.degreesOfFreedom2)) {
              degreesOfFreedom2 = parseFloat(this.degreesOfFreedom2[i]);
            } else {
              degreesOfFreedom2 = parseFloat(this.degreesOfFreedom2);
            }

            betaVal = beta(degreesOfFreedom / 2, degreesOfFreedom2 / 2);
            //this.equationToEval.push('(sqrt((((ax)^(a))*(b^b))/((ax+b)^(a+b))))/(x*' + betaVal + ')');
            this.equationToEval.push('(((a/b)^(a/2))*(x^((a/2)-1))*((1+((a/b)*x))^((-a-b)/2)))/' + betaVal);
            this.equationToEval[i] = this.equationToEval[i].replace(new RegExp("a", 'g'), "(" + degreesOfFreedom + ")");
            this.equationToEval[i] = this.equationToEval[i].replace(new RegExp("b", 'g'), "(" + degreesOfFreedom2 + ")");
          } else if (this.equation[i].toLowerCase() == "studentt") {

            if (Array.isArray(this.degreesOfFreedom)) {
              degreesOfFreedom = parseFloat(this.degreesOfFreedom[i]);
            } else {
              degreesOfFreedom = parseFloat(this.degreesOfFreedom);
            }

            gammaVal = gamma((degreesOfFreedom + 1) / 2);
            this.equationToEval.push('(' + gammaVal + '/(sqrt(k*Math.PI)*' + gamma(degreesOfFreedom / 2) + '))*((1+((x^2)/k))^(-1*(k+1)/2))');
            this.equationToEval[i] = this.equationToEval[i].replace(new RegExp("\k", 'g'), "(" + degreesOfFreedom + ")");

          } else {
            this.equationToEval.push(this.equation[i]);
          }
          this.equationToEval[i] = this.equationToEval[i].replace(/\s+/g, "");
          counter = 0;
          splits = this.equationToEval[i].split(/\^(.+)/);


          while (splits.length > 1) {

            if (splits[0].charAt(splits[0].length - 1) == ')') {
              for (k = splits[0].length - 1; k >= 0; k--) {
                if (splits[0].charAt(k) == '(') {
                  counter--;
                } else if (splits[0].charAt(k) == ')') {
                  counter++;
                }
                if (counter === 0) {
                  firstPow = (splits[0].substring(k, splits[0].length));
                  break;
                }
              }
            } else {
              firstPow = (splits[0].charAt(splits[0].length - 1));
            }

            if (splits[1].charAt(0) == '(') {
              for (k = 0; k < splits[1].length; k++) {
                if (splits[1].charAt(k) == '(') {
                  counter++;
                } else if (splits[1].charAt(k) == ')') {
                  counter--;
                }
                if (counter === 0) {
                  secondPow = (splits[1].substring(0, k + 1));
                  break;
                }

              }
            } else {
              secondPow = (splits[1].charAt(0));
            }


            temp = firstPow + "^" + secondPow;


            this.equationToEval[i] = this.equationToEval[i].replace(temp, "pow(" + firstPow + "," + secondPow + ")");

            splits = this.equationToEval[i].split(/\^(.+)/);

          }
          this.equationToEval[i] = this.equationToEval[i].replace(/([\d\.]{0,}\d+(?=[a-zA-Z]))/g, "$1*");
          this.equationToEval[i] = this.equationToEval[i].replace(/(\)(?=\())/g, "$1*");
          //this.equationToEval[i] = this.equationToEval[i].replace(/(\^)/g, "**");
          this.equationToEval[i] = this.equationToEval[i].replace(/(\)(?=\d))/g, "$1*");
          this.equationToEval[i] = this.equationToEval[i].replace(/(\)(?=[a-zA-Z]))/g, "$1*");
          this.equationToEval[i] = this.equationToEval[i].replace(/(\d(?=\())/g, "$1*");
          this.equationToEval[i] = this.equationToEval[i].replace(/((x)(?=\())/g, "$1*");
          this.equationToEval[i] = this.equationToEval[i].replace(/(asin)/gi, "Math.asin");
          this.equationToEval[i] = this.equationToEval[i].replace(/(acos)/gi, "Math.acos");
          this.equationToEval[i] = this.equationToEval[i].replace(/(atan)/gi, "Math.atan");
          this.equationToEval[i] = this.equationToEval[i].replace(/(sin)/gi, "Math.sin");
          this.equationToEval[i] = this.equationToEval[i].replace(/(cos)/gi, "Math.cos");
          this.equationToEval[i] = this.equationToEval[i].replace(/(tan)/gi, "Math.tan");
          this.equationToEval[i] = this.equationToEval[i].replace(/(e)/gi, "Math.E");
          this.equationToEval[i] = this.equationToEval[i].replace(/(pi)/gi, "Math.PI");
          this.equationToEval[i] = this.equationToEval[i].replace(/(sqrt)/gi, "Math.sqrt");
          this.equationToEval[i] = this.equationToEval[i].replace(/(ln)/gi, "Math.log");
          this.equationToEval[i] = this.equationToEval[i].replace(/(log)/gi, "Math.log10");
          this.equationToEval[i] = this.equationToEval[i].replace(/(abs)/g, "Math.abs");


        }
      } else {
        if (this.equation.toLowerCase() === "normal") {
          this.equationToEval = '(1 / sqrt(2 * o^2 * pi) * e^(-1 * ((x - u)^2) / (2 * o^2)))';
          this.equationToEval = this.equationToEval.replace(new RegExp("o", 'g'), "(" + this.stdev + ")");
          this.equationToEval = this.equationToEval.replace(new RegExp("u", 'g'), "(" + this.mean + ")");
        } else if (this.equation.toLowerCase() === "arcsine") {
          this.equationToEval = '1/(pi*sqrt(x(1-x)))';
        } else if (this.equation.toLowerCase() == "exponential") {

          this.equationToEval = '(lambda * e ^ (-lambdax))';
          this.equationToEval = this.equationToEval.replace(new RegExp("lambda", 'g'), "(" + this.lambda + ")");
        } else if (this.equation.toLowerCase() == "chi-square") {

          degreesOfFreedom = parseFloat(this.degreesOfFreedom);

          gammaVal = gamma(degreesOfFreedom / 2);
          this.equationToEval = '((x^((k/2)-1))*(e^(-x/2)))/((2^(k/2))*' + gammaVal + ')';
          this.equationToEval = this.equationToEval.replace(new RegExp("\k", 'g'), "(" + degreesOfFreedom + ")");
        } else if (this.equation.toLowerCase() == "f") {

          degreesOfFreedom = parseFloat(this.degreesOfFreedom);


          degreesOfFreedom2 = parseFloat(this.degreesOfFreedom2);

          betaVal = beta(degreesOfFreedom / 2, degreesOfFreedom2 / 2);
          this.equationToEval = '(((a/b)^(a/2))*(x^((a/2)-1))*((1+((a/b)*x))^((-a-b)/2)))/' + betaVal;
          this.equationToEval = this.equationToEval.replace(new RegExp("a", 'g'), "(" + degreesOfFreedom + ")");
          this.equationToEval = this.equationToEval.replace(new RegExp("b", 'g'), "(" + degreesOfFreedom2 + ")");
        } else if (this.equation.toLowerCase() == "studentt") {

          degreesOfFreedom = parseFloat(this.degreesOfFreedom);

          gammaVal = gamma((degreesOfFreedom + 1) / 2);
          this.equationToEval = '(' + gammaVal + '/(sqrt(k*' + Math.PI + ')*' + gamma(degreesOfFreedom / 2) + '))*((1+((x^2)/k))^(-1*(k+1)/2))';
          this.equationToEval = this.equationToEval.replace(new RegExp("\k", 'g'), "(" + degreesOfFreedom + ")");

        } else {
          this.equationToEval = this.equation;
        }
        this.equationToEval = this.equationToEval.replace(/\s+/g, "");
        counter = 0;
        splits = this.equationToEval.split(/\^(.+)/);


        while (splits.length > 1) {

          if (splits[0].charAt(splits[0].length - 1) == ')') {
            for (k = splits[0].length - 1; k >= 0; k--) {
              if (splits[0].charAt(k) == '(') {
                counter--;
              } else if (splits[0].charAt(k) == ')') {
                counter++;
              }
              if (counter === 0) {
                firstPow = (splits[0].substring(k, splits[0].length));
                break;
              }
            }
          } else {
            firstPow = (splits[0].charAt(splits[0].length - 1));
          }

          if (splits[1].charAt(0) == '(') {
            for (k = 0; k < splits[1].length; k++) {
              if (splits[1].charAt(k) == '(') {
                counter++;
              } else if (splits[1].charAt(k) == ')') {
                counter--;
              }
              if (counter === 0) {
                secondPow = (splits[1].substring(0, k + 1));
                break;
              }

            }
          } else {
            secondPow = (splits[1].charAt(0));
          }

          temp = firstPow + "^" + secondPow;

          this.equationToEval = this.equationToEval.replace(temp, "pow(" + firstPow + "," + secondPow + ")");

          splits = this.equationToEval.split(/\^(.+)/);

        }

        this.equationToEval = this.equationToEval.replace(/([\d\.]{0,}\d+(?=[a-zA-Z]))/g, "$1*");
        this.equationToEval = this.equationToEval.replace(/(\)(?=\())/g, "$1*");
        //this.equationToEval = this.equationToEval.replace(/(\^)/g, "**");
        this.equationToEval = this.equationToEval.replace(/(\)(?=[a-zA-Z]))/g, "$1*");
        this.equationToEval = this.equationToEval.replace(/(\)(?=\d))/g, "$1*");
        this.equationToEval = this.equationToEval.replace(/(\d(?=\())/g, "$1*");
        this.equationToEval = this.equationToEval.replace(/((x)(?=\())/g, "$1*");
        this.equationToEval = this.equationToEval.replace(/(asin)/gi, "Math.asin");
        this.equationToEval = this.equationToEval.replace(/(acos)/gi, "Math.acos");
        this.equationToEval = this.equationToEval.replace(/(atan)/gi, "Math.atan");
        this.equationToEval = this.equationToEval.replace(/(sin)/gi, "Math.sin");
        this.equationToEval = this.equationToEval.replace(/(cos)/gi, "Math.cos");
        this.equationToEval = this.equationToEval.replace(/(tan)/gi, "Math.tan");
        this.equationToEval = this.equationToEval.replace(/(e)/gi, "Math.E");
        this.equationToEval = this.equationToEval.replace(/(pi)/gi, "Math.PI");
        this.equationToEval = this.equationToEval.replace(/(sqrt)/gi, "Math.sqrt");
        this.equationToEval = this.equationToEval.replace(/(ln)/gi, "Math.log");
        this.equationToEval = this.equationToEval.replace(/(log)/gi, "Math.log10");
        this.equationToEval = this.equationToEval.replace(/(abs)/g, "Math.abs");


      }

    } else {
      this.equationToEval = '';
    }

  };

  this.clearGraph = function() {
    if (this.render.toLowerCase() != 'svg') {
      this.ctx.clearRect(0, 0, 500, 500);
      this.canvasDrawGraphAxis();
    } else {
      var clearAxis = document.getElementById(this.id + 'GraphContents');
      var clearPoint = document.getElementById('pointsContainer' + this.id);
      var clearGraphPoint = document.getElementById('pointsOnGraphContainer' + this.id);
      if (clearAxis) {
        while (clearAxis.firstChild) {
          clearAxis.removeChild(clearAxis.firstChild);

        }
      }
      if (clearPoint) {
        while (clearPoint.firstChild) {
          clearPoint.removeChild(clearPoint.firstChild);
        }
      }
      if (clearGraphPoint) {
        while (clearGraphPoint.firstChild) {
          clearGraphPoint.removeChild(clearGraphPoint.firstChild);
        }
      }
    }
  };
  this.redrawGraph = function() {
    this.clearGraph();
    this.namedEquations();
    if (Array.isArray(this.equation)) {
      for (i = 0; i < this.equation.length; i++) {
        this.drawGraph(this.equationToEval[i]);
        this.summations(this.equationToEval[i]);
      }
    } else {
      this.drawGraph(this.equationToEval);
      this.summations(this.equationToEval);
    }
  };
  this.drawGraphAxis = function() {


    var use = document.getElementById('use' + this.id);

    use.setAttribute('transform', 'translate(0,0) scale(1)');
    var plot = document.getElementById(this.id + 'GraphContents');
    plot.setAttribute('viewBox', '0 0 ' + this.imageWidth + ' ' + this.imageHeight);
    var axisLines = document.getElementById('axis' + this.id);

    this.widthx = (this.imageWidth - 2 * this.sidePadding) / (Math.abs(this.minX - this.maxX) / this.xScale);
    var vertical;

    var axisVal;
    var textNode;

    var x = this.minX;
    i = this.sidePadding;
    if (this.showYAxisGrid) {
      for (j = this.minX; j <= this.maxX; j += this.xScale) {


        vertical = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        vertical.setAttribute('d', 'M' + i + ' 20 v' + (this.imageHeight - 2 * this.TopBottomPadding));
        if (parseFloat(x.toFixed(6)) !== 0) {
          vertical.setAttribute('stroke-width', '.5');
        } else {
          vertical.setAttribute('stroke-width', '1');
          vertical.setAttribute('id', 'yAxisLine');
          vertical.setAttribute('stroke', 'black');
        }

        axisLines.appendChild(vertical);

        //set values
        if (x == this.minX || x == this.maxX || parseFloat(x.toFixed(6)) === 0) {
          axisVal = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          x = parseFloat(x.toFixed(6));
          textNode = document.createTextNode(x);

          axisVal.setAttribute('x', i);
          axisVal.setAttribute('id', "x" + x);

          if ((Math.abs(x)) % 2 === 0) {
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

    this.widthy = (this.imageHeight - 2 * this.TopBottomPadding) / (Math.abs(this.minY - this.maxY) / this.yScale);
    x = this.maxY;
    i = this.TopBottomPadding;

    var horizontal;
    if (this.showXAxisGrid) {
      for (j = this.maxY; j >= this.minY; j -= this.yScale) {


        horizontal = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        horizontal.setAttribute('d', 'M20 ' + i + ' h' + (this.imageWidth - 2 * this.sidePadding));

        if (parseFloat(x.toFixed(6)) !== 0) {
          horizontal.setAttribute('stroke-width', '.5');
        } else {
          horizontal.setAttribute('stroke-width', '1');
          horizontal.setAttribute('id', 'xAxisLine');
          horizontal.setAttribute('stroke', 'black');
        }

        axisLines.appendChild(horizontal);

        //set values
        if (x == this.minY || x == this.maxY || parseFloat(x.toFixed(6)) === 0) {
          x = parseFloat(x.toFixed(6));
          axisVal = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          textNode = document.createTextNode(x);

          axisVal.setAttribute('y', i + 3.5);
          axisVal.setAttribute('x', 17);
          axisVal.setAttribute('id', "y" + x);
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

    this.widthx = (this.imageWidth - 2 * this.sidePadding) / (Math.abs(this.minX - this.maxX) / this.xScale);
    var vertical;
    var ctx = this.ctx;


    var x = this.minX;
    var y = 0;
    i = this.sidePadding;
    if (this.showYAxisGrid) {
      for (j = this.minX; j <= this.maxX; j += this.xScale) {
        vertical = "";
        ctx.beginPath();
        ctx.moveTo(i, 20);
        ctx.lineTo(i, (this.imageHeight - this.TopBottomPadding));
        //vertical.setAttribute('d', 'M' + i + ' 20 v' + (this.imageHeight - 2 * this.TopBottomPadding));
        if (parseFloat(x.toFixed(6)) !== 0) {
          ctx.strokeStyle = "rgba(153, 153, 153, 0.5)";

        } else {
          ctx.strokeStyle = "black";
        }




        //set values
        if (x == this.minX || x == this.maxX || parseFloat(x.toFixed(6)) === 0) {
          x = parseFloat(x.toFixed(6));
          if ((Math.abs(x)) % 2 === 0) {
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

    this.widthy = (this.imageWidth - 2 * this.sidePadding) / (Math.abs(this.minY - this.maxY) / this.yScale);
    x = this.maxY;
    i = this.sidePadding;

    var horizontal;
    if (this.showXAxisGrid) {
      for (j = this.maxY; j >= this.minY; j -= this.yScale) {
        horizontal = "";
        ctx.beginPath();
        ctx.moveTo(20, i);
        ctx.lineTo((this.imageHeight - this.sidePadding), i);

        //horizontal.setAttribute('d', 'M20 ' + i + ' h' + (this.imageHeight - 2 * this.sidePadding));

        if (parseFloat(x.toFixed(6)) !== 0) {
          ctx.strokeStyle = "rgba(153, 153, 153, 0.5)";
        } else {
          ctx.strokeStyle = "black";
        }


        //set values
        if (x == this.minY || x == this.maxY || parseFloat(x.toFixed(6)) === 0) {
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


  this.drawGraph = function(equation) {
    var graphContent = document.getElementById(this.id + 'GraphContents');
    var gr = this;

    var ctx = gr.ctx;
    var pointsContainer, image, image2, image3, image4, image5, image6, titleImage5, textNode, textNode2;
    if (gr.render == "svg") {
      if (typeof worker === "object" && !Array.isArray(gr.equation)) {
        worker.terminate();
      }
      worker = new Worker('GraphWorker.js');
      worker.addEventListener('message', function(e) {
        if (e.data.error) {
          //$('#popup #message').empty().append(e.data.error);
        } else if (e.data.msg) {
          //$('#popup #stage').empty().append(e.data.msg);
        } else {
          if (e.data.shade) {
            if (Array.isArray(e.data.shade)) {
              for (i = 0; i < e.data.shade.length; i++) {
                image4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                image4.setAttribute('d', e.data.shade[i]);
                image4.setAttribute('stroke-width', '2');
                //image4.setAttribute('stroke', 'black');
                image4.setAttribute('fill-opacity', 0.5);
                image4.setAttribute('fill', gr.shadeColor);
                image4.setAttribute('vector-effect', 'non-scaling-stroke');
                graphContent.appendChild(image4);
              }
            } else {
              image4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
              image4.setAttribute('d', e.data.shade);
              image4.setAttribute('stroke-width', '2');
              //image4.setAttribute('stroke', 'black');
              image4.setAttribute('fill-opacity', 0.5);
              image4.setAttribute('fill', gr.shadeColor);
              //image4.setAttribute('vector-effect', 'non-scaling-stroke');
              graphContent.appendChild(image4);
            }
          }
          if (e.data.rect1) {
            image2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            image2.setAttribute('d', e.data.rect1);
            image2.setAttribute('stroke-width', '2');
            image2.setAttribute('stroke', gr.rectColor);
            image2.setAttribute('fill-opacity', 0);
            //image2.setAttribute('vector-effect', 'non-scaling-stroke');
            graphContent.appendChild(image2);
          }
          if (e.data.rect2) {
            image3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            image3.setAttribute('d', e.data.rect2);
            image3.setAttribute('stroke-width', '2');
            image3.setAttribute('stroke', gr.rectColor);
            image3.setAttribute('fill-opacity', 0);
            //image3.setAttribute('vector-effect', 'non-scaling-stroke');

            graphContent.appendChild(image3);
          }
          if (e.data.Main) {
            image = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            image.setAttribute('d', e.data.Main);
            image.setAttribute('stroke-width', '2');
            image.setAttribute('stroke', gr.graphColor);
            image.setAttribute('fill-opacity', 0);
            if (gr.graphClass) {
              image.setAttribute('class', gr.graphClass);
            }
            //image.setAttribute('vector-effect', 'non-scaling-stroke');

            graphContent.appendChild(image);
          }


          if (e.data.pcx) {
            pointsContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            pointsContainer.setAttribute('id', 'pointsContainer' + gr.id);
            for (i = 0; i < e.data.pcx.length; i++) {
              if (e.data.pcx[i] && e.data.pcy[i] && e.data.plabels[i]) {
                image5 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                image5.setAttribute('cx', e.data.pcx[i]);
                image5.setAttribute('cy', e.data.pcy[i]);
                image5.setAttribute('r', gr.pointRadius);
                image5.setAttribute('stroke-width', '2');
                image5.setAttribute('stroke', gr.graphColor);
                if (Array.isArray(gr.pointType)) {
                  if (gr.pointType[i] == 'open') {
                    image5.setAttribute('fill', 'white');
                  } else {
                    image5.setAttribute('fill', gr.graphColor);
                  }
                } else {
                  if (gr.pointType == 'open') {
                    image5.setAttribute('fill', 'white');
                  } else {
                    image5.setAttribute('fill', gr.graphColor);
                  }
                }

                titleImage5 = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                textNode = document.createTextNode(e.data.plabels[i]);
                titleImage5.appendChild(textNode);
                image5.appendChild(titleImage5);
                pointsContainer.appendChild(image5);

                if (gr.labelPoints) {
                  if (Array.isArray(gr.labelPoints)) {
                    if (gr.labelPoints[i]) {
                      textNode2 = document.createTextNode(e.data.plabels[i]);
                      image6 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                      image6.setAttribute('x', parseFloat(e.data.pcx[i]) + parseFloat(gr.pointRadius) + 5);
                      image6.setAttribute('y', parseFloat(e.data.pcy[i]) + parseFloat(gr.pointRadius));
                      image6.appendChild(textNode2);
                      pointsContainer.appendChild(image6);
                    }
                  } else {
                    if (gr.labelPoints) {
                      textNode2 = document.createTextNode(e.data.plabels[i]);
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
          if (e.data.pcgx) {
            pointsContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            pointsContainer.setAttribute('id', 'pointsOnGraphContainer' + gr.id);
            for (i = 0; i < e.data.pcgx.length; i++) {
              if (e.data.pcgx[i] && e.data.pcgy[i] && e.data.pglabels[i]) {
                image5 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                image5.setAttribute('cx', e.data.pcgx[i]);
                image5.setAttribute('cy', e.data.pcgy[i]);
                image5.setAttribute('r', gr.pointRadius);
                image5.setAttribute('stroke-width', '2');
                image5.setAttribute('stroke', gr.graphColor);
                if (Array.isArray(gr.pointOnGraphType)) {
                  if (gr.pointOnGraphType[i] == 'open') {
                    image5.setAttribute('fill', 'white');
                  } else {
                    image5.setAttribute('fill', gr.graphColor);
                  }
                } else {
                  if (gr.pointOnGraphType == 'open') {
                    image5.setAttribute('fill', 'white');
                  } else {
                    image5.setAttribute('fill', gr.graphColor);
                  }
                }

                titleImage5 = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                textNode = document.createTextNode(e.data.pglabels[i]);
                titleImage5.appendChild(textNode);
                image5.appendChild(titleImage5);
                pointsContainer.appendChild(image5);

                if (gr.labelPointsOnGraph) {
                  if (Array.isArray(gr.labelPointsOnGraph)) {
                    if (gr.labelPointsOnGraph[i]) {
                      textNode2 = document.createTextNode(e.data.pglabels[i]);
                      image6 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                      image6.setAttribute('x', parseFloat(e.data.pcgx[i]) + parseFloat(gr.pointRadius) + 5);
                      image6.setAttribute('y', parseFloat(e.data.pcgy[i]) + parseFloat(gr.pointRadius));
                      image6.appendChild(textNode2);
                      pointsContainer.appendChild(image6);
                    }
                  } else {
                    if (gr.labelPointsOnGraph) {
                      textNode2 = document.createTextNode(e.data.pglabels[i]);
                      image6 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                      image6.setAttribute('x', parseFloat(e.data.pcgx[i]) + parseFloat(gr.pointRadius) + 5);
                      image6.setAttribute('y', parseFloat(e.data.pcgy[i]) + parseFloat(gr.pointRadius));
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
      worker.postMessage({ 'points': gr.points, 'pointsOnGraph': gr.pointsOnGraph, 'widthx': gr.widthx, 'widthy': gr.widthy, 'xScale': gr.xScale, 'yScale': gr.yScale, 'imageWidth': gr.imageWidth, 'imageHeight': gr.imageHeight, 'sidePadding': gr.sidePadding, 'TopBottomPadding': gr.TopBottomPadding, 'type': gr.type, 'equationToEval': equation, 'tinyX': gr.minX, 'largeX': gr.maxX, 'tinyY': gr.minY, 'largeY': gr.maxY, 'N': gr.N, 'a': gr.a, 'b': gr.b, 'shadeToX': gr.shadeToX });
    } else if (gr.render == "canvas") {
      if (typeof worker === "object" && !Array.isArray(gr.equation)) {
        worker.terminate();
      }
      worker = new Worker('CanvasGraphWorker.js');
      worker.addEventListener('message', function(e) {
        if (e.data.error) {
          //$('#popup #message').empty().append(e.data.error);
        } else if (e.data.msg) {
          //$('#popup #stage').empty().append(e.data.msg);
        } else {
          if (e.data.rect1) {
            ctx.strokeStyle = gr.rectColor;
            ctx.lineWidth = 2;
            eval(e.data.rect1);
          }
          if (e.data.rect2) {
            ctx.strokeStyle = gr.rectColor;
            ctx.lineWidth = 2;
            eval(e.data.rect2);
          }
          if (e.data.shade) {
            ctx.strokeStyle = "none";
            ctx.globalAlpha = 0.4;
            ctx.lineWidth = 1;
            ctx.fillStyle = gr.shadeColor;
            if (Array.isArray(e.data.shade)) {
              for (i = 0; i < e.data.shade.length; i++) {
                eval(e.data.shade[i]);
              }
            } else {
              eval(e.data.shade);
            }
            ctx.globalAlpha = 1;
          }
          if (e.data.Main) {
            ctx.strokeStyle = gr.graphColor;
            ctx.lineWidth = 2;
            eval(e.data.Main);
          }

          if (e.data.pcx) {
            for (i = 0; i < e.data.pcx.length; i++) {

              if (e.data.pcx[i] && e.data.pcy[i] && e.data.plabels[i]) {
                //ctx.moveTo(e.data.pcx[i], e.data.pcy[i]);
                ctx.beginPath();
                ctx.strokeStyle = gr.graphColor;
                if (Array.isArray(gr.pointType)) {
                  if (gr.pointType[i] == 'open') {
                    ctx.fillStyle = "white";
                  } else {
                    console.log(gr.graphColor);
                    ctx.fillStyle = gr.graphColor;
                  }
                } else {
                  if (gr.pointType == 'open') {
                    ctx.fillStyle = "white";
                  } else {
                    console.log(gr.graphColor);
                    ctx.fillStyle = gr.graphColor;
                  }
                }
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
          if (e.data.pcgx) {
            for (i = 0; i < e.data.pcgx.length; i++) {

              if (e.data.pcgx[i] && e.data.pcgy[i] && e.data.pglabels[i]) {
                //ctx.moveTo(e.data.pcgx[i], e.data.pcgy[i]);
                ctx.beginPath();
                ctx.strokeStyle = gr.graphColor;
                if (Array.isArray(gr.pointOnGraphType)) {
                  if (gr.pointOnGraphType[i] == 'open') {
                    ctx.fillStyle = "white";
                  } else {
                    console.log(gr.graphColor);
                    ctx.fillStyle = gr.graphColor;
                  }
                } else {
                  if (gr.pointOnGraphType == 'open') {
                    ctx.fillStyle = "white";
                  } else {
                    console.log(gr.graphColor);
                    ctx.fillStyle = gr.graphColor;
                  }
                }
                ctx.arc(e.data.pcgx[i], e.data.pcgy[i], gr.pointRadius, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
                if (gr.labelPointsOnGraph) {
                  if (Array.isArray(gr.labelPointsOnGraph)) {
                    if (gr.labelPointsOnGraph[i]) {
                      ctx.beginPath();
                      ctx.font = '10pt Arial';
                      ctx.strokeStyle = "black";
                      ctx.fillStyle = "black";
                      ctx.fillText(e.data.pglabels[i], parseFloat(e.data.pcgx[i]) - parseFloat(gr.pointRadius) - 5, parseFloat(e.data.pcgy[i]) + parseFloat(gr.pointRadius));
                    }
                  } else {
                    if (gr.labelPointsOnGraph) {
                      ctx.beginPath();
                      ctx.font = '10pt Arial';
                      ctx.strokeStyle = "black";
                      ctx.fillStyle = "black";
                      ctx.fillText(e.data.pglabels[i], parseFloat(e.data.pcgx[i]) - parseFloat(gr.pointRadius) - 5, parseFloat(e.data.pcgy[i]) + parseFloat(gr.pointRadius));
                    }
                  }
                }

              }

            }

          }
          worker.terminate();

        }
      });
      worker.postMessage({ 'points': gr.points, 'pointsOnGraph': gr.pointsOnGraph, 'widthx': gr.widthx, 'widthy': gr.widthy, 'xScale': gr.xScale, 'yScale': gr.yScale, 'imageWidth': gr.imageWidth, 'imageHeight': gr.imageHeight, 'sidePadding': gr.sidePadding, 'TopBottomPadding': gr.TopBottomPadding, 'type': gr.type, 'equationToEval': equation, 'tinyX': gr.minX, 'largeX': gr.maxX, 'tinyY': gr.minY, 'largeY': gr.maxY, 'N': gr.N, 'a': gr.a, 'b': gr.b, 'shadeToX': gr.shadeToX });

    }

  };
  this.summations = function(equation) {
    var N = this.N;
    var a = this.a;
    var b = this.b;
    var gr = this;
    if (typeof sumWork === "object" && !Array.isArray(gr.equation)) {
      sumWork.terminate();
    }
    sumWork = new Worker("SummationWorker.js");
    sumWork.addEventListener('message', function(e) {
      if (e.data.msg) {
        //$('#popup #stage').empty().append(e.data.msg);
      } else {
        var iSumElem;
        if (typeof e.data.Right !== "undefined") {
          gr.rightSumValue = e.data.Right;
          //MathJax.Hub.Queue(function() {
          var rSumElem = document.getElementById(gr.id + 'Sum');
          rSumElem.innerHTML = "";
          if (gr.rightSumValue != "diverges") {
            var rightSum = "<math><mstyle displaystyle='true'><msub><mi>R</mi><mi>n</mi></msub><mo>=</mo><munderover><mo>&#x2211;</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mn>" + N + "</mi></munderover><mrow><mi>f</mi><mo></mo><mrow><mo>(</mo><msub><mi>x</mi><mi>i</mi></msub><mo>)</mo></mrow><mrow><mo>(</mo><mn>" + (b - a) / N + "</mn><mo>)</mo></mrow></mstyle><mo>=</mo>";

            rSumElem.innerHTML = (rightSum + "<mn>" + gr.rightSumValue + "</mn></mrow></math>" + "<br><span>where </span><math><msub><mi>x</mi><mi>i</mi></msub><mo>=</mo><mn>" + a + "</mn><mo>+</mo><mi>i</mi><mrow><mo>(</mo><mn>" + (b - a) / N + "</mn><mo>)</mo></mrow></math>");
            //$('#' + gr.id + 'Sum').empty().append(rightSum + "<mn>" + gr.rightSumValue + "</mn></mrow></math>" + "<br><span>where </span><math><msub><mi>x</mi><mi>i</mi></msub><mo>=</mo><mn>" + a + "</mn><mo>+</mo><mi>i</mi><mrow><mo>(</mo><mn>" + (b - a) / N + "</mn><mo>)</mo></mrow></math>");
          } else {
            rSumElem.innerHTML = ("Right Sum diverges");
            //$('#' + gr.id + 'Sum').empty().append("Right Sum diverges");
          }
          //});
          //MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }
        if (typeof e.data.Left !== "undefined") {
          gr.leftSumValue = e.data.Left;
          //MathJax.Hub.Queue(function() {
          var lSumElem = document.getElementById(gr.id + 'Sum');
          lSumElem.innerHTML = "";
          if (gr.leftSumValue != "diverges") {
            var leftSum = "<math><mstyle displaystyle='true'><msub><mi>L</mi><mi>n</mi></msub><mo>=</mo><munderover><mo>&#x2211;</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mn>" + N + "</mn></munderover><mrow><mi>f</mi><mo></mo><mrow><mo>(</mo><msub><mi>x</mi><mrow><mi>i</mi><mo>&#x2212;</mo><mn>1</mn></mrow></msub><mo>)</mo></mrow><mrow><mo>(</mo><mn>" + (b - a) / N + "</mn><mo>)</mo></mrow></mstyle><mo>=</mo>";
            lSumElem.innerHTML = (leftSum + "<mn>" + gr.leftSumValue + "</mn></mrow></math>" + "<br><span>where </span><math><msub><mi>x</mi><mi>i</mi></msub><mo>=</mo><mn>" + a + "</mn><mo>+</mo><mi>i</mi><mrow><mo>(</mo><mn>" + (b - a) / N + "</mn><mo>)</mo></mrow></math>");
            //$('#' + gr.id + 'Sum').empty().append(leftSum + "<mn>" + gr.leftSumValue + "</mn></mrow></math>" + "<br><span>where </span><math><msub><mi>x</mi><mi>i</mi></msub><mo>=</mo><mn>" + a + "</mn><mo>+</mo><mi>i</mi><mrow><mo>(</mo><mn>" + (b - a) / N + "</mn><mo>)</mo></mrow></math>");
          } else {
            lSumElem.innerHTML = ("Left Sum diverges");
            //$('#' + gr.id + 'Sum').empty().append("Left Sum diverges");
          }
          //});
          //MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }
        if (typeof e.data.Integral !== "undefined") {
          iSumElem = document.getElementById(gr.id + 'Sum');
          if (Array.isArray(e.data.Integral)) {
            gr.integralValue = [];
            var toDisplayInt = "`";
            var toDisplaySum = "";
            var finalValue;
            for (i = 0; i < e.data.Integral.length; i++) {
              if (i == e.data.Integral.length - 1) {
                //toDisplayInt = toDisplayInt + "int_(" + a[i] + ")^(" + b[i] + ")(" + equation + ") dx = ";
                toDisplayInt = toDisplayInt + "int_(" + a[i] + ")^(" + b[i] + ")(" + 'f(x)' + ") dx = ";
              } else {
                //toDisplayInt = toDisplayInt + "int_(" + a[i] + ")^(" + b[i] + ")(" + equation + ") dx + ";
                toDisplayInt = toDisplayInt + "int_(" + a[i] + ")^(" + b[i] + ")(" + 'f(x)' + ") dx + ";
              }
            }
            for (i = 0; i < e.data.Integral.length; i++) {
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

            finalValue = eval(toDisplaySum.replace("=", ""));

            //MathJax.Hub.Queue(function() {

            iSumElem.innerHTML = "";
            iSumElem.innerHTML = (toDisplayInt + toDisplaySum + finalValue + "`");
            //$('#' + gr.id + 'Sum').empty().append(toDisplayInt + toDisplaySum + finalValue + "`");

            //});
            //MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
          } else {
            gr.integralValue = e.data.Integral;
            //MathJax.Hub.Queue(function() {

            iSumElem.innerHTML = "";

            if (gr.integralValue != "diverges" && !isNaN(gr.integralValue)) {
              //iSumElem.innerHTML = ("`int_(" + a + ")^(" + b + ")" + equation + " dx = " + gr.integralValue + "`");
              iSumElem.innerHTML = ("`int_(" + a + ")^(" + b + ")" + 'f(x)' + " dx = " + gr.integralValue + "`");
              //$('#' + gr.id + 'Sum').empty().append("`int_(" + a + ")^(" + b + ")" + equation + " dx = " + gr.integralValue + "`");
            } else {
              //iSumElem.innerHTML = ("`int_(" + a + ")^(" + b + ")" + equation + " dx `" + " " + gr.integralValue);
              iSumElem.innerHTML = ("`int_(" + a + ")^(" + b + ")" + 'f(x)' + " dx `" + " " + gr.integralValue);
              //$('#' + gr.id + 'Sum').empty().append("`int_(" + a + ")^(" + b + ")" + equation + " dx `" + " " + gr.integralValue);
            }
            //});
            //MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
          }
        }
        if (typeof e.data.areaUnderCurve !== "undefined") {
          console.log(e.data.areaUnderCurve);
          var sumToShow = 0;
          if (Array.isArray(e.data.areaUnderCurve)) {
            for (i = 0; i < e.data.areaUnderCurve.length; i++) {
              sumToShow += parseFloat(e.data.areaUnderCurve[i]);
            }
          } else {
            sumToShow = parseFloat(e.data.areaUnderCurve);
          }
          gr.areaUnderCurve = sumToShow.toFixed(6).replace(/\.?0+$/, "");
          if (document.getElementById(gr.id + 'Sum')) {
            iSumElem = document.getElementById(gr.id + 'Sum');
            iSumElem.innerHTML = "";
            iSumElem.innerHTML = (sumToShow.toFixed(6).replace(/\.?0+$/, ""));
            //$('#' + gr.id + 'Sum').empty().append(sumToShow.toFixed(6).replace(/\.?0+$/, ""));
          }
        }
        sumWork.terminate();
        //$('#popup').toggleClass("none");
      }
    });
    sumWork.postMessage({ 'type': gr.type, 'equationToEval': equation, 'tinyX': gr.minX, 'largeX': gr.maxX, 'tinyY': gr.minY, 'largeY': gr.maxY, 'N': gr.N, 'a': gr.a, 'b': gr.b });
  };

  this.createEquation = function() {
    //MathJax.Hub.Queue(function() { document.getElementById('equationList').innerHTML = "`f(x)=" + this.equation + "`" });
    //MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

  };


  this.evaluateEquation = function(x) {
    var a = eval(((this.equationToEval).replace(new RegExp("x", 'g'), "(" + x + ")")));
    if (!isNaN(a)) {
      return parseFloat(parseFloat(eval(((this.equationToEval).replace(new RegExp("x", 'g'), "(" + x + ")")))).toFixed(3));
    } else {
      return NaN;
    }
    //return parseFloat(parseFloat(math.eval(((this.equation).replace(new RegExp("x", 'g'), "(" + x + ")")))).toFixed(3));
  };

  this.updateAxisVals = function(direct) {
    var curVal;
    switch (direct) {
      case 37:
        curVal = this.minX;
        curVal++;
        document.getElementById('minX').value = curVal;
        curVal = this.maxX;
        curVal++;
        document.getElementById('maxX').value = curVal;

        break;
      case 38:
        curVal = this.minY;
        curVal--;
        document.getElementById('minY').value = curVal;
        curVal = this.maxY;
        curVal--;
        document.getElementById('maxY').value = curVal;
        break;
      case 39:
        curVal = this.minX;
        curVal--;
        document.getElementById('minX').value = curVal;
        curVal = this.maxX;
        curVal--;
        document.getElementById('maxX').value = curVal;
        break;
      case 40:
        curVal = this.minY;
        curVal++;
        document.getElementById('minY').value = curVal;
        curVal = this.maxY;
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

  };
  this.init();


};
