// Other notes
// 1. don't forget to load moment.js library ** DONE
// 2. clean up modal
// 3. general stylistic upgrades
// 4. Too many global variables: move any many as possible out of global
// 5. Center data in last three columns
// 6. Table heading should be in color

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
    elapsedMinutes = moment().diff(moment(firstTrain), "minutes")
    prochainTrain = elapsedMinutes % sv.frequencyFB;
    toStation = sv.frequencyFB - prochainTrain;
    nextArrival = moment().add(toStation, 'minutes').format('hh:mm');
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
