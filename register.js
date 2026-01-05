import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const db = getFirestore(app);

// Step 2: Payment Logic
window.calculateTotal = () => {
    const players = document.getElementById('player_count').value;
    const total = players * 250;
    document.getElementById('total_amount').innerText = `Total: ₹${total}`;
    // Link to your QR image
    document.getElementById('bank_qr').src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=girinadhpedapudi3-1@oksbi&am=${total}`;
};

// Final Step: Submit & Generate Visa
window.completeRegistration = async () => {
    const teamData = {
        name: document.getElementById('team_name').value,
        members: parseInt(document.getElementById('player_count').value),
        transID: document.getElementById('trans_id').value,
        attended: false,
        timestamp: new Date()
    };

    const docRef = await addDoc(collection(db, "registrations"), teamData);
    alert("VISA GENERATED!");
    // Redirect to a page that displays the QR containing docRef.id
};