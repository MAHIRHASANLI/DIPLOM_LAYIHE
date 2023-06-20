const LogoFooterModel = require("../models/logo.footer.model");

const LogoFooterController = {
    GetAll: async (req, res) => {
        const GetAllFooter = await LogoFooterModel.find();
            res.status(200).send(GetAllFooter)
    },
    PostById: async (req, res) => {
        const NewFooterObject = new LogoFooterModel({
            url: req.body.url,
            urlblack:req.body.urlblack,
            count: req.body.count
        })
        await NewFooterObject.save();
        res.status(200).send(NewFooterObject)
    },
    PutById: async (req, res) => {
        const UpdateObject = {
            url: req.body.url,
            urlblack:req.body.urlblack,
            count: req.body.count
        }
      const updObj =  await LogoFooterModel.findByIdAndUpdate( req.params.id, UpdateObject);
        res.status(200).send(updObj)
    },
    // DeleteById: async (req, res) => {
    //     const id = req.params.id
    //     const Deletelogo = await LogoFooterModel.findByIdAndDelete(id);
    //     res.status(200).send(Deletelogo);
    // },
}

module.exports = LogoFooterController;