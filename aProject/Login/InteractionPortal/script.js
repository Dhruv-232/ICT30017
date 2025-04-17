// Sample data
let messages = [
    { id: 1, sender: 'Carer', text: 'Resident is doing well, eating normally today.' },
    { id: 2, sender: 'Family', text: 'Thanks for the update! How was the physiotherapy session?' },
];

let visits = [
    { id: 1, date: '2025-04-06', time: '10:00', familyMember: 'Jane Doe' },
];

let carePlanUpdates = [
    { id: 1, date: '2025-04-01', update: 'Care plan updated to include additional physical therapy.' },
];

let photos = [
    { id: 1, date: '2025-04-05', photoUrl: 'photo1.jpg', caption: 'Resident enjoying a walk in the garden.' },
];

// Render Message System
function renderMessages() {
    const messageHistory = document.getElementById('message-history');
    messageHistory.innerHTML = ''; // Clear existing messages

    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `
            <strong>${message.sender}:</strong>
            <p>${message.text}</p>
        `;
        messageHistory.appendChild(messageElement);
    });
}

// Send Message
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    if (messageText) {
        messages.push({ id: messages.length + 1, sender: 'Family', text: messageText });
        messageInput.value = ''; // Clear the input field
        renderMessages();
    }
}

// Render Visits
function renderVisits() {
    const visitForm = document.getElementById('visit-schedule-form');
    const visitList = document.getElementById('visit-schedule-form');

    visits.forEach(visit => {
        const visitElement = document.createElement('div');
        visitElement.classList.add('visit');
        visitElement.innerHTML = `
            <p>Visit scheduled for ${visit.familyMember} on ${visit.date} at ${visit.time}</p>
        `;
        visitList.appendChild(visitElement);
    });
}

// Schedule Visit
document.getElementById('visit-schedule-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const visitDate = document.getElementById('visit-date').value;
    const visitTime = document.getElementById('visit-time').value;

    const newVisit = { id: visits.length + 1, date: visitDate, time: visitTime, familyMember: 'John Doe' }; 
    visits.push(newVisit);

    renderVisits();
});

// Render Care Plan Updates
function renderCarePlanUpdates() {
    const updatesList = document.getElementById('care-plan-updates-list');
    updatesList.innerHTML = ''; // Clear existing updates

    carePlanUpdates.forEach(update => {
        const updateElement = document.createElement('div');
        updateElement.classList.add('update');
        updateElement.innerHTML = `
            <strong>Update on ${update.date}</strong>
            <p>${update.update}</p>
        `;
        updatesList.appendChild(updateElement);
    });
}

// Render Photos and Updates
function renderPhotos() {
    const photosContainer = document.getElementById('resident-photos');
    photosContainer.innerHTML = ''; // Clear existing photos

    photos.forEach(photo => {
        const photoElement = document.createElement('div');
        photoElement.classList.add('photo');
        photoElement.innerHTML = `
            <img src="${photo.photoUrl}" alt="Resident photo" class="photo-img">
            <p>${photo.caption}</p>
        `;
        photosContainer.appendChild(photoElement);
    });
}

// Initial Render
renderMessages();
renderVisits();
renderCarePlanUpdates();
renderPhotos();
