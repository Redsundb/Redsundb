//ติดต่อกับฐานข้อมูล / ดำเนินการกับฐานข้อมูล
const slugify = require("slugify")
const Blogs = require("../models/blog")
const { v4: uuid4 } = require('uuid')

//บันทึกข้อมูล
exports.create=(req,res) =>{
    const {title,content,author}=req.body
    let slug = slugify(title)
    //validate ตรวจสอบข้อมูล
    if(!slug) slug=uuid4(); //ถ้าบทความเป็นภาษาไทยจะทำให้ slug เป็นค่าว่าง ดังนั้นจึงนำการgenerate idเข้ามาช่วย
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหาบทความ"})
            break
    }
    //บันทึกข้อมูล
    Blogs.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:err})
        }
        res.json(blog)
    })
}
//ดึงข้อมุลบทความมาทั้งหมด
exports.getAllblogs=(req,res)=>{
    Blogs.find({}).exec((err,blogs)=>{
        res.json(blogs)
    })
}
//ดึงข้อมูล บทความที่สนใจ
exports.singleBlog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog)=>{
        console.log(blog)
        res.json(blog)
    })
}
//ลบข้อมูล
exports.remove=(req,res)=>{
    const { slug } = req.params
    Blogs.findOneAndRemove({slug}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json({
            message:"ลบข้อมูลเรียบร้อย"
        })
    })
}
// การอัพเดตข้อมูล
exports.update=(req,res)=>{
    const { slug } = req.params
    //ส่งข้อมูล title, content, author
    const {title,content,author} = req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json(blog)
    })
}