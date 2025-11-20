

const {validationResult}  = require('express-validator')



module.exports = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errArr = errors.array();
        const firstMsg = errArr[0] && errArr[0].msg ? errArr[0].msg : 'Validation Error';
        return res.badRequest(firstMsg, errArr)
    }
    next ();
}