

function requestCourseTab() {

    // var num = $("#num_fac").val()
    var URL = "/tablecour";
    var data = {"course": "course"}
    // console.log(num)
    $.ajax({
        type: "POST",
        url : URL,
        dataType : 'text',
        data : data,
        success : function(msg){
            console.log("Getting factorial successful " + msg)

            var new_tab = "<thead><td>Course ID</td> <td>Desc</td> </thead>";
            var msg = JSON.parse(msg);

            for (i = 0; i < msg.length; i++) {
                new_tab += "<tr> <td>" + msg[i].courseid + "</td>" + 
                "<td>" + msg[i].description + "</td> </tr>"
            };

            $("#result_table").html(new_tab); 
            
            $("#collapse4").collapse('show')
        },
        error: function(jgXHR, textStatus,errorThrown){
            alert("Error: " + textStatus + " " + errorThrown);
        }
    });
}