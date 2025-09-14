const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    // category_id: { 
    //     type: String,
    //     required: [true, "Please enter Category's id"],
    //     unique: true,   
    //     trim: true,
    // },
    category_name: {
        type: String,
        required: [true, "Please enter Category's name"],
        trim: true,
    },
    description: {
        type: String,
        default: null,
        trim: true,
        maxlength: [500, "Description can not be more than 500 characters"]
    }
    
},{
    timestamps: true
}) ;

module.exports = mongoose.model('Category', categorySchema);