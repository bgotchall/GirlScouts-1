// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);


$.get('/api/news', function (data) {
  for (let i = 0; i < data.length; i++) {
    var div = $("<div>");
    div.addClass("news-div")
    div.append("<p>" + "<strong>"  + "</strong>" + data[i].author + ": </p>");
    div.append("<p>" + "<strong>" + "date: " + "</strong>" + data[i].newsDate + "</p>");
    div.append("<p>" + "<strong>" + "title: " + "</strong>" + data[i].title + "</p>");
    div.append("<p>" + "<strong>" + "detail: " + "</strong>" + data[i].newsDetail + "</p>");
   

    $("#news").append(div);
  }
})

$("#submit-chat").on("click", function (event) {
  event.preventDefault();
  var newChat = {
    chatComments: $("#chatComments").val().trim()
  }
  $.post('/api/blog', newChat).then(function () {
    location.reload();
  })
})

$.get('/api/blog', function (data) {
  for (let i = 0; i < data.length; i++) {
    var chatDiv = $("<div>");
    var reply = $("<button>");
    reply.addClass("reply");
    reply.text("reply");
    chatDiv.addClass("comments");
    chatDiv.text(data[i].chatComments + " posted by: " + data[i].createdAt)
    $("#posted-comments").append(chatDiv);
    $("#posted-comments").append(reply)
    //name here
    respond(reply, chatDiv);
  }
})

function respond(reply, chatDiv) {
  reply.on("click", function () {
    var replyInput = $("<input>");
    replyInput.addClass("replyInput");
    replyInput.text("hello")
    chatDiv.append(replyInput);
    //make reply show
  })
}


$(document).ready(function () {

  $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
  });


});

setInterval(function(){ 
  $('.carousel.carousel-slider').carousel('next');

}, 4000);



/////////////////disquss integration/////////////////////



/**
*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/

var disqus_config = function () {
  this.page.url = "http://localhost:3000/";  // Replace PAGE_URL with your page's canonical URL variable
  this.page.identifier = 21; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};

(function () { // DON'T EDIT BELOW THIS LINE
  var d = document, s = d.createElement('script');
  s.src = 'https://gs1690.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
})();

