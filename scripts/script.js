// Navbar hide/show on scroll
const navbar = document.querySelector("nav");
let lastScrollY = window.scrollY;

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  navbar.classList.toggle("navbar--hidden", currentScrollY > lastScrollY);
  lastScrollY = currentScrollY;
};

window.addEventListener("scroll", handleScroll, { passive: true });

// GSAP animations
document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline();

  const animateFrom = (selector, props) => {
    tl.from(selector, { ...props, opacity: 0 });
  };

  // Animations for page elements
  animateFrom("nav p", { y: -100, duration: 0.6, stagger: 0.3, delay: 0.3 });
  animateFrom(".animated-text span", { y: 300, duration: 0.8, stagger: 0.2 });
  animateFrom(".container-1 p", { y: 100, duration: 0.6, stagger: 0.1 });

  // ScrollTrigger-based animations
  const createScrollTrigger = (selector, props) => {
    return {
      scrollTrigger: {
        trigger: selector,
        scroller: "body",
        ...props
      },
      ...props
    };
  };

  animateFrom("#about-section .something", createScrollTrigger("#about-section .something", { scale: 0, end: "top 70%", scrub: 1 }));
  animateFrom(".asd p", createScrollTrigger(".something p", { duration: 1, y: -200, stagger: 0.3, end: "top 50%", scrub: 1 }));
  animateFrom("#project-section h2", createScrollTrigger("#project-section h2", { duration: 1, x: -300, start: "top 50%", end: "top 30%", scrub: 1 }));
  animateFrom("#skills-section p", createScrollTrigger("#skills-section", { y: -100, duration: 1, stagger: 0.2, end: "top 5%", scrub: 1 }));
});

// Chatbot functionality
const chatContainer = document.getElementById("chat-container");
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");

const toggleChat = () => {
  const isHidden = window.getComputedStyle(chatContainer).display === "none";
  if (isHidden) {
    gsap.fromTo(chatContainer, { opacity: 0, y: 300 }, { opacity: 1, y: 0, display: "flex", duration: 0.5 });
    chatMessages.innerHTML = '<div class="bot-message">Want to contact me?</div>';
  } else {
    gsap.to(chatContainer, { opacity: 0, y: 50, duration: 0.5, onComplete: () => {
      chatContainer.style.display = "none";
    }});
  }
};

const closeChat = () => {
  gsap.to(chatContainer, { opacity: 0, y: 50, duration: 0.5, onComplete: () => {
    chatContainer.style.display = "none";
  }});
};

const getBotResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes("yes") || lowerMessage.includes("yepp")) {
    return "What do you need: Dhruv's Email or Instagram?";
  } else if (lowerMessage.includes("no") || lowerMessage.includes("nahh")) {
    return "Okay, feel free to chat if you change your mind.";
  } else if (lowerMessage.includes("email")) {
    return "Dhruv's Email is dhruvvermaa.w@gmail.com";
  } else if (lowerMessage.includes("instagram")) {
    return "Dhruv's Instagram is @dhruv_codess";
  } else {
    return "I'm not sure how to respond to that. Can you try asking about Dhruv's contact info?";
  }
};

const sendMessage = () => {
  const message = userInput.value.trim();
  if (message) {
    chatMessages.innerHTML += `<div class="user-message">${message}</div>`;
    userInput.value = "";
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      chatMessages.innerHTML += `<div class="bot-message">${botResponse}</div>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
  }
};

// Handle the 'Enter' key to send a message
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Add event listener for close button
document.querySelector(".close-chat").addEventListener("click", closeChat);
