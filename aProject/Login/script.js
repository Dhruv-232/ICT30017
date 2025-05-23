let selectedRole = '';
let generatedOTP = '';
let otpWindow = null;
let otpTimeout;

function selectRole(role) {
  selectedRole = role;
  document.getElementById('email').value = `dhruvsharma2004@outlook.com`;
  document.getElementById('role-selection').classList.add('hidden');
  document.getElementById('login-form').classList.remove('hidden');
}

function checkLogin() {
  const enteredPassword = document.getElementById('password').value;

  if (enteredPassword === 'iamold123') {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('otp-verification').classList.remove('hidden');
    generateOTP();
  } else {
    alert('Incorrect password.');
  }
}

function generateOTP() {
  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

  const email = document.getElementById('email').value;

 console.log("Email value before sending:", email);

  emailjs.send("service_fe96c3h", "template_cbv57zj", {
    email: email,
    otp: generatedOTP
  }).then(
    () => {
      alert("OTP sent to " + email);
    },
    (error) => {
      alert("Failed to send OTP. Error: " + JSON.stringify(error));
    }
  );

  // Show resend button after 3 seconds
  clearTimeout(otpTimeout);
  otpTimeout = setTimeout(() => {
    document.getElementById('resend-btn').classList.remove('hidden');
  }, 60000);

  document.getElementById('resend-btn').classList.add('hidden');
}



function verifyOTP() {
  const userOTP = document.getElementById('otp-input').value;

  if (userOTP === generatedOTP) {
    alert(`Login successful as ${selectedRole.toUpperCase()}`);

    // Redirect to role-based dashboard
    switch (selectedRole) {
      case 'admin':
        window.location.href = '../Admin/admin-dashboard.html';
        break;
      case 'doctor':
        window.location.href = '../Doctor/doctor-dashboard.html';
        break;
      case 'nurse':
        window.location.href = '../Nurse/nurse-dashboard.html';
        break;
      case 'staff':
        window.location.href = '../Staff/staff-dashboard.html';
        break;
      case 'resident':
        window.location.href = '../Resident/resident-dashboard.html';
        break;
      case 'family':
        window.location.href = '../Family/family-dashboard.html';
        break;
      default:
        alert('Invalid role selected.');
    }
  } else {
    alert('Incorrect OTP.');
  }
}