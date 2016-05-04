var status = 0,
  score = 0,
  strict = 0,
  click = 0,
  sequence = [],
  response = [],
  r = document.getElementById('redTile'),
  b = document.getElementById('blueTile'),
  y = document.getElementById('yellowTile'),
  g = document.getElementById('greenTile'),
  s = document.getElementById('displayScore'),
  audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

function resetAll() {
  status = 0;
  score = 0;

  s.innerHTML = 'Round: ' + score + ' |';

  sequence = [];
  response = [];
}

$("#start").click(function() {
  resetAll();
  status = 1;
  nextRound()
});

function nextRound() {
  addStep();
  animateSequence();
  response = [];
  s.innerHTML = 'Round: ' + score + ' |';
}

$(r).click(function() {
  if (status != 0) {
    playSong(2);
    response.push(2);
    checkLoss();
  } else {
    playSong(2);
  }
});
$(g).click(function() {
  if (status != 0) {
    playSong(4);
    response.push(4);
    checkLoss();
  } else {
    playSong(4);
  }
});
$(b).click(function() {
  if (status != 0) {
    playSong(1);
    response.push(1);
    checkLoss();
  } else {
    playSong(1);
  }
});
$(y).click(function() {
  if (status != 0) {
    playSong(3);
    response.push(3);
    checkLoss();
  } else {
    playSong(3);
  }
});

function playSong(song) {
  switch (song) {
    case 1:
      audio1.play();
      break;
    case 2:
      audio2.play();
      break;
    case 3:
      audio3.play();
      break;
    case 4:
      audio4.play();
      break;
  }
}

function checkLoss() {
  var s = sequence.length;

  console.log("response " + response);
  console.log("sequence " + sequence);
  console.log("click " + click);

  checkAll();

  if (status != 0) {
    upOne();
  }
}

function checkAll() {
  var r = response.length;

  for (i = 0; i < r; i++) {
    if (response[i] != sequence[i]) {
      alert('Wront step! Sorry');
      resetAll();
      return;
    }
  }
}

function upOne() {
  if (response.length === sequence.length) {
    score++;
    nextRound();
  }
}

function addStep() {
  response = [];
  sequence.push(newTile());
}

function newTile() {
  return Math.floor((Math.random() * 4) + 1);
}

function animateSequence() {
  var c = 0;
  var interval = setInterval(function() {
    lightTile(sequence[c]);

    c++;
    if (c >= sequence.length) {
      clearInterval(interval);
    }
  }, 600);
}

function lightTile(tile) {
  switch (tile) {
    case 1:
      var $tile = $(b).addClass('light');
      window.setTimeout(function() {
        $tile.removeClass('light');
        playSong(1);
      }, 300);
      break;
    case 2:
      var $tile = $(r).addClass('light');
      window.setTimeout(function() {
        $tile.removeClass('light');
        playSong(2);
      }, 300);
      break;
    case 3:
      var $tile = $(y).addClass('light');
      window.setTimeout(function() {
        $tile.removeClass('light');
        playSong(3);
      }, 300);
      break;
    case 4:
      var $tile = $(g).addClass('light');
      window.setTimeout(function() {
        $tile.removeClass('light');
        playSong(4);
      }, 300);
      break;
  }
}
