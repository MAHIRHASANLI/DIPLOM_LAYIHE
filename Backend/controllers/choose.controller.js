const ChooseModel = require("../models/choose.model");

const ChooseController = {
    GetAll: async (req, res) => {
        const {name} = req.query;
        const GetAllChoose = await ChooseModel.find();
        if(!name){
            res.status(200).send(GetAllChoose)
        }else{
        const SearchName = GetAllChoose.filter((m)=>m.name.toLowerCase().trim().includes(name.toLowerCase().trim()))
        res.status(200).send(SearchName)
        }
    },
    GetById: async (req, res) => {
        const GetByIdChoose = await ChooseModel.findById(req.params.id);
        res.status(200).send(GetByIdChoose);
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
        await ChooseModel.findByIdAndUpdate( req.params.id,UpdateObject);
        res.status(200).send(UpdateObject)
    },
    DeleteById: async (req, res) => {
        const DeleteChoose = await ChooseModel.findByIdAndDelete(req.params.id);
        res.status(200).send(DeleteChoose);
    }
}

module.exports = ChooseController;