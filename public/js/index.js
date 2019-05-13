$(document).ready(function() {
  const posterContainer = $(".poster-container");
  const reviewContainer = $(".review-container");
//   const newReviewInput = document.querySelector("#new-review");
//   const newReviewText = document.querySelector("#new-review-text");
//   const newReviewSpoiler = document.querySelector("#new-review-spoiled");
 
  // function dataManager(input) {
  //   input.preventDefault();
  //   const { id } = this.dataset;

  //   const data = {
  //     text: newReviewText.val().trim(),
  //     spoiler: newReviewSpoiler.checked,
  //     MovieId: id,
  //     UserId: id
  //   };

  //   axios
  //     .post("/api/reviews", data)
  //     .then(response => {
  //       location.reload(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  // Event listeners

  $(document).on("load", getPosters);
  $(document).on("load", getReviews);

  let posters = [];
  let reviews = [];
  let rowsToAdd = [];
  let cardsToAdd = [];

  function initializePosterRows() {
    rowsToAdd.empty();
    posterContainer.empty();
    for (var i = 0; i < movies.length; i++) {
      cardsToAdd.push(displayPosters(posters[i]));
    }
    posterContainer.prepend(rowsToAdd);
  }

  function initializeReviewRows() {
    rowsToAdd.empty();
    reviewContainer.empty();
    for (var i = 0; i < reviews.length; i++) {
      rowsToAdd.push(createNewRow(reviews[i]));
    }
    reviewContainer.prepend(rowsToAdd);
  }

  //Grab posters from database and update view
  function getPosters() {
    $.get("/api/movies", function(data) {
      posters = data.posterURL;
      console.log(posters);
      initializePosterRows();
    });
  }

  function getReviews() {
    $.get("/api/reviews/:id", function(data) {
      reviews = data;
      console.log(data);
      initializeReviewRows();
    });
  }

  //This function constructs a poster card
  function displayPosters(poster) {
    let newCard = $(
      [
        "<div class='card-deck'>",
        "<div class='card'>",
        "<img class='card-img-top' src=" + posterURL + ">",
        "</div>"
      ].join("")
    );
    newCard.data("poster", poster);
    if (poster.complete) {
      newCard.find("span").css("text-decoration", "line-through");
    }
    return newCard;
  }

  // This function constructs a review row
  function createNewRow(review) {
    let newInputRow = $(
      [
        "<li class='list-group-item todo-item'>",
        "<span>",
        review.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>✓</button>",
        "</li>"
      ].join("")
    );

    newInputRow.data("review", review);
    if (review.complete) {
      newInputRow.find("span").css("text-decoration", "line-through");
    }
    return newInputRow;
  }

// newReviewInput.addEventListener("submit", dataManager);
});

// This function inserts a new review into our database and then updates the view
/*  function insertReview(event) {
    event.preventDefault();
    let review = {
      text: newReviewInput.val().trim(),
      complete: false
    };


}); */

