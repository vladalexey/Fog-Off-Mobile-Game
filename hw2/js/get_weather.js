function hide_sub() {
    $(document).ready(function() {
        
        get_weather()
        $("#navbar").css("padding-top", "10%");
        $("#submit").hide();
        $("#ques").html("Wanna change anything?");
        $("#info").show();
    });
};

function hide_info() {
    $(document).ready(function() {
        $("#show").css("visibility", "visible");
        $("#submit").show();
        $("#info").hide();
    });
};

function get_weather() {
    $(document).ready(function(){
        // Get value n 
        var API = $("#API").val();
        var zip = $("#ZIP").val();
        var URL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zip + "&appid=" + API+"&units=imperial";
        
        $.ajax({
            type: "GET",
            url : URL,
            dataType : "jsonp",

            // Show/hide loading 
            beforeSend: function(){
                $("#spinner").show();
              },
              complete: function(){
                $("#spinner").hide();
              },

            // On success, check if code == 200, append result to table
            success : function(msg){
                console.log(msg)

                if (msg.cod == 200) {  

                    $("#weather").innerHTML = ""
                    var city = msg.name;
                    var temps = msg.list;
                    console.log(temps)
                    for (i = 0; i < temps.length; i++) {
                        

                        var l_tmp = temps[i].main.temp_min;
                        var u_tmp = temps[i].main.temp_max;
                        var desc = temps[i].weather[0].description;
                        var datetime = temps[i].dt_txt;

                        $("#weather").append(
                            "<tr>" + 
                            "<td>" + datetime + "</td>" +
                            "<td>" + desc + "</td>" +
                            "<td>" + l_tmp + " F" + "</td>" +
                            "<td>" + u_tmp + " F" + "</td>" +
                            "</tr>"
                        )
                    }
                } else
                    document.getElementById("weather").innerHTML="ERROR";
            },
            error: function(jgXHR, textStatus,errorThrown){
                alert("Error: " + textStatus + " " + errorThrown);
            }
        });
    });
}