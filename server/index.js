const express = require('express');
const { json } = require('body-parser');
const path = require('path');
const peopleCtrl = require('./controllers/peopleCtrl');

const app = express();

app.use(json());
app.use(express.static(path.join(__dirname, '../build')));

//testing endpoint
app.get('/api/test', (req, res) => {
  res.status(200).send({ message: 'Connected!' });
});

//getPeople
app.get('/api/people', peopleCtrl.getPeople);
app.get('/api/people/filter/:filter', peopleCtrl.getFilteredPeople);
app.post('/api/people', peopleCtrl.createPerson);
app.delete('/api/people/:id', peopleCtrl.deletePerson);
app.put('/api/people/:id', peopleCtrl.updatePerson);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
