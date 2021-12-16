const express = require('express');
const connectDB = require('./config/db')
const path = require('path');
const app = express();


//connect the Database
connectDB();

//middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
    res.json({ msg: 'My Contact Api' }));

//api routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


//serve static production build to heroku
if (process.env.NODE_ENV === 'production') {
    //client build folder
    //import path, create a path instance navigating to index.html
    app.use(express.static('client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));