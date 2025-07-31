document.addEventListener('DOMContentLoaded', function () {
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotSend = document.getElementById('chatbotSend');

  // Toggle chatbot window
  chatbotToggle.addEventListener('click', function () {
    chatbotWindow.classList.toggle('active');
  });

  // Close chatbot window
  chatbotClose.addEventListener('click', function () {
    chatbotWindow.classList.remove('active');
  });

  // Send message
  chatbotSend.addEventListener('click', sendMessage);
  chatbotInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
  });

  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message === '') return;

    addMessage(message, 'user');
    chatbotInput.value = '';

    // Call Flask backend
    fetch('/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
      addMessage(data.response, 'bot');
    })
    .catch(error => {
      addMessage("Sorry, something went wrong!", 'bot');
      console.error("Chatbot error:", error);
    });
  }

  function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerText = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
});

// === CONSTELLATION EFFECT FOR HERO SECTION ===
window.addEventListener('DOMContentLoaded', function () {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.className = 'constellation-bg';
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = 0;
  canvas.style.pointerEvents = 'none';
  hero.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width, height, stars;
  const STAR_COUNT = 80;
  const STAR_COLOR = 'rgba(255,255,255,0.85)';
  const LINE_COLOR = 'rgba(255,255,255,0.15)';
  const STAR_SIZE = 1.5;
  const MAX_DIST = 120;

  function resize() {
    width = hero.offsetWidth;
    height = hero.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    createStars();
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    // Draw stars
    for (let s of stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, STAR_SIZE, 0, 2 * Math.PI);
      ctx.fillStyle = STAR_COLOR;
      ctx.shadowColor = STAR_COLOR;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    // Draw lines
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = LINE_COLOR;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    for (let s of stars) {
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0 || s.x > width) s.vx *= -1;
      if (s.y < 0 || s.y > height) s.vy *= -1;
    }
    draw();
    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize);
  animate();
});
