function requestStudentTab() {

    // var num = $("#num_sum").val()
    var URL = "/tablestu";
    var data = {"student": "student"}
    $.ajax({
        type: "POST",
        url : URL,
        dataType : 'text',
        data : data,
        success : function(msg){
            console.log("Getting student table successful " + msg);

            var new_tab = "<thead> <td>Student ID</td> <td>Firstname</td> <td> Lastname </td> <td> Birthdate</td> <td> Major </td>  </thead>";
            var msg = JSON.parse(msg);

            for (i = 0; i < msg.length; i++) {
                new_tab += "<tbody> <tr> <td>" + msg[i].studentid + "</td>" + 
                "<td>" + msg[i].firstname + "</td>" + 
                "<td>" + msg[i].lastname + "</td>" +
                "<td>" + msg[i].birthdate + "</td>" + 
                "<td>" + msg[i].major + "</td> </tr> </tbody>"
            };

            $("#result_table").html(new_tab); 
            $("#collapse4").collapse('show');
        },
        error: function(jgXHR, textStatus,errorThrown){
            alert("Error: " + textStatus + " " + errorThrown);
        }
    });
}