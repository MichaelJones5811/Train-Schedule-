
  var config = {
    apiKey: "AIzaSyAA7-IFg1XCga_pzEWc4aD5rp_v8PZR0iU",
    authDomain: "trainschedule-44b7e.firebaseapp.com",
    databaseURL: "https://trainschedule-44b7e.firebaseio.com",
    projectId: "trainschedule-44b7e",
    storageBucket: "trainschedule-44b7e.appspot.com",
    messagingSenderId: "29937924632"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";
var nextArrival = "";
var minutesAway = "";
var firstTimeConverted = "";
var currentTime = "";
var diffTime = "";
var tRemainder = "";
var tMinutesTillTrain = "";
var nextTrain = "";

$(document).ready(function(){
// clear the input boxs in the html
  function clear(){
    $("#trainName1").val("");
    $("#destination1").val("");
    $("#firstTrain1").val("");
    $("#frequency1").val(""); 

  }

	// on click to store the input values from the texts boxes
	$("#onClick").on("click",function(){
	  event.preventDefault();
    trainName = $("#trainName1").val().trim();
    destination = $("#destination1").val().trim();
    firstTrain = $("#firstTrain1").val().trim();
    frequency = $("#frequency1").val().trim();
   
	   database.ref().push({
			trainName: trainName,
			destination: destination,
			firstTrain: firstTrain,
			frequency: frequency,
		});		
	});

	database.ref().on("child_added", function(snapshot) {

      // Print the initial data to the console.
      console.log(snapshot.val());   
      console.log(snapshot.val().trainName);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().firstTrain);
      console.log(snapshot.val().frequency);
      // calulated fields
    firstTimeConverted = moment(snapshot.val().firstTrain,"hh:mm").subtract(1,"years");
    currentTime = moment();
    diffTime = moment().diff(moment(firstTimeConverted),"minutes");
    tRemainder = diffTime % snapshot.val().frequency;
    tMinutesTillTrain = snapshot.val().frequency - tRemainder;
    nextTrain = moment().add(tMinutesTillTrain,"minutes");
      //console out calulated fields
     console.log("first converted: " + firstTimeConverted);
     console.log("currentTime: " + moment(currentTime).format("hh:mm"));
     console.log("diffTime " + diffTime);
     console.log("tRemainder: "+ tRemainder);
     console.log("minute till train " + tMinutesTillTrain);
     console.log("next train" + moment(nextTrain).format("hh:mm"));

      // Log the value of the various properties
      $("#trainSchedule").append
      ("<tr><td>" + snapshot.val().trainName + "</td><td>" +snapshot.val().destination+ "</td><td>" 
        + snapshot.val().frequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain +"</td></tr>"); 
     

          //   // If any errors are experienced, log them to console.
     }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
     });
});