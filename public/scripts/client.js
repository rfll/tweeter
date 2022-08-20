/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  // Test / driver code (temporary). Eventually will get this from the server.
  // Fake data taken from initial-tweets.json

  const renderTweets = function(tweets) {
    // Empty tweets container so they don't post twice
    $('#tweets-section').html("");

    // Loop through tweets and post in descending order
    for (let tweet of tweets) {
      $('#tweets-section').prepend(createTweetElement(tweet));
    }
  };

  // Use jQuery to post tweets to page
  const createTweetElement = function(tweetData) {
    const $tweet =
      $(`<article class="tweet-box">
          <header>
            <div id="user-avatar">
              <img src=${(escape(tweetData.user.avatars))}>
              <h3>${escape(tweetData.user.name)}</h3></div>
              <h4 id="handle">${escape(tweetData.user.handle)}</h4>
              </header>
          <h2 id="tweet-body">${escape(tweetData.content.text)}</h2>
          <footer>
            <div>${timeago.format(escape(tweetData.created_at))}</div>
            <div>
              <i class="fa-solid fa-flag flag-icon"></i>
              <i class="fa-solid fa-retweet retweet-icon"></i>
              <i class="fa-solid fa-heart heart-icon"></i>
            </div>
          </footer>
              </article>`
      );
    return $tweet;
  };

  // Post new tweet function
  $(".new-tweet").on("submit", function(event) {
    event.preventDefault();

    // Remove error message when posting a valid tweet
    $("#error").slideUp();

    // Errors if tweet is 0 or more than 140 characters
    if ($("#tweet-text").val().length === 0) {
      $("#error").text("Please type something to post a tweet!").slideDown();
      return;
    }
    if ($("#tweet-text").val().length > 140) {
      $("#error").text("Tweets must be less than 140 characters!").slideDown();
      return;
    }
    $.ajax('/tweets', { method: 'POST', data: $(this).serialize()})
      .then(loadTweets);

    // Reset text input and counter on submit  
    $("#tweet-text").val('');
    $(".counter").val(140);
  });


  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(renderTweets);
  };

  loadTweets();

  // Function to pass to createTweetElement for safe user input
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
});