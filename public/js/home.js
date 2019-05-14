$(document).ready(function() {
  //On-click to get reviews
  $(".reviews").on("click", function(event) {
    event.preventDefault();
    console.log($(this).attr("value"));
    let MovieId = $(this).attr("value");
    let MovieTitle = $(this).attr("title");
    $.get("/api/reviews/" + MovieId, function(response) {
      console.log(response);
    }).then((result) => {
      if (result.length >= 1) {
      $(".modal-title").html(MovieTitle + " Reviews!");
      //Loop through all reviews for that movie
      result.forEach((review) => {
        $("#review").html(review.text);
      })
      $("#review-modal").modal("toggle");
    } else {
      $(".modal-title").html(MovieTitle + " Reviews!");
      $("#review").html("There are no reviews!");
      $("#review-modal").modal("toggle");
    }
    })
  });
  //On-click to leave a review inside modal
  $(".add").on("click", function(event) {
    event.preventDefault();
    let reviewForm = $("<form>");
    let formGroup = $("<div>").addClass("form-group");
    let reviewLabel = $("<label>").attr("for", "message");
    reviewLabel.addClass("col-form-label");
    reviewLabel.text("What did you think?");
    let reviewText = $("<textarea>").addClass("form-control");
    reviewText.attr("id", "message");
    reviewText.attr("placeholder", "Leave review here");
    let submitReview = $("<button>").attr("type", "submit");
    submitReview.text("Submit Review");
    formGroup.append(reviewLabel);
    formGroup.append(reviewText);
    formGroup.append(submitReview);
    reviewForm.append(formGroup);
    $(".modal-body").html(reviewForm);
  });  
  //On-click to clear modal body for later use
  $(".exit").on("click", function(event) {
    $(".modal-body").val("");
  })
});