require('dotenv').config();

const express = require('express');
const cors = require('cors');

const submissionRoutes = require('./routes/submissions');


const app = express();

const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());
app.use('/api/submissions', submissionRoutes);


app.get('/health', (req, res) => {
    res.json({ status: 'Server is healthy' });
});


app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});


const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

