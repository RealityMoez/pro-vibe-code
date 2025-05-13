const chars = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ0123456789";
const fontSize = 16;
let columns = [];
let hintVisible = true;
let isHolding = false;
let canvas, ctx;

function init() {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = 'black';
    canvas.style.display = 'block';

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    resizeCanvas();
    createColumns();
    animate();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createColumns();
}

function createColumns() {
    columns = [];
    const columnCount = Math.floor(canvas.width / fontSize);
    for (let i = 0; i < columnCount; i++) {
        columns.push({
            x: i * fontSize,
            y: Math.random() * -canvas.height,
            speed: 2 + Math.random() * 3,
            chars: Array(Math.floor(canvas.height / fontSize)).fill(0).map(() => 
                chars[Math.floor(Math.random() * chars.length)]
            ),
            highlight: false,
            intensity: 0
        });
    }
}

function handleMouseMove(e) {
    const mouseX = e.clientX;
    columns.forEach(col => {
        col.highlight = Math.abs(col.x - mouseX) < fontSize;
        col.intensity = col.highlight ? 1 : 0;
    });
}

function handleMouseDown() {
    isHolding = true;
    if (hintVisible) {
        hintVisible = false;
    }
}

function handleMouseUp() {
    isHolding = false;
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    columns.forEach(col => {
        const baseSpeed = isHolding ? (col.highlight ? 0.5 : 0.1) : col.speed;
        col.y += baseSpeed;

        if (col.y > canvas.height) {
            col.y = 0;
            col.chars = Array(Math.floor(canvas.height / fontSize)).fill(0).map(() => 
                chars[Math.floor(Math.random() * chars.length)
            ]);
        }

        col.chars.forEach((char, i) => {
            const yPos = col.y + i * fontSize;
            if (yPos > 0 && yPos < canvas.height) {
                const intensity = col.highlight ? 
                    (isHolding ? 1 : 0.7) : 
                    (isHolding ? 0.2 : 0.05);
                
                const glow = col.highlight && isHolding ? 15 : col.highlight ? 8 : 0;
                
                ctx.font = `${fontSize}px monospace`;
                ctx.fillStyle = `rgba(0, 255, 0, ${intensity})`;
                ctx.fillText(char, col.x, yPos);
                
                if (glow > 0) {
                    ctx.shadowBlur = glow;
                    ctx.shadowColor = '#0f0';
                    ctx.fillText(char, col.x, yPos);
                    ctx.shadowBlur = 0;
                }
            }
        });
    });

    if (hintVisible) {
        ctx.font = '20px monospace';
        ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
        ctx.textAlign = 'center';
        ctx.fillText('Click and hold to interact', canvas.width/2, canvas.height/2);
        ctx.textAlign = 'left';
    }

    requestAnimationFrame(animate);
}

// Start the effect
document.addEventListener('DOMContentLoaded', init);
