let currentStaffId = null; // Used for editing a staff member

// Sample staff data (initially loaded)
const staffMembers = [
    {
        id: 1,
        name: 'Sarah Lee',
        role: 'Caregiver',
        contactInfo: 'sarah.lee@example.com',
        availability: 'Available',
        salary: 35000,
        qualifications: 'Nursing Diploma',
        certifications: 'CPR Certified',
    },
    {
        id: 2,
        name: 'John Smith',
        role: 'Administrator',
        contactInfo: 'john.smith@example.com',
        availability: 'On Leave',
        salary: 45000,
        qualifications: 'Business Management',
        certifications: 'Project Management Certified',
    }
];

// Function to render staff list in the table
function renderStaffList() {
    const tbody = document.getElementById('staff-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing rows

    staffMembers.forEach(staff => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${staff.name}</td>
            <td>${staff.role}</td>
            <td>${staff.contactInfo}</td>
            <td>${staff.availability}</td>
            <td>
                <button onclick="editStaff(${staff.id})">Edit</button>
                <button onclick="deleteStaff(${staff.id})">Delete</button>
                <button onclick="assignTask(${staff.id})">Assign Task</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Function to open the form for adding a new staff member
function openAddForm() {
    currentStaffId = null;
    document.getElementById('form-title').textContent = 'Add Staff';
    document.getElementById('staff-form').reset();
    document.getElementById('add-edit-form').classList.remove('hidden');
}

// Function to close the form
function closeForm() {
    document.getElementById('add-edit-form').classList.add('hidden');
}

// Function to open the task assignment form
function assignTask(id) {
    currentStaffId = id;
    const staff = staffMembers.find(s => s.id === id);
    const staffSelect = document.getElementById('staff-id');
    staffSelect.innerHTML = `<option value="${staff.id}">${staff.name}</option>`;
    document.getElementById('assign-task-form').classList.remove('hidden');
}

// Function to close the task assignment form
function closeAssignTaskForm() {
    document.getElementById('assign-task-form').classList.add('hidden');
}

// Function to edit a staff member's profile
function editStaff(id) {
    const staff = staffMembers.find(s => s.id === id);
    if (staff) {
        currentStaffId = id;
        document.getElementById('form-title').textContent = 'Edit Staff';
        document.getElementById('name').value = staff.name;
        document.getElementById('role').value = staff.role;
        document.getElementById('contact-info').value = staff.contactInfo;
        document.getElementById('availability').value = staff.availability;
        document.getElementById('salary').value = staff.salary;
        document.getElementById('qualifications').value = staff.qualifications;
        document.getElementById('certifications').value = staff.certifications;
        document.getElementById('add-edit-form').classList.remove('hidden');
    }
}

// Function to delete a staff member
function deleteStaff(id) {
    const index = staffMembers.findIndex(s => s.id === id);
    if (index !== -1) {
        staffMembers.splice(index, 1);
        renderStaffList();
    }
}

// Handle form submission for adding/editing staff
document.getElementById('staff-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const contactInfo = document.getElementById('contact-info').value;
    const availability = document.getElementById('availability').value;
    const salary = document.getElementById('salary').value;
    const qualifications = document.getElementById('qualifications').value;
    const certifications = document.getElementById('certifications').value;

    if (currentStaffId) {
        // Edit existing staff member
        const staff = staffMembers.find(s => s.id === currentStaffId);
        staff.name = name;
        staff.role = role;
        staff.contactInfo = contactInfo;
        staff.availability = availability;
        staff.salary = salary;
        staff.qualifications = qualifications;
        staff.certifications = certifications;
    } else {
        // Add new staff member
        const newStaff = {
            id: staffMembers.length + 1,
            name,
            role,
            contactInfo,
            availability,
            salary,
            qualifications,
            certifications
        };
        staffMembers.push(newStaff);
    }

    closeForm();
    renderStaffList();
});

// Handle task assignment form submission
document.getElementById('assign-task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const task = document.getElementById('resident-task').value;
    const staffId = document.getElementById('staff-id').value;
    const staff = staffMembers.find(s => s.id === parseInt(staffId));

    if (staff) {
        alert(`Assigned task to ${staff.name}: ${task}`);
    }

    closeAssignTaskForm();
    renderStaffList();
});

// Initial rendering of staff list
renderStaffList();
