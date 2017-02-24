var Graph = function(aobj) {
  //Functions
  var isFloat = function(n) {
    return n === +n && n !== (n | 0);
  }
  var isInt = function(n) {
    return n === +n && n === (n | 0);
  }
  var factorial = function(n, step) {
    n = parseInt(n);
    var f = 1;
    if (n < 0) {
      n = n * -1;
    }
    for (var i = n; i > 1; i = i - step) {
      f = f * i;
    }
    console.log(f);
    return f
  }
  var gamma = function(z) {
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
          return (firstHundredDoubleFactVals[s - 3] * Math.sqrt(Math.PI)) / Math.pow(2, (s - 1) / 2)
        } else if (s === 0 || s === 1 || s === 2 || s === -1) {
          return 1
        } else {
          return (factorial(s - 2, 2) * Math.sqrt(Math.PI)) / Math.pow(2, (s - 1) / 2)
        }
      } else {


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

    } else {
      return null
    }
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
    //end Functions
    //Object
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
