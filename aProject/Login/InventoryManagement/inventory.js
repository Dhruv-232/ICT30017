let currentItemId = null; // Used for editing an item

const inventory = [
    {
        id: 1,
        itemName: 'Vitamin C',
        category: 'Supplements',
        stockLevel: 100,
        expiryDate: '2025-12-31',
    },
    {
        id: 2,
        itemName: 'Bandages',
        category: 'Medical Supplies',
        stockLevel: 50,
        expiryDate: '2026-06-15',
    }
];

function renderInventoryList() {
    const tbody = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing table rows

    inventory.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.itemName}</td>
            <td>${item.category}</td>
            <td>${item.stockLevel}</td>
            <td>${item.expiryDate}</td>
            <td>
                <button onclick="editItem(${item.id})">Edit</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openAddForm() {
    currentItemId = null;
    document.getElementById('form-title').textContent = 'Add Item';
    document.getElementById('inventory-form').reset();
    document.getElementById('add-edit-form').classList.remove('hidden');
}

function closeForm() {
    document.getElementById('add-edit-form').classList.add('hidden');
}

function editItem(id) {
    const item = inventory.find(i => i.id === id);
    if (item) {
        currentItemId = id;
        document.getElementById('form-title').textContent = 'Edit Item';
        document.getElementById('item-name').value = item.itemName;
        document.getElementById('category').value = item.category;
        document.getElementById('stock-level').value = item.stockLevel;
        document.getElementById('expiry-date').value = item.expiryDate;
        document.getElementById('add-edit-form').classList.remove('hidden');
    }
}

document.getElementById('inventory-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const itemName = document.getElementById('item-name').value;
    const category = document.getElementById('category').value;
    const stockLevel = document.getElementById('stock-level').value;
    const expiryDate = document.getElementById('expiry-date').value;

    if (currentItemId) {
        // Edit existing item
        const item = inventory.find(i => i.id === currentItemId);
        item.itemName = itemName;
        item.category = category;
        item.stockLevel = stockLevel;
        item.expiryDate = expiryDate;
    } else {
        // Add new item
        const newItem = {
            id: inventory.length + 1,
            itemName,
            category,
            stockLevel,
            expiryDate
        };
        inventory.push(newItem);
    }

    closeForm();
    renderInventoryList();
});

// Initial rendering of inventory list
renderInventoryList();
