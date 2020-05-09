const express = require('express')
const mongoose = require('mongoose')
const router  = express.Router()
const blog  =  require('../models/blog')
const base64Image = require('base64-to-image')

//for adding the new blog 
router.post('/add',(req,res)=>
{
        const base64Str =req.body.coverImage
        const path ='./static/'
        const secret =new mongoose.Types.ObjectId()+Date.now()+Math.floor((Math.random() * 100) + 1);
        const  optionalObj = {'fileName':secret , 'type':'png'};
        const imageInfo = base64Image(base64Str,path,optionalObj)
        console.log(imageInfo)
        const  newBlog = new blog(
        {
            _id   : new mongoose.Types.ObjectId(),
            author : new mongoose.Types.ObjectId(),
            title : req.body.title,
            category: req.body.category,
            coverImage : imageInfo.fileName,
            date: Date.now(),
            content : req.body.content,
            tags    : req.body.tags
        })
        newBlog.save().then(result=>
        {
            res.status(200).json(
            {
                type: "Success",
                message: "Blog Posted Successfully"
            })
        })
        .catch(error=>
        {
           res.json({
                type:"failure",
                err: error
           })
        })
})

//for getting the blog

router.get('/get/:id',(req,res)=>
{
    const id =req.params.id
    blog.findOne({_id:id})
    .then(result=>
    {
        res.status(200).json({
           title: result.title,
           coverImagePath : result.coverImage,
           category: result.category,
           author: result.author,
           PublishDate: result.date,
           likes: result.likes,
           content: result.content,
           comments:result.comments 
        })
       
    })
    .catch(error=>
    {
        res.json({
           type:"Failure",
           message:"Blog not found",
           err : error

        })

    })

})
module.exports = router