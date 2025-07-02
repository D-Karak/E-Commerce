const express=require('express');
const router=express.Router();
const {addAddress,getAddress,removeAddress}=require('../../Controllers/Address/AddressController')
const {authenticateUser}=require('../../Middleware/authMiddleware')

router.post('/add',authenticateUser,addAddress)
router.get('/get',authenticateUser,getAddress)
router.delete('/remove',authenticateUser,removeAddress)
module.exports=router