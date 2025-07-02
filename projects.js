document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('active');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
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
    }

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
                    burger.classList.remove('active');
                }
                dropdown.classList.remove('active');
            }, 100);
        });
    });

    // Projects Modal
    const modal = document.getElementById('project-modal');
    const projectCards = document.querySelectorAll('.project-card');
    const closeModal = document.querySelector('.close-modal');

    if (modal && projectCards && closeModal) {
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
        projectCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function(e) {
                // Only show modal if not clicking on github link
                if (!e.target.closest('.github-link')) {
                    showModal(this);
                }
            });
        });

        // Close modal handlers
        closeModal.addEventListener('click', hideModal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                hideModal();
            }
        });
    }

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
