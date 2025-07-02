const AddressModel = require('../../Models/Address/Address')

const addAddress = async (req, res)=>{
    try {
        const { userId, shippingAddress } = req.body;
        const existingAddress = await AddressModel.findOne({userId});
        if(existingAddress){
            const isDuplicate = existingAddress.shippingAddress.some(addr =>
                addr.name === shippingAddress.name &&
                addr.address === shippingAddress.address &&
                addr.city === shippingAddress.city &&
                addr.pin === shippingAddress.pin &&
                addr.phone === shippingAddress.phone
            );
            if (isDuplicate) {
                return res.status(200).json({ message: "Address already exists" });
            }            
            existingAddress.shippingAddress.push(shippingAddress)
            await existingAddress.save();
            const newAddress=existingAddress.shippingAddress[existingAddress.shippingAddress.length-1]
            return res.status(200).json({message:"Address added successfully",newAddress});
        }
        const address = new AddressModel({ userId, shippingAddress:[shippingAddress] });
        await address.save();
        const newAddress=address.shippingAddress[address.shippingAddress.length-1]
        res.status(201).json({ message: "Address added successfully", newAddress });
    } catch (error) {
        res.status(500).json({ message: "Error adding address", error });
    }
}

const getAddress =async (req,res)=>{
try{
    const userId =req.query.userId
    // console.log(userId)
    const address =await AddressModel.findOne({userId});
    if(!address){
        return res.status(404).json({message: "Address not found"})
    }
    const shippingAddresses=address.shippingAddress
    return res.status(200).json({message:"Address fetched successfully",shippingAddresses})
}catch(error){
    return res.status(500).json({message:"Error fetching address",error})
}
}

const removeAddress=async(req,res)=>{
    try{
        const {userId,addressId}=req.body;
        const address =await AddressModel.findOne({userId});
        if(!address){
            return res.status(404).json({message:"Address not found"})
        }
        const addressIndex= address.shippingAddress.findIndex((address)=>address._id.toString()===addressId.toString())
        if(addressIndex===-1){
            return res.status(404).json({message:"Address not found"})
        }
        address.shippingAddress.splice(addressIndex,1)
        await address.save()
        }
        catch(error){
            return res.status(500).json({message:"Error removing address",error})
        }
}
module.exports ={addAddress,getAddress,removeAddress}