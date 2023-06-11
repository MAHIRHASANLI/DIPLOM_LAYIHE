const express = require('express');
const mongoose  = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const sliders_router = require('./routes/slider.routes');
app.use('/api/sliders', sliders_router)

app.listen(process.env.PORT,()=>{
    console.log(`Connected: ${process.env.PORT}`);
})
mongoose.connect(process.env.MY_CONNECT).then(()=>{
    console.log("MONG0DB ISHLIYIR");
})