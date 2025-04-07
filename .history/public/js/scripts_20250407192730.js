// public/js/scripts.js
function togglePaymentDetails() {
    const paymentMode = document.getElementById('paymentMode').value;
    const bankDetails = document.getElementById('bankDetails');
    const cryptoDetails = document.getElementById('cryptoDetails');
    
    if (paymentMode === "Bank Transfer/Deposit") {
      bankDetails.style.display = "block";
      cryptoDetails.style.display = "none";
    } else if (paymentMode === "Cryptocurrency") {
      bankDetails.style.display = "none";
      cryptoDetails.style.display = "block";
    } else {
      bankDetails.style.display = "none";
      cryptoDetails.style.display = "none";
    }
  }
  
  function copyAddress(id) {
    const addressText = document.getElementById(id).innerText;
    navigator.clipboard.writeText(addressText)
      .then(() => alert('Address copied to clipboard'))
      .catch(err => console.error('Failed to copy: ', err));
  }
  