from flask import Flask, render_template, request, jsonify
from flask import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///service_management.db'
db = SQLAlchemy(app)

class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.Text)
    cost = db.Column(db.Float)
    duration = db.Column(db.String(50))

class Resident(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

class ServiceAssignment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    resident_id = db.Column(db.Integer, db.ForeignKey('resident.id'))
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'))
    start_date = db.Column(db.Date)
    status = db.Column(db.String(50))

@app.route('/')
def index():
    services = Service.query.all()
    return render_template('index.html', services=services)

@app.route('/assign_service', methods=['POST'])
def assign_service():
    resident_name = request.form['resident_name']
    service_id = request.form['service_id']
    start_date = request.form['start_date']

    resident = Resident.query.filter_by(name=resident_name).first()
    if not resident:
        resident = Resident(name=resident_name)
        db.session.add(resident)

    service = Service.query.get(service_id)
    assignment = ServiceAssignment(resident_id=resident.id, service_id=service.id, start_date=start_date, status="Assigned")
    db.session.add(assignment)
    db.session.commit()

    return jsonify({"status": "success"})

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
