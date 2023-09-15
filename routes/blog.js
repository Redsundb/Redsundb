const express = require('express')
const router = express.Router()
const {create, getAllblogs, singleBlog, remove, update} = require("../controllers/blogController")
const { checkToken } = require("../controllers/authController")

router.post('/create',checkToken, create)
router.get('/blogs',  getAllblogs)
router.get('/blog/:slug', singleBlog)
router.delete('/blog/:slug', checkToken, remove)
router.put('/blog/:slug', checkToken, update)
module.exports=router