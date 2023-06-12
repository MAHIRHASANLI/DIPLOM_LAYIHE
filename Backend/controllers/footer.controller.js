const FooterModel = require("../models/footer.model");

const FooterController = {
    GetAll: async (req, res) => {
        const GetAllFooter = await FooterModel.find();
        res.status(200).send(GetAllFooter)
    },
    PostById: async (req, res) => {
        const NewFooterObject = new FooterModel({
            name: req.body.name,
            title: req.body.title,
            url: req.body.url,
        })
        await NewFooterObject.save()
        res.status(200).send(NewFooterObject)
    },
    DeleteById: async (req, res) => {
        const id = req.params.id
        const DeleteFooter = await FooterModel.findByIdAndDelete(id);
        res.status(200).send(DeleteFooter);
    }
}

module.exports = FooterController;