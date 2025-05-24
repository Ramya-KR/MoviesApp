import React from 'react'

function Banner() {
  return (
    <div className='h-[50vh] bg-cover md:h-[85vh] bg-center flex items-end' style={{backgroundImage: `url(https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/02/up-movie-poster.jpg)`}}>
       <div className='text-white text-xl bg-gray-900/60 text-center w-full p-3 font-serif'>UP</div>
    </div>
  )
}

export default Banner