$(document).ready(function() {
  var xmlFinal;
  var xml;
  var quote = '';
  var author = '';
  var category = '';
  
  newQuote();
  
  $('#newQuoteButton').click(function(){
    newQuote();
  })
  
  //console.log(xmlData.split(',');
})

//global variables


function newQuote() {
  // get a new quote through API call
  // this is a generic call method
  // need to specify headers separately in function call for token/other settings
  $.ajax({
    type: 'GET',
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies',
    dataType: 'json',
    success: function(data) {
      console.log('Success on API');
      xml = data;
      saveData(xml);
    },
    error: function() {
      alert('Try again.');
    },
    beforeSend: setHeader
  });
}

function saveData(data) {
  xmlFinal = data;
  
  quote = xmlFinal.quote;
  author = xmlFinal.author;
  category = xmlFinal.category;
  
   $('#tweet').attr({
    href: ('http://twitter.com/home/?status=' + quote + ' - ' + author)
  });

  // email button
  $('#email').attr({
    href: ('mailto:?subject=Check out this cool quote I found!&body='+ quote + ' - ' + author)
  })
  
  // finally update quote and author
  document.getElementById('quote').textContent=quote;
  document.getElementById('author').textContent=author;
}

function setHeader(xyz) {
  xyz.setRequestHeader('X-Mashape-Key', 'NTpUv8ZgnZmshV2fpmtvavzeH4tKp1H8AX5jsn4yAd7Lld6VS2');
  xyz.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xyz.setRequestHeader('Accept', 'application/json')
}


