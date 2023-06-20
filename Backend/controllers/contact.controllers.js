const ContactModel = require("../models/contact.model");

const ContactController = {
    GetAll: async (req, res) => {
        const GetAllSContact = await ContactModel.find();
          res.status(200).send(GetAllSContact);
    },
    PostById: async (req, res) => {
        const NewContactObject = new ContactModel({
            mobile: req.body.mobile,
            address: req.body.address,
            email: req.body.email
        })
      const newobj =  await NewContactObject.save()
        res.status(200).send(newobj)
    },
    PutById: async (req, res) => {
        const UpdateObject = {
            mobile: req.body.mobile,
            address: req.body.address,
            email: req.body.email,
        }
        await ContactModel.findByIdAndUpdate( req.params.id, UpdateObject);
        res.status(200).send(UpdateObject)
    },
    DeleteById: async (req, res) => {
        const id = req.params.id
        const DeleteContact = await ContactModel.findByIdAndDelete(id);
        res.status(200).send(DeleteContact);
    }
}

module.exports = ContactController;