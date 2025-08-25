// --- INTRO PRELOADER ---
window.addEventListener('load', () => {
    // This script ONLY runs if the preloader element exists on the page (i.e., index.html)
    const preloader = document.getElementById('preloader');
    if (!preloader) {
        return;
    }
    
    // Add the no-scroll class to the body on load, only on the homepage.
    document.body.classList.add('no-scroll');

    const header = document.querySelector('.header');
    const mainContainer = document.querySelector('.main-container');
    // Use a shorter animation on mobile where the complex animation is hidden
    const animationDuration = window.innerWidth <= 768 ? 1500 : 5000;

    // Set the timer for the animation to complete
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.remove('no-scroll');

        // Fade in the homepage content
        if (header) header.classList.add('visible');
        if (mainContainer) mainContainer.classList.add('visible');
        
        // Remove the preloader from the DOM after its fade-out transition
        preloader.addEventListener('transitionend', () => {
            if (preloader) preloader.remove();
        });
    }, animationDuration);
});


// --- ALL PAGE LOGIC AND ANIMATIONS ---
document.addEventListener('DOMContentLoaded', () => {

    // --- INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealElements.forEach(el => observer.observe(el));

    // --- MAGNETIC HOVER EFFECT ---
    document.querySelectorAll('.magnetic-element').forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            // Apply the magnetic effect only if it's not the submit button
            if (!el.classList.contains('submit-btn')) {
                el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            }
        });
        el.addEventListener('mouseleave', () => {
            if (!el.classList.contains('submit-btn')) {
                el.style.transform = `translate(0,0)`;
            }
        });
    });

    // --- CHATBOT INTERFACE LOGIC (Runs only on homepage) ---
    const form = document.getElementById('query-form');
    if (form) {
        const toggleBtn = document.getElementById('questions-toggle-btn');
        const questionsList = document.querySelector('.questions-list');
        
        if (toggleBtn && questionsList) {
            toggleBtn.addEventListener('click', () => {
                const isHidden = questionsList.classList.toggle('hidden');
                toggleBtn.classList.toggle('active');
                const textSpan = toggleBtn.querySelector('span');
                const icon = toggleBtn.querySelector('i');
                if (isHidden) {
                    textSpan.textContent = 'Show quick questions';
                    icon.className = 'fas fa-chevron-down';
                } else {
                    textSpan.textContent = 'Hide quick questions';
                    icon.className = 'fas fa-chevron-up';
                }
            });
        }
        
        const input = document.getElementById('query-input');
        const questionBtns = document.querySelectorAll('.quick-question-btn');
        const answerDisplay = document.getElementById('answer-display');
        
        const portfolioData = {
            'who-are-you': "I'm a recent Computer Science graduate and AI Developer specializing in building multi-agent systems. With a strong academic background and hands-on experience in AI, web development, and cybersecurity, I'm passionate about creating intelligent solutions to complex problems.",
            'passions': "My passion lies in exploring the frontiers of Agentic AI and Big Data. I'm driven by the challenge of architecting scalable, intelligent systems that can automate complex workflows and deliver measurable business impact.",
            'get-started-tech': "My journey into tech began with a curiosity for web development, leading to my first internships. This quickly evolved into a deeper fascination with AI and machine learning, where I discovered my passion for building systems that can learn and reason.",
            'five-years': "In five years, I aim to be a senior AI engineer leading complex projects in the multi-agent systems space. I plan to deepen my expertise in Responsible AI and contribute to developing robust, ethical, and cutting-edge AI solutions.",
            'proud-projects': "I'm particularly proud of my work on **Sahayak AI** and a **Multi-Agent Compliance System**. Both projects allowed me to apply my skills to create meaningful, real-world impact. <a href='projects.html' style='font-weight: 600; color: var(--accent-color);'>You can see more on my projects page!</a>",
            'see-skills': "Certainly. My core competencies are listed on the skills page, covering everything from AI frameworks and Big Data to cloud platforms. <a href='skills.html' style='font-weight: 600; color: var(--accent-color);'>Click here to view my skills.</a>",
            'see-resume': "Absolutely. You can view or download a PDF of my resume to see my full qualifications and experience. <a href='Resume_Final_for_SEETHALA_CHANDU.pdf' target='_blank' style='font-weight: 600; color: var(--accent-color);'>Click here for my resume.</a>",
            'valuable-teammate': "I'm a valuable team member because I combine strong technical proficiency in AI and software development with proven soft skills in communication and leadership, which I developed as a Campus Ambassador. I am a proactive problem-solver who is always eager to learn and collaborate.",
            'why-hire-me': "You should hire me for my unique blend of a strong academic foundation (9.13 CGPA), hands-on experience in building multi-agent AI systems, and a proven track record of delivering impactful results, such as reducing manual compliance efforts by 80%. I am ready to contribute from day one.",
            'reach-you': "The best way to get in touch is via email or my LinkedIn profile. All my contact details are on the contact page. <a href='contact.html' style='font-weight: 600; color: var(--accent-color);'>Click here to go to my contact page.</a>",
            'ideal-project': "A project that would make me say 'yes' immediately would involve building a complex, multi-agent AI system from the ground up to solve a challenging real-world problem, particularly in the domain of automation or ethical AI.",
            'location': "I am currently based in **Visakhapatnam, Andhra Pradesh, India**. I am open to remote opportunities and would consider relocation for the right role.",
            'sarcastic-fallback': "That's an interesting query! However, my core programming is focused on Agentic AI, not existential philosophy. You might have better luck asking a purpose-built Large Language Model about that one."
        };

        const displayAnswer = (answerHTML) => {
            answerDisplay.innerHTML = `<div class="answer-bubble"><img src="Images/avatar.png" class="answer-avatar" alt="Avatar"/><p>${answerHTML}</p></div>`;
            answerDisplay.classList.add('active');
        };

        questionBtns.forEach(button => {
            button.addEventListener('click', () => {
                const key = button.dataset.key;
                if (portfolioData[key]) {
                    displayAnswer(portfolioData[key]);
                    questionBtns.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                }
            });
        });

        form.addEventListener('submit', e => {
            e.preventDefault();
            const query = input.value.toLowerCase().trim();
            if (!query) return;
            let answerKey = 'sarcastic-fallback';
            if (query.includes('who are you') || query.includes('about')) answerKey = 'who-are-you';
            else if (query.includes('passion')) answerKey = 'passions';
            else if (query.includes('project')) answerKey = 'proud-projects';
            else if (query.includes('skill')) answerKey = 'see-skills';
            else if (query.includes('resume')) answerKey = 'see-resume';
            else if (query.includes('hire')) answerKey = 'why-hire-me';
            else if (query.includes('contact') || query.includes('reach')) answerKey = 'reach-you';
            displayAnswer(portfolioData[answerKey]);
            input.value = '';
        });
    }

    // --- 3D CERTIFICATE CAROUSEL LOGIC ---
    const carouselContainer3D = document.querySelector('.carousel-container-3d');
    if (carouselContainer3D) {
        const track = carouselContainer3D.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = carouselContainer3D.querySelector('.next');
        const prevButton = carouselContainer3D.querySelector('.prev');
        const slideCount = slides.length;
        let currentIndex = 0;

        const angle = 360 / slideCount;
        const radius = 300 / Math.tan((angle / 2) * (Math.PI / 180));

        slides.forEach((slide, index) => {
            const rotateY = index * angle;
            slide.style.transform = `rotateY(${rotateY}deg) translateZ(${radius}px)`;
        });

        const updateCarousel = () => {
            const targetRotation = -currentIndex * angle;
            track.style.transform = `translateZ(${-radius}px) rotateY(${targetRotation}deg)`;
            const activeIndex = (currentIndex % slideCount + slideCount) % slideCount;
            slides.forEach((slide, index) => {
                slide.classList.toggle('active-slide', index === activeIndex);
            });
        };

        nextButton.addEventListener('click', () => { currentIndex++; updateCarousel(); });
        prevButton.addEventListener('click', () => { currentIndex--; updateCarousel(); });
        updateCarousel();
    }
});

// --- CONTACT FORM LOGIC (Contact page only) ---
const sendEmailBtn = document.getElementById('send-email-btn');
if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;

        if (!name || !email || !message) {
            alert('Please fill out all fields before sending.');
            return;
        }

        const subject = `Portfolio Contact - From ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        
        // This creates the mailto link and opens the user's email client
        window.location.href = `mailto:seethalachandu2003@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

// --- MOBILE NAVIGATION (SIDEBAR) ---
const hamburgerBtn = document.getElementById('hamburger-btn');
const sidebar = document.getElementById('sidebar');

hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents event conflicts
    sidebar.classList.toggle('open');
    hamburgerBtn.textContent = sidebar.classList.contains('open') ? '✕' : '☰';
});