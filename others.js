document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
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
            // --- Only change this part for poem preview/full logic ---
            const descElem = card.querySelector('p');
            let description;
            if (descElem && descElem.hasAttribute('data-full')) {
                description = descElem.getAttribute('data-full');
            } else {
                description = descElem ? descElem.textContent : '';
            }
            const image = card.querySelector('.project-image').src;
            const linkIcon = card.querySelector('.github-link i').className;
            const linkHref = card.querySelector('.github-link').href;

            const modalContent = modal.querySelector('.modal-content');
            
            // Check if this is a writing/literary content page OR photography page
            const isWritingPage = document.location.pathname.includes('ink-and-soul.html') || 
                                 linkIcon.includes('fa-book-open') ||
                                 linkIcon.includes('fa-pen-fancy');
            
            const isPhotographyPage = document.location.pathname.includes('lens.html') ||
                                    linkIcon.includes('fa-camera');
            
            // Add or remove modal classes based on content type
            if (isWritingPage) {
                modalContent.classList.add('writing-modal');
                modalContent.classList.remove('photography-modal');
            } else if (isPhotographyPage) {
                modalContent.classList.add('photography-modal');
                modalContent.classList.remove('writing-modal');
            } else {
                modalContent.classList.remove('writing-modal', 'photography-modal');
            }

            modal.querySelector('.modal-title').textContent = title;
            modal.querySelector('.modal-description').innerHTML = description;
            modal.querySelector('.modal-image').src = image;
            modal.querySelector('.modal-github-link').href = linkHref;
            
            // Update the icon in the modal based on the page
            const modalLinkIcon = modal.querySelector('.modal-github-link i');
            modalLinkIcon.className = linkIcon;

            // --- Ensure full-size image and non-scrollable caption for photography modal ---
            if (isPhotographyPage) {
                // Remove max-height and overflow from caption
                const modalDesc = modal.querySelector('.modal-description');
                modalDesc.style.maxHeight = 'none';
                modalDesc.style.overflow = 'visible';
                modalDesc.style.paddingRight = '0';
                // Show image at full size (handled by CSS)
            }

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

    // Show/hide button when scrolling (match index.html: 20px threshold)
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
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
