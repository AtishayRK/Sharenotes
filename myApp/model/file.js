const mongoo=require('mongoose');

const schema=mongoo.Schema({

    name :{
        type: String
    },
    fileName :[String],
    
    content: {
        type : [String]
    }

});

const files=module.exports=mongoo.model('FileNames',schema);