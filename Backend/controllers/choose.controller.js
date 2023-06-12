const ChooseModel = require("../models/choose.model");

const ChooseController = {
    GetAll: async (req, res) => {
        const GetAllChoose = await ChooseModel.find();
        res.status(200).send(GetAllChoose)
    },
    PostById: async (req, res) => {
        const NewChooseObject = new ChooseModel({
            name: req.body.name,
            title: req.body.title,
            url: req.body.url,
        })
        await NewChooseObject.save()
        res.status(200).send(NewChooseObject)
    },
    PutById: async (req, res) => {
        const UpdateObject = {
            name: req.body.name,
            title: req.body.title,
            url: req.body.url,
        }
        await ChooseModel.findByIdAndUpdate(UpdateObject, req.params.id);
        res.status(200).send(UpdateObject)
    },
    DeleteById: async (req, res) => {
        const id = req.params.id
        const DeleteChoose = await ChooseModel.findByIdAndDelete(id);
        res.status(200).send(DeleteChoose);
    }
}

module.exports = ChooseController;