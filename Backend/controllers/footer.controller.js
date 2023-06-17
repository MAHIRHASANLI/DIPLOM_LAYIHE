const FooterModel = require("../models/footer.model");

const FooterController = {
    GetAll: async (req, res) => {
        const {name} = req.query
        const GetAllFooter = await FooterModel.find();
        if(!name){
            res.status(200).send(GetAllFooter)
        }else{
            const SearchName = GetAllFooter.filter((m)=>m.name.toLowerCase().trim().includes(name.toLowerCase().trim()))
            res.status(200).send(SearchName)
        }
    },
    PostById: async (req, res) => {
        const NewFooterObject = new FooterModel({
            url: req.body.url,
            name: req.body.name
        })
        await NewFooterObject.save();
        res.status(200).send(NewFooterObject)
    },
    DeleteById: async (req, res) => {
        const id = req.params.id
        const DeleteFooter = await FooterModel.findByIdAndDelete(id);
        res.status(200).send(DeleteFooter);
    }
}

module.exports = FooterController;