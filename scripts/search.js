const blog  =  require('../api/models/blog')
const express = require('express')
const mongoose = require('mongoose')

async function searchID(temp)
{
   var arr = []
    //search when query is number 
    if(temp.number !== undefined) {
        const val =parseInt(temp.number)
        const result = await  blog.find({$or:[{likes:val},{disLikes:val}]})
        result.forEach(item=>
        {
            arr.push(item)
        })
    }

    //condition when query is string
    if(temp.string !== undefined) {
       
        const result2 =await blog.find({
            $or :[{ title: { $regex: temp.string, $options: "i" }}, //search based on title
            {category: { $regex:temp.string, $options: "i" }},     //search based on category
            {listIn: { $regex:temp.string, $options: "i" }},       //search based on listin
            { tags: { $regex:temp.string, $options: "i" }},        //search based on Tags
            { "comments.comment": { $regex:temp.string, $options: "i" }}]  // search based on comment 
        })
        result2.forEach(item=>
        {
            arr.push(item)
        })
    }
    return arr
}
exports.searchID = searchID