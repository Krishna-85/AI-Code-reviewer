const projectModel = require('../models/project.model')






module.exports.create = async (req, res)=>{
    const {name} = req.body;

    if(!name || !name?.trim()){
     return res.status(400).json({
        message:"name is required"
     })
    }

    const project = await projectModel.create({
        name,
        code:" "
    })

    res.status(201).json({
        message:"Project created Succesfully",
        data:project
    })
}

module.exports.list = async (req, res)=>{
    const projects = await projectModel.find();//ye apke db mai saare projects jo saved hai unhe find krke return kregi

    res.status(200).json({
        projects
    });
}