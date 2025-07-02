import React,{useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const CheckoutPage = () => {
  const navigate=useNavigate();
  const {userId,token}=useContext(AuthContext);
  const location = useLocation();
  const selectedAddress = location.state?.selectedAddress;
  const total = selectedAddress && location.state?.total;

 if(!selectedAddress||!total){
  return (
    <div className='bg-zinc-200 min-h-[80vh] montserrat-font flex justify-center items-center'>
      <div className='flex bg-white w-[70%] mx-auto h-[70vh] rounded-lg shadow-lg overflow-hidden'>
        <div className='p-5 w-full h-full flex flex-col justify-center items-center'>
          <h1 className='text-2xl font-bold text-zinc-700'>Please select an address to proceed</h1>
          <button 
          className='py-1.5 px-5 border-1 rounded-lg cursor-pointer text-black font-bold hover:bg-white hover:border-white hover:shadow-lg transition-[1s]'
           onClick={() => navigate('/cart')}
          >
            Go to Shipping
          </button>
        </div>
      </div>
    </div>
  );
 }
  return (
    <div className='bg-zinc-200 min-h-[80vh] montserrat-font flex justify-center items-center'>
      <div className='flex bg-white w-[70%] mx-auto h-[70vh] rounded-lg shadow-lg overflow-hidden'>
        <div className='
        w-1/3
        p-5
        bg-[url(https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)]
        bg-cover
        bg-cneter
        relative
        '>
      <div className='lg:text-[3em]'>
      <h1 className=' text-white font-extrabold'>Check</h1>
      <h1 className=' text-white font-extrabold text-center'>Out</h1>
      </div>
      <button 
      className='py-1.5 px-5 border-1 rounded-lg absolute bottom-5 left-5 cursor-pointer text-black font-bold hover:bg-white hover:border-white hover:shadow-lg transition-[1s]'
       onClick={() => navigate(-1)}
      >
        Back
      </button>
      </div>  
      <div className='p-5 w-2/3 h-full flex flex-col'>
    <div>
        <h1 className='text-2xl font-bold text-zinc-700'>Your Shipping Address</h1>
      {selectedAddress ? (
        <div className='m-5 text-zinc-600'>
          <p><b>Name- </b>{selectedAddress.name}</p>
          <p><b>Address-</b> {selectedAddress.address}, <b>City- </b>{selectedAddress.city}, <b>Pin- </b>{selectedAddress.pin}</p>
          <p><b>Contact No.- </b>{selectedAddress.phone}</p>
        </div>
      ) : (
        <p>No address selected</p>
      )}
      </div>
      <div className='w-full p-2 relative flex-grow-1'>
      <h1 className='text-2xl font-bold text-zinc-700'>Billing Info.</h1>
      <button className='w-full py-1.5 px-5 border-1 rounded-lg absolute bottom-0 cursor-pointer text-black font-bold hover:bg-emerald-200 hover:border-emerald-200 hover:text-white hover:shadow-lg transition-[1s]'> Pay ₹{parseFloat(total).toFixed(2)}</button>
      </div>
      </div>
    </div>
      </div>
  );
};

export default CheckoutPage;
