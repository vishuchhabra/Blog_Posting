const blog  =  require('../api/models/blog')
const express = require('express')
const mongoose = require('mongoose')

async function searchID(temp)
{
    var arr = []
    //condition when query is string
    if(temp.key !== undefined) {
       
        const result2 =await blog.find({
            $or :[{ category: { $regex: temp.key, $options: "i" }}, //search based on title
            {title: { $regex:temp.key, $options: "i" }},     //search based on category
            {tags: { $regex:temp.key, $options: "i" }},       //search based on listin
            { listIn: { $regex:temp.key, $options: "i" }},        //search based on Tags
            { "comments.comment": { $regex:temp.key, $options: "i" }}]  // search based on comment 
        })
        // result2.forEach(item=>
        // {
        //     arr.push(item)
        // })
        arr.push(result2)
    }
    return arr
}
exports.searchID = searchID