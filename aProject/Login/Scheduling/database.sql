CREATE TABLE staff (
    staff_id INT PRIMARY KEY,
    name VARCHAR(100),
    role VARCHAR(100),
    employment_type VARCHAR(50),
    remuneration_details TEXT
);

CREATE TABLE staff_schedule (
    schedule_id INT PRIMARY KEY,
    staff_id INT,
    shift_start TIME,
    shift_end TIME,
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);

CREATE TABLE time_off_requests (
    request_id INT PRIMARY KEY,
    staff_id INT,
    start_date DATE,
    end_date DATE,
    status VARCHAR(50),
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);
