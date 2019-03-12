// Variables for holding data

// HTML elements needed
// 1. form for entering data ** DONE
// 2. table for displaying data dynamically -- both on intialization of page, when app renders data from database, and when user enters new train information into the database ** DONE
// 3. place for modal to display ** DONE

// JS elements and functions needed
// 1. configuration of firebase database ** DONE
// 2. initiailization of firebase database ** DONE
// 3. funciton to push form data to database (new trains) -- to write new information to the DOM -- use display news articles example from newsreader ** DONE
// 4. function to pull data from database (when app launched) -- use create buttons example from newsreader  ** DONE
// 5. function to calculate next arrival (moment.js)
// 6. function to calculate minutes away (moment.js)
// 7. modal for alerting user to successful entry ** DONE

// Other notes
// 1. don't forget to load moment.js library

var frequency = 0;
var firstRun = "";
var toStation = "";
var firstTrain = "";
var elapsedMinutes = "";
var prochainTrain = "";
var toStation = "";
var nextArrival = ""; // "Next Arrival" in the table. Not entered by user. Calculated using moment.js based on time of first run and current time.
var minutesAway = ""; // "Minutes Away" in the table. Not entered by user. Candulated using moment.js based on nextArrival and current time.
var trainName = "";
var destination = "";
var frequency = "";
var firstRun = "";


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCkxMF68Nyb17ZEwQKpeU9e7Y0I-vfz8Jk",
    authDomain: "sodortrains-79f02.firebaseapp.com",
    databaseURL: "https://sodortrains-79f02.firebaseio.com",
    projectId: "sodortrains-79f02",
    storageBucket: "sodortrains-79f02.appspot.com",
    messagingSenderId: "936529788510"
};
firebase.initializeApp(config);
var database = firebase.database();
$("#add-train").on("click", function (event) {
    event.preventDefault();
    modalLauncher();
    var trainName = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    var firstRun = $("#firstRun-input").val().trim();
    var newTrain = {
        trainNameFB: trainName,
        destinationFB: destination,
        frequencyFB: frequency,
        firstRunFB: firstRun
    };
    database.ref().push(newTrain);
})

database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();
    var newTrainDiv = $("<tr>");
    firstTrain = moment(sv.firstRunFB, "HH:mm").subtract(1, "years");
    console.log("this is the first train time: " + firstTrain);
    console.log("this is the time of the first run, from firebase: " + sv.firstRunFB);
    elapsedMinutes = moment().diff(moment(firstTrain), "minutes")
    console.log("these are the minutes elapsed since the train began running: " + elapsedMinutes);
    console.log("this is how often the train runs, in minutes: " + sv.frequencyFB);
    prochainTrain = elapsedMinutes % sv.frequencyFB;
    console.log("this is the remainder - % - of elapsed minutes-frequency: " + prochainTrain);
    toStation = sv.frequencyFB - prochainTrain;
    console.log("this is the time it will take the train to get to the station: " + toStation);
    nextArrival = moment().add(toStation, 'minutes').format('hh:mm');
    console.log("this is the time at which the next train will arrive: " + nextArrival);
    var name = $("<td>").text(sv.trainNameFB);
    var dest = $("<td>").text(sv.destinationFB);
    var freq = $("<td>").text(sv.frequencyFB);
    var next = $("<td>").text(nextArrival);
    var mins = $("<td>").text(toStation);
    newTrainDiv.append(name);
    newTrainDiv.append(dest);
    newTrainDiv.append(freq);
    newTrainDiv.append(next);
    newTrainDiv.append(mins);
    $("#schedule-table").append(newTrainDiv);
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

function modalLauncher() {
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }
}


