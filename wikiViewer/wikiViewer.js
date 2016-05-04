var searchString = '';
var titles = [];
var summary = [];
var pageId = [];
var urls = [];

$("#welcome").hide();
$("#results").hide();

// on doc load - show main
$(document).ready(function() {
  $("#welcome").fadeIn(1750);
  $("#search").click(function() {
    search();
  });
});

function search() {
  searchString = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';

  var endSearch = document.getElementById('box').value;

  searchString += endSearch;

  updateArticles(searchString);
}

function updateArticles(wiki) {
  summary = [];
  titles = [];
  pageId = [];
  
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: wiki,
    success: function(results) {
      var pages = results.query.pages;

      for (var key in pages) {
        if (pages.hasOwnProperty(key)) {
          summary.push(pages[key].extract);
          titles.push(pages[key].title);
          pageId.push(pages[key].pageid);
        }
      }

      generateList(titles, summary, pageId);
    },
    error: function(results) {
      alert('Invalid Query or Other Error');
      $("#welcome").fadeIn(500);
      $("#results").fadeOut(1500);
    }
  })
};

function generateList(t, s, p) {
  var res = document.getElementById('results');

  $("#welcome").fadeOut(500);
  $("#results").fadeIn(1500);

  for (i = 0; i < t.length; i++) {
    $(res).append(
      '<div id="w' + i + '" class="panel panel-default page-break center-block"><div class="panel-body"><b><a href =https://en.wikipedia.org/?curid=' + p[i] + '>Title</b>: ' + t[i] + '</a><br><b>Summary</b>: ' + s[i] + '</div></div>'
    );
  }
}

//button click

$("#reset").click(function() {
  document.getElementById("box").value = "";

  var ids = [];

  $('.panel').each(function() {
    ids.push(this.id);
  });

  for (i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).remove();
  }

  $("#welcome").fadeIn(500);
  $("#results").fadeOut(1500);
});

$("#box").keyup(function(event) {
  if (event.keyCode == 13) {
    $("#search").click();
  }
});
