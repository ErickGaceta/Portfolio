const sections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('.nav-link');

var addClassOnScroll = function() {
    var scrollPosition = window.scrollY || window.pageYOffset;
    sections.forEach(function(section) {
        if (scrollPosition >= section.offsetTop - 50) {
            var id = section.getAttribute('id');
            navLinks.forEach(function (link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
};