const mongoose=require('mongoose');
const schems=mongoose.Schema({

    name :{
        type  : String,
        required : true
    },
    role:{
        type: String,
        required : true
    },
    password :{
        type : String,
        required : true,
        min : [8,"at least 8 size"]
    }
});
const user=module.exports=mongoose.model('Schema',schems);