/* 


//-----



$(document).ready(function() {

  let textInput = $("#review-text");
  let spoilerInput = $("#review-spoiler");
  let movieIdInput = $("#review-movienum");
  let reviewList = $(".reviews");
  let reviewContainer = $(".review-container");


//Variable to hold reviews (displayed, not added)
let reviews;

//The code below handles the case where we want to get reviews for a specific movie
//Looks for a query param in the URL for MovieId

let url = window.location.search;
let MovieId;
if (url.indexOf("?MovieId=") !==-1) {
  MovieId= url.split("=")[1];
  getReviews(MovieId);
}

//if no MovieId get all the reviews as usual
else{
  getReviews();
}

//Function grabs reviews from the database and updates the view
function getReviews(movie) {
  MovieId = movie || "";
  if (MovieId) {
    MovieId = "/?MovieId=" + MovieId;
  } 
$.get("/api/reviews" + MovieId, function(data) {
  console.log("Reviews", data);
  reviews = data;
  if (!reviews || !reviews.length) {
    displayEmpty(movie);
  }
  else {
    initializeRows();
  }
});
}

//InitializeRows handles appending constructed review HTML inside blogContainer

function initializeRows() {
  reviewContainer.empty();
  let reviewsToAdd = [];
  for (var i = 0; i< reviews.length; i++) {
    reviewsToAdd.push(createNewRow(reviews[i]));
  }
  reviewContainer.append(reviewsToAdd);
}

// Function constructs review HTML
function createNewRow(review) {
  let formattedDate=new Date(review.createdAt);
  formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
  let newReviewCard = $("<div>");
  newReviewCard.addClass("card");
  let newReviewCardHeading = $("<div>");
  newReviewCardHeading.addClass("card-header");
  let newReviewTitle = $("<h2>");
  let newReviewDate = $("<small>");
  let newReviewAuthor = $("<h5>");
  newReviewAuthor.text(review.User.name);
  
  let newReviewCardBody = $("<div>");
  newReviewCardBody.addClass("card-body");
  let newReviewBody = $("<p>");
  newReviewTitle.text(review.title + " ");
  newReviewBody.text(review.body);
  newReviewDate.text(formattedDate);
  newReviewTitle.append(newReviewDate);
  newReviewCardHeading.append(newReviewTitle);
  newReviewCardHeading.append(newReviewAuthor);
  newReviewCardBody.append(newReviewBody);
  newReviewCard.append(newReviewCardHeading);
  newReviewCard.append(newReviewCardBody);
  newReviewCard.data("review", review);
  return newReviewCard;
}


//-------

//adding event listeners to the form to create a new review (adding, not displaying)
//and the button to delete

$(document).on("submit", "#review-form", handleReviewSubmit);
$(document).on("click", ".delete-review", handleDeleteButtonClick);

//Getting the initial dummy reviews
getReviews();

//A function to handle what happens when the form is submitted to create a new Review
function handleReviewSubmit(event) {

  event.preventDefault();
  //Don't do anything if the review hasn't been filled out yet
  if (!textInput.val().trim().trim()) {
    return;
  }
upsertReview({
  text: textInput
  .val()
  .trim()

},
{
  spoiler: spoilerInput
},
{
  MovieId: movieIdInput
});
}

//A function for creating a review. calls getReviews upon completion
function upsertReview(reviewData) {
  $.post("/api/reviews", reviewData)
    .then(getReviews);
}


// function createReviewDiv(reviewData) {
//   let newSection = $("<section if='reviews' class='review section-padding'")

//   <section id="reviews" class="reviews section-padding">
//    <div class="container">
//      <div class="row">
//        <div class="col-12">
//          <div class="section-title-header text-center">
//            <h1 class="section-title wow fadeInUp" data-wow-delay="0.2s">Reviews</h1>
//            <p class="wow fadeInDown" data-wow-delay="0.2s">Only spoiler free content allowed</p>
//          </div>
//        </div>
//      </div>
// }

//Function for retrieving reviews and get them ready to be rendered to the page
function getReviews() {
  $.get("/api/reviews", function(data) {
    let divsToAdd = [];
    for (let i = 0; i < data.length; i++) {
      divsToAdd.push(createReviewDiv(data[i]));
    }
    renderReviewList(divsToAdd);
    textInput.val("");
  });
}

function renderReviewList(divs) {
  reviewList.children().not(":last").remove();
  reviewContainer.children(".alert").remove();
if (divs.length) {
  console.log(divs);
  reviewList.prepend(divs);
}
else {
  renderEmpty();
 }
}

function renderEmpty() {
  let alertDiv = $("<div>");
  alertDiv.addClass("alert alert-danger");
  alertDiv.text("Something went wrong. You can't write a Review.");
  reviewContainer.append(alertDiv);
}

function handleDeleteButtonClick() {
  let dataOnPage = $(this).parent("p").parent("div").data("review");
  let id = dataOnPage.MovieId;
  $.ajax({
    method: "DELETE",
    url: "/api/reviews/" + MovieId
  })
    .then(getReviews);
}
//-------
});
 */

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
