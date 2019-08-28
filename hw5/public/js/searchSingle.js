function addStudent() {

    var URL = "/addstu";
    var new_first = $("#first").val();
    var new_last = $("#last").val();
    var new_birth = $("#birthdate").val();
    var new_major = $("#major").val();

    var data = {'new_first': new_first,
                'new_last': new_last,
                'new_birth': new_birth,
                'new_major': new_major};

    $.ajax({
        type: "POST",
        url : URL,
        dataType : 'text',
        data : data,
        success : function(msg){

            // Update new list
            alert("New user added!");
            $("#collapse3").collapse('hide');

        },
        error: function(jgXHR, textStatus,errorThrown){
            alert("Error: " + textStatus + " " + errorThrown);
        }
    });
}

function getListStudent() {
    var URL = "/liststu";
    var data = {"list": "list"}

    $.ajax({
        type: "POST",
        url : URL,
        dataType : 'text',
        data : data,
        success : function(msg){
            console.log("Getting list student successful " + msg)

            var new_student_tab = '<select id="id" class="custom-select">';
            var msg = JSON.parse(msg);

            

            for (i = 1; i < msg.length + 1; i++) {
                new_student_tab += "<option value=" + i + ">" + msg[i - 1].firstname + "</option>"
            };

            new_student_tab += "</select>"

            $("#selection_stu").html(new_student_tab); 

            $("#id").val(1);

        },
        error: function(jgXHR, textStatus,errorThrown){
            alert("Error: " + textStatus + " " + errorThrown);
        }
    });

    URL = "/listterm";

    $.ajax({
        type: "POST",
        url : URL,
        dataType : 'text',
        data : data,
        success : function(msg){
            console.log("Getting list student successful " + msg)

            var new_term_tab = '<select id="term" class="custom-select">';
            var msg = JSON.parse(msg);

            for (i = 1; i < msg.length + 1; i++) {
                new_term_tab += "<option value=" + i + ">" + msg[i - 1].term + "</option>"
            };

            new_term_tab += "</select>"

            $("#selection_term").html(new_term_tab); 

            $("#term").val(1);
            
            $("#collapse4").collapse('show')
        },
        error: function(jgXHR, textStatus,errorThrown){
            alert("Error: " + textStatus + " " + errorThrown);
        }
    });

}

function requestSingle() {

    var num = $("#id option:selected").val()
    var num_term = $("#term option:selected").text()
    console.log(num_term)
    var URL = "/getstudent";
    var data = {"id": num, "term": num_term}

    $.ajax({
        type: "POST",
        url : URL,
        dataType : 'text',
        data : data,
        success : function(msg){
            console.log("Getting single student table successful " + msg);

            var new_tab = "<thead> <td>ID</td> <td>Firstname</td> <td>Lastname</td> <td>Course</td> <td>Desc</td> <td>Term</td> <td>Grade</td> </thead>";
            var msg = JSON.parse(msg);

            for (i = 0; i < msg.length; i++) {
                new_tab += "<tbody> <tr> <td>" + msg[i].studentid + "</td>" + 
                "<td>" + msg[i].firstname + "</td>" + 
                "<td>" + msg[i].lastname + "</td>" +
                "<td>" + msg[i].courseid + "</td>" + 
                "<td>" + msg[i].description + "</td>" +
                "<td>" + msg[i].term + "</td>" +
                "<td>" + msg[i].grade + "</td> </tr> </tbody>"
            };

            $("#result_table").html(new_tab); 
            $("#collapse4").collapse('show');
        },
        error: function(jgXHR, textStatus,errorThrown){
            alert("Error: " + textStatus + " " + errorThrown);
        }
    });
}