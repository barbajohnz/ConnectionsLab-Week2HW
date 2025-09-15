// Interactive Horror Story JavaScript - Fixed Video Flow

console.log("Script is loading...");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, starting script...");
    
    // Get all the elements we need
    const phone = document.getElementById('phone');
    const mysteryPhoto = document.getElementById('mysteryPhoto');
    const introSection = document.getElementById('intro');
    const videoRevealSection = document.getElementById('videoReveal');
    const finalRevealSection = document.getElementById('finalReveal');
    const aloneWord = document.getElementById('aloneWord');
    const sleepingVideo = document.getElementById('sleepingVideo');
    const endVideoText = document.getElementById('endVideoText');
    const nosferatuContainer = document.getElementById('nosferatuContainer');
    const darknessOverlay = document.getElementById('darknessOverlay');
    
    console.log("Elements found:", {
        phone: !!phone,
        videoRevealSection: !!videoRevealSection,
        sleepingVideo: !!sleepingVideo,
        endVideoText: !!endVideoText
    });
    
    // First interaction: Click on phone to reveal the video
    if (phone) {
        phone.addEventListener('click', function() {
            console.log("Phone clicked!");
            
            // Add click effect
            phone.style.transform = 'scale(0.95)';
            setTimeout(() => {
                phone.style.transform = 'scale(1)';
            }, 150);
            
            // Transition to video reveal after a short delay
            setTimeout(() => {
                if (introSection) introSection.classList.add('hidden');
                if (videoRevealSection) videoRevealSection.classList.remove('hidden');
                
                // Show revelation text
                setTimeout(() => {
                    const revelation = document.querySelector('.revelation');
                    if (revelation) revelation.style.opacity = '1';
                }, 500);
                
            }, 800);
        });
        
        console.log("Phone click listener added successfully");
    }
    
    // Handle video events
    if (sleepingVideo) {
        // Video loading events
        sleepingVideo.addEventListener('loadeddata', function() {
            console.log("Video loaded successfully");
        });
        
        sleepingVideo.addEventListener('error', function(e) {
            console.error("Video failed to load:", e);
        });
        
        // When video starts playing
        sleepingVideo.addEventListener('play', function() {
            console.log("Video started playing");
        });
        
        sleepingVideo.addEventListener('pause', function() {
            console.log("Video paused");
        });
        
        // IMPORTANT: When video ends, show "I live alone" text
        sleepingVideo.addEventListener('ended', function() {
            console.log("Video ended - showing 'I live alone' text");
            
            // Show the end video text with animation
            if (endVideoText) {
                endVideoText.classList.remove('hidden');
                endVideoText.classList.add('show');
                
                // Setup the click listener for "alone" word after it appears
                setupAloneWordListener();
            }
        });
        
        console.log("Video event listeners added successfully");
    }
    
    // Function to setup the "alone" word click listener
    function setupAloneWordListener() {
        if (aloneWord && !aloneWord.hasAttribute('data-listener-added')) {
            aloneWord.addEventListener('click', function() {
                console.log("Alone word clicked!");
                
                // Add click effect
                aloneWord.style.color = '#ff0000';
                aloneWord.style.textShadow = '0 0 15px rgba(255,0,0,0.8)';
                
                // Pause video if still playing
                if (sleepingVideo && !sleepingVideo.paused) {
                    sleepingVideo.pause();
                }
                
                // Transition to final reveal
                setTimeout(() => {
                    if (videoRevealSection) videoRevealSection.classList.add('hidden');
                    if (finalRevealSection) finalRevealSection.classList.remove('hidden');
                    
                    // Start the final horror sequence
                    setTimeout(() => {
                        enableMouseInteraction();
                    }, 2000);
                }, 500);
            });
            
            // Mark that listener has been added to prevent duplicates
            aloneWord.setAttribute('data-listener-added', 'true');
            console.log("Alone word click listener added successfully");
        }
    }
    
    // Mouse interaction for final section with Nosferatu
    function enableMouseInteraction() {
        console.log("Mouse interaction enabled!");
        let mouseMovementCount = 0;
        let nosferatuRevealed = false;
        let jumpScareTriggered = false;
        
        document.addEventListener('mousemove', function(e) {
            mouseMovementCount++;
            
            // Calculate mouse position relative to viewport
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            // Update darkness overlay to follow mouse (flashlight effect)
            if (darknessOverlay) {
                darknessOverlay.style.background = 
                    `radial-gradient(circle at ${mouseX}px ${mouseY}px, 
                    transparent 80px, 
                    rgba(0,0,0,0.8) 150px, 
                    rgba(0,0,0,0.98) 300px)`;
            }
            
            // After some mouse movement, start revealing Nosferatu
            if (mouseMovementCount > 15 && !nosferatuRevealed) {
                if (nosferatuContainer) {
                    nosferatuContainer.classList.add('visible');
                    nosferatuRevealed = true;
                    console.log("Nosferatu revealed!");
                }
            }
            
            // Check if mouse is near Nosferatu to illuminate him
            if (nosferatuRevealed && nosferatuContainer) {
                const nosferatuRect = nosferatuContainer.getBoundingClientRect();
                const nosferatuCenterX = nosferatuRect.left + nosferatuRect.width / 2;
                const nosferatuCenterY = nosferatuRect.top + nosferatuRect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(mouseX - nosferatuCenterX, 2) + 
                    Math.pow(mouseY - nosferatuCenterY, 2)
                );
                
                // If flashlight is close to Nosferatu, illuminate him
                if (distance < 120) {
                    nosferatuContainer.classList.add('illuminated');
                    document.body.style.cursor = 'none';
                    
                    // Trigger jump scare effect once when first illuminated
                    if (!jumpScareTriggered) {
                        nosferatuContainer.classList.add('jump-scare');
                        jumpScareTriggered = true;
                        
                        // Remove jump scare class after animation
                        setTimeout(() => {
                            nosferatuContainer.classList.remove('jump-scare');
                        }, 500);
                        
                        console.log("Jump scare triggered!");
                    }
                    
                    // Make Nosferatu subtly follow the mouse when illuminated
                    const offsetX = (mouseX - centerX) * 0.02;
                    const offsetY = (mouseY - centerY) * 0.01;
                    
                    nosferatuContainer.style.transform = 
                        `translate(${offsetX}px, ${offsetY}px)`;
                        
                } else {
                    nosferatuContainer.classList.remove('illuminated');
                    document.body.style.cursor = 'default';
                    nosferatuContainer.style.transform = 'translate(0px, 0px)';
                }
            }
        });
    }
    
    // Add hover effects for better interactivity
    if (mysteryPhoto) {
        mysteryPhoto.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(255,107,107,0.3)';
        });
        
        mysteryPhoto.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    }
    
    // Add ambient effects
    setTimeout(() => {
        document.body.style.animation = 'backgroundShift 10s ease-in-out infinite alternate';
    }, 3000);
    
    console.log("All event listeners added successfully!");
});

console.log("Script loaded completely");