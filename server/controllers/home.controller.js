const HomeModels = require('../models/home.model');
const HomeController = {
    GetAll: async (req, res) => {
        const GetAllHomeimg = await HomeModels.find();
        res.status(200).send(GetAllHomeimg)
    },
    GetById: async (req, res) => {
        const GetHomeimg = await HomeModels.findById(req.params.id);
        res.status(200).send(GetHomeimg)
    },
    // PostById: async(req,res)=>{
    //     const nevdata = new HomeModels({
    //         url: req.body.url,
    //     })
    //     await nevdata.save();
    //     res.send(nevdata)
    // },
    PutById: async (req, res) => {
        const UpdateObject = {
            url: req.body.url,
        }
      const updObj =  await HomeModels.findByIdAndUpdate( req.params.id, UpdateObject);
        res.status(200).send(updObj)
    },
    // DeleteById: async (req, res) => {
    //     const id = req.params.id
    //     const DeleteIMG = await HomeModels.findByIdAndDelete(id);
    //     res.status(200).send(DeleteIMG);
    // }
}

module.exports = HomeController;