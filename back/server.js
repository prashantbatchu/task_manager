const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/data.js');
const userRoutes = require('./routes/userRoutes.js');
const taskRoutes = require('./routes/taskRoutes.js');

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.use(cors({
    origin : process.env.CLIEN_RL || 'http://localhost:8080',
    Credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api/users',userRoutes);
app.use('/api/tasks',taskRoutes);

app.listen(port, ()=>{
    console.log(`listening to the port ${port}`);
})
