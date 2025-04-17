from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

@app.route("/login", methods=["POST"])
def login():
    # Authentication logic (simple example)
    user_email = request.json.get("email")
    user_password = request.json.get("password")
    
    # Validate user credentials (you'd query a database in a real app)
    if user_email == "family@example.com" and user_password == "password123":
        return jsonify({"message": "Login successful", "user": user_email})
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route("/schedule_event", methods=["POST"])
def schedule_event():
    # Store event data in a database
    event_date = request.json.get("date")
    event_details = request.json.get("details")

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO events (date, details) VALUES (?, ?)", (event_date, event_details))
    conn.commit()
    return jsonify({"message": "Event scheduled successfully"})

if __name__ == "__main__":
    app.run(debug=True)
