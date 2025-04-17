from flask import Flask, jsonify, request

app = Flask(__name__)

# Dummy data for illustration
staff_schedules = [
    {'staffName': 'John Doe', 'shiftStart': '9:00 AM', 'shiftEnd': '5:00 PM'},
    {'staffName': 'Jane Smith', 'shiftStart': '10:00 AM', 'shiftEnd': '6:00 PM'}
]

@app.route('/api/getSchedules', methods=['GET'])
def get_schedules():
    return jsonify(staff_schedules)

@app.route('/api/submitTimeOffRequest', methods=['POST'])
def submit_timeoff_request():
    data = request.get_json()
    # Add your logic to handle time-off request here
    return jsonify({'message': 'Time-off request submitted successfully'})

@app.route('/api/generateAutomatedSchedule', methods=['GET'])
def generate_automated_schedule():
    # Logic for automated scheduling (simple example)
    generated_schedule = [
        {'staffName': 'John Doe', 'shiftStart': '9:00 AM', 'shiftEnd': '5:00 PM'},
        {'staffName': 'Jane Smith', 'shiftStart': '10:00 AM', 'shiftEnd': '6:00 PM'}
    ]
    return jsonify(generated_schedule)

if __name__ == '__main__':
    app.run(debug=True)
