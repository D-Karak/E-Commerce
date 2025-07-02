import React from 'react'
import Slider from '../../components/Slider'
import CategoryGrid from '../../components/CategoryGrid'
function PageBody() {
  return (
    // Hero img
    <div>
        <div className='w-full h-screen '
        style={{background:`url(https://plus.unsplash.com/premium_photo-1683121730776-feef85b8299f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',}}>
            
        </div>
        {/* para */}
        <div className='text-black montserrat-font text-center p-10' >
            <p className='text-2xl'>Our Category</p>
        </div>
        {/* slider */}
        <Slider/>
        {/* categories */}
        <CategoryGrid/>
    </div>
  )
}

export default PageBody