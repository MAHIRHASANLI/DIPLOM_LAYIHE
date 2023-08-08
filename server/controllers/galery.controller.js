const GalleryModel = require("../models/galery.model");

const GalleryController = {
    GetAll: async (req, res) => {
        const {category} = req.query
        const GetAllGallery = await GalleryModel.find();
        if(!category){
            res.status(200).send(GetAllGallery)
        }else{
            const SearchName = GetAllGallery.filter((m)=>m.category.toLowerCase().trim().includes(category.toLowerCase().trim()))
            res.status(200).send(SearchName)
        }
    },
    PostById: async (req, res) => {
        const NewGalleryObject = new GalleryModel({
            url: req.body.url,
            category: req.body.category
        })
        await NewGalleryObject.save();
        res.status(200).send(NewGalleryObject)
    },
    DeleteById: async (req, res) => {
        const id = req.params.id
        const DeleteGallery = await GalleryModel.findByIdAndDelete(id);
        res.status(200).send(DeleteGallery);
    }
}

module.exports = GalleryController;