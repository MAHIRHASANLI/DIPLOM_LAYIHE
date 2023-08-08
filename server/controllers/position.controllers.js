const PositionModel = require("../models/position.model");

const PositionController = {
    GetAll: async (req, res) => {
        const GetAllPassion = await PositionModel.find();
        res.status(200).send(GetAllPassion)
    },
    GetById: async (req, res) => {
        const GetAllPassion = await PositionModel.findById(req.params.id);
        res.status(200).send(GetAllPassion)
    },
    PostById: async (req, res) => {
        const NewPassionObject = new PositionModel({
            about: req.body.about,
            title: req.body.title,
            url: req.body.url,
            img: req.body.img
        })
        await NewPassionObject.save()
        res.status(200).send(NewPassionObject)
    },
    PutById: async (req, res) => {
        const UpdateObject = {
            about: req.body.about,
            title: req.body.title,
            url: req.body.url,
            img: req.body.img
        }
        await PositionModel.findByIdAndUpdate( req.params.id, UpdateObject);
        res.status(200).send(UpdateObject)
    },
    DeleteById: async (req, res) => {
        const id = req.params.id;
        const DeletePassion = await PositionModel.findByIdAndDelete(id);
        res.status(200).send(DeletePassion);
    }
}

module.exports = PositionController;