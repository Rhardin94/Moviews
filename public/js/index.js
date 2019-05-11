$(document).ready(function() {

  let textInput = $("#review-text");
  let spoilerInput = $("#review-spoiler");
  let movieIdInput = $("#review-movienum");
  let reviewList = $(".reviews");
  let reviewContainer = $(".review-container");

//adding event listeners to the form to create a new review
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

});


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
