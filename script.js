document.getElementById('addActivityForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const activityType = document.getElementById('activityType').value;
    const duration = document.getElementById('duration').value;
    const distance = document.getElementById('distance').value;
    const calorieCount = document.getElementById('calorieCount').value;

    fetch('/api/fitness-activities', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            activity_type: activityType,
            duration: duration,
            distance: distance,
            calorie_count: calorieCount
        })
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            console.log('Fitness activity added successfully');
        } else {
            console.log('Error adding fitness activity:', data.error);
        }
    })
    .catch((error) => {
        console.log('Error adding fitness activity:', error);
    });
});

document.getElementById('updateActivityForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const activityId = document.getElementById('activityIdToUpdate').value;
    const newDuration = document.getElementById('newDuration').value;

    fetch(`/api/fitness-activities/${activityId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            duration: newDuration
        })
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            console.log('Fitness activity updated successfully');
        } else {
            console.log('Error updating fitness activity:', data.error);
        }
    })
    .catch((error) => {
        console.log('Error updating fitness activity:', error);
    });
});

document.getElementById('deleteActivityForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const activityId = document.getElementById('activityIdToDelete').value;

    fetch(`/api/fitness-activities/${activityId}`, {
        method: 'DELETE'
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            console.log('Fitness activity deleted successfully');
        } else {
            console.log('Error deleting fitness activity:', data.error);
        }
    })
    .catch((error) => {
        console.log('Error deleting fitness activity:', error);
    });
});
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let fitnessActivities = [];

app.get('/api/fitness-activities', (req, res) => {
    res.json(fitnessActivities);
});

app.post('/api/fitness-activities', (req, res) => {
    const newActivity = req.body;
    fitnessActivities.push(newActivity);
    res.json({ success: true, message: 'Fitness activity added successfully' });
});

app.patch('/api/fitness-activities/:id', (req, res) => {
    const id = req.params.id;
    const updatedActivity = req.body;
    res.json({ success: true, message: `Fitness activity with ID ${id} updated successfully` });
});

app.delete('/api/fitness-activities/:id', (req, res) => {
    const id = req.params.id;
    res.json({ success: true, message: `Fitness activity with ID ${id} deleted successfully` });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
