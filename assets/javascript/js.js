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
		//firstTrain = moment($("#firstTrain1").val().trim()).format("HH:mm");
		firstTrain = $("#firstTrain1").val().trim();
		frequency = $("#frequency1").val().trim();
    clear();
	}
	$("#onClick").on("click",function(){
	  event.preventDefault();
		saveInput();
    
    
		database.ref().push({
			trainName: trainName,
			destination: destination,
			firstTrain: firstTrain,
			frequency: frequency

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







      // Log the value of the various properties
      $("#trainSchedule").append
      ("<tr><td>" + snapshot.val().trainName + "</td><td>" +snapshot.val().destination+ "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().nextArrival + "</td><td>" + snapshot.val().minutesAway +"</td></tr>"); 
      // console.log(snapshot.val().trainName);
      // console.log(snapshot.val().destination);
      // console.log(snapshot.val().firstTrain);
      // console.log(snapshot.val().frequency);

      // Change the HTML
      // $("#displayed-lastObj
     // ").html(snapshot.val().name + " | " + snapshot.val().age + " | " + snapshot.val().phone);

    //   // If any errors are experienced, log them to console.
     }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
     });
});