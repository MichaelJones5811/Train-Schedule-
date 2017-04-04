  alert("hello world");

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

  // var connectionsRef = database.ref("/connections");

  // var connectedRef = database.ref(".info/connected");

  // connectedRef.on("value",function(snap){
  // 	if(snap.val()){
  // 		var con = connctionsRef.push(true);
  // 		con.onDisconnect().remove();

  // 	}
  // });

  // connectionsRef.on("value",function(snap){


  // });

// 
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
  // saves the data in the input boxes
	function saveInput(){
		trainName = $("#trainName1").val().trim();
		destination = $("#destination1").val().trim();
		firstTrain = $("#firstTrain1").val().trim();
		frequency = $("#frequency1").val().trim();
    firstTimeConverted = moment(firstTrain,"hh:mm").subtract(1,"years");
    currentTime = moment();
    diffTime = moment().diff(moment(firstTimeConverted),"minutes");
    tRemainder = diffTime % frequency;
    tMinutesTillTrain = frequency - tRemainder;
    nextTrain = moment().add(tMinutesTillTrain, "hh:mm");

    //clear();
	}
	$("#onClick").on("click",function(){
	  event.preventDefault();
		saveInput();
    //console.log("here:");
		database.ref().push({
			trainName: trainName,
			destination: destination,
			firstTrain: firstTrain,
     //firstTimeConverted: firstTimeConverted,
			frequency: frequency,
      tMinutesTillTrain: tMinutesTillTrain,
     //nextTrain: nextTrain

		});		
	});

	database.ref().on("child_added", function(snapshot) {

      // Print the initial data to the console.
       console.log(snapshot.val());

       
      console.log(snapshot.val().trainName);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().frequency);
      console.log(snapshot.val().nextArrival);
      console.log(snapshot.val().minutesAway);
     // console.log("here: " + snapshot.val().firstTimeConverted);

     console.log("here: " + firstTimeConverted);
     console.log("here: " + moment(currentTime).format("hh:mm"));
     console.log("here: " + diffTime);
     console.log("diffTime: "+ tRemainder);
     console.log("minute till train " + tMinutesTillTrain);
     console.log("next train" + nextTrain);

      // Log the value of the various properties
      $("#trainSchedule").append
      ("<tr><td>" + snapshot.val().trainName + "</td><td>" +snapshot.val().destination+ "</td><td>" 
        + snapshot.val().frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain +"</td></tr>"); 
      // console.log(snapshot.val().trainName);
      // console.log(snapshot.val().destination);
      // console.log(snapshot.val().firstTrain);
      // console.log(snapshot.val().frequency);

          //   // If any errors are experienced, log them to console.
     }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
     });
});