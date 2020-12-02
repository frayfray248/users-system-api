// get all users
exports.getUsers = (req, res, next) => {
    (async () => {
        await res.send({ response: "users"}).status(200);
    })();
};