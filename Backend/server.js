const express = require('express');
const mongoose  = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const sliders_router = require('./routes/slider.routes');
const home_router = require('./routes/home.routes');
const choose_router = require('./routes/choose.routes');
const ourteam_router = require('./routes/ourteam.routes');
const footer_router = require('./routes/footer.routes');

//SLIDERD KRUD
app.use('/api/sliders', sliders_router)

//HOME IMAGE
app.use('/api/homeimg', home_router)

//CHOOSE
app.use('/api/choose', choose_router)

//OURTEAM
app.use('/api/team', ourteam_router)

//FOOTER
app.use('/api/footer', footer_router)

app.listen(process.env.PORT,()=>{
    console.log(`Connected: ${process.env.PORT}`);
})
mongoose.connect(process.env.MY_CONNECT).then(()=>{
    console.log("MONG0DB ISHLIYIR");
})