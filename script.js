// Model selector buttons
$('#selector button').click(function() {
    $(this).addClass('active').siblings().removeClass('active');

    console.log(this);

    if(this.id == 'mm1button') {
        model = 'mm1';
        formTab.style.display = "block";
        calcButton.style.display = "block";
        CTile.style.display = "none";
        CTileText.style.display = "none";
    } else if (this.id == 'mmcbutton') {
        model = 'mmc';
        formTab.style.display = "block";
        CTile.style.display = "block";
        CTileText.style.display = "block";
        calcButton.style.display = "block";
    } else {
        model = 'md1';
        formTab.style.display = "block";
        calcButton.style.display = "block";
        CTile.style.display = "none";
        CTileText.style.display = "none";
    }
    return model;
});

// calculator buttons
var calcButton = document.getElementById("calcButton");


var formTab = document.getElementById("formTab");
var CTile = document.getElementById("CTile");
var CTileText = document.getElementById("CTileText");


// Result Outputs

var resultL = document.getElementById("resultL");
var resultLq = document.getElementById("resultLq");
var resultW = document.getElementById("resultW");
var resultWq = document.getElementById("resultWq");
var resultRho = document.getElementById("resultRho");
var resultPro = document.getElementById("resultProb");

// Modal / Error Message

var modal = document.getElementById("modalText");

// Lesson Page excercises. 

function MM1ex0(form) {
    var ans = [];
    var result = [0.9,1.5,0.3,0.5,0.6]; //answers for MM1ex0

    for (i=0; i < 5; i++) {
        ans[i] = parseFloat(document.MM1form[i].value)
        console.log(ans[i])

        if (ans[i] == result[i]) {
            document.getElementById("MM1ex0" + i.toString()).className = 'form-control col-sm-1 border-success';
        } else {
            document.getElementById("MM1ex0" + i.toString()).className = 'form-control col-sm-1 border-danger';
        }
    }
}

function MMCex0(form) {

    var ans = [];
    var result = [0.80,2.05,0.5,0.13,.52]; //answers for MMCex0

    for (i=0; i < 5; i++) {
        ans[i] = parseFloat(document.MMCform[i].value)
        console.log(ans[i])

        if (ans[i] == result[i]) {
            document.getElementById("MMCex0" + i.toString()).className = 'form-control col-sm-1 border-success';
        } else {
            document.getElementById("MMCex0" + i.toString()).className = 'form-control col-sm-1 border-danger';
        }
    }
}

