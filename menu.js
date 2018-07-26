var software = document.getElementById("software");
var hardware = document.getElementById("hardware");
var aboutMe = document.getElementById("aboutMe");
var gallery = document.getElementById("gallery");

var myScrollFunc = function () {
    var y = window.scrollY;
    if (y >= 500) {
        software.className = "softwareMenu show"
        hardware.className = "hardwareMenu show"
        aboutMe.className = "aboutMeMenu show"
        gallery.className = "galleryMenu show"
    } else {
        software.className = "softwareMenu hide"
        hardware.className = "hardwareMenu hide"
        aboutMe.className = "aboutMeMenu hide"
        gallery.className = "galleryMenu hide"
    }
};

window.addEventListener("scroll", myScrollFunc);