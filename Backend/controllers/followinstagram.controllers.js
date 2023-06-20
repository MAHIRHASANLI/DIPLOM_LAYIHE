const FollowModel = require("../models/followinstagram.model");

const FollowInstagramController = {
    GetAll: async (req, res) => {
        const GetAllFollowing = await FollowModel.find();
            res.status(200).send(GetAllFollowing)
    },
    PostById: async (req, res) => {
        const NewFooterObject = new FollowModel({
            url: req.body.url,
            count: req.body.count
        })
        await NewFooterObject.save();
        res.status(200).send(NewFooterObject)
    },
    PutById: async (req, res) => {
        const UpdateObject = {
            url: req.body.url,
            count: req.body.count
        }
      const updObj =  await FollowModel.findByIdAndUpdate( req.params.id, UpdateObject);
        res.status(200).send(updObj)
    },
    DeleteById: async (req, res) => {
        const id = req.params.id
        const DeleteFollowing = await FollowModel.findByIdAndDelete(id);
        res.status(200).send(DeleteFollowing);
    }
}

module.exports = FollowInstagramController;