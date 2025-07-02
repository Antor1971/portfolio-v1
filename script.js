document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Navigation
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation - fixed class name to match CSS
        burger.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (nav.classList.contains('nav-active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking anywhere outside
    document.addEventListener('click', (e) => {
        const isNavOpen = nav.classList.contains('nav-active');
        
        if (isNavOpen && !nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove('nav-active');
            burger.classList.remove('active');
            document.body.style.overflow = '';
            
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });

    // Dropdown functionality for both desktop and mobile
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = dropdown?.querySelector('a');
    
    if (dropdown && dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });

        // Prevent dropdown from closing when clicking inside dropdown content
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        if (dropdownContent) {
            dropdownContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    // Close mobile menu when clicking on dropdown links
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Allow the link to work normally
            setTimeout(() => {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('active'); // Changed from 'toggle' to 'active'
                }
                dropdown.classList.remove('active');
            }, 100);
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Submission
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            // Replace these with your actual EmailJS service and template IDs
            const templateParams = {
                to_email: 'moliulsiddique@gmail.com',
                user_name: form.querySelector('[name="user_name"]').value,
                user_email: form.querySelector('[name="user_email"]').value,
                message: form.querySelector('[name="message"]').value
            };

            emailjs.send('service_xucaiij', 'template_psjdc4k', templateParams)
                .then(() => {
                    alert('Message sent successfully!');
                    form.reset();
                })
                .catch((error) => {
                    console.error('EmailJS Error:', error);
                    alert('Failed to send message. Please try again.');
                })
                .finally(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                });
        });
    }

    // Typing Animation
    const text = `Hi, I'm M. Aliul Siddique Antor, a final-year undergraduate student pursuing a BSc in Computer Science and Engineering at BRAC University in Bangladesh.

I'm passionate about technology and have a strong foundation in full-stack web development, particularly with the MERN stack (MongoDB, Express.js, React, Node.js). I'm eager to work on MERN-based projects and continue growing as a developer.

Currently, I'm diving into Machine Learning and Android development using Kotlin, and I've also completed my undergraduate thesis in Machine Learning. Beyond coding, I'm a curious learner and a tech enthusiast who enjoys reading and writing in my free time.

I'm always looking for opportunities to collaborate, learn, and contribute to impactful tech projects.`;
    const typingText = document.querySelector('.typing-text');
    let index = 0;

    function typeText() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 50); // Adjust speed here (lower = faster)
        }
    }

    // Start typing when About section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeText();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(document.querySelector('#about'));

    // Modal Functionality
    function setupProjectModals() {
        try {
            const modal = document.getElementById('project-modal');
            const projectCards = document.querySelectorAll('.project-card');
            const closeModal = document.querySelector('.close-modal');

            if (!modal || !closeModal) {
                throw new Error('Required modal elements not found');
            }

            function showModal(card) {
                const title = card.querySelector('h3').textContent;
                const description = card.querySelector('p').textContent;
                const image = card.querySelector('.project-image').src;
                const githubLink = card.querySelector('.github-link').href;

                modal.querySelector('.modal-title').textContent = title;
                modal.querySelector('.modal-description').textContent = description;
                modal.querySelector('.modal-image').src = image;
                modal.querySelector('.modal-github-link').href = githubLink;

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            function hideModal() {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }

            // Add click handlers to project cards
            projectCards.forEach((card, index) => {
                card.style.cursor = 'pointer';
                card.onclick = (e) => {
                    if (!e.target.closest('.github-link')) {
                        showModal(card);
                    }
                };
            });

            // Close modal handlers
            closeModal.onclick = hideModal;
            modal.onclick = (e) => {
                if (e.target === modal) hideModal();
            };
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    hideModal();
                }
            });

        } catch (error) {
            console.error('Error setting up project modals:', error);
        }
    }

    // Initialize modals
    setupProjectModals();

    // Scroll to top functionality
    const scrollTopBtn = document.getElementById("scroll-top-btn");

    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    };

    scrollTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
