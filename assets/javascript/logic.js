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

    var timeNow = moment();
    moment(timeNow).format('HH:mm');
    console.log(timeNow);

    var trainTime = moment(trainFirstTime, 'HH:mm').subtract(1, 'years');
    console.log(trainTime);

    var timeDiff = (moment(timeNow).diff((trainTime), "minutes"));
    console.log(timeDiff);

    var remainder = timeDiff % trainFreq;
    console.log(remainder);

    var minAway = trainFreq - remainder;
    console.log(minAway);

    var nextArrival = moment(moment(), 'hh:mm').add(minAway, 'minutes');
    var nextArrivalTime = moment(nextArrival).format("hh:mm:ss a")
    console.log(nextArrival);

    var newRow = $('<tr>');
    newRow.append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(nextArrivalTime),
      $("<td>").text(minAway)
    );

    $('tbody').append(newRow);

  })


