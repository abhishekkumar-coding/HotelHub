const mongoose = require('mongoose')

const listeningSchema = new mongoose.Schema({
    title :{
        type : String,
        require : true,
    },
    description :{
        type : String,
        require : true,
    },
    image : {
        type : String,
        default :'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fphotos-images%2Fhotels-room.html&psig=AOvVaw0nLVnJjuTKBm8YaykWdl9Q&ust=1710125163410000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCICBr8rc6IQDFQAAAAAdAAAAABAE'

    },
    price : Number,
    location : String, 
    country : String,
})

const listing = mongoose.model('listing', listeningSchema);
module.exports = listing;