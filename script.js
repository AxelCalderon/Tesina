function Calc(form) {

    var c = 0; // number of servers
    var k = 0; // queue capacity
    
    var nu = parseFloat(document.form.nu.value, 10); // services
    var lamb = parseFloat(document.form.lamb.value, 10); // arrivals 

    var r = Math.round(r) // rounding number
     
    // rounding to 4 decimal points 
    function rounding(n){
        r = Math.round(n * 10000) / 10000
        return r
    }
    
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
        console.log('test'+ res)
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
}
