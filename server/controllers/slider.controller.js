const HomeSlider = require("../models/slider.model");

const SliderController = {
    GetAll: async (req, res) => {
        const { name } = req.query;
        const GetAllSliders = await HomeSlider.find();
        if (!name) {
          res.status(200).send(GetAllSliders);
        } else {
          const SearchName = GetAllSliders.filter((m) =>m.name.toLowerCase().trim().includes(name.toLowerCase().trim())
          );
          res.status(200).send(SearchName);
        }
    },
    GetById: async (req, res) => {
        const GetbyidSliders = await HomeSlider.findById(req.params.id);
        res.status(200).send(GetbyidSliders)
    },
    PostById: async (req, res) => {
        const NewSliderObject = await HomeSlider({
            name: req.body.name,
            title: req.body.title,
            url: req.body.url,
            email: req.body.email
        })
      const newobj =  await NewSliderObject.save()
        res.status(200).send(newobj)
    },
    PutById: async (req, res) => {
        const UpdateObject = {
            name: req.body.name,
            title: req.body.title,
            url: req.body.url,
            email: req.body.email,
        }
        await HomeSlider.findByIdAndUpdate( req.params.id, UpdateObject);
        res.status(200).send(UpdateObject)
    },
    DeleteById: async (req, res) => {
        const id = req.params.id
        const DeleteSlider = await HomeSlider.findByIdAndDelete(id);
        res.status(200).send(DeleteSlider);
    }
}

module.exports = SliderController;