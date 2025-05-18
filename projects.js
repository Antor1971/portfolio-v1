document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    // Projects Modal
    const modal = document.getElementById('project-modal');
    const projectCards = document.querySelectorAll('.project-card');
    const closeModal = document.querySelector('.close-modal');

    if (modal && projectCards && closeModal) {
        projectCards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.github-link')) {
                    const title = this.querySelector('h3').textContent;
                    const description = this.querySelector('p').textContent;
                    const image = this.querySelector('.project-image').src;
                    const githubLink = this.querySelector('.github-link').href;

                    modal.querySelector('.modal-title').textContent = title;
                    modal.querySelector('.modal-description').textContent = description;
                    modal.querySelector('.modal-image').src = image;
                    modal.querySelector('.modal-github-link').href = githubLink;

                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal handlers
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

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
