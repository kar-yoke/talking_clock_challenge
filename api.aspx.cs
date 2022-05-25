using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class api : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        dynamic data = Request.Params.ToString();   //KY20220525, get all parameters
        System.Collections.Specialized.NameValueCollection pairs = System.Web.HttpUtility.ParseQueryString(data); //KY20220525, split the parameters
        String time = "" + pairs["time"]; //KY20220525, get the matching parameter
        DateTime localDate = DateTime.Now; //KY20220525, current time
        int hours;
        int minutes;
        String[] time_split; //KY20220525, use to split time to hours and minutes
        String[] time_text_array = {"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "twenty one", "twenty two", "twenty three", "twenty four", "twenty five", "twenty six", "twenty seven", "twenty eight", "twenty nine", "thirty" };
        String result = "";

        if (time=="")
        {
            time = "current_time"; //KY20220525, set to current time if nothing was passed in
            hours = localDate.Hour;
            minutes = localDate.Minute;
        }
        else 
        { 
            time_split = time.Split(':'); //KY20220525, split time to hours and minutes
            hours = int.Parse(time_split[0]);
            minutes = int.Parse(time_split[1]);
        }

        if (hours >= 24) //KY20220525, hours cannot bigger or equal to 24
        {
            Response.Write("[{\"error\":\"invalid hours\"}]");
            return;
        }
        if (minutes >= 60) //KY20220525, minutes cannot bigger or equal to 60
        {
            Response.Write("[{\"error\":\"invalid minutes\"}]");
            return;
        }

        if (hours > 12) //KY20220525, if hours bigger than twelve, change it to 12 hour format
        {
            hours = hours % 12;
        }

        if (hours == 0)
        {
            hours = 12;
        }

        if (minutes == 0)
        {
            result = time_text_array[hours] + " o'clock";
        }
        else if (minutes == 15)
        {
            result = "Quarter past " + time_text_array[hours];
        }
        else if (minutes == 30)
        {
            result = "Half past " + time_text_array[hours];
        }
        else if (minutes == 45)
        {
            result = "Quarter to " + (hours == 12 ? time_text_array[1] : time_text_array[hours + 1]); //if hour is 12, use 1, if not, use hour + 1
        }
        else if (minutes == 1)
        {
            result = time_text_array[minutes] + " minute past " + time_text_array[hours];
        }
        else if (minutes < 30)
        {
            result = time_text_array[minutes] + " minutes past " + time_text_array[hours];
        }
        else if (minutes == 59)
        {
            result = time_text_array[60 - minutes] + " minute to " + (hours == 12 ? time_text_array[1] : time_text_array[hours + 1]); //if hour is 12, use 1, if not, use hour + 1
        }
        else
        {
            result = time_text_array[60 - minutes] + " minutes to " + (hours == 12 ? time_text_array[1] : time_text_array[hours + 1]); //if hour is 12, use 1, if not, use hour + 1
        }

        Response.Write("[{\""+ time + "\":\""+ char.ToUpper(result[0]) + result.Substring(1) + "\"}]"); //KY20220525, set first character to uppercase

        return;
    }
}