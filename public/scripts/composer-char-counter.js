$(document).ready(function() {

  $("#tweet-text").on('keyup', function(e) {
    let counter = $(this).val().length;
    let subtract = 140 - counter;

    $('.counter').text(subtract);

    if (subtract < 0) {
      $('.counter').addClass('negative-counter');
    } else {
      $('.counter').removeClass('negative-counter');
    }
  })
});