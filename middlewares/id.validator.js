const idValidator = (req, res, next) => {
    const id = req.params.id
    if(id.length < 24){
        return res.status(411).send({msg:'Invalid ID'});
    }
    next();
}

module.exports = {
    idValidator
}