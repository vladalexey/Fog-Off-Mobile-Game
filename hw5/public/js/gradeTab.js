function requestGradeTab() {

    // var num = $("#num_fac").val()
    var URL = "/tablegra";
    var data = {"grade": "grade"}
    // console.log(num)
    $.ajax({
        type: "POST",
        url : URL,
        dataType : 'text',
        data : data,
        success : function(msg){
            console.log("Getting factorial successful " + msg)

            var new_tab = "<thead><td>Grade ID</td> <td>Course ID</td> <td>Student ID</td> <td>Term</td> <td>Grade</td></thead>";
            var msg = JSON.parse(msg);

            for (i = 0; i < msg.length; i++) {
                new_tab += "<tbody> <tr> <td>" + msg[i].gradeid + "</td>" + 
                "<td>" + msg[i].courseid + "</td>" + 
                "<td>" + msg[i].studentid + "</td>" +
                "<td>" + msg[i].term + "</td>" + 
                "<td>" + msg[i].grade + "</td> </tr> </tbody>"
            };

            $("#result_table").html(new_tab); 
            $("#collapse4").collapse('show')
        },
        error: function(jgXHR, textStatus,errorThrown){
            alert("Error: " + textStatus + " " + errorThrown);
        }
    });
}