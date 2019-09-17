//To Be Computed
var pomodoroMinute;
var second;
// Time Parameters
var setWork = 24;
var setPause = 4;
if(localStorage.getItem("workTime") != null)
{
    setWork = parseInt(localStorage.getItem("workTime"))-1;
    document.getElementById("pomodoro-time_show").innerHTML = " "+localStorage.getItem("workTime");
    document.getElementById("min").innerHTML = " "+localStorage.getItem("workTime");
}
if(localStorage.getItem("pauseTime") != null)
{
    setPause = parseInt(localStorage.getItem("pauseTime"))-1;
    document.getElementById("pause-time_show").innerHTML = " "+localStorage.getItem("pauseTime");
}
//DOM represantation for Computed Output from "pomodoroMinute","second";
var minutes = document.getElementById("min");
var seconds = document.getElementById("sec");
// message = message generated , messageDOM
var messageDOM = document.getElementById("message");
var message; 
//Buttons for Starting a timer
var startLoad = document.getElementsByClassName("start-load"); 
//pomotoros counter
var counter = 0; 
var counterDOM = document.getElementById("counter");
//pomotoros per sauce setiings
var perSauceDOM = document.getElementById("sauce-time");
var perSauce = 4;
document.getElementById("pomodoro-per-sauce").innerHTML = perSauce;
if(localStorage.getItem("perSauce") != null)
{
    document.getElementById("pomodoro-per-sauce").innerHTML = localStorage.getItem("perSauce");
}
//Background Pictures
document.getElementsByTagName("body")[0].style.backgroundImage = "url('bgimages/"+Math.floor(Math.random()*8)+".jpg')";

//Load The CountDown
function Load()
{
    startLoad[0].style.display = "none";
    startLoad[1].style.display = "none";
   var secondInterval = setInterval(
        function LoadSeconds()
        {
            minutes.innerHTML = DoubleDigit(pomodoroMinute);
            if(second == 1)
            {
                clearInterval(secondInterval);
                LoadMinutes();
            }
            else
            {
                seconds.innerHTML = DoubleDigit(--second);
            }
        }
        ,1000)
}
     function LoadMinutes()
        {
            if(pomodoroMinute == 0)
            {
                seconds.innerHTML = DoubleDigit(--second);
                PomodoroFinished();
                return 0;  
            }
            else
            {
                seconds.innerHTML = DoubleDigit(--second);
                setTimeout(function(){minutes.innerHTML = DoubleDigit(--pomodoroMinute);},1000);
                second = 60;
                Load();
            }
        }

function PomodoroFinished()
{
    //qka ndoth pasi qe mbaron pomodoro
    messageDOM.innerHTML = message;
    //var id = chrome.tabs.getCurrentTab().tabId;
    //console.log(id);
    //var remove = browser.tabs.remove(id+1);
    document.getElementById("sound").play();
    startLoad[0].style.display = "initial";
    startLoad[1].style.display = "initial";
    document.getElementById("counter").innerHTML = ++counter;
    
}
//
function StartLoad(message)
{
    messageDOM.innerHTML = "";
    if(message == "pause")
    {
        pomodoroMinute = setPause;
        this.message = "Your pause is over";
    }
    else if (message == "pomodoro") {
        pomodoroMinute = setWork;
        this.message = "Your pomodoro is over";
        // var ytLinks = ["https://www.youtube.com/watch?v=-nHf84N0Iu4", "https://www.youtube.com/watch?v=-nHf84N0Iu4", "https://www.youtube.com/watch?v=-nHf84N0Iu4", "https://www.youtube.com/watch?v=-nHf84N0Iu4"]
        // var random = Math.floor(Math.random() * 4);
        // window.open(ytLinks[random], '_blank');
    }
    minutes.innerHTML = DoubleDigit(pomodoroMinute+1);
    second = 60;
    seconds.innerHTML = DoubleDigit(0);
    Load();
    
    
}
function ShowMenu(id)
{
    document.getElementById(id).style.height = "250px";
}
function HideMenu(id)
{
    document.getElementById(id).style.height = "0px";
}

//This Function Takes Values of 2 Inputs ant sets whose values if not not Nan to setWork parameter and setPause parameter
function SaveSettings()
{
    //Inputs from setting for setWork and setPause, Defaults:24,4; 
    var workTime = parseInt(document.getElementById("pomodoro-time").value);
    var pauseTime = parseInt(document.getElementById("pause-time").value);
    if (!(Number.isNaN(workTime)) && workTime > 0) 
    {
        setWork = workTime;
        localStorage.setItem("workTime", setWork);
    }
    if (!(Number.isNaN(pauseTime)) && pauseTime > 0) {
        setPause = pauseTime;
        localStorage.setItem("pauseTime", setPause);
    }
    if (!(Number.isNaN(parseInt(perSauceDOM.value))) && parseInt(perSauceDOM.value) > 0) {
        localStorage.setItem("perSauce", parseInt(perSauceDOM.value));
    }

    location.reload();
    document.getElementById("settings").style.height = "0px";

}
//if the number is a singe digit add "0" for better formating
function DoubleDigit(num)
{
    var number = ""+num;
    if(number.length == 1)
    {
        return "0"+num;
    }
    else{return num}
}
