document.addEventListener('DOMContentLoaded', function () {
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
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Smooth scroll pour les liens d'ancrage
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
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
    // (Parallaxe désactivé pour éviter que l'image ne sorte du cadre)
    /*
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
    */

    // =====================
    // Internationalisation
    // =====================
    const i18n = {
        fr: {
            'nav.projects': 'Projets',
            'nav.groupProjects': 'Projets de Groupe',
            'nav.personalProjects': 'Projets Personnels',
            'nav.professionalProjects': 'Projets Professionnels',
            'hero.title': 'Étudiant MMI passionné par le digital.',
            'hero.subtitle': "Actuellement en 2ᵉ année MMI à Meaux, je recherche un stage de 10 semaines à partir du 30 mars au 5 juin. Passionné par les nouvelles technologies, le développement web et le design.",
            'hero.cvButton': 'Voir mon CV',
            'about.title': 'À propos de moi.',
            'about.text1': "Passionné par l'univers des nouvelles technologies et plus particulièrement celui des smartphones, je souhaite mettre à profit mes compétences dans le développement web, le design ainsi que dans la communication/marketing digital.",
            'about.internship': '🎯 <strong>Recherche de stage :</strong> 10 semaines du 30 mars au 5 juin 2025',
            'skills.dev': 'Développement Web',
            'skills.design': 'Design & Multimédia',
            'skills.marketing': 'Communication & Marketing',
            'projects.title': 'Explorer mes réalisations.',
            'cards.groupTitle': 'Projets de Groupe',
            'cards.groupDesc': "Travaux collaboratifs réalisés en équipe à l'école.",
            'cards.personalTitle': 'Projets Personnels',
            'cards.personalDesc': 'Mes initiatives et explorations en dehors du cadre scolaire.',
            'cards.professionalTitle': 'Projets Professionnels',
            'cards.professionalDesc': 'Travaux réalisés en stage - Expériences professionnelles concrètes.',
            'cards.cta': 'Découvrir →',
            'footer.title': 'Intéressé par mon profil ?',
            'footer.subtitle': 'Je suis motivé, rigoureux et curieux, et je souhaite contribuer à vos projets tout en développant mes compétences.',
            'footer.location': '📍 Élève en 2ᵉ année MMI à Meaux',
            // CV page
            'cv.title': 'Mon CV',
            'cv.subtitle': 'Vous pouvez consulter mon CV ci-dessous ou le télécharger.',
            'cv.download': 'Télécharger le CV (PDF)'
        },
        en: {
            'nav.projects': 'Projects',
            'nav.groupProjects': 'Group Projects',
            'nav.personalProjects': 'Personal Projects',
            'nav.professionalProjects': 'Professional Projects',
            'hero.title': 'MMI student passionate about digital.',
            'hero.subtitle': 'Currently in 2nd year MMI in Meaux, I am looking for a 10-week internship from March 30 to June 5. Passionate about new technologies, web development and design.',
            'hero.cvButton': 'View my CV',
            'about.title': 'About me.',
            'about.text1': 'Passionate about new technologies, especially smartphones, I want to use my skills in web development, design and digital communication/marketing.',
            'about.internship': '🎯 <strong>Internship search:</strong> 10 weeks from March 30 to June 5, 2025',
            'skills.dev': 'Web Development',
            'skills.design': 'Design & Multimedia',
            'skills.marketing': 'Communication & Marketing',
            'projects.title': 'Explore my work.',
            'cards.groupTitle': 'Group Projects',
            'cards.groupDesc': 'Collaborative work done in teams at school.',
            'cards.personalTitle': 'Personal Projects',
            'cards.personalDesc': 'My initiatives and explorations outside school.',
            'cards.professionalTitle': 'Professional Projects',
            'cards.professionalDesc': 'Work done during internships - Concrete professional experiences.',
            'cards.cta': 'Discover →',
            'footer.title': 'Interested in my profile?',
            'footer.subtitle': 'I am motivated, rigorous and curious, and I want to contribute to your projects while developing my skills.',
            'footer.location': '📍 2nd-year MMI student in Meaux',
            'cv.title': 'My CV',
            'cv.subtitle': 'You can view my CV below or download it.',
            'cv.download': 'Download CV (PDF)'
        },
        de: {
            'nav.projects': 'Projekte',
            'nav.groupProjects': 'Gruppenprojekte',
            'nav.personalProjects': 'Persönliche Projekte',
            'nav.professionalProjects': 'Berufliche Projekte',
            'hero.title': 'MMI-Student mit Leidenschaft für Digitales.',
            'hero.subtitle': 'Derzeit im 2. Jahr MMI in Meaux, suche ich ein 10-wöchiges Praktikum vom 30. März bis 5. Juni. Leidenschaftlich über neue Technologien, Webentwicklung und Design.',
            'hero.cvButton': 'Meinen Lebenslauf ansehen',
            'about.title': 'Über mich.',
            'about.text1': 'Leidenschaftlich über neue Technologien, besonders Smartphones, möchte ich meine Fähigkeiten in Webentwicklung, Design und digitaler Kommunikation/Marketing einsetzen.',
            'about.internship': '🎯 <strong>Praktikumssuche:</strong> 10 Wochen vom 30. März bis 5. Juni 2025',
            'skills.dev': 'Webentwicklung',
            'skills.design': 'Design & Multimedia',
            'skills.marketing': 'Kommunikation & Marketing',
            'projects.title': 'Meine Arbeiten erkunden.',
            'cards.groupTitle': 'Gruppenprojekte',
            'cards.groupDesc': 'Kollaborative Arbeiten im Team an der Schule.',
            'cards.personalTitle': 'Persönliche Projekte',
            'cards.personalDesc': 'Meine Initiativen und Erkundungen außerhalb der Schule.',
            'cards.professionalTitle': 'Berufliche Projekte',
            'cards.professionalDesc': 'Während Praktika durchgeführte Arbeiten - Konkrete berufliche Erfahrungen.',
            'cards.cta': 'Entdecken →',
            'footer.title': 'Interessiert an meinem Profil?',
            'footer.subtitle': 'Ich bin motiviert, sorgfältig und neugierig und möchte zu Ihren Projekten beitragen und meine Fähigkeiten weiterentwickeln.',
            'footer.location': '📍 MMI-Student im 2. Jahr in Meaux',
            'cv.title': 'Mein Lebenslauf',
            'cv.subtitle': 'Sie können meinen Lebenslauf unten ansehen oder herunterladen.',
            'cv.download': 'Lebenslauf herunterladen (PDF)'
        },
        zh: {
            'nav.projects': '项目',
            'nav.groupProjects': '团队项目',
            'nav.personalProjects': '个人项目',
            'nav.professionalProjects': '专业项目',
            'hero.title': '热爱数字领域的 MMI 学生。',
            'hero.subtitle': '目前就读于莫城 MMI 二年级，我正在寻找从 3 月 30 日到 6 月 5 日为期 10 周的实习。热爱新技术、Web 开发和设计。',
            'hero.cvButton': '查看我的简历',
            'about.title': '关于我。',
            'about.text1': '我热爱新技术，尤其是智能手机，想要在网页开发、设计以及数字传播/营销方面发挥所长。',
            'about.internship': '🎯 <strong>实习寻找：</strong> 2025/03/30 至 06/05，为期 10 周',
            'skills.dev': '网页开发',
            'skills.design': '设计与多媒体',
            'skills.marketing': '传播与营销',
            'projects.title': '探索我的作品。',
            'cards.groupTitle': '团队项目',
            'cards.groupDesc': '在学校团队中完成的协作项目。',
            'cards.personalTitle': '个人项目',
            'cards.personalDesc': '我在课外的主动探索与实践。',
            'cards.professionalTitle': '专业项目',
            'cards.professionalDesc': '实习期间完成的工作 - 具体的专业经验。',
            'cards.cta': '查看 →',
            'footer.title': '对我的简历感兴趣吗？',
            'footer.subtitle': '我积极、严谨、好奇，希望在为您项目做出贡献的同时提升自我能力。',
            'footer.location': '📍 莫城 MMI 二年级学生',
            'cv.title': '我的简历',
            'cv.subtitle': '您可以在下方查看或下载我的简历。',
            'cv.download': '下载简历（PDF）'
        },
        es: {
            'nav.projects': 'Proyectos',
            'nav.groupProjects': 'Proyectos en grupo',
            'nav.personalProjects': 'Proyectos personales',
            'nav.professionalProjects': 'Proyectos profesionales',
            'hero.title': 'Estudiante MMI apasionado por lo digital.',
            'hero.subtitle': 'Actualmente en 2º año de MMI en Meaux, busco unas prácticas de 10 semanas del 30 de marzo al 5 de junio. Apasionado por las nuevas tecnologías, el desarrollo web y el diseño.',
            'hero.cvButton': 'Ver mi CV',
            'about.title': 'Sobre mí.',
            'about.text1': 'Apasionado por las nuevas tecnologías, especialmente los smartphones, quiero aprovechar mis habilidades en desarrollo web, diseño y comunicación/marketing digital.',
            'about.internship': '🎯 <strong>Búsqueda de prácticas:</strong> 10 semanas del 30 de marzo al 5 de junio de 2025',
            'skills.dev': 'Desarrollo web',
            'skills.design': 'Diseño y multimedia',
            'skills.marketing': 'Comunicación y marketing',
            'projects.title': 'Explora mis trabajos.',
            'cards.groupTitle': 'Proyectos en grupo',
            'cards.groupDesc': 'Trabajos colaborativos realizados en equipo en la escuela.',
            'cards.personalTitle': 'Proyectos personales',
            'cards.personalDesc': 'Mis iniciativas y exploraciones fuera del ámbito escolar.',
            'cards.professionalTitle': 'Proyectos profesionales',
            'cards.professionalDesc': 'Trabajos realizados durante prácticas - Experiencias profesionales concretas.',
            'cards.cta': 'Descubrir →',
            'footer.title': '¿Interesado en mi perfil?',
            'footer.subtitle': 'Estoy motivado, riguroso y curioso. Quiero contribuir a sus proyectos mientras desarrollo mis habilidades.',
            'footer.location': '📍 Estudiante de 2º año de MMI en Meaux',
            'cv.title': 'Mi CV',
            'cv.subtitle': 'Puede ver mi CV a continuación o descargarlo.',
            'cv.download': 'Descargar CV (PDF)'
        }
    };

    function applyTranslations(lang) {
        const dict = i18n[lang] || i18n.fr;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                // Si le contenu contient du HTML (ex: <strong>), on utilise innerHTML
                if (dict[key].includes('<')) {
                    el.innerHTML = dict[key];
                } else {
                    el.textContent = dict[key];
                }
            }
        });
        document.documentElement.setAttribute('lang', lang);
    }

    // Gestion du sélecteur de langue
    const langSwitcher = document.querySelector('.lang-switcher');
    const langToggle = document.querySelector('.lang-toggle');
    const langOptions = document.querySelectorAll('.lang-option');

    function closeLangMenu() {
        if (langSwitcher) {
            langSwitcher.classList.remove('open');
            if (langToggle) langToggle.setAttribute('aria-expanded', 'false');
        }
    }

    if (langToggle && langSwitcher) {
        langToggle.addEventListener('click', () => {
            const isOpen = langSwitcher.classList.toggle('open');
            langToggle.setAttribute('aria-expanded', String(isOpen));
        });

        document.addEventListener('click', (e) => {
            if (!langSwitcher.contains(e.target)) {
                closeLangMenu();
            }
        });
    }

    langOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            localStorage.setItem('preferred_lang', lang);
            applyTranslations(lang);
            closeLangMenu();
        });
    });

    // Appliquer la langue au chargement
    const savedLang = localStorage.getItem('preferred_lang') || 'fr';
    applyTranslations(savedLang);

    // =====================
    // Thème sombre / clair
    // =====================
    const root = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('preferred_theme');

    // Default is now Light (Soft Pop). behavior: if 'dark' is saved, add attribute.
    if (savedTheme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.setAttribute('aria-pressed', 'true');
    }

    function withThemeTransition(callback) {
        document.body.classList.add('theme-transition');
        window.requestAnimationFrame(() => {
            callback();
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 350);
        });
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = root.getAttribute('data-theme') === 'dark';
            withThemeTransition(() => {
                if (isDark) {
                    // Switch to Light
                    root.removeAttribute('data-theme');
                    localStorage.setItem('preferred_theme', 'light');
                    themeToggle.setAttribute('aria-pressed', 'false');
                } else {
                    // Switch to Dark
                    root.setAttribute('data-theme', 'dark');
                    localStorage.setItem('preferred_theme', 'dark');
                    themeToggle.setAttribute('aria-pressed', 'true');
                }
            });
        });
    }
});