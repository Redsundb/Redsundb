//Title, Content autent slug
const mongoose = require("mongoose")

const blogSchema =mongoose.Schema({
    title:{
        type:String,
        requied:true,
    },
    content:{
        type:{},
        required:true
    },
    author:{
        type:String,
        default:"Admin"
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true //ค่าห้ามซ้ำกัน
    }
},{timestamps:true})

module.exports = mongoose.model("Blogs", blogSchema)