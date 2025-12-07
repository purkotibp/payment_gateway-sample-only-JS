let selectedGateway = "";

// Open popup
function openPopup(gateway) {
    selectedGateway = gateway;
    document.getElementById("gateway-name").innerText =
        gateway === "khalti" ? "Khalti Payment" : "eSewa Payment";
    document.getElementById("payment-popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("payment-popup").style.display = "none";
}

// Complete payment
function completePayment() {
    let name = document.getElementById("username").value;
    let type = document.getElementById("loanType").value;
    let amount = document.getElementById("amountInput").value;

    if (!name || !amount) {
        alert("Please fill all fields!");
        return;
    }

    closePopup();

    // Transaction ID
    let txn = (selectedGateway === "khalti" ? "KHALTI-" : "ESEWA-") +
        Math.floor(Math.random() * 1000000000);

    // Fill invoice
    document.getElementById("inv-name").innerText = name;
    document.getElementById("inv-type").innerText = type;
    document.getElementById("paid-amount").innerText = amount;
    document.getElementById("txn-id").innerText = txn;
    document.getElementById("paid-date").innerText = new Date().toLocaleString();

    // Logo
    document.getElementById("pay-logo").src =
        selectedGateway === "khalti"
            ? "https://upload.wikimedia.org/wikipedia/commons/1/14/Khalti_Logo.png"
            : "https://upload.wikimedia.org/wikipedia/commons/f/f1/ESewa_logo.png";

    // Show invoice
    document.getElementById("payment-box").style.display = "none";
    document.getElementById("invoice-box").style.display = "block";
}

// PDF Download
function downloadInvoice() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    let name = document.getElementById("inv-name").innerText;
    let type = document.getElementById("inv-type").innerText;
    let amount = document.getElementById("paid-amount").innerText;
    let txn = document.getElementById("txn-id").innerText;
    let date = document.getElementById("paid-date").innerText;

    doc.setFontSize(18);
    doc.text("Loan Payment Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Loan Type: ${type}`, 20, 50);
    doc.text(`Amount Paid: ₹${amount}`, 20, 70);
    doc.text(`Transaction ID: ${txn}`, 20, 80);
    doc.text(`Date: ${date}`, 20, 90);
    doc.text("This is a system-generated invoice.", 20, 110);

    doc.save(`Invoice_${txn}.pdf`);
}
