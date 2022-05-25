//KY20220525, when page load, get current time, then convert to human friendly text and display it
document.addEventListener("DOMContentLoaded", function (event)
{
    var today = new Date();
    var current_time = convert_time_to_text(today.getHours(), today.getMinutes());
    document.getElementById("current_time").innerHTML = current_time; //KY20220525, display the current time in human friendly way
});

//KY20220525, when the time input change, get the updated time, then convert to human friendly text and display it
function get_time_and_convert_to_text(event)
{
    var time = event.value;
    //console.log(time);
    var time_split = time.split(":"); //KY20220525, split time to hour and minute
    var hour = parseInt(time_split[0]);
    var minute = parseInt(time_split[1]);
    var time_in_text = convert_time_to_text(hour,minute);
    if(time_in_text.startsWith("Error"))
    {
        document.getElementById("chosen_time_display").innerHTML = time_in_text; //KY20220525, if invalid time was inputted, an error message will be sown
    }
    else
    {
        document.getElementById("chosen_time_display").innerHTML = "Chosen time: "+time_in_text; //KY20220525, display the chosen time in human friendly way
    }
}

function convert_time_to_text(hours, minutes)
{
    if (hours >= 24) //KY20220525, hours cannot bigger or equal to 24
    {
        return "Error: invalid hours";
    }
    if (minutes >= 60) //KY20220525, minutes cannot bigger or equal to 60
    {
        return "Error: invalid minutes";
    }

    if (hours > 12) //KY20220525, if hours bigger than twelve, change it to 12 hour format
    {
        hours = hours % 12;
    }

    if (hours == 0)
    {
        hours = 12;
    }

    var time_text_array = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "twenty one", "twenty two", "twenty three", "twenty four", "twenty five", "twenty six", "twenty seven", "twenty eight", "twenty nine", "thirty"];
    var result = "";
    if (minutes === 0)
    {
        result = time_text_array[hours] + " o'clock";
    }
    else if (minutes === 15)
    {
        result = "Quarter past " + time_text_array[hours];
    }
    else if (minutes === 30)
    {
        result = "Half past " + time_text_array[hours];
    }
    else if (minutes === 45)
    {
        result = "Quarter to " + (hours === 12 ? time_text_array[1] : time_text_array[hours + 1]);//if hour is 12, use 1, if not, use hour + 1
    }
    else if (minutes === 1)
    {
        result = time_text_array[minutes] + " minute past " + time_text_array[hours];
    }
    else if (minutes < 30)
    {
        result = time_text_array[minutes] + " minutes past " + time_text_array[hours];
    }
    else if (minutes === 59)
    {
        result = time_text_array[60 - minutes] + " minute to " + (hours === 12 ? time_text_array[1] : time_text_array[hours + 1]);//if hour is 12, use 1, if not, use hour + 1
    }
    else
    {
        result = time_text_array[60 - minutes] + " minutes to " + (hours === 12 ? time_text_array[1] : time_text_array[hours + 1]);//if hour is 12, use 1, if not, use hour + 1
    }

    return result.charAt(0).toUpperCase() + result.slice(1); //KY20220525, set first character to uppercase
}

//KY20220525, when the time input change, get the updated time, then update the url of the link to access to the REST API
function update_url(event)
{
    var time = event.value;
    document.getElementById("api_url").setAttribute('href', "/api.aspx?time=" + time);
}

//KY20220525, test the function
//console.log(convert_time_to_text(5, 0));
//console.log(convert_time_to_text(5, 1));
//console.log(convert_time_to_text(5, 2));
//console.log(convert_time_to_text(5, 15));
//console.log(convert_time_to_text(5, 27));
//console.log(convert_time_to_text(5, 30));
//console.log(convert_time_to_text(5, 35));
//console.log(convert_time_to_text(5, 45));
//console.log(convert_time_to_text(5, 47));
//console.log(convert_time_to_text(5, 59));
//console.log(convert_time_to_text(15, 0));
//console.log(convert_time_to_text(15, 1));
//console.log(convert_time_to_text(15, 2));
//console.log(convert_time_to_text(15, 15));
//console.log(convert_time_to_text(15, 27));
//console.log(convert_time_to_text(15, 30));
//console.log(convert_time_to_text(15, 35));
//console.log(convert_time_to_text(15, 45));
//console.log(convert_time_to_text(15, 47));
//console.log(convert_time_to_text(15, 59));
//console.log(convert_time_to_text(12, 0));
//console.log(convert_time_to_text(12, 1));
//console.log(convert_time_to_text(12, 2));
//console.log(convert_time_to_text(12, 15));
//console.log(convert_time_to_text(12, 27));
//console.log(convert_time_to_text(12, 30));
//console.log(convert_time_to_text(12, 35));
//console.log(convert_time_to_text(12, 45));
//console.log(convert_time_to_text(12, 47));
//console.log(convert_time_to_text(12, 59));
//console.log(convert_time_to_text(11, 0));
//console.log(convert_time_to_text(11, 1));
//console.log(convert_time_to_text(11, 2));
//console.log(convert_time_to_text(11, 15));
//console.log(convert_time_to_text(11, 27));
//console.log(convert_time_to_text(11, 30));
//console.log(convert_time_to_text(11, 35));
//console.log(convert_time_to_text(11, 45));
//console.log(convert_time_to_text(11, 47));
//console.log(convert_time_to_text(11, 59));
//console.log(convert_time_to_text(0, 0));
//console.log(convert_time_to_text(0, 1));
//console.log(convert_time_to_text(0, 2));
//console.log(convert_time_to_text(0, 15));
//console.log(convert_time_to_text(0, 27));
//console.log(convert_time_to_text(0, 30));
//console.log(convert_time_to_text(0, 35));
//console.log(convert_time_to_text(0, 45));
//console.log(convert_time_to_text(0, 47));
//console.log(convert_time_to_text(0, 59));
//console.log(convert_time_to_text(23, 0));
//console.log(convert_time_to_text(23, 1));
//console.log(convert_time_to_text(23, 2));
//console.log(convert_time_to_text(23, 15));
//console.log(convert_time_to_text(23, 27));
//console.log(convert_time_to_text(23, 30));
//console.log(convert_time_to_text(23, 35));
//console.log(convert_time_to_text(23, 45));
//console.log(convert_time_to_text(23, 47));
//console.log(convert_time_to_text(23, 59));