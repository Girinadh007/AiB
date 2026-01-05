import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAB9bmmm2w_7H1GQ2wkBNEgAQkOYet-DdQ",
    authDomain: "aib-code.firebaseapp.com",
    projectId: "aib-code",
    storageBucket: "aib-code.firebasestorage.app",
    messagingSenderId: "280973578542",
    appId: "1:280973578542:web:4e548f8375a31ff6cbaabf",
    measurementId: "G-D66BZ1QBJ1"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginBtn = document.getElementById('login-btn');
const errorMsg = document.getElementById('error-msg');

loginBtn.addEventListener('click', () => {
    const email = document.getElementById('admin-email').value;
    const pass = document.getElementById('admin-pass').value;

    signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
            // Success: Redirect to the management dashboard
            window.location.href = "admin.html";
        })
        .catch((error) => {
            errorMsg.innerText = "ACCESS DENIED: INVALID IDENTITY";
        });
});

// Security Check: If not logged in, boot them out of admin.html
export function checkAuth() {
    onAuthStateChanged(auth, (user) => {
        if (!user && window.location.pathname.includes('admin.html')) {
            window.location.href = "admin-login.html";
        }
    });
}