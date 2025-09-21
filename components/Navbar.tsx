import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <nav className=''>
        <div className='flex gap-2'>
            <Image 
            src="/logoipsum-custom-logo.svg"
            alt='logo'
            width={100}
            height={100}
            />
        </div>
    </nav>
  )
}

export default Navbar