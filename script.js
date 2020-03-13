function Calc(form) {

    var c = parseInt(document.form.C.value,10); // number of servers
    var k = 0; // queue capacity
    
    var nu = parseFloat(document.form.nu.value, 10); // services
    var lamb = parseFloat(document.form.lamb.value, 10); // arrivals 

    var r = Math.round(r) // rounding number
        
    //calculates MM1 W
    function w() {
        res = rounding(-(1/(lamb - nu)))
        return res;
    }
    
    //calculates MM1 Wq
    function wq() {
        res = rounding(lamb/(nu * (nu - lamb)))
        return res;
    }
    
    //calculates MM1 l
    function l() {
        res = rounding(lamb/(nu - lamb))
        return res;
    }
    
    //calculates MM1 Lq
    function lq() {
        res = rounding(((lamb^2)/(nu * (nu - lamb))))
        return res;
    }
    
    function prob() {
        res = 1 - (lamb/nu)
        console.log('prob 0 = ' + res)
    }
    
    function rho() {
        res = lamb/nu
        console.log('rho = ' + res)
    }
    
    prob()
    rho()

    document.getElementById("resultL").innerHTML = l();
    document.getElementById("resultLq").innerHTML = lq();
    document.getElementById("resultW").innerHTML = w();
    document.getElementById("resultWq").innerHTML = wq();
 
    probMMK(c)
    lMMK()
    lqMMK()
    wMMK()
    wqMMK()

    // calculates MMK prob
    function probMMK(c) {
        n = 0
        for(i = 0; i < c; i++) {
            n += ((1/factorial(i)) * Math.pow((lamb/nu),i))
            //console.log(n)
        }
        //console.log(n)

        res = 1 / (n + (1/factorial(c)) * (Math.pow(lamb/nu,c)) * ((c * nu) / ((c * nu) - lamb)))
        console.log('mmk prob= ' + res);
        return res;
    }

    // calculates MMK L
    function lMMK() {
        res = (Math.pow(lamb/nu,c) * lamb * nu) / ((factorial(c - 1)) * Math.pow(c * nu - lamb, 2)) * probMMK(c) + lamb/nu
        console.log('lmmk = '+ res)
    }

    // calculates MMK Lq
    function lqMMK() {
        res = (Math.pow(lamb/nu,c) * lamb * nu) / ((factorial(c - 1)) * Math.pow(c * nu - lamb, 2)) * probMMK(c)
        console.log('lqmmk = '+ res)
    }

    // calculates MMK W
    function wMMK() {
        res = (Math.pow(lamb/nu,c) * nu) / ((factorial(c - 1)) * Math.pow(c * nu - lamb, 2)) * probMMK(c) + 1/nu
        console.log('wmmk = '+ res)
    }
    
    // calculates MMK Wq
    function wqMMK() {
        res = (Math.pow(lamb/nu,c) * nu) / ((factorial(c - 1)) * Math.pow(c * nu - lamb, 2)) * probMMK(c)
        console.log('wqmmk = '+ res)
    }

    // rounding to 4 decimal points 
    function rounding(n){
        r = Math.round(n * 10000) / 10000
        return r
    }

    // recursive factorial
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
