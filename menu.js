var software = document.getElementById("software");
var hardware = document.getElementById("hardware");
var aboutMe = document.getElementById("aboutMe");
var gallery = document.getElementById("gallery");
var goUp = document.getElementById("goUp");

var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    xScreen = w.innerWidth || e.clientWidth || g.clientWidth,
    yScreen = w.innerHeight|| e.clientHeight|| g.clientHeight;


var myScrollFunc = function () {
    var y = window.scrollY;
    if (y >= yScreen/1.5) {
        software.className = "software menu show"
        hardware.className = "hardware menu show"
        aboutMe.className = "aboutMe menu show"
        gallery.className = "gallery menu show"
        goUp.className = "goUp show"
    } else {
        software.className = "software menu hide"
        hardware.className = "hardware menu hide"
        aboutMe.className = "aboutMe menu hide"
        gallery.className = "gallery menu hide"
        goUp.className = "goUp hide"
    }
};

window.addEventListener("scroll", myScrollFunc);

window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);
    
    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);
    
    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

