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

$(document).ready(function(){
	function saveInput(){
		trainName = $("#trainName1").val().trim();
		destination = $("#destination1").val().trim();
		firstTrain = $("#firstTrain1").val().trim();
		frequency = $("#frequency1").val().trim();
	}
	$("#onClick").on("click",function(){
	  event.preventDefault();
		saveInput();
		
		// console.log(trainName);
		// console.log(destination);
		// console.log(firstTrain);
		// console.log(frequency);

		database.ref().set({
			trainName: trainName,
			destination: destination,
			firstTrain: firstTrain,
			frequency: frequency

		});		
	});

	database.ref().on("value", function(snapshot) {

      // Print the initial data to the console.
      console.log(snapshot.val());

      // Log the value of the various properties
      console.log(snapshot.val().trainName);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().firstTrain);
      console.log(snapshot.val().frequency);

      // Change the HTML
      // $("#displayed-data").html(snapshot.val().name + " | " + snapshot.val().age + " | " + snapshot.val().phone);

    //   // If any errors are experienced, log them to console.
     }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
     });
});