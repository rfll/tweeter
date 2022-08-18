/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {
  // Test / driver code (temporary). Eventually will get this from the server.
  // Fake data taken from initial-tweets.json


  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    // Empty tweets so they don't post twice
    $('#tweets-section').html("");

    for (let tweet of tweets) {
      // console.log(createTweetElement(tweet));
      // console.log("hello");
      $('#tweets-section').prepend(createTweetElement(tweet));
    }
    
  }

  const createTweetElement = function(tweetData) {
    const $tweet =
      $(`<article class="tweet">
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
              <i class="fa-solid fa-flag flag"></i>
              <i class="fa-solid fa-retweet retweet"></i>
              <i class="fa-solid fa-heart heart"></i>
            </div>
          </footer>
              </article>`
      );

    // Test / driver code (temporary)
    // console.log($tweet); // to see what it looks like
    // return $('#tweets-section').append($tweet);
    return $tweet;
  };

  // createTweetElement(data);
  // renderTweets(data);


  $(".new-tweet").on("submit", function(event) {
    event.preventDefault();

    if ($("#tweet-text").val().length === 0) {
      alert("You must write a tweet to post!");
      return;
    }
    if ($("#tweet-text").val().length > 140) {
      alert("Tweets must be less than 140 characters.");
      return;
    }
    $.ajax('/tweets', { method: 'POST', data: $(this).serialize()})
    .then(loadTweets);
  });


  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(renderTweets);
  }

  loadTweets();

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
});