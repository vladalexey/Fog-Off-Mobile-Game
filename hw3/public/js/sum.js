function check(val) {
    
    var regex=/^[0-9]+$/;

    if (!val.match(regex)) {
        console.log("Must use non-negative integers")
        return false
    } else if (val >= 100000) {
        console.log("Must be smaller than 1000")
        return false
    } else {
        return true
    }
}

function return_sum(num) {

    $(document).ready(function() {

        if (check(num)) {
            var sum = 0
            for (i=1; i <= num; i++) {
                sum = sum + i
            }
            return sum
        } else {
            return "Error Found"
        }
    })
}

exports.return_sum = function(num) {
    console.log(num)
    if (check(String(num))) {
        var sum = 0
        for (i=1; i <= num; i++) {
            sum = sum + i
        }
        return sum
    } else {
        return "Error Found"
    }
}