function requestSum() {

    var num = $("#num_sum").val()
    var URL = "/get_sum";
    var data = {"num": num}
    $.ajax({
        type: "POST",
        url : URL,
        dataType : 'text',
        data : data,
        success : function(msg){
            console.log("Getting summation successful")
            $("#result").text(msg)
            $("#collapse3").collapse('show')
        },
        error: function(jgXHR, textStatus,errorThrown){
            alert("Error: " + textStatus + " " + errorThrown);
        }
    });
}