let currentResidentId = null;

const residents = [
    {
        id: 1,
        name: 'John Doe',
        gender: 'Male',
        ethnicity: 'Caucasian',
        dob: '1942-05-14',
        emergencyContact: 'Jane Doe - 555-1234',
        carePlan: 'Daily physical therapy and dietary monitoring.',
        medication: 'Aspirin, Lisinopril'
    },
    {
        id: 2,
        name: 'Mary Smith',
        gender: 'Female',
        ethnicity: 'Asian',
        dob: '1949-09-21',
        emergencyContact: 'John Smith - 555-5678',
        carePlan: 'Assistance with daily tasks and mobility support.',
        medication: 'Metformin, Atorvastatin'
    }
];

function renderResidentList() {
    const tbody = document.getElementById('residents-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    residents.forEach(resident => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${resident.name}</td>
            <td>${resident.gender}</td>
            <td>${resident.ethnicity}</td>
            <td>${resident.dob}</td>
            <td>${resident.emergencyContact}</td>
            <td>
                <button onclick="editResident(${resident.id})">Edit</button>
                <button onclick="deleteResident(${resident.id})">Delete</button>
                <button onclick="showResidentInfo(${resident.id})">ℹ️</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openAddForm() {
    currentResidentId = null;
    document.getElementById('form-title').textContent = 'Add Resident';
    document.getElementById('resident-form').reset();
    document.getElementById('add-edit-form').classList.remove('hidden');
}

function closeForm() {
    document.getElementById('resident-form').reset();
    document.getElementById('add-edit-form').classList.add('hidden');
}

function editResident(id) {
    const resident = residents.find(r => r.id === id);
    if (resident) {
        currentResidentId = id;
        document.getElementById('form-title').textContent = 'Edit Resident';
        document.getElementById('name').value = resident.name;
        document.getElementById('gender').value = resident.gender;
        document.getElementById('ethnicity').value = resident.ethnicity;
        document.getElementById('dob').value = resident.dob;
        document.getElementById('emergency-contact').value = resident.emergencyContact;
        document.getElementById('care-plan').value = resident.carePlan || '';
        document.getElementById('medication').value = resident.medication || '';
        document.getElementById('add-edit-form').classList.remove('hidden');
    }
}

function deleteResident(id) {
    const confirmed = confirm('Are you sure you want to delete this resident?');
    if (confirmed) {
        const index = residents.findIndex(r => r.id === id);
        if (index !== -1) {
            residents.splice(index, 1);
            closeForm(); // Optional: Close form if open
            renderResidentList();
        }
    }
}

function showResidentInfo(id) {
    const resident = residents.find(r => r.id === id);
    if (resident) {
        document.getElementById('info-care-plan').textContent = resident.carePlan || 'N/A';
        document.getElementById('info-medication').textContent = resident.medication || 'N/A';
        document.getElementById('info-modal').classList.remove('hidden');
    }
}

function closeInfoModal() {
    document.getElementById('info-modal').classList.add('hidden');
}

document.getElementById('resident-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const ethnicity = document.getElementById('ethnicity').value;
    const dob = document.getElementById('dob').value;
    const emergencyContact = document.getElementById('emergency-contact').value;
    const carePlan = document.getElementById('care-plan').value;
    const medication = document.getElementById('medication').value;

    if (currentResidentId) {
        // Edit
        const resident = residents.find(r => r.id === currentResidentId);
        resident.name = name;
        resident.gender = gender;
        resident.ethnicity = ethnicity;
        resident.dob = dob;
        resident.emergencyContact = emergencyContact;
        resident.carePlan = carePlan;
        resident.medication = medication;
    } else {
        // Add
        const newResident = {
            id: residents.length > 0 ? residents[residents.length - 1].id + 1 : 1,
            name,
            gender,
            ethnicity,
            dob,
            emergencyContact,
            carePlan,
            medication
        };
        residents.push(newResident);
    }

    closeForm();
    renderResidentList();
});

// Initial rendering
renderResidentList();
