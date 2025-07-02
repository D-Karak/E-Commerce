const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    shippingAddress: [{
        name: { type: String, required: true },
        address: { type: String, required: true }, 
        city: { type: String, required: true },
        pin: { type: String, required: true },
        phone: { type: String, required: true }
    }]
});

const AddressModel = mongoose.model("Address", AddressSchema);
module.exports = AddressModel;