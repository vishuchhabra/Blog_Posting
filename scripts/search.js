const blog  =  require('../api/models/blog')
const express = require('express')
const mongoose = require('mongoose')

//function for removing the duplicay
function removeDuplicates(arr) {
    return Object.keys(arr.reduce((acc, val) => {
        acc[JSON.stringify(val)] = 1;

        return acc;
    }, {})).map((val, key, array) => JSON.parse(array[key]))
} 
//function for the searching 
async function searchID(temp)
{
    var arr = []
    var uniq //for unique value of the array
    //condition when query is string
    if(temp.key !== undefined) {
       
        //preference first to category
        const res1 = await blog.find({category:{$regex:temp.key,$options :"i"}})
        res1.forEach(item=>
        {
             arr.push(item)
        })

        //preferecne second to title
        const res2 = await blog.find({title:{$regex:temp.key,$options :"i"}})
        res2.forEach(item=>
        { 
           arr.push(item) 
        })

        //prefence third to tags
        const res3 = await blog.find({tags:{$regex:temp.key,$options:"i"}})
        res3.forEach(item=>
        { 
            arr.push(item) 
        })

        //prefeernce fourth to listIn
        const res4 = await blog.find({listIn:{$regex:temp.key,$options:"i"}})
        res3.forEach(item=>
        { 
                arr.push(item) 
        })

        uniq = removeDuplicates(arr)
        return uniq

    }
    return arr //return default array 
    
}
exports.searchID = searchID