from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Database connection helper function
def get_db_connection():
    conn = sqlite3.connect('residents.db')  # Use SQLite to store data in residents.db
    conn.row_factory = sqlite3.Row  # Allows us to access columns by name
    return conn

# Function to create the database table (called manually)
def create_table():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create the residents table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS residents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            care_plan TEXT,
            medication TEXT,
            emergency_contact TEXT
        );
    ''')
    conn.commit()
    conn.close()

# Call the table creation function manually
create_table()

# Route to get all residents
@app.route('/residents', methods=['GET'])
def get_residents():
    conn = get_db_connection()
    residents = conn.execute('SELECT * FROM residents').fetchall()
    conn.close()
    return jsonify([dict(resident) for resident in residents])

# Route to add a new resident
@app.route('/residents', methods=['POST'])
def add_resident():
    new_resident = request.get_json()
    conn = get_db_connection()
    conn.execute('''INSERT INTO residents (name, age, care_plan, medication, emergency_contact)
                    VALUES (?, ?, ?, ?, ?)''', 
                    (new_resident['name'], new_resident['age'], new_resident['care_plan'],
                     new_resident['medication'], new_resident['emergency_contact']))
    conn.commit()
    conn.close()
    return jsonify(new_resident), 201

# Route to edit a resident
@app.route('/residents/<int:id>', methods=['PUT'])
def edit_resident(id):
    updated_resident = request.get_json()
    conn = get_db_connection()
    conn.execute('''UPDATE residents SET name = ?, age = ?, care_plan = ?, medication = ?, emergency_contact = ?
                    WHERE id = ?''', 
                    (updated_resident['name'], updated_resident['age'], updated_resident['care_plan'],
                     updated_resident['medication'], updated_resident['emergency_contact'], id))
    conn.commit()
    conn.close()
    return jsonify(updated_resident)

# Route to delete a resident
@app.route('/residents/<int:id>', methods=['DELETE'])
def delete_resident(id):
    conn = get_db_connection()
    conn.execute('DELETE FROM residents WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return '', 204

# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True)
