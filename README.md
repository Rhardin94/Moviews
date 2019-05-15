# Moviews
___
## Overview
___
Moviews is a full-stack web app, hosted on heroku, that interacts with the Moviews MySQL Database. It allows the users to read reviews and filter out spoilers via our spoiler toggle feature. It also allows users to write reviews for selected movies once logged in that may or may not contain spoilers, determined by the spoiler checkbox.
## How to use
___
When first opening the site, the user is directed to the signup page.
![signup page](https://rhardin94.github.io/Moviews/assets/images/signup.png)
With the option to sign in if they already have an account.
![signin page](https://rhardin94.github.io/Moviews/assets/images/signin.png)
___
Once signed in, the user is directed to the home page
![home page with movie posters](https://rhardin94.github.io/Moviews/assets/images/home_page.png)
From the home page, the user may toggle spoilers on or off before viewing any reviews to determine their desired content (spoilers are off by default).
![home page with movie posters](https://rhardin94.github.io/Moviews/assets/images/toggle_spoilers.png)
With spoilers on:
![home page with movie posters](https://rhardin94.github.io/Moviews/assets/images/spoilers_on.png)
___
Once the user has determined what content they want displayed they can start reading and writing reviews via the "Reviews" button under each movie poster
![reviews button on home page](https://rhardin94.github.io/Moviews/assets/images/toggle_reviews.png)
Reviews containing spoilers will be hidden by default
![reviews modal with no spoilers](https://rhardin94.github.io/Moviews/assets/images/reviews_modal.png)
And appear alongside non-spoiler reviews once spoilers are turned on
![reviews modal with spoilers](https://rhardin94.github.io/Moviews/assets/images/spoiler_review.png)
___
The user may also leave reviews for their favorite movies
![leave a review modal with spoiler flag off](https://rhardin94.github.io/Moviews/assets/images/leave_review.png)
And if they want to leave a spoiler-filled review, they may mark the spoiler checkbox to flag the review in the database
![leave review modal with spoiler flag on](https://rhardin94.github.io/Moviews/assets/images/leave_spoiler.png)
Once the user hits the submit review button, they are back to the main page with ability to do all of the above once more.
___
When they are finished interacting with the site, they can logout via the logout button at the top of the page(they will not automatically logout until they close the browser).

## Dependencies
___
* [Node.js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)
* [Express](https://www.npmjs.com/search?q=express)
* [Express-handlebars](https://www.npmjs.com/package/express-handlebars)
* [Express-session](https://www.npmjs.com/package/express-session)
* [Passport](https://www.npmjs.com/package/passport)
* [Bcrpyt](https://www.npmjs.com/package/bcrypt)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [MySQL2](https://www.npmjs.com/package/mysql2)
* [Handlebars](https://www.npmjs.com/package/handlebars)
* [Bootstrap](https://getbootstrap.com/)