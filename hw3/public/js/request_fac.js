function requestFac() {

    var num = $("#num_fac").val()
    var URL = "/get_fac";
    var data = {"num": num}
    // console.log(num)
    $.ajax({
        type: "POST",
        url : URL,
        dataType : 'text',
        data : data,
        success : function(msg){
            console.log("Getting factorial successful")
            $("#result").text(msg)
            $("#collapse3").collapse('show')
        },
        error: function(jgXHR, textStatus,errorThrown){
            alert("Error: " + textStatus + " " + errorThrown);
        }
    });
}