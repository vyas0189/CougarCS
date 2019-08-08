const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(morgan('dev'));
app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => res.send('Home Page'));

app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/member', require('./routes/api/member'));
app.use('/api/officers', require('./routes/api/officer'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/resume', require('./routes/api/resume'));
// app.use('/api/event', require('./routes/api/event'));

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
