let currentItemId = null; // Used for editing an item

const inventory = [
    {
        id: 1,
        itemName: 'Vitamin C',
        category: 'Medicine',
        stockLevel: 100,
        expiryDate: '2025-12-31',
    },
    {
        id: 2,
        itemName: 'Bandages',
        category: 'Medicine',
        stockLevel: 5,
        expiryDate: '2026-06-15',
    }
];

function renderInventoryList() {
    const tbody = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing table rows

    inventory.forEach(item => {
        const row = document.createElement('tr');
        // Highlight low stock
        if (item.stockLevel < 10) {
            row.classList.add('low-stock');
        }

        row.innerHTML = `
            <td>${item.itemName}</td>
            <td>${item.category}</td>
            <td>
                <input type="number" min="0" value="${item.stockLevel}" onchange="updateQuantity(${item.id}, this.value)" />
            </td>
            <td>${item.expiryDate}</td>
            <td>
                <button onclick="editItem(${item.id})">Edit</button>
                <button onclick="deleteItem(${item.id})">Delete</button>
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

function deleteItem(id) {
    const index = inventory.findIndex(item => item.id === id);
    if (index !== -1) {
        inventory.splice(index, 1);
        renderInventoryList();
    }
}

function updateQuantity(id, newQuantity) {
    const item = inventory.find(i => i.id === id);
    if (item) {
        item.stockLevel = parseInt(newQuantity, 10);
        renderInventoryList();
    }
}

document.getElementById('inventory-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const itemName = document.getElementById('item-name').value;
    const category = document.getElementById('category').value;
    const stockLevel = parseInt(document.getElementById('stock-level').value, 10);
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
        const newId = inventory.length ? Math.max(...inventory.map(i => i.id)) + 1 : 1;
        const newItem = {
            id: newId,
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
