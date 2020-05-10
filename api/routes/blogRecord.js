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
        const path ='./static/images/'
        const secret =new mongoose.Types.ObjectId()+Date.now()+Math.floor((Math.random() * 1000000) + 1)
        const  optionalObj = {'fileName':secret , 'type':'png'};
        const imageInfo = base64Image(base64Str,path,optionalObj)
        console.log(imageInfo)

        //for saving the content as a html file
        //file Name
        const fileName = new mongoose.Types.ObjectId()+Date.now()+Math.floor((Math.random() * 1000000) + 1)+'.html'
        fs.writeFile(`./static/files/${fileName}/`, req.body.content,function(err)
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
            content :`./static/files/${fileName}/`,
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

//for getting the blog by the id

router.get('/get/:id',(req,res)=>
{
    const id =req.params.id
    blog.findOne({_id:id})
    .then(result=>
    {
        fs.readFile(result.content, 'utf8', function(err, data) {
           //for throwign the error
            if (err) throw err;

           console.log(data);
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
//exporting  the router
module.exports = router