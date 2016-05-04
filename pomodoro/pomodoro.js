t = 1;
// 0 = stopped 1 = running
var btnStatus = 0;
// 0 = stopped 1 = session -1 = break
var restBreak = 0;
var trigger;
var sessionClock;
var restClock;

$(document).ready(function() {
  trigger = document.getElementById('trig');
  sessionClock = document.getElementById('wT');
  restClock = document.getElementById('bT');

  sessionClock.innerHTML = toStartTime(time);
  restClock.innerHTML = toStartTime(rest);
});

function toStartTime(t) {
  // max of 99 minutes
  // min of zero
  if (t > 99) {
    t = 99;
  } else if (t < 0) {
    t = 0;
  }

  if (t > 9) {
    return t + ':00';
  } else {
    return '0' + t + ':00';
  }
}

$("#start").click(function() {
  if (btnStatus === 0 && time != 0) {
    // call start
    trigger.className = 'btn btn-sm btn-primary trigger center-block';
    trigger.innerHTML = 'STOP'
    btnStatus = 1;

    restBreak = 1;
    sessionStart();
  } else {
    // call stop
    resetAll();
  }
});

function sessionStart() {
  if (restBreak === 0) {
    resetAll();
    return;
  } else if (restBreak === 1) {
    startClock('wT', time * 60);
  } else if (restBreak === -1) {
    startClock('bT', rest * 60);
  }
}

function startClock(id, runTime) {
  var clock = document.getElementById(id);
  var t = runTime;

  var timeInterval = setInterval(function() {
    if (t <= 0) {
      if (restBreak === -1) {
        alert('Break Time is over');
      } else if (restBreak === 1) {
        alert('Time for a break!');
      } else {
        resetAll();
        return;
      }
      clearInterval(timeInterval);
      restBreak *= -1;
      sessionStart();
    }

    if (restBreak === 0) {
      t = 0;
      clearInterval(timeInterval);
    } else {
      clock.innerHTML = displayTime(t);
      t--;
    }
  }, 1000);
}

function displayTime(t) {
  var minutes = Math.floor(t / 60);
  var seconds = t - minutes * 60;

  minutes = minutes.toString();
  seconds = seconds.toString();

  if (minutes.length === 1) {
    minutes = '0' + minutes;
  }
  if (seconds.length === 1) {
    seconds = '0' + seconds;
  }

  var display = minutes + ':' + seconds;

  return display;
}

function resetAll() {
  time = 0;
  rest = 0;
  btnStatus = 0;
  restBreak = 0;

  //trigger reset 
  trigger.className = 'btn btn-sm btn-success trigger center-block'
  trigger.innerHTML = 'START'
  restClock.innerHTML = toStartTime(rest);
  sessionClock.innerHTML = toStartTime(time);
}

// ignore click if running
// plus time 
$("#sp").click(function() {
  if (btnStatus === 0) {
    time++;
    sessionClock.innerHTML = toStartTime(time);
  }
});
// plus break
$("#bp").click(function() {
  if (btnStatus === 0) {
    rest++;
    restClock.innerHTML = toStartTime(rest);
  }
});
// minus time
$("#sm").click(function() {
  if (btnStatus === 0) {
    time--;
    sessionClock.innerHTML = toStartTime(time);
  }
});
// minus break
$("#bm").click(function() {
  if (btnStatus === 0) {
    rest--;
    restClock.innerHTML = toStartTime(rest);
  }
});
