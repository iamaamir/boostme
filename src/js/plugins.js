//add a class to the element
window.addClass = function(el, className) {
    if (el.classList)
        el.classList.add(className);
    else
        el.className += ' ' + className;
}
//remove a Class from an Element
window.removeClass = function(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

// we do not need jquery to smooth scrollTop
// usage:
//     var target = document.querySele..;
//     var duration = 1024;
//     jump(target.offsetTop, duration);
window.jump = function(to, duration) {
    var element = document.documentElement;
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

    var animate = function() {
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
            setTimeout(animate, increment);
        }
    };
    animate();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};