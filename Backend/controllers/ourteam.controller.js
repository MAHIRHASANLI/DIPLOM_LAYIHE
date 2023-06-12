const OurteamModel = require("../models/ourteam.model");

const OurteamController = {
    GetAll: async (req, res) => {
        const GetAllOurteam = await OurteamModel.find();
        res.status(200).send(GetAllOurteam)
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
        await OurteamModel.findByIdAndUpdate(UpdateObject, req.params.id);
        res.status(200).send(UpdateObject)
    },
    DeleteById: async (req, res) => {
        const id = req.params.id
        const DeleteTeam = await OurteamModel.findByIdAndDelete(id);
        res.status(200).send(DeleteTeam);
    }
}

module.exports = OurteamController;