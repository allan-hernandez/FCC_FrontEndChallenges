// code from http://codepen.io/allan-hernandez/pen/jWRqgd 

//default to start 


var js = {
    "particles": {
      "number": {
        "value": 300,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": '#FFFFFF'
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": .6,
        "random": false,
        "anim": {
          "enable": true,
          "speed": 2,
          "opacity_min": 0.4,
          "sync": false
        }
      },
      "size": {
        "value": 7,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 5,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          // seemed to be eneabled by default
          "enable": false,
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "bubble": {
          "distance": 400,
          "size": 100,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
  };

//default to start
var particleColor = '#FFFFFF';
var particleSize = 7;
var shapeOn = false;
var wind = '1';

$(document).ready(function() {
  // need location
  // gets from browser, lat / lon
  // this is an awful way of doing this I'm convinced. I struggled too long with trying to get callbacks working after API calls. This works though. I hope to refactor this soon. 
  getLocation();
});

// if available jump on
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// lat lon
function showPosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  getWeather(lat, lon)
}

// call api 
function getWeather(lat, lon) {
  var urlWeather = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=643f1d7e7538383478c0cdb4ea828394&units=imperial';

  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: urlWeather,
    success: function(results) {
      // store results - pass on
      weather = results.main;
      setWeather(results.weather[0].main, results.main.temp, results.wind.speed, results.name,results.weather[0].description);
    },
    error: function() {
      alert('Not able to get location from IP');
    }
  });
}

// update particles variables
function setWeather(conditions, temp, speed, city, description) {
  var message = "In " + city + "<br> Temperature: " + temp + "F <br> Conditions: " + conditions + ',<br>' + description;
  // update the text 
  var text = document.getElementById("weather");
  text.innerHTML = message;

  // update particle vals 
  /* var particleColor = '#FFFFFF';
    var particleSize = 7;
    var shapeOn = false;
    var wind = '1'; */
    /*
var particleColor = #ffffff;
var particleSize = #3-7;
var shapeOn = true;
var shapeType = circle - snow - blue on black
  - rain - triangle - blue on black
  - nighttime clean - star white - black
  - daytime sun - polygon yellow blue blackground
var wind = speed;
*/

  // keep it from being too hectic
  js.particles.move.speed = speed/5;

  // ifs on ifs on ifs
  switch(conditions) {
    case 'Rain':
      js.particles.color.value = '#08B2E3';
      js.particles.size.value = '3';
      js.particles.number.value = '600';
      break;
    case 'Snow':
      js.particles.color.value = '#EFE9F4';
      js.particles.size.value = '7';
      js.particles.number.value = '300';
      break;
    case 'Thunderstorm':
      js.particles.color.value = '#57166B';
      js.particles.size.value = '7';
      js.particles.number.value = '300';
      // make these hectic
      js.particles.move.speed *= 2;
      break;
    case 'Clouds':
      js.particles.color.value = '#DDFFF7';
      js.particles.size.value = '40';
      js.particles.number.value = '150';
      // slow
      js.particles.move.speed /= 3;
      break;
    case 'Mist':
      js.particles.color.value = '#A1D2CE';
      js.particles.size.value = '30';
      js.particles.number.value = '175';
      // slow
      js.particles.move.speed /= 5;
      break;
    case 'Fog':
      js.particles.color.value = '#CDF7F6';
      js.particles.size.value = '45';
      js.particles.number.value = '250';
      // slow
      js.particles.move.speed /= 7;
      break;
    case 'Clear':
      js.particles.color.value = '#FFD70F';
      js.particles.size.value = '30';
      js.particles.number.value = '100';
      js.particles.move.speed = 10;
      break;
    default:
      js.particles.color.value = '#000000';
  }
  
  // render particles
  particlesJS("particles-js",js);
}
