const MessageModel = require("../models/message.model");

const MessageController = {
    GetAll: async (req, res) => {
        const GettAll = await MessageModel.find();
        res.status(200).send(GettAll)
    },
    PostById: async (req, res) => {
        const newComm = await MessageModel({
            name: req.body.name,
            surname: req.body.surname,
            comment: req.body.comment,
            email: req.body.email
        })
        await newComm.save();
        res.status(200).send(newComm)
    },
    DeleteById: async (req, res) => {
        const id = req.params.id
        const Delete = await MessageModel.findByIdAndDelete(id);
        res.status(200).send(Delete);
    },
}

module.exports = MessageController;