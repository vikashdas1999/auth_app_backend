const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const quizRoutes = require('./Routes/quizRoutes');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/home', (req, res) => {
    res.send('welcome home');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

app.use('/api', quizRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})