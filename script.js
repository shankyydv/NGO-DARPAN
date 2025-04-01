document.addEventListener('DOMContentLoaded', function () {
    console.log("✅ DOM Loaded, initializing scripts...");

    // ✅ Initialize EmailJS
    if (typeof emailjs !== "undefined") {
        emailjs.init("1gLieMpTSjAUG7aHK"); // Replace with your actual public key
    } else {
        console.error("❌ EmailJS library failed to load!");
    }

    // ✅ Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    } else {
        console.warn("⚠️ Navigation elements not found.");
    }

    // ✅ Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.warn(`⚠️ Element ${this.getAttribute('href')} not found.`);
            }
        });
    });

    // ✅ Scroll to Top Button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ✅ Contact Form Handling
    const form = document.getElementById('contact-form');

    if (!form) {
        console.warn("⚠️ Contact form not found. Check if it's inside the HTML.");
        return;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log("✅ Form submission event triggered.");

        let responseMessage = document.getElementById('response-message');
        if (!responseMessage) {
            responseMessage = document.createElement('p');
            responseMessage.id = 'response-message';
            form.appendChild(responseMessage);
        }

        responseMessage.innerHTML = '⏳ Sending...';
        responseMessage.style.color = "blue";

        const userName = document.getElementById('name').value.trim();
        const userEmail = document.getElementById('email').value.trim();
        const userSubject = document.getElementById('subject').value.trim();
        const userMessage = document.getElementById('message').value.trim();

        // ✅ Simple Form Validation
        if (!userName || !userEmail || !userSubject || !userMessage) {
            responseMessage.innerHTML = "⚠️ Please fill in all fields!";
            responseMessage.style.color = "red";
            return;
        }

        const templateParams = {
            user_name: userName,
            user_email: userEmail,
            subject: userSubject,
            message: userMessage
        };

        emailjs.send("service_cp5lz27", "template_vw4tz5p", templateParams, "1gLieMpTSjAUG7aHK")
            .then(response => {
                console.log("✅ Email Sent Successfully:", response.status, response.text);
                responseMessage.innerHTML = '✅ Your message has been sent successfully!';
                responseMessage.style.color = "green";
                form.reset();
            })
            .catch(error => {
                console.error('❌ EmailJS Error:', error);
                responseMessage.innerHTML = `❌ Error: ${error.text || 'Something went wrong'}`;
                responseMessage.style.color = "red";
            });
    });
});
