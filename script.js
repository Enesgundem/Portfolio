document.addEventListener('DOMContentLoaded', function() {
    // Animation de chargement
    document.body.classList.add('loaded');

    // Intersection Observer pour les animations au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Ajouter un délai progressif pour un effet en cascade
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer tous les éléments à animer
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach((el, index) => {
        // Ajouter un délai initial basé sur l'index
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });


    // Effet de scroll sur le header
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Animation au hover pour les cartes de catégorie
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Smooth scroll pour les liens d'ancrage
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Optimisation des performances avec requestAnimationFrame pour le parallaxe
    let ticking = false;
    const parallaxElements = document.querySelectorAll('.project-image img');
    
    if (parallaxElements.length > 0) {
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            parallaxElements.forEach((element) => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + scrolled;
                
                // Parallaxe uniquement si l'élément est visible
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const speed = 0.2;
                    const yPos = -(scrolled - elementTop) * speed;
                    element.style.transform = `translateY(${yPos}px) scale(1)`;
                }
            });
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
        
        // Initialiser le parallaxe au chargement
        updateParallax();
    }
});