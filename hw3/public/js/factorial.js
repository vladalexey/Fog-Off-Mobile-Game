
function check(val) {
    
    var regex=/^[0-9]+$/;

    if (!val.match(regex)) {
        console.log(val)
        console.log("Must use non-negative integers")
        return false
    } else if (val >= 100000) {
        console.log("Must be smaller than 1000")
        return false
    } else {
        return true
    }
}

function return_fac(num) {
    
    $(document).ready(function() {
        // var num = $("#num_fac").val()

        if (check(num)) {

            var fac = 1;

            for (i=2; i <= num; i++) {
                fac = fac * i
            }
            return fac
        } else {
            return "Error Found"
        }
    })

}

exports.return_fac = function(num) {

    if (check(num)) {

        var fac = 1;

        for (i=2; i <= num; i++) {
            fac = fac * i
        }
        return fac
    } else {
        return "Error Found"
    }
}