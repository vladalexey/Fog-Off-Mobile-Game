function get_fibo() {
    $(document).ready(function(){
        // Get value n 
        var end = $("#end").val();

        // Validate if input is non-negative number else alert user
        var regex=/^[0-9]+$/;
        if (!end.match(regex)) {
            alert("Must use non-negative integers")
        } else if (end >= 1000) {
            alert("Must be smaller than 1000")
        } else {
            
            // get table 
            document.getElementById("fibotable").style.visibility = "visible"

            // Clear table for new calculation
            $("#fibobody").text("")
            
            var list = new Array();
            var val = 1;
            
            // Loop for first n Fibonacci numbers 
            for (var start=0; start <= end; start ++) {
                list.push(start + val);
                val = val + start;
                
                // Append numbers into table
                $("#fibobody").append(
                    "<tr>" + 
                    "<td>" + start + "</td>" +
                    "<td>" + val + "</td>" +
                    "</tr>"
                )
            };
        }
    });
}