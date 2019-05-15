/* eslint-disable no-undef */
//Waits for HTML/Handlebars to load before running scripts
$(document).ready(function () {
  let spoilers = false;
  //On-click to turn spoilers on or off
  $(".spoilers").on("click", function (event) {
    event.preventDefault();
    if (spoilers === false) {
      spoilers = true;
      $(".spoilers").text("Spoilers On");
    } else {
      spoilers = false;
      $(".spoilers").text("Spoilers Off");
    }
  });
  //On-click to get reviews
  $(".reviews").on("click", function (event) {
    //Prevent buttons from navigating away from page
    event.preventDefault();
    //assigning the movie's id to a variable
    let MovieId = $(this).attr("value");
    //assign the movie's title to a variable
    let MovieTitle = $(this).attr("title");
    if (!spoilers) {
      //ajax request to retrive reviews of selected movie
      $.get("/api/reviews/" + MovieId, function() {
      }).then((result) => {
        //Checking if there a reviews for movie
        //If there are
        if (result.length >= 1) {
          //Set the modal's title to the include the movie title
          $(".modal-title").html(MovieTitle + " Reviews!");
          $(".modal-title").attr("MovieId", MovieId);
          //Empty the modal body to have only the requested reviews
          $(".modal-body").empty();
          //Loop through all reviews for that movie
          result.forEach((review) => {
            //Set the modal body's text to each review
            let reviewDiv = $("<div>").addClass("reviewDiv");
            // eslint-disable-next-line quotes
            let reviewText = $("<p style= 'font: italic small-caps bold 16px cursive;'>").text('"' + review.text + '"');
            reviewDiv.append(reviewText);
            $(".modal-body").append(reviewDiv);
          });
          //Toggle the modal to appear
          $("#review-modal").modal("toggle");
          //Or if no reviews available
        } else {
          //Still set modal title
          $(".modal-title").html(MovieTitle + " Reviews!");
          //Empty the modal body to have only the requested reviews
          $(".modal-body").empty();
          //Set modal body to indicate lack of reviews
          $("#review").html("There are no reviews!");
          //Make the modal appear
          $("#review-modal").modal("toggle");
        }
      });
    } else {
      //ajax request to retrive reviews of selected movie
      $.get("/api/allreviews/" + MovieId, function() {
      }).then((result) => {
        //Checking if there a reviews for movie
        //If there are
        if (result.length >= 1) {
          //Set the modal's title to the include the movie title
          $(".modal-title").html(MovieTitle + " Reviews!");
          $(".modal-title").attr("MovieId", MovieId);
          //Empty the modal body to have only the requested reviews
          $(".modal-body").empty();
          //Loop through all reviews for that movie
          result.forEach((review) => {
            //Set the modal body's text to each review
            let reviewDiv = $("<div>").addClass("reviewDiv");
            // eslint-disable-next-line quotes
            let reviewText = $("<p style= 'font: italic small-caps bold 16px cursive;'>").text('"' + review.text + '"');
            reviewDiv.append(reviewText);
            $(".modal-body").append(reviewDiv);
          });
          //Toggle the modal to appear
          $("#review-modal").modal("toggle");
          //Or if no reviews available
        } else {
          //Still set modal title
          $(".modal-title").html(MovieTitle + " Reviews!");
          //Empty the modal body to have only the requested reviews
          $(".modal-body").empty();
          //Set modal body to indicate lack of reviews
          $("#review").html("There are no reviews!");
          //Make the modal appear
          $("#review-modal").modal("toggle");
        }
      });
    }
  });
  //On-click to leave a review inside modal
  $(".add").on("click", function(event) {
    //Prevent button from closing modal
    event.preventDefault();
    //Creating form via jQuery
    //base form tag
    let reviewForm = $("<form>");
    //form group inside bootstrap form
    let formGroup = $("<div>").addClass("form-group");
    //Label for textarea
    let reviewLabel = $("<label style='font: italic small-caps bold 24px cursive'>").attr("for", "message");
    reviewLabel.addClass("col-form-label m-1 review-label");
    reviewLabel.text("What did you think? Check this box if your review contains a spoiler!");
    //Actual text area to capture review message
    let reviewText = $("<textarea>").addClass("form-control review-text");
    reviewText.attr("id", "message");
    reviewText.attr("placeholder", "Leave review here");
    //Actual spoiler button
    let spoilerBtn = $("<input>").attr("type", "checkbox");
    spoilerBtn.attr("contains-spoiler", false);
    spoilerBtn.attr("checked");
    spoilerBtn.addClass("spoiler");
    //submit button for review
    let submitReview = $("<button style= 'font: italic small-caps bold 16px cursive'>").attr("type", "submit");
    submitReview.addClass("submitBtn btn btn-secondary");
    submitReview.text("Submit Review");
    //append each element to the form group div
    formGroup.append(reviewLabel);
    formGroup.append(spoilerBtn);
    formGroup.append(reviewText);
    formGroup.append(submitReview);
    //Append the form-group div to the form
    reviewForm.append(formGroup);
    //Set the modal-body to contain the form
    $(".modal-body").html(reviewForm);
  });
  //On-click to assign spoiler boolean to review via checkbox
  // solution found here: "https://www.tutorialrepublic.com/faq/how-to-check-a-checkbox-is-checked-or-not-using-jquery.php"
  $(document).on("click", ".spoiler", function() {
    if ($(this).prop("checked") === true) {
      $(this).attr("contains-spoiler", true);
    } else {
      $(this).attr("contains-spoiler", false);
    }
  });
  //On-click to submit review
  $(document).on("click", ".submitBtn", function(event) {
    //prevent submit button from refreshing page
    event.preventDefault();
    //Updates modal text if review text is blank
    if ($(".review-text").val() === "") {
      $(".review-label").text("You need to leave an actual review! Also make sure to check box if it contains a spoiler!");
    } else {
      //create object that contains new review
      let newReview = {
        text: $(".review-text").val().trim(),
        spoiler: $(".spoiler").attr("contains-spoiler"),
        MovieId: $(".modal-title").attr("MovieId")
      };
      //Sends the post request to create a new review
      $.post("/api/reviews/add", newReview, function(){
      }).then(function() {
        $(".modal-body").empty();
        $("#review-modal").modal("toggle");
      });
    }
  });
});