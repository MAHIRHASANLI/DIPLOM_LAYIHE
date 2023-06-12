const HomeSlider = require("../models/slider.model");

const SliderController = {
    GetAll: async (req, res) => {
        const GetAllSliders = await HomeSlider.find();
        res.status(200).send(GetAllSliders)
    },
    PostById: async (req, res) => {
        const NewSliderObject = new HomeSlider({
            name: req.body.name,
            title: req.body.title,
            url: req.body.url,
            email: req.body.email
        })
        await NewSliderObject.save()
        res.status(200).send(NewSliderObject)
    },
    PutById: async (req, res) => {
        const UpdateObject = {
            name: req.body.name,
            title: req.body.title,
            url: req.body.url,
            email: req.body.email,
        }
        await HomeSlider.findByIdAndUpdate(UpdateObject, req.params.id);
        res.status(200).send(UpdateObject)
    },
    DeleteById: async (req, res) => {
        const id = req.params.id
        const DeleteSlider = await HomeSlider.findByIdAndDelete(id);
        res.status(200).send(DeleteSlider);
    }
}

module.exports = SliderController;