// Function Calculator
function Calc(form) {

    var c = parseInt(document.form.C.value,10); // number of servers
    if (c!== c) {
        c = 0;
    }
    var k = 0; // queue capacity
    var nu = parseFloat(document.form.nu.value, 10); // services
    var lamb = parseFloat(document.form.lamb.value, 10); // arrivals 
    var r = Math.round(r) // rounding number


    
    // input for probabilites
    let input = document.querySelector('input[target]');

    input.addEventListener('keyup', (e) => {
        if(e.keyCode === 13) {
            n = e.target.value; // number of customers 
            console.log("show me this number N:" + n + "c: " + c)

            switch (model) {
                case 'mm1':
                    x = rounding( (1 - (lamb/nu)) * Math.pow((lamb/nu),n));
                    resultPro.innerHTML = x;
                    break;
                case 'mmc':
                    if (c == 0) {
                        x = probMMK(c);
                        console.log("show this message #1: " + x )
                    } else if (n <= c) {
                        x = (Math.pow((lamb/nu),n)/factorial(n)) * probMMK(c);
                        console.log("show this message #2: " + x )
                    } else {
                        x = Math.pow((lamb/nu),n)/(factorial(c)* Math.pow(c,(n-c))) * probMMK(c);
                        console.log("show this message #3: " + x )
                    }
                    resultPro.innerHTML = rounding(x);
                    break;
            }
        }
    })
    
    var mm1 =  {
        model: mm1,
        w: rounding(-(1/(lamb - nu))),
        wq: rounding(lamb/(nu * (nu - lamb))),
        l: rounding(lamb/(nu - lamb)),
        lq: rounding(((Math.pow(lamb,2))/(nu * (nu - lamb)))),
        prob: rounding(res = 1 - (lamb/nu)),
        rho: rounding(lamb/nu)
    };

    var mmc = {
        model: mmc,
        w: wMMK(),
        wq: wqMMK(),
        l: lMMK(),
        lq: lqMMK(),
        prob: probMMK(c),
        rho: rounding(lamb/(c * nu))
    }

    var md1 = {
        model: md1,
        w: wMD1(),
        wq: wqMD1(),
        l: lMD1(),
        lq: lqMD1(),
        prob: probMD1(),
        rho: rounding(lamb/nu)
    }

    console.log("This is the model used right now: "+ model)

    // // Validate the form 
    if (isNaN(lamb)) {
        $('#Modal').modal(focus);
        modal.innerHTML = "Please enter correct value for λ";
        return false;
    } else {
        document.getElementById("resultTab").style.display = "block"; // display results
    }

    if (isNaN(nu)) {
        $('#Modal').modal(focus);
        modal.innerHTML = "Please enter correct value for μ";
        return false;
    } else {
        document.getElementById("resultTab").style.display = "block"; // display results
    }

    if (eval(model).rho >= 1) {
        $('#Modal').modal(focus);
        modal.innerHTML = "The queues will tend to infinity as λ is greater or equal than μ";
        return false;
    } else {
        document.getElementById("resultTab").style.display = "block"; // display results
    }
    
    // if (model == "mm1") {
    //     if (mm1.rho > 1) {
    //         $('#Modal').modal(focus);
    //         modal.innerHTML = "The queues will tend to infinity as λ is greater or equal than μ";
    //         return false;
    //     } else {
    //         document.getElementById("resultTab").style.display = "block"; // display results
    //     }
    // } else if (model == "mmc") {
    //     if (mmc.rho > 1) {
    //         $('#Modal').modal(focus);
    //         modal.innerHTML = "The queues will tend to infinity as λ is greater or equal than μ";
    //         return false;
    //     } else {
    //         document.getElementById("resultTab").style.display = "block"; // display results
    //     }
    // }
    

    //display results depending on the model
    switch (model) {
        case 'mm1':
            resultL.innerHTML = mm1.l;
            resultLq.innerHTML = mm1.lq;
            resultW.innerHTML = mm1.w;
            resultWq.innerHTML = mm1.wq;
            resultRho.innerHTML = mm1.rho;
            resultPro.innerHTML = mm1.prob;
            break;
        case 'mmc':
            resultL.innerHTML = mmc.l;
            resultLq.innerHTML = mmc.lq;
            resultW.innerHTML = mmc.w;
            resultWq.innerHTML = mmc.wq;
            resultRho.innerHTML = mmc.rho;
            resultPro.innerHTML = mmc.prob;
            break;
        case 'md1':
            resultL.innerHTML = md1.l;
            resultLq.innerHTML = md1.lq;
            resultW.innerHTML = md1.w;
            resultWq.innerHTML = md1.wq;
            resultRho.innerHTML = md1.rho;
            resultPro.innerHTML = md1.prob;
    }
       
    // calculates MMK prob
    function probMMK(c) {

        n = 0 // 
        for(i = 0; i < c; i++) {
            n += ((1/factorial(i)) * Math.pow((lamb/nu),i))
        }

        res = 1 / (n + (1/factorial(c)) * (Math.pow(lamb/nu,c))
         * ((c * nu) / ((c * nu) - lamb)))
        return rounding(res);
    }

    // calculates MMK L
    function lMMK() {
        res = (Math.pow(lamb/nu,c) * lamb * nu) / ((factorial(c - 1))
         * Math.pow(c * nu - lamb, 2)) * probMMK(c) + lamb/nu
        return rounding(res);
    }

    // calculates MMK Lq
    function lqMMK() {
        res = (Math.pow(lamb/nu,c) * lamb * nu) / ((factorial(c - 1))
         * Math.pow(c * nu - lamb, 2)) * probMMK(c)
        return rounding(res);
    }

    // calculates MMK W
    function wMMK() {
        res = (Math.pow(lamb/nu,c) * nu) / ((factorial(c - 1))
         * Math.pow(c * nu - lamb, 2)) * probMMK(c) + 1/nu
        return rounding(res);
    }
    
    // calculates MMK Wq
    function wqMMK() {
        res = (Math.pow(lamb/nu,c) * nu) / ((factorial(c - 1))
         * Math.pow(c * nu - lamb, 2)) * probMMK(c)
        return rounding(res);
    }

    // Calculates probabilities MD1
    function probMD1() {
        res = 1 - (lamb/nu)
        return rounding(res);
    }

    // Calculates L MD1 
    function lMD1() {
        res = (Math.pow(lamb/nu,2))/(2 * (1 - (lamb/nu))) + lamb/nu;
        return rounding(res);
    }

    // Calculates Lq MD1 
    function lqMD1() {
        res = (Math.pow(lamb/nu,2))/(2 * (1 - (lamb/nu)));
        return rounding(res);
    }

    // Calculates w MD1 
    function wMD1() {
        res = (lamb/Math.pow(nu,2))/(2 * (1 - (lamb/nu))) + 1/nu;
        return rounding(res);
    }

    // Calculates Wq MD1 
    function wqMD1() {
        res = (lamb/Math.pow(nu,2))/(2 * (1 - (lamb/nu)))
        return rounding(res);
    }

    // Time Converter
    
    /*
     * @param {double} result in hours
     * @param {int} option to convert
     * returns {float} result in option
     */
    function unitConverter() {

        hours = eval(model).w;
        var option = 3;
        console.log("show me the hours: " + hours)
        var perHours = [];

        perHours[0] = hours;  ///per hours
        perHours[1] = hours * 60; // per minutes
        perHours[2] = hours * 3600; // per seconds
        perHours[3] = Math.round(hours / 24 * 100) / 100; // per days

        // TEST STUFF PLEASE REMOVE LATER
        var i;
        for(i=0; i < perHours.length;i++) {
            console.log(perHours[i])
        }

        return console.log(perHours[option]);
    }

    // TEST STUFFF PLEASE REMOVE LATER
    unitConverter();


    // Utilities

    // Rounding to 4 decimal points 
    function rounding(n){
        r = Math.round(n * 10000) / 10000
        return r
    }

    // Recursive factorial
    function factorial (n) {
        
        if (n < 0)
            return -1;

        else if (n == 0)
            return 1;

        else {
            return (n * factorial(n-1));
        }
    }
}
