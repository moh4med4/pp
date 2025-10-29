document.addEventListener('DOMContentLoaded', function() {
    const profileCard = document.querySelector('.profile-card');
    const profile3d = document.querySelector('.profile-3d');
    
    // Add mouse move effect for 3D rotation
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        
        // Apply 3D transformation to the card
        profileCard.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    // Reset transformation when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
    
    // Add scroll effect for depth
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        document.querySelector('.container').style.transform = `translateY(${rate}px)`;
    });
    
    // Add animation to elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe profile elements
    document.querySelectorAll('.profile-3d, .profile-info, .stat').forEach(el => {
        observer.observe(el);
    });
    
    // Add click effect to social buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.add('clicked');
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                this.classList.remove('clicked');
                ripple.remove();
            }, 600);
        });
    });
    
    // Add dynamic background effect
    const body = document.querySelector('body');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Create subtle gradient shift based on mouse position
        const gradient = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(0, 198, 255, 0.15), transparent 40%),
                          radial-gradient(circle at ${(1-x) * 100}% ${(1-y) * 100}%, rgba(0, 114, 255, 0.15), transparent 40%)`;
        body.style.background = `linear-gradient(135deg, #0f2027, #203a43, #2c5364)${gradient}`;
    });
});