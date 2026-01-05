import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, updateDoc, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// 1. THE SCANNER LOGIC
// This function is called automatically when the camera detects a QR code
window.onScanSuccess = async (decodedText) => {
    try {
        // decodedText is the Document ID from the player's QR
        const playerRef = doc(db, "registrations", decodedText);
        await updateDoc(playerRef, {
            attended: true,
            checkInTime: new Date().toLocaleTimeString()
        });
        alert("PLAYER VERIFIED. ENTRY GRANTED.");
    } catch (error) {
        console.error("Invalid Visa Scan:", error);
        alert("ERROR: UNAUTHORIZED OR INVALID VISA");
    }
};

// 2. LIVE SYNC FOR ALL ADMINS
onSnapshot(collection(db, "registrations"), (snapshot) => {
    const tbody = document.getElementById('present-rows');
    tbody.innerHTML = "";
    let presentPlayers = [];

    snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.attended) {
            presentPlayers.push(data);
            const row = `<tr>
                <td>${data.playerName}</td>
                <td>${data.regNo}</td>
                <td>${data.checkInTime || 'Just now'}</td>
            </tr>`;
            tbody.insertAdjacentHTML('beforeend', row);
        }
    });

    // Store only present players for the CSV
    window.currentPresentList = presentPlayers;
});

// 3. EXPORT ONLY PRESENT PLAYERS
window.downloadAttendanceCSV = () => {
    let csvContent = "Name,Register Number,Department,Check-in Time\n";
    window.currentPresentList.forEach(p => {
        csvContent += `${p.playerName},${p.regNo},${p.dept},${p.checkInTime}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Present_Players_Jan25.csv`;
    link.click();
};