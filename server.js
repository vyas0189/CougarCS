const express = require('express');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => res.send('Home Page'));

app.use('/default', express.static('assets'));
app.use('/profileImages', express.static('images'));
app.use('/api/admin', require('./routes/api/admin'));
// app.use('/api/event', require('./routes/api/event'));
app.use('/api/member', require('./routes/api/member'));
app.use('/api/officers', require('./routes/api/officer'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
