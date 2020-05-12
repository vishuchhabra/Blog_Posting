const express = require('express')
const mongoose = require('mongoose')
const router  = express.Router()
const blog  =  require('../models/blog')
const base64Image = require('base64-to-image')
const fs  =  require('fs')

//for adding the new blog 
router.post('/add',(req,res)=>
{
        //for converting the base64 to images and store thatimage to given path
        const base64Str =req.body.coverImage
        const path ='./static/images/'  //path
        const secret = new mongoose.Types.ObjectId()+Date.now()+Math.floor((Math.random() * 1000000) + 1)
        const  optionalObj = {'fileName':secret , 'type':'png'};
        const imageInfo = base64Image(base64Str,path,optionalObj)
        console.log(imageInfo)

        //for saving the content as a html file
        //file Name
        const fileName1 = new mongoose.Types.ObjectId()+Date.now()+Math.floor((Math.random() * 1000000) + 1)+'.html'
        
        //writing operation
        fs.writeFile(`./static/files/${fileName1}/`, req.body.content, function(err,data) 
        { 
            if(err) throw err;
            console.log(err)
        })
        
        //for saving into the database
        const  newBlog = new blog(
        {
            _id   : new mongoose.Types.ObjectId(),
            author : new mongoose.Types.ObjectId(),
            title : req.body.title,
            category: req.body.category,
            coverImage : imageInfo.fileName,
            date: Date.now(),
            content :`./static/files/${fileName1}/`,
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
            .catch(error=>{
                res.json(
                {
                    type:"failure",
                    err: error
                })
            })
        
})
//for getting the blog by the id

router.get('/get/:id',async (req,res)=>
{
    const id =req.params.id
    var data //for storing the content 
    await blog.findOne({_id:id})
    .then(result=>
    {
           //for reading the file with s
           data =fs.readFileSync(result.content, 'utf8')
           //for throwign the error
           console.log(data)
           res.status(200).json({
           title: result.title,
           coverImagePath : result.coverImage,
           category: result.category,
           author: result.author,
           PublishDate: result.date,
           likes: result.likes,
           content:data,
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

//for like the blog by the id coming in paramas
router.patch('/like/:id',(req,res)=>
{
    const id = req.params.id  //id of the blog 
    blog.updateOne({_id:id},{ $inc: { likes: 1 }}) //increment the like by one
    .then(result=>
    {
       res.status(202).json({
           type:"Success",
           message: "Liked"
       })     
    })
    .catch(err=>
    {
       res.status(400).json(
        {
           type: "Failure",
           message: "Blog Not Found"
        })
    })
})

//for posting the comment to the specific blog 
router.patch('/comment/:id',(req,res)=>
{
    const blogData={
        name:req.body.name,
        email :req.body.email,
        comment : req.body.comment
    }
    if(blogData.name !==undefined && blogData.email!==undefined && blogData.comment!==undefined)
    {
        blog.updateOne({_id:req.params.id},{ $push: { comments: blogData }})
        .then(result=>
        {
            res.status(202).json(
            {
               type:"Success",
               message:"Comment Posted Successfully"
            })
        })
        .catch(err=>
        {
           res.json(
           {
              type:"Failure",
              message:"Blog not found"
           })
        })
    }
    else
    {
        res.json(
        {
            type:"Failure",
            message: "fill all the columns"
        })
    }
})



//exporting  the router
module.exports = router