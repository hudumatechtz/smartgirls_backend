// Admin Navigation toggle on Small Device
var buttonShow = document.getElementById("button-show");
buttonShow.addEventListener("click", function() {
    document.body.style.position = "fixed";
    if ( document.getElementById("admin-navigation").classList.contains('admin-navigation')) {
        document.getElementById("admin-navigation").classList.toggle('display-admin-navigation');
    }
});
var buttonHide = document.getElementById("button-hide");
buttonHide.addEventListener("click", function() {
    document.body.style.position = "relative";
    if (document.getElementById("admin-navigation").classList.toggle('display-admin-navigation')) {
        document.getElementById("admin-navigation").classList.contains('admin-navigation');
    }
});
// Hide Navigation hide/show Button When Reach Footer
jQuery(function($){
    $(window).bind('scroll', function(e){
        if($(window).scrollTop() + window.innerHeight >= $('#footer').offset().top) {
            buttonShow.style.display = "none";
            buttonHide.style.display = "none";
        } else {
            buttonShow.style.display = "block";
            buttonHide.style.display = "block";
        }
    });
});

// Admin Active Navigation links
(function () {
    var currentLink = location.pathname.split('/')[1];
    if (currentLink === "") return;
    var dashboardLinks = document.querySelectorAll('.admin-link a');
    for (var i = 0, len = dashboardLinks.length; i < len; i++) {
        if (dashboardLinks[i].getAttribute("href").indexOf(currentLink) !== -1) {
            dashboardLinks[i].className += " active-admin-link";
        }
    }
})();