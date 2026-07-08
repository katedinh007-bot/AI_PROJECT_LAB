import { loginWithGoogle, logoutUser, watchAuthState } from './firebase.js';
// 1. Import our newly configured Gemini API trigger from ai.js
import { getAlexResponse } from './ai.js';

// --- DOM ELEMENTS ---
const themeToggleBtn = document.getElementById('theme-toggle');
const loginPage = document.getElementById('login-page');
const mainPage = document.getElementById('main-page');
const loginForm = document.getElementById('login-form');
const googleSigninBtn = document.getElementById('google-signin-btn');
const signoutBtn = document.getElementById('signout-btn');
const logoWrapper = document.getElementById('nav-to-main');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('toggle-password-btn');

// Chat UI Elements
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

// --- 1. THEME SWITCHER LOGIC ---
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        themeToggleBtn.textContent = 'Switch to Light Theme';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggleBtn.textContent = 'Switch to Dark Theme';
    }
});

// --- 2. PASSWORD VISIBILITY TOGGLE LOGIC ---
togglePasswordBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordBtn.textContent = '🙈'; 
    } else {
        passwordInput.type = 'password';
        togglePasswordBtn.textContent = '👁️'; 
    }
});

// --- 3. LIVE AI CHAT INTERACTION (AI.JS CONNECTION) ---
chatForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Stop the page from reloading on form submit
    
    const messageText = userInput.value.trim();
    if (!messageText) return; // Exit early if the field is empty spaces

    // A. Add the User's text bubble to the chat box
    chatMessages.innerHTML += `
        <div class="message user-msg" style="background-color: rgba(255,121,198,0.15); margin-left: auto; border-right: 4px solid var(--accent-pink); margin-bottom: 10px; text-align: right;">
            ${messageText}
        </div>
    `;
    
    // Clear the input box immediately so the user can type their next query
    userInput.value = ""; 
    
    // B. Generate a temporary ID and show a "thinking..." text bubble
    const thinkingId = "thinking-" + Date.now();
    chatMessages.innerHTML += `
        <div class="message agent-msg" id="${thinkingId}" style="margin-bottom: 10px;">
            Agent Alex is typing...
        </div>
    `;
    
    // Force the chat display window to scroll down to reveal the thinking state
    chatMessages.scrollTop = chatMessages.scrollHeight; 

    // C. Wait for the Gemini API inside ai.js to process the data
    const aiReply = await getAlexResponse(messageText);

    // D. Locate our placeholder bubble and swap out the "thinking..." text with the real answer
    const aiMessageBubble = document.getElementById(thinkingId);
    if (aiMessageBubble) {
        aiMessageBubble.innerText = aiReply;
    }
    
    // Scroll down one more time to make sure the student sees the entire message response
    chatMessages.scrollTop = chatMessages.scrollHeight; 
});

// --- 4. LIVE FIREBASE AUTHENTICATION ROUTING ---
googleSigninBtn.addEventListener('click', async () => {
    try {
        await loginWithGoogle();
        console.log("Successfully logged in via Google!");
    } catch (error) {
        console.error("Authentication Error: ", error.message);
        alert("Oops! Something went wrong during Google Sign-In.");
    }
});

signoutBtn.addEventListener('click', async () => {
    try {
        await logoutUser();
        console.log("Successfully signed out!");
    } catch (error) {
        console.error("Sign-out Error: ", error.message);
    }
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert("Standard user/password login is a visual placeholder! Please click 'Sign in with Google' to log into your account.");
});

// --- 5. STATE OBSERVER ---
watchAuthState((user) => {
    if (user) {
        loginPage.classList.add('hidden');
        mainPage.classList.remove('hidden');
        console.log("Welcome,", user.displayName);
    } else {
        mainPage.classList.add('hidden');
        loginPage.classList.remove('hidden');
    }
});

logoWrapper.addEventListener('click', () => {
    alert("AI Study App - Managed by Agent Alex!");
});