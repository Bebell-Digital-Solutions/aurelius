

        // GSAP Initialization
        gsap.registerPlugin(ScrollTrigger);

        // Navbar blur on scroll
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(240, 235, 225, 0.9)';
            } else {
                nav.style.background = 'rgba(240, 235, 225, 0.6)';
            }
        });




        // ----------------------------------------------------
        // Top Navigation Burger Menu
        // ----------------------------------------------------        
        
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const bars = menuToggle.querySelectorAll('span');
    
    menuToggle.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.toggle('max-h-0');
        mobileMenu.classList.toggle('max-h-[400px]');
        
        // Toggle X transformation
        const topBar = bars[0];
        const middleBar = bars[1];
        const bottomBar = bars[2];
        
        if (isOpen) {
            // Close menu - return to burger
            topBar.style.transform = 'translateY(-8px) rotate(0deg)';
            middleBar.style.opacity = '1';
            bottomBar.style.transform = 'translateY(8px) rotate(0deg)';
        } else {
            // Open menu - turn into X
            topBar.style.transform = 'translateY(0px) rotate(45deg)';
            middleBar.style.opacity = '0';
            bottomBar.style.transform = 'translateY(0px) rotate(-45deg)';
        }
    });


  
    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('max-h-[400px]');
            mobileMenu.classList.add('max-h-0');
            
            // Reset to burger
            const bars = menuToggle.querySelectorAll('span');
            bars[0].style.transform = 'translateY(-8px) rotate(0deg)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'translateY(8px) rotate(0deg)';
        });
    });
});      






        
        // ----------------------------------------------------
        // Hero Setup
        // ----------------------------------------------------
        gsap.from(".gsap-hero-text > *", {
            y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.3
        });
        gsap.from(".hero-img-container", {
            y: 40, opacity: 0, duration: 1.2, ease: "power2.out"
        });




        // Lightning Canvas Effect specific to Hero Image Hover
        const lCanvas = document.getElementById('lightning-canvas');
        const lCtx = lCanvas.getContext('2d');
        let lWidth, lHeight;
        let isHoveringHero = false;

        function resizeLightningCanvas() {
            lWidth = window.innerWidth;
            lHeight = document.querySelector('.hero-wrapper').offsetHeight;
            lCanvas.width = lWidth;
            lCanvas.height = lHeight;
        }
        window.addEventListener('resize', resizeLightningCanvas);
        resizeLightningCanvas();

        const heroImgTracker = document.getElementById('hero-img-tracker');
        heroImgTracker.addEventListener('mouseenter', () => isHoveringHero = true);
        heroImgTracker.addEventListener('mouseleave', () => {
            isHoveringHero = false;
        });

        function drawLightningBolt(x, y, segments, color) {
            lCtx.beginPath();
            lCtx.moveTo(x, y);
            let currX = x;
            let currY = y;
            
            for(let i=0; i<segments; i++) {
                currX += (Math.random() - 0.5) * 60;
                currY += Math.random() * 40;
                lCtx.lineTo(currX, currY);
            }
            
            lCtx.strokeStyle = color;
            lCtx.lineWidth = Math.random() * 2 + 1;
            lCtx.stroke();
        }

        function animateLightning() {
            // ALWAYS clear canvas to prevent white buildup and background blocking
            lCtx.clearRect(0, 0, lWidth, lHeight);
            
            if (isHoveringHero) {
                // Randomly trigger a bolt
                if (Math.random() < 0.15) {
                    const startX = Math.random() * lWidth;
                    const startY = 0;
                    drawLightningBolt(startX, startY, 20, '#D4AF37'); // Gold
                    if(Math.random() > 0.5) drawLightningBolt(startX, startY, 15, '#8A957A'); // Pale Olive
                }
            }
            requestAnimationFrame(animateLightning);
        }
        animateLightning();






        // ----------------------------------------------------
        // Scrub Quotes (Main + Teaching Section)
        // ----------------------------------------------------
        function setupScrubQuote(containerId, text) {
            const container = document.getElementById(containerId);
            text.split('').forEach(char => {
                const span = document.createElement('span');
                span.innerText = char;
                span.className = 'scrub-text-span';
                container.appendChild(span);
            });

            gsap.to(`#${containerId} .scrub-text-span`, {
                color: '#1A1D24', // Shadowy Charcoal
                stagger: 0.1,
                scrollTrigger: {
                    trigger: container,
                    start: "top 80%",
                    end: "bottom 30%",
                    scrub: true
                }
            });
        }

        setupScrubQuote('scrub-quote-container', 'The quality of your life is determined by the quality of your decisions.');
        setupScrubQuote('teaching-quote-container', '"Knowledge becomes wisdom when shared."');





        // Generic Fade Ups
        gsap.utils.toArray('.gsap-fade-up').forEach(elem => {
            gsap.from(elem, {
                scrollTrigger: { trigger: elem, start: "top 85%" },
                y: 40, opacity: 0, duration: 1, ease: "power3.out"
            });
        });




        // About section Split Reveal
        gsap.from('.gsap-fade-right', {
            scrollTrigger: { trigger: '#about', start: "top 75%" },
            x: -40, opacity: 0, duration: 1.2, ease: "power3.out"
        });
        gsap.from('.gsap-fade-left', {
            scrollTrigger: { trigger: '#about', start: "top 75%" },
            x: 40, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.2
        });






        // ----------------------------------------------------
        // Exact Timeline Animation
        // ----------------------------------------------------
        const tContainer = document.getElementById('timeline-container');
        const goldLine = document.getElementById('timeline-line-gold');
        const lastNode = document.getElementById('timeline-node-last');
        const lastDot = document.querySelector('#timeline-node-last .timeline-dot');




        // Dynamically animate the line height to perfectly match scroll distance
        gsap.fromTo(goldLine, 
            { height: "0px" },
            {
                height: () => (lastNode.offsetTop + lastDot.offsetTop + 8) + "px", // Calculate total distance to the center of the last dot
                ease: "none",
                scrollTrigger: {
                    trigger: tContainer,
                    start: "top 50%", // Start when top of container hits center of screen
                    endTrigger: '#timeline-node-last', // Use the last node as the end boundary trigger
                    end: "top 50%", // End exactly when the last node hits the 50% mark
                    scrub: true,
                    invalidateOnRefresh: true // Recalculates on resize
                }
            }
        );




        // Light up each dot as it passes the center of the screen
        gsap.utils.toArray('.timeline-node').forEach((node) => {
            const dot = node.querySelector('.timeline-dot');
            
            ScrollTrigger.create({
                trigger: node,
                start: "top 50%", 
                toggleClass: { targets: dot, className: "active" }
            });

            gsap.from(node.querySelectorAll('h4, p'), {
                scrollTrigger: { 
                    trigger: node,
                    start: "top 70%"
                },
                x: 30, opacity: 0, duration: 0.8, ease: "power2.out", stagger: 0.1
            });
        });







        // ----------------------------------------------------
        // Algorithm Hover Letters Effect
        // ----------------------------------------------------
        const algoContainer = document.querySelector('.algorithm-bg-container');
        const letterOverlay = document.querySelector('.letter-overlay');
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ';
        let letterInterval;

        algoContainer.addEventListener('mouseenter', () => {
            letterInterval = setInterval(() => {
                const span = document.createElement('span');
                span.innerText = chars[Math.floor(Math.random() * chars.length)];
                span.style.left = Math.random() * 100 + '%';
                span.style.top = Math.random() * 100 + '%';
                span.style.fontSize = (Math.random() * 24 + 12) + 'px'; // Varied sizes
                span.style.opacity = Math.random() * 0.8 + 0.2; // Varied intensity
                
                span.className = 'floating-letter absolute text-brand-gold font-serif pointer-events-none transition-all duration-1000';
                letterOverlay.appendChild(span);
                
                // Fade out and remove
                setTimeout(() => span.style.opacity = '0', 100);
                setTimeout(() => span.remove(), 1000);
            }, 40); // Generate frequently
        });

        algoContainer.addEventListener('mouseleave', () => {
            clearInterval(letterInterval);
            letterOverlay.innerHTML = '';
        });

        // Process Nodes Sequence - Updated to fromTo to guarantee visibility
        gsap.fromTo('.process-node', 
            { y: 30, opacity: 0 },
            {
                scrollTrigger: { trigger: '.gsap-process', start: "top 85%" },
                y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.2)"
            }
        );

        // Expertise Grid
        gsap.from('.gsap-stagger-expert', {
            scrollTrigger: { trigger: '#expertise', start: "top 80%" },
            y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out"
        });

        // Conversations Stagger
        gsap.from('.gsap-stagger-conv', {
            scrollTrigger: { trigger: '.gsap-stagger-conv', start: "top 85%" },
            y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out"
        });

        // Manifesto Dramatic Reveal
        gsap.from('.manifesto-line', {
            scrollTrigger: { trigger: '#manifesto-container', start: "top 70%" },
            y: 20, opacity: 0, duration: 1.2, stagger: 0.4, ease: "power2.out"
        });

        // 3D Tilt Effect for Philosophy Cards
        const tiltCards = document.querySelectorAll('.tilt-card-wrapper');
        tiltCards.forEach(wrapper => {
            const card = wrapper.querySelector('.tilt-card');
            
            wrapper.addEventListener('mousemove', (e) => {
                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10; 
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            wrapper.addEventListener('mouseleave', () => {
                card.style.transform = `rotateX(0deg) rotateY(0deg)`;
            });
        });

        // Book Modal Logic
        const bookModalOverlay = document.getElementById('book-modal-overlay');
        const bookModalClose = document.getElementById('book-modal-close');
        const modalTitle = document.getElementById('modal-title');
        const modalDesc = document.getElementById('modal-desc');

        document.querySelectorAll('.book').forEach(book => {
            book.addEventListener('click', () => {
                const title = book.getAttribute('data-title');
                const desc = book.getAttribute('data-desc');
                modalTitle.innerText = title;
                modalDesc.innerText = desc;
                bookModalOverlay.classList.add('active');
            });
        });

        bookModalClose.addEventListener('click', () => {
            bookModalOverlay.classList.remove('active');
        });

        bookModalOverlay.addEventListener('click', (e) => {
            if (e.target === bookModalOverlay) {
                bookModalOverlay.classList.remove('active');
            }
        });






// Create Back-to-Top Button Dynamically
document.addEventListener("DOMContentLoaded", function () {
    // Create the button container
    const backToTop = document.createElement("div");
    backToTop.id = "back-to-top";
    backToTop.style.position = "fixed";
    backToTop.style.bottom = "20px";
    backToTop.style.right = "20px";
    backToTop.style.display = "none";
    backToTop.style.cursor = "pointer";
    backToTop.style.zIndex = "9999";

    // Create the image inside the button
    const backToTopImg = document.createElement("img");
    backToTopImg.src = "https://ik.imagekit.io/bebell/AURELIUS/back-to-top.svg";
    backToTopImg.alt = "Volver arriba";
    backToTopImg.style.width = "40px";
    backToTopImg.style.height = "40px";

    // Append image to the button
    backToTop.appendChild(backToTopImg);

    // Append button to the body
    document.body.appendChild(backToTop);

    // Scroll Event Listener
    window.addEventListener("scroll", function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    // Click Event for Scrolling to Top
    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});






// Force minimum display time
let loaderStartTime = Date.now();
const MIN_DISPLAY_TIME = 5000; // 5 seconds

window.addEventListener('load', function() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    const elapsed = Date.now() - loaderStartTime;
    const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);
    
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, remaining);
  }
});

// Fallback: Force hide after 6 seconds (safety net)
setTimeout(function() {
  const loader = document.getElementById('page-loader');
  if (loader && loader.style.display !== 'none') {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
}, 6000);
