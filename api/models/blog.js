const mongoose =  require('mongoose')

const blogSchema  = mongoose.Schema({

_id : mongoose.Schema.Types.ObjectId,

//by default it lie in other category
listIn : {
  type: String,
  default: "other"
},

author:{
    type : mongoose.Schema.Types.ObjectId
},

category  : String,
title     : String,
coverImage: String,
content   : String,
likes : Number,

//commnets
comments :[{ 
       name:
       {
          type: String,
       },
       email:
       {
           type:String,
       },
       comment:{
           type :String,
       }
}],

date :Date,
tags : [String]

})   

module.exports = mongoose.model('Blog',blogSchema)