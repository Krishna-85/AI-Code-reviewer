const mongoose = require('mongoose')



const connectDb = ()=>{
    mongoose.connect('mongodb://0.0.0.0/code-reviwer-project')
    .then(()=>{
        console.log("COnnected to db")
    }).catch(err=>{
        console.log(err)
    })
}

module.exports = connectDb;