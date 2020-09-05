const model = require('../models/models')

// Description Get all 
exports.getBootcamps = async(req, res, next) => {
    const bootcamps = await model.find();
    res.status(200).json({ success: true, data: bootcamps });
};


//Desc create 
exports.setBootcamps = async(req, res, next) => {
    console.log(req.body);
    const Bootcamp = await model.create(req.body);
    res.status(200).redirect('/viewissues.html')
}