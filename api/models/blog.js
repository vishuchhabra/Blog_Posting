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

category  : {
    type:String,
    required: true
},

title  :{ 
    type: String,
    required  :true
},

coverImage:
{
    type:String,
    required:true
}, 

content :{
    type:String,
    required :true
},

likes :{ 
    type:Number,
    default :0
},
disLikes :{ 
    type:Number,
    default :0
},

//commnets
comments :[{ 
       name:
       {
          type: String,
          required:true 
       },
       email:
       {
           type:String,
           required:true
       },
       comment:{
           type :String,
           required:true
       }
}],

date :Date,
tags : [{
    type:String
}]

})   

module.exports = mongoose.model('Blog',blogSchema)