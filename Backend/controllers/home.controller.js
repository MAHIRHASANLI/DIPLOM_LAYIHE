const HomeModels = require('../models/home.model');
const HomeController = {
    GetAll: async (req, res) => {
        const GetAllSliders = await HomeModels.find();
        res.status(200).send(GetAllSliders)
    },
    PostById: async(req,res)=>{
        const nevdata = new HomeModels({
            url: req.body.url
        })
        await nevdata.save();
        res.send(nevdata)
    },
    PutById: async (req, res) => {
        const UpdateObject = {
            url: req.body.url,
        }
        await HomeModels.findByIdAndUpdate(UpdateObject, req.params.id);
        res.status(200).send(UpdateObject)
    },
    DeleteById: async (req, res) => {
        const id = req.params.id
        const DeleteTeam = await HomeModels.findByIdAndDelete(id);
        res.status(200).send(DeleteTeam);
    }
}

module.exports = HomeController;