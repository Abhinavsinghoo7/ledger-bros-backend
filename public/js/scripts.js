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
