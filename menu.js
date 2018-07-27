var software = document.getElementById("software");
var hardware = document.getElementById("hardware");
var aboutMe = document.getElementById("aboutMe");
var gallery = document.getElementById("gallery");
var goUp = document.getElementById("goUp");

var myScrollFunc = function () {
    var y = window.scrollY;
    if (y >= 500) {
        software.className = "softwareMenu show"
        hardware.className = "hardwareMenu show"
        aboutMe.className = "aboutMeMenu show"
        gallery.className = "galleryMenu show"
        goUp.className = "goUp show"
    } else {
        software.className = "softwareMenu hide"
        hardware.className = "hardwareMenu hide"
        aboutMe.className = "aboutMeMenu hide"
        gallery.className = "galleryMenu hide"
        goUp.className = "goUp hide"
    }
};

window.addEventListener("scroll", myScrollFunc);

window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) {
            return;
        }
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop === 0);
    
    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) {
        	break;
        }
        targetY += target.offsetTop;
    } while (target == target.offsetParent);
    
    var scroll = function(c, a, b, i) {
        i++; 
        if (i > 30) {
            return;
        }
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}
