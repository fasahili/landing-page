/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section');
const navList = document.getElementById('navbar__list');
let isScrolling;

// Build navigation function
function buildNav() {
    sections.forEach(section => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`;
        navList.appendChild(listItem);
    });
}


// ActiveSection function
function setActiveSection() {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
            section.classList.add('your-active-class');
            document.querySelector(`a[href="#${section.id}"]`).classList.add('active');
        } else {
            section.classList.remove('your-active-class');
            document.querySelector(`a[href="#${section.id}"]`).classList.remove('active');
        }
    });
}

// Scroll smooth
function scrollToSection(event) {
    event.preventDefault();
    document.querySelector(event.target.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
}

// Hide navigation bar after 6 seconds if not make any action
function hideNavbar() {
    document.querySelector('.page__header').style.display = 'block';
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        document.querySelector('.page__header').style.display = 'none';
    }, 6000);
}

// Scroll to top button
function scrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
buildNav();

// Scroll to section on link click
document.querySelectorAll('.menu__link').forEach(link => {
    link.addEventListener('click', scrollToSection);
});


// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', setActiveSection);

// Hide navbar while not scrolling
window.addEventListener('scroll', hideNavbar);

// Scroll to anchor ID using scrollTO event
scrollToTop();


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', buildNav);


// Scroll to section on link click
document.querySelectorAll('.menu__link').forEach(link => {
    link.addEventListener('click', scrollToSection);
});

// Set sections as active
window.addEventListener('scroll', setActiveSection);