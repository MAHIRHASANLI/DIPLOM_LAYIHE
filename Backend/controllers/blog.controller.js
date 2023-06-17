const BlogModel = require("../models/blog.model");

const BlogController = {
    GetAll: async (req, res) => {
        const { type } = req.query;
        const GetAllBlog = await BlogModel.find();
        if (!type) {
          res.status(200).send(GetAllBlog);
        } else {
          const SearchName = GetAllBlog.filter((m) =>m.type.toLowerCase().trim().includes(type.toLowerCase().trim())
          );
          res.status(200).send(SearchName);
        }
    },
    GetById: async (req, res) => {
        const GetbyidBlog = await BlogModel.findById(req.params.id);
        res.status(200).send(GetbyidBlog)
    },
    PostById: async (req, res) => {
        const NewSliderObject = new BlogModel({
            type: req.body.type,
            title: req.body.title,
            url: req.body.url,
            time: req.body.time,
            comment: req.body.comment
        })
      const newobj =  await NewSliderObject.save()
        res.status(200).send(newobj)
    },
    PutById: async (req, res) => {
        const id = req.params.id;

        const UpdateObject = {
            type: req.body.type,
            title: req.body.title,
            url: req.body.url,
            time: req.body.time,
            comment: req.body.comment
        }
        await BlogModel.findByIdAndUpdate(id,UpdateObject);
        res.status(200).send(UpdateObject)
    },
    DeleteById: async (req, res) => {
        const id = req.params.id;
        const DeleteSlider = await BlogModel.findByIdAndDelete(id);
        res.status(200).send(DeleteSlider);
    }
}

module.exports = BlogController;