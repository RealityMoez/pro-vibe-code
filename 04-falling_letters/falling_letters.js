document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Physics constants
    const gravity = 0.25;
    const friction = 0.98;
    const bounce = 0.7;
    
    // Array to store letter objects
    const letters = [];
    
    // Available characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    // Colors
    const colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
                   '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', 
                   '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41'];
    
    // Letter class
    class Letter {
        constructor(x, y, char) {
            this.x = x;
            this.y = y;
            this.char = char;
            this.size = 20 + Math.random() * 30;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.vx = Math.random() * 6 - 3;
            this.vy = -5 - Math.random() * 5;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.2;
            this.gravity = gravity * (0.8 + Math.random() * 0.4);
            this.bounceCount = 0;
            this.maxBounces = 2 + Math.floor(Math.random() * 3);
        }
        
        update() {
            // Apply gravity
            this.vy += this.gravity;
            
            // Apply friction
            this.vx *= friction;
            
            // Update position
            this.x += this.vx;
            this.y += this.vy;
            
            // Update rotation
            this.rotation += this.rotationSpeed;
            
            // Wall collision
            if (this.x < this.size/2) {
                this.x = this.size/2;
                this.vx = -this.vx * bounce;
            } else if (this.x > canvas.width - this.size/2) {
                this.x = canvas.width - this.size/2;
                this.vx = -this.vx * bounce;
            }
            
            // Floor collision
            if (this.y > canvas.height - this.size/2) {
                this.y = canvas.height - this.size/2;
                
                // Only bounce if we haven't reached max bounces
                if (this.bounceCount < this.maxBounces) {
                    this.vy = -this.vy * bounce;
                    this.bounceCount++;
                    
                    // Add some random horizontal movement on bounce
                    this.vx += (Math.random() - 0.5) * 2;
                } else {
                    this.vy = 0;
                    this.vx *= 0.9; // Increased friction when settled
                    this.rotationSpeed *= 0.9;
                }
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            ctx.font = `bold ${this.size}px Arial`;
            ctx.fillStyle = this.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.char, 0, 0);
            
            ctx.restore();
        }
    }
    
    // Add letters on click
    canvas.addEventListener('click', (e) => {
        addLetterBurst(e.clientX, e.clientY);
    });
    
    // Add letters when typing
    document.addEventListener('keypress', (e) => {
        if (e.key.length === 1) {
            const x = Math.random() * canvas.width;
            const y = 50;
            letters.push(new Letter(x, y, e.key.toUpperCase()));
        }
    });
    
    // Add a burst of letters
    function addLetterBurst(x, y) {
        const count = 10 + Math.floor(Math.random() * 15);
        
        for (let i = 0; i < count; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            letters.push(new Letter(x, y, char));
        }
    }
    
    // Initial letters
    function addRandomLetters() {
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.5;
            const char = chars[Math.floor(Math.random() * chars.length)];
            letters.push(new Letter(x, y, char));
        }
    }
    
    // Animation loop
    function animate() {
        // Clear canvas with slight transparency for trail effect
        ctx.fillStyle = 'rgba(17, 17, 17, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw letters
        for (let i = letters.length - 1; i >= 0; i--) {
            letters[i].update();
            letters[i].draw();
            
            // Remove letters that are completely stopped
            if (Math.abs(letters[i].vx) < 0.1 && 
                Math.abs(letters[i].vy) < 0.1 && 
                letters[i].bounceCount >= letters[i].maxBounces) {
                // 5% chance to remove settled letters each frame
                if (Math.random() < 0.05) {
                    letters.splice(i, 1);
                }
            }
        }
        
        // Add new letters occasionally
        if (Math.random() < 0.05 && letters.length < 200) {
            const x = Math.random() * canvas.width;
            const y = -30;
            const char = chars[Math.floor(Math.random() * chars.length)];
            letters.push(new Letter(x, y, char));
        }
        
        requestAnimationFrame(animate);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Start animation
    addRandomLetters();
    animate();
    
    // Add instructions text
    setTimeout(() => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Click anywhere or type to create falling letters', canvas.width/2, 30);
    }, 500);
});
