$(window).on("scroll", function() {
  $(header).toggleClass("activation", $(this).scrollTop() > $(window).height());
});