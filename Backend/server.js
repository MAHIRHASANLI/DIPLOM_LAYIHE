const express = require('express');
const mongoose  = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const users_router = require('./routes/users.routes');
const login_router = require('./routes/login.routes');
const register_router = require('./routes/register.routes');
const sliders_router = require('./routes/slider.routes');
const home_router = require('./routes/home.routes');
const choose_router = require('./routes/choose.routes');
const ourteam_router = require('./routes/ourteam.routes');
const possion_router = require('./routes/position.routes');
const blog_router = require('./routes/blog.routes');
const gallery_router = require('./routes/galery.routes');
const contact_router = require('./routes/contact.routes');
const logo_router = require('./routes/logo.footer.routes');
const followinginstagram_router = require('./routes/followinstagram.routes');
const message_router = require('./routes/message.routes');
const logout_router = require('./routes/logout.routes');
const verifyJWT = require('./middlewares/verifyJWT.middlewares');

// const verifyJWT  = async(req,res,next)=>{
//     const token =  req.headers['x-access-token'];
//     if(!token){
//         res.send({message:"You may need token to get here!"})
//     }else{
//         jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
//             if(err){
//                 res.send({auth:false,message:'Authentication failed!'});
//             }else{
//                 req.userId = decoded.id;
//                 next()
//             }
//         })
//     }
// }


///Register
app.use('/api/register', register_router);

///Login
app.use('/api/login', login_router);

//Users
app.use('/api/users', verifyJWT, users_router);

//LogOut
app.use('/api/logout', logout_router);


//SLIDERD KRUD
app.use('/api/sliders', sliders_router);

//HOME IMAGE
app.use('/api/homeimg', home_router);

//OURTEAM
app.use('/api/possion', possion_router);

//CHOOSE
app.use('/api/choose', choose_router);

//OURTEAM
app.use('/api/team', ourteam_router);

//BLOG
app.use('/api/blog', blog_router);

//GALLERY
app.use('/api/gallery', gallery_router);

////CONTACT
app.use('/api/contact', contact_router);

///follower
app.use('/api/follower', followinginstagram_router);

//LogoFOOTER
app.use('/api/logo', logo_router);

///Message
app.use('/api/message', message_router);



app.listen(process.env.PORT,()=>{
    console.log(`Connected: ${process.env.PORT}`);
})
mongoose.connect(process.env.MY_CONNECT).then(()=>{
    console.log("MONG0DB ISHLIYIR");
})