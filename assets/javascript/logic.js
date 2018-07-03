  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBHXITJYd5PDGHXRg8nWq7cqBiXiXzlZmI",
    authDomain: "train-scheduler-20530.firebaseapp.com",
    databaseURL: "https://train-scheduler-20530.firebaseio.com",
    projectId: "train-scheduler-20530",
    storageBucket: "train-scheduler-20530.appspot.com",
    messagingSenderId: "355321402197"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $('#newTrainSubmit').on('click', function (event) {
    event.preventDefault();

    var name = $('#nameInput').val().trim();
    var destination = $('#destInput').val().trim();
    var firstTime = $('#firstTimeInput').val().trim();
    var frequency = $('#frequencyInput').val().trim();

    database.ref().push({
      name: name,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency
    })

    // Clears all of the text-boxes
    $("#nameInput").val("");
    $("#destInput").val("");
    $("#firstTimeInput").val("");
    $("#frequencyInput").val("");
  });

  database.ref().on('child_added', function(childSnapshot) {
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainFirstTime = childSnapshot.val().firstTime;
    var trainFreq = childSnapshot.val().frequency;
  })