// Sample data
let staffMembers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Mary Smith' },
];

let staffSchedules = [
    { id: 1, staffId: 1, shiftDate: '2025-04-06', shiftTime: '08:00', task: 'Care for resident' },
];

let timeOffRequests = [
    { id: 1, staffId: 2, requestDate: '2025-04-07', status: 'Pending' },
];

let appointments = [
    { id: 1, resident: 'John Doe', appointmentDate: '2025-04-06', service: 'Medical Checkup', assignedStaff: 'John Doe' },
];

// Render Staff Schedules
function renderStaffSchedules() {
    const tbody = document.getElementById('staff-schedule-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing rows

    staffSchedules.forEach(schedule => {
        const staffMember = staffMembers.find(staff => staff.id === schedule.staffId);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${staffMember.name}</td>
            <td>${schedule.shiftDate}</td>
            <td>${schedule.shiftTime}</td>
            <td>${schedule.task}</td>
            <td><button onclick="editStaffSchedule(${schedule.id})">Edit</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Render Time-Off Requests
function renderTimeOffRequests() {
    const tbody = document.getElementById('time-off-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing rows

    timeOffRequests.forEach(request => {
        const staffMember = staffMembers.find(staff => staff.id === request.staffId);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${staffMember.name}</td>
            <td>${request.requestDate}</td>
            <td>${request.status}</td>
            <td><button onclick="approveTimeOff(${request.id})">Approve</button><button onclick="denyTimeOff(${request.id})">Deny</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Render Upcoming Appointments
function renderAppointments() {
    const tbody = document.getElementById('appointments-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing rows

    appointments.forEach(appointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.resident}</td>
            <td>${appointment.appointmentDate}</td>
            <td>${appointment.service}</td>
            <td>${appointment.assignedStaff}</td>
        `;
        tbody.appendChild(row);
    });
}

// Open and Close Staff Schedule Form
function openStaffScheduleForm() {
    document.getElementById('add-edit-staff-schedule-form').classList.remove('hidden');
    populateStaffMemberOptions('staff-member');
}

function closeStaffScheduleForm() {
    document.getElementById('add-edit-staff-schedule-form').classList.add('hidden');
}

// Open and Close Time-Off Form
function openTimeOffRequestForm() {
    document.getElementById('time-off-form').classList.remove('hidden');
    populateStaffMemberOptions('time-off-staff');
}

function closeTimeOffForm() {
    document.getElementById('time-off-form').classList.add('hidden');
}

// Populate Staff Member Options in Forms
function populateStaffMemberOptions(selectId) {
    const selectElement = document.getElementById(selectId);
    selectElement.innerHTML = ''; // Clear existing options

    staffMembers.forEach(staff => {
        const option = document.createElement('option');
        option.value = staff.id;
        option.textContent = staff.name;
        selectElement.appendChild(option);
    });
}

// Create Staff Schedule
document.getElementById('staff-schedule-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const staffId = document.getElementById('staff-member').value;
    const shiftDate = document.getElementById('shift-date').value;
    const shiftTime = document.getElementById('shift-time').value;
    const task = document.getElementById('task').value;

    staffSchedules.push({ id: staffSchedules.length + 1, staffId, shiftDate, shiftTime, task });
    
    closeStaffScheduleForm();
    renderStaffSchedules();
});

// Request Time-Off
document.getElementById('time-off-form-content').addEventListener('submit', function(event) {
    event.preventDefault();

    const staffId = document.getElementById('time-off-staff').value;
    const requestDate = document.getElementById('time-off-date').value;

    timeOffRequests.push({ id: timeOffRequests.length + 1, staffId, requestDate, status: 'Pending' });
    
    closeTimeOffForm();
    renderTimeOffRequests();
});

// Approve Time-Off
function approveTimeOff(id) {
    const request = timeOffRequests.find(req => req.id === id);
    if (request) {
        request.status = 'Approved';
        renderTimeOffRequests();
    }
}

// Deny Time-Off
function denyTimeOff(id) {
    const request = timeOffRequests.find(req => req.id === id);
    if (request) {
        request.status = 'Denied';
        renderTimeOffRequests();
    }
}

// Initial Rendering
renderStaffSchedules();
renderTimeOffRequests();
renderAppointments();
