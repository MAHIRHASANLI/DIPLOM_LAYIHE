

const LogOutController = {
    PostLogOut: async (req, res) => {
        const { token } = req.headers['x-access-token'];
        jwt.destroy(token)
    }
}

module.exports = LogOutController;