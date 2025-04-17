from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Database connection function
def get_db_connection():
    conn = sqlite3.connect('inventory.db')
    conn.row_factory = sqlite3.Row
    return conn

# Initialize the database
def init_db():
    conn = get_db_connection()
    conn.execute('''CREATE TABLE IF NOT EXISTS inventory
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    category TEXT,
                    stock INTEGER,
                    expiry_date TEXT)''')
    conn.commit()
    conn.close()

# Route to fetch all inventory items
@app.route('/inventory', methods=['GET'])
def get_inventory():
    conn = get_db_connection()
    inventory = conn.execute('SELECT * FROM inventory').fetchall()
    conn.close()
    return jsonify([dict(row) for row in inventory])

# Route to add new inventory item
@app.route('/inventory', methods=['POST'])
def add_inventory():
    data = request.json
    conn = get_db_connection()
    conn.execute('''INSERT INTO inventory (name, category, stock, expiry_date)
                    VALUES (?, ?, ?, ?)''', (data['name'], data['category'], data['stock'], data['expiry_date']))
    conn.commit()
    conn.close()
    return '', 201

# Route to update inventory stock
@app.route('/inventory/<int:id>', methods=['PUT'])
def update_inventory(id):
    data = request.json
    conn = get_db_connection()
    conn.execute('''UPDATE inventory SET stock = ? WHERE id = ?''', (data['stock'], id))
    conn.commit()
    conn.close()
    return '', 200


# Route to remove inventory item
@app.route('/inventory/<int:id>', methods=['DELETE'])
def remove_inventory(id):
    conn = get_db_connection()
    conn.execute('DELETE FROM inventory WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return '', 200


if __name__ == '__main__':
    init_db()
    app.run(debug=True)
