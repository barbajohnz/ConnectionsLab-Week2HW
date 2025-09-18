/**
 * Interactive Horror Story - Advanced JavaScript Implementation
 * 
 * This script handles multiple complex user interactions:
 * 1. Phone click event to reveal video
 * 2. Video end event detection to show additional text
 * 3. Text click event to transition to final section
 * 4. Advanced mouse tracking with flashlight effect and proximity detection
 * 
 * Uses modern JavaScript features including:
 * - Event listeners and event delegation
 * - DOM manipulation and element selection
 * - CSS property manipulation via JavaScript
 * - Mathematical calculations for distance and positioning
 * - Animation timing and state management
 * - Browser API integration (video events)
 */

// Wait for DOM to be fully loaded before executing any code
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded - initializing horror story interactions");
    
    // ============================================================================
    // ELEMENT SELECTION AND INITIALIZATION
    // ============================================================================
    
    // Cache DOM elements for better performance - avoiding repeated queries
    const elements = {
        // Interactive elements
        phone: document.getElementById('phone'),
        mysteryPhoto: document.getElementById('mysteryPhoto'),
        aloneWord: document.getElementById('aloneWord'),
        sleepingVideo: document.getElementById('sleepingVideo'),
        
        // Section containers
        introSection: document.getElementById('intro'),
        videoRevealSection: document.getElementById('videoReveal'),
        finalRevealSection: document.getElementById('finalReveal'),
        endVideoText: document.getElementById('endVideoText'),
        
        // Final section elements
        nosferatuContainer: document.getElementById('nosferatuContainer'),
        darknessOverlay: document.getElementById('darknessOverlay')
    };
    
    // Verify all critical elements exist
    const criticalElements = ['phone', 'sleepingVideo', 'aloneWord', 'darknessOverlay'];
    const missingElements = criticalElements.filter(key => !elements[key]);
    
    if (missingElements.length > 0) {
        console.error("Critical elements missing:", missingElements);
        return; // Exit if essential elements are not found
    }
    
    console.log("All essential elements found and cached successfully");
    
    // ============================================================================
    // INTERACTION 1: PHONE CLICK EVENT HANDLER
    // ============================================================================
    
    /**
     * Handles the initial phone click interaction
     * Creates a scale animation effect and transitions to video reveal
     */
    elements.phone.addEventListener('click', function() {
        console.log("Phone interaction initiated");
        
        // Visual feedback: scale down animation on click
        this.style.transform = 'scale(0.95)';
        
        // Reset scale after brief animation delay
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Transition to video section with delay for dramatic effect
        setTimeout(() => {
            // Hide current section and show video section
            if (elements.introSection) elements.introSection.classList.add('hidden');
            if (elements.videoRevealSection) elements.videoRevealSection.classList.remove('hidden');
            
            // Staggered text appearance for dramatic timing
            setTimeout(() => {
                const revelationText = document.querySelector('.revelation');
                if (revelationText) {
                    revelationText.style.opacity = '1';
                    console.log("Revelation text displayed");
                }
            }, 500); // Half-second delay for revelation text
            
        }, 800); // Main transition delay
    });
    
    // ============================================================================
    // INTERACTION 2: VIDEO EVENT HANDLING
    // ============================================================================
    
    /**
     * Advanced video event handling with multiple event listeners
     * Tracks video lifecycle and triggers story progression
     */
    if (elements.sleepingVideo) {
        
        // Video loading event handlers
        elements.sleepingVideo.addEventListener('loadeddata', function() {
            console.log("Video data loaded successfully - ready for playback");
        });
        
        elements.sleepingVideo.addEventListener('error', function(error) {
            console.error("Video loading error encountered:", error);
            // Could implement fallback behavior here
        });
        
        // Video playback event handlers
        elements.sleepingVideo.addEventListener('play', function() {
            console.log("Video playback started");
        });
        
        elements.sleepingVideo.addEventListener('pause', function() {
            console.log("Video playback paused");
        });
        
        /**
         * Critical event: Video end detection
         * Triggers the appearance of "I live alone" text
         */
        elements.sleepingVideo.addEventListener('ended', function() {
            console.log("Video playback completed - triggering next story element");
            
            // Show the end video text with smooth animation
            if (elements.endVideoText) {
                elements.endVideoText.classList.remove('hidden');
                elements.endVideoText.classList.add('show');
                
                // Initialize the "alone" word click handler after text appears
                initializeAloneWordInteraction();
                console.log("End video text displayed with animation");
            }
        });
    }
    
    // ============================================================================
    // INTERACTION 3: "ALONE" WORD CLICK HANDLER
    // ============================================================================
    
    /**
     * Initializes the "alone" word click interaction
     * Separated into function to avoid duplicate event listeners
     */
    function initializeAloneWordInteraction() {
        // Check if event listener already exists to prevent duplicates
        if (elements.aloneWord && !elements.aloneWord.hasAttribute('data-listener-active')) {
            
            elements.aloneWord.addEventListener('click', function() {
                console.log("'Alone' word clicked - transitioning to final horror sequence");
                
                // Visual feedback: red color and glow effect
                this.style.color = '#ff0000';
                this.style.textShadow = '0 0 15px rgba(255,0,0,0.8)';
                
                // Pause video if still playing
                if (elements.sleepingVideo && !elements.sleepingVideo.paused) {
                    elements.sleepingVideo.pause();
                    console.log("Video paused for final transition");
                }
                
                // Transition to final scary section
                setTimeout(() => {
                    if (elements.videoRevealSection) elements.videoRevealSection.classList.add('hidden');
                    if (elements.finalRevealSection) elements.finalRevealSection.classList.remove('hidden');
                    
                    // Initialize advanced mouse interaction system after delay
                    setTimeout(() => {
                        initializeAdvancedMouseInteraction();
                    }, 2000); // 2-second delay for suspense building
                    
                }, 500);
            });
            
            // Mark listener as active to prevent duplicate additions
            elements.aloneWord.setAttribute('data-listener-active', 'true');
            console.log("Alone word interaction initialized");
        }
    }
    
    // ============================================================================
    // INTERACTION 4: ADVANCED MOUSE TRACKING AND FLASHLIGHT SYSTEM
    // ============================================================================
    
    /**
     * Advanced mouse interaction system featuring:
     * - Real-time mouse position tracking
     * - Dynamic CSS gradient manipulation
     * - Proximity detection algorithms
     * - State management for progressive revelation
     * - Performance optimized event handling
     */
    function initializeAdvancedMouseInteraction() {
        console.log("Initializing advanced mouse tracking system");
        
        // State management variables
        let mouseMovementCounter = 0;
        let nosferatuRevealState = false;
        let jumpScareTriggered = false;
        
        // Performance optimization: throttle mouse events
        let lastUpdateTime = 0;
        const updateThrottle = 16; // ~60fps update rate
        
        /**
         * Main mouse movement event handler
         * Uses requestAnimationFrame for smooth performance
         */
        document.addEventListener('mousemove', function(event) {
            const currentTime = performance.now();
            
            // Throttle updates for better performance
            if (currentTime - lastUpdateTime < updateThrottle) return;
            lastUpdateTime = currentTime;
            
            mouseMovementCounter++;
            
            // Extract mouse coordinates from event object
            const mouseCoordinates = {
                x: event.clientX,
                y: event.clientY
            };
            
            // ====================================================================
            // DYNAMIC FLASHLIGHT EFFECT GENERATION
            // ====================================================================
            
            /**
             * Creates a radial gradient that follows the mouse cursor
             * Uses multiple color stops for realistic flashlight beam effect
             */
            if (elements.darknessOverlay) {
                const flashlightGradient = `radial-gradient(circle at ${mouseCoordinates.x}px ${mouseCoordinates.y}px, 
                    transparent 60px, 
                    rgba(0,0,0,0.3) 100px, 
                    rgba(0,0,0,0.8) 150px, 
                    rgba(0,0,0,0.95) 200px, 
                    black 300px)`;
                
                elements.darknessOverlay.style.background = flashlightGradient;
            }
            
            // ====================================================================
            // PROGRESSIVE NOSFERATU REVELATION SYSTEM
            // ====================================================================
            
            /**
             * Reveals Nosferatu after sufficient mouse movement
             * Implements progressive disclosure for maximum suspense
             */
            if (mouseMovementCounter > 15 && !nosferatuRevealState) {
                if (elements.nosferatuContainer) {
                    elements.nosferatuContainer.classList.add('visible');
                    nosferatuRevealState = true;
                    console.log("Nosferatu revealed - proximity detection now active");
                }
            }
            
            // ====================================================================
            // PROXIMITY DETECTION AND ILLUMINATION SYSTEM
            // ====================================================================
            
            /**
             * Advanced proximity detection using Euclidean distance calculation
             * Triggers illumination effects when flashlight approaches Nosferatu
             */
            if (nosferatuRevealState && elements.nosferatuContainer) {
                
                // Get Nosferatu's current screen position
                const nosferatuBoundingRect = elements.nosferatuContainer.getBoundingClientRect();
                const nosferatuCenter = {
                    x: nosferatuBoundingRect.left + (nosferatuBoundingRect.width / 2),
                    y: nosferatuBoundingRect.top + (nosferatuBoundingRect.height / 2)
                };
                
                // Calculate Euclidean distance between mouse and Nosferatu center
                const distanceToNosferatu = Math.sqrt(
                    Math.pow(mouseCoordinates.x - nosferatuCenter.x, 2) + 
                    Math.pow(mouseCoordinates.y - nosferatuCenter.y, 2)
                );
                
                // Proximity threshold for illumination effect
                const illuminationThreshold = 120;
                
                if (distanceToNosferatu < illuminationThreshold) {
                    // ============================================================
                    // ILLUMINATION STATE ACTIVATION
                    // ============================================================
                    
                    elements.nosferatuContainer.classList.add('illuminated');
                    document.body.style.cursor = 'none'; // Hide cursor for immersion
                    
                    // One-time jump scare trigger
                    if (!jumpScareTriggered) {
                        elements.nosferatuContainer.classList.add('jump-scare');
                        jumpScareTriggered = true;
                        
                        console.log("Jump scare sequence activated!");
                        
                        // Remove jump scare class after animation completes
                        setTimeout(() => {
                            elements.nosferatuContainer.classList.remove('jump-scare');
                        }, 500);
                    }
                    
                    // ============================================================
                    // DYNAMIC FOLLOWING BEHAVIOR
                    // ============================================================
                    
                    /**
                     * Makes Nosferatu subtly track mouse movement when illuminated
                     * Creates unsettling "watching" effect
                     */
                    const followIntensity = 0.02; // Subtle movement multiplier
                    const screenCenter = {
                        x: window.innerWidth / 2,
                        y: window.innerHeight / 2
                    };
                    
                    const followOffset = {
                        x: (mouseCoordinates.x - screenCenter.x) * followIntensity,
                        y: (mouseCoordinates.y - screenCenter.y) * followIntensity
                    };
                    
                    elements.nosferatuContainer.style.transform = 
                        `translate(${followOffset.x}px, ${followOffset.y}px)`;
                        
                } else {
                    // ============================================================
                    // ILLUMINATION STATE DEACTIVATION
                    // ============================================================
                    
                    elements.nosferatuContainer.classList.remove('illuminated');
                    document.body.style.cursor = 'default'; // Restore cursor
                    elements.nosferatuContainer.style.transform = 'translate(0px, 0px)';
                }
            }
        });
        
        console.log("Advanced mouse tracking system fully initialized");
    }
    
    // ============================================================================
    // ENHANCED USER EXPERIENCE FEATURES
    // ============================================================================
    
    /**
     * Additional hover effects for improved user feedback
     * Provides visual cues for interactive elements
     */
    
    // Phone photo hover effects
    if (elements.mysteryPhoto) {
        elements.mysteryPhoto.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(255,107,107,0.3)';
        });
        
        elements.mysteryPhoto.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    }
    
    // ============================================================================
    // AMBIENT BACKGROUND EFFECTS
    // ============================================================================
    
    /**
     * Delayed ambient background animation activation
     * Adds subtle atmospheric enhancement
     */
    setTimeout(() => {
        document.body.style.animation = 'backgroundShift 10s ease-in-out infinite alternate';
        console.log("Ambient background effects activated");
    }, 3000);
    
    // ============================================================================
    // INITIALIZATION COMPLETE
    // ============================================================================
    
    console.log("Interactive horror story fully initialized - all systems ready");
});

/**
 * Additional utility functions and error handling could be added here
 * This modular structure allows for easy expansion and maintenance
 */