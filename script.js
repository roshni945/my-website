// =====================================================
// 🌐 ROSHNI CODE CHARM - HOMEPAGE JAVASCRIPT
// =====================================================


// =====================================================
// 🌙 DARK MODE / LIGHT MODE
// =====================================================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    // Check previously saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';
    }

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

            localStorage.setItem("theme", "dark");

        } else {

            themeToggle.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

            localStorage.setItem("theme", "light");
        }

    });

}


// =====================================================
// 📱 MOBILE NAVIGATION
// =====================================================

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");

    });

}


// =====================================================
// 🔗 CLOSE MOBILE MENU WHEN LINK IS CLICKED
// =====================================================

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");
        }

    });

});


// =====================================================
// ✨ HEADER SCROLL EFFECT
// =====================================================

const header = document.querySelector("header");

window.addEventListener("scroll", function () {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


// =====================================================
// 🎯 ACTIVE NAVIGATION LINK
// =====================================================

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === "#" + currentSection) {

            link.classList.add("active");

        }

    });

});


// =====================================================
// 🖱️ SMOOTH SCROLL
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// =====================================================
// ✨ SCROLL REVEAL ANIMATION
// =====================================================

const revealElements = document.querySelectorAll(
    ".card, .student-ai-card, .project-card, .tutorial-card, .roadmap-card"
);

function revealOnScroll() {

    revealElements.forEach(function (element) {

        const elementTop =
            element.getBoundingClientRect().top;

        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 80) {

            element.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);


// =====================================================
// 🚀 START LEARNING BUTTON
// =====================================================

const startLearningBtn =
    document.querySelector(".start-learning");

if (startLearningBtn) {

    startLearningBtn.addEventListener("click", function () {

        const tutorials =
            document.querySelector("#tutorials");

        if (tutorials) {

            tutorials.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


// =====================================================
// 📚 TUTORIAL BUTTONS
// =====================================================

const tutorialButtons =
    document.querySelectorAll(".tutorial-btn");

tutorialButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const targetId =
            this.getAttribute("data-target");

        if (!targetId) return;

        const target =
            document.getElementById(targetId);

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// =====================================================
// 🔍 SEARCH BOX
// =====================================================

const searchInput =
    document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText =
            this.value.toLowerCase().trim();

        const searchableCards =
            document.querySelectorAll(
                ".card, .tutorial-card, .project-card, .student-ai-card"
            );

        searchableCards.forEach(function (card) {

            const text =
                card.textContent.toLowerCase();

            if (text.includes(searchText)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

}


// =====================================================
// 📩 CONTACT FORM
// =====================================================

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name");

        const email =
            document.getElementById("email");

        const message =
            document.getElementById("message");

        if (!name || !email || !message) {
            return;
        }

        if (
            name.value.trim() === "" ||
            email.value.trim() === "" ||
            message.value.trim() === ""
        ) {

            alert("⚠️ Please fill in all fields.");

            return;

        }

        alert(
            "💜 Thank you, " +
            name.value +
            "! Your message has been received."
        );

        contactForm.reset();

    });

}


// =====================================================
// ⬆️ BACK TO TOP BUTTON
// =====================================================

const backToTop =
    document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// =====================================================
// 📅 CURRENT YEAR
// =====================================================

const yearElements =
    document.querySelectorAll(".current-year");

yearElements.forEach(function (element) {

    element.textContent =
        new Date().getFullYear();

});


// =====================================================
// 💜 PAGE LOADED
// =====================================================

window.addEventListener("load", function () {

    document.body.classList.add("page-loaded");

});


