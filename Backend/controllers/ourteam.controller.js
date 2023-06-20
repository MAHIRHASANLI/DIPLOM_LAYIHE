const OurteamModel = require("../models/ourteam.model");

const OurteamController = {
    GetAll: async (req, res) => {
        const {name} = req.query;
        const GetAllOurteam = await OurteamModel.find();
    if(!name){
        res.status(200).send(GetAllOurteam)
    }else{
        const SearchName = GetAllOurteam.filter((m)=>m.name.toLowerCase().trim().includes(name.toLowerCase().trim()))
        res.status(200).send(SearchName)
    }

    },
    GetById: async (req, res) => {
        const GetById = await OurteamModel.findById(req.params.id);
        res.status(200).send(GetById)
    },
    PostById: async (req, res) => {
        const NewTeamObject = new OurteamModel({
            name: req.body.name,
            title: req.body.title,
            url: req.body.url,
        })
        await NewTeamObject.save()
        res.status(200).send(NewTeamObject)
    },
    PutById: async (req, res) => {
        const UpdateObject = {
            name: req.body.name,
            title: req.body.title,
            url: req.body.url,
        }
       const newObj = await OurteamModel.findByIdAndUpdate( req.params.id, UpdateObject);
        res.status(200).send(newObj)
    },
    DeleteById: async (req, res) => {
        const id = req.params.id
        const DeleteTeam = await OurteamModel.findByIdAndDelete(id);
        res.status(200).send(DeleteTeam);
    }
}

module.exports = OurteamController;