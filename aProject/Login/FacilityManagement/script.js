// Sample data
let rooms = [
    { id: 1, roomNumber: '101', occupancy: 'John Doe', availability: 'Occupied' },
    { id: 2, roomNumber: '102', occupancy: '', availability: 'Available' },
];

let maintenanceRequests = [
    { id: 1, room: '101', issue: 'Plumbing issue', status: 'In Progress' },
];

let resources = [
    { resource: 'Oxygen Tanks', quantity: 50, location: 'Storage Room 1' },
    { resource: 'Wheelchairs', quantity: 10, location: 'Storage Room 2' },
];

// Render Room List
function renderRoomList() {
    const tbody = document.getElementById('room-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing rows

    rooms.forEach(room => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${room.roomNumber}</td>
            <td>${room.occupancy}</td>
            <td>${room.availability}</td>
            <td>
                <button onclick="editRoom(${room.id})">Edit</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Render Maintenance Requests
function renderMaintenanceRequests() {
    const tbody = document.getElementById('maintenance-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing rows

    maintenanceRequests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${request.room}</td>
            <td>${request.issue}</td>
            <td>${request.status}</td>
            <td>
                <button onclick="editMaintenanceRequest(${request.id})">Edit</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Render Facility Resources
function renderResources() {
    const tbody = document.getElementById('resources-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing rows

    resources.forEach(resource => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${resource.resource}</td>
            <td>${resource.quantity}</td>
            <td>${resource.location}</td>
        `;
        tbody.appendChild(row);
    });
}

// Open and Close Forms for Room and Maintenance Request
function openRoomForm() {
    document.getElementById('add-edit-room-form').classList.remove('hidden');
}

function closeRoomForm() {
    document.getElementById('add-edit-room-form').classList.add('hidden');
}

// Open and Close Forms for Maintenance Request
function openMaintenanceForm() {
    document.getElementById('add-edit-maintenance-form').classList.remove('hidden');
}

function closeMaintenanceForm() {
    document.getElementById('add-edit-maintenance-form').classList.add('hidden');
}

// Add/Edit Room
document.getElementById('room-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const roomNumber = document.getElementById('room-number').value;
    const occupancy = document.getElementById('occupancy').value;
    const availability = document.getElementById('availability').value;

    rooms.push({ id: rooms.length + 1, roomNumber, occupancy, availability });
    
    closeRoomForm();
    renderRoomList();
});

// Add/Edit Maintenance Request
document.getElementById('maintenance-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const room = document.getElementById('maintenance-room').value;
    const issue = document.getElementById('issue').value;
    const status = document.getElementById('status').value;

    maintenanceRequests.push({ id: maintenanceRequests.length + 1, room, issue, status });
    
    closeMaintenanceForm();
    renderMaintenanceRequests();
});

// Initial Rendering
renderRoomList();
renderMaintenanceRequests();
renderResources();
