// Other notes
// 3. general stylistic upgrades
// 4. Too many global variables: move any many as possible out of global

var frequency = 0;
var firstRun = "";
var toStation = "";
var firstTrain = "";
var elapsedMinutes = "";
var prochainTrain = "";
var toStation = "";
var nextArrival = ""; 
var minutesAway = "";
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
    var trainName = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    var firstRun = $("#firstRun-input").val().trim();
    if (trainName === "" || destination === "" || frequency === "" || firstRun === "") {
        incompleteModalLauncher();
    } else {
        successModalLauncher();
        var newTrain = {
            trainNameFB: trainName,
            destinationFB: destination,
            frequencyFB: frequency,
            firstRunFB: firstRun
        };
        database.ref().push(newTrain);
    }
})

database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();
    var newTrainDiv = $("<tr>");
    firstTrain = moment(sv.firstRunFB, "HH:mm").subtract(1, "years");
    elapsedMinutes = moment().diff(moment(firstTrain), "minutes")
    prochainTrain = elapsedMinutes % sv.frequencyFB;
    toStation = sv.frequencyFB - prochainTrain;
    nextArrival = moment().add(toStation, 'minutes').format('hh:mm A');
    var name = $("<td>").text(sv.trainNameFB);
    var dest = $("<td>").text(sv.destinationFB);
    var freq = $("<td class='center'>").html(sv.frequencyFB);
    var next = $("<td class='center'>").text(nextArrival);
    var mins = $("<td class='center'>").text(toStation);
    newTrainDiv.append(name);
    newTrainDiv.append(dest);
    newTrainDiv.append(freq);
    newTrainDiv.append(next);
    newTrainDiv.append(mins);
    $("#schedule-table").append(newTrainDiv);
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

function successModalLauncher() {
    var modal = document.getElementById('successModal');
    modal.style.display = "block";
    modal.onclick = function () {
        modal.style.display = "none";
    }
}

function incompleteModalLauncher() {
    var modal = document.getElementById('incompleteModal');
    modal.style.display = "block";
    modal.onclick = function () {
        modal.style.display = "none";
    }
}
