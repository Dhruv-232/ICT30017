let currentServiceId = null; // Used for editing a service
let currentResidentId = null; // Used for assigning services to residents

// Sample data for services and residents
const services = [
    {
        id: 1,
        name: 'Personal Care',
        description: 'Assistance with personal hygiene, dressing, etc.',
        cost: 30,
        duration: '1 hour'
    },
    {
        id: 2,
        name: 'Medical Assistance',
        description: 'Medication administration and health monitoring.',
        cost: 50,
        duration: '1 hour'
    },
    {
        id: 3,
        name: 'Meal Preparation',
        description: 'Cooking and serving meals to residents.',
        cost: 20,
        duration: '1.5 hours'
    }
];

const residents = [
    {
        id: 1,
        name: 'John Doe',
        assignedServices: []
    },
    {
        id: 2,
        name: 'Mary Smith',
        assignedServices: []
    }
];

const serviceProgress = [];

// Function to render the service list
function renderServiceList() {
    const tbody = document.getElementById('services-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing rows

    services.forEach(service => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${service.name}</td>
            <td>${service.description}</td>
            <td>$${service.cost}</td>
            <td>${service.duration}</td>
            <td>
                <button onclick="editService(${service.id})">Edit</button>
                <button onclick="deleteService(${service.id})">Delete</button>
                <button onclick="assignService(${service.id})">Assign</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Function to open the form for adding a new service
function openAddServiceForm() {
    currentServiceId = null;
    document.getElementById('service-form-title').textContent = 'Add Service';
    document.getElementById('service-form').reset();
    document.getElementById('add-edit-service-form').classList.remove('hidden');
}

// Function to close the add/edit service form
function closeServiceForm() {
    document.getElementById('add-edit-service-form').classList.add('hidden');
}

// Function to open the service assignment form
function assignService(serviceId) {
    currentServiceId = serviceId;
    const serviceSelect = document.getElementById('service-id');
    serviceSelect.innerHTML = `<option value="${serviceId}">${services.find(service => service.id === serviceId).name}</option>`;

    const residentSelect = document.getElementById('resident-id');
    residentSelect.innerHTML = residents.map(resident => 
        `<option value="${resident.id}">${resident.name}</option>`
    ).join('');
    
    document.getElementById('assign-service-form').classList.remove('hidden');
}

// Function to close the service assignment form
function closeAssignServiceForm() {
    document.getElementById('assign-service-form').classList.add('hidden');
}

// Function to edit an existing service
function editService(id) {
    const service = services.find(s => s.id === id);
    if (service) {
        currentServiceId = id;
        document.getElementById('service-name').value = service.name;
        document.getElementById('description').value = service.description;
        document.getElementById('cost').value = service.cost;
        document.getElementById('duration').value = service.duration;
        document.getElementById('service-form-title').textContent = 'Edit Service';
        document.getElementById('add-edit-service-form').classList.remove('hidden');
    }
}

// Function to delete a service
function deleteService(id) {
    const index = services.findIndex(s => s.id === id);
    if (index !== -1) {
        services.splice(index, 1);
        renderServiceList();
    }
}

// Handle form submission for adding/editing a service
document.getElementById('service-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('service-name').value;
    const description = document.getElementById('description').value;
    const cost = document.getElementById('cost').value;
    const duration = document.getElementById('duration').value;

    if (currentServiceId) {
        // Edit existing service
        const service = services.find(s => s.id === currentServiceId);
        service.name = name;
        service.description = description;
        service.cost = cost;
        service.duration = duration;
    } else {
        // Add new service
        const newService = {
            id: services.length + 1,
            name,
            description,
            cost,
            duration
        };
        services.push(newService);
    }

    closeServiceForm();
    renderServiceList();
});

// Handle form submission for assigning a service to a resident
document.getElementById('assign-service').addEventListener('submit', function(event) {
    event.preventDefault();

    const residentId = document.getElementById('resident-id').value;
    const serviceId = document.getElementById('service-id').value;
    const status = document.getElementById('status').value;

    const resident = residents.find(r => r.id === parseInt(residentId));
    const service = services.find(s => s.id === parseInt(serviceId));

    if (resident && service) {
        resident.assignedServices.push({ serviceId: service.id, status, serviceName: service.name });
        serviceProgress.push({ residentId: resident.id, serviceId: service.id, status });
    }

    closeAssignServiceForm();
    renderServiceList();
});

// Function to generate a service usage report
function generateReport() {
    let report = '';
    residents.forEach(resident => {
        report += `<h3>Resident: ${resident.name}</h3><ul>`;
        resident.assignedServices.forEach(service => {
            const serviceInfo = services.find(s => s.id === service.serviceId);
            report += `
                <li>
                    Service: ${serviceInfo.name} - Status: ${service.status} - Duration: ${serviceInfo.duration} - Cost: $${serviceInfo.cost}
                </li>
            `;
        });
        report += '</ul>';
    });

    document.getElementById('report-results').innerHTML = report;
}

// Initial rendering of services and resident list
renderServiceList();
