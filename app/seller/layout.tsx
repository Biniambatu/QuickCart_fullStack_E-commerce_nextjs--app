'use client'
import React from 'react'
import Navbar from '../../components/seller/Navbar'
import SideBar from '../../components/seller/Sidebar'

const Layout = ({ children }:any) => {
  return (
    <div>
      <Navbar />
      <div className='flex w-full'>
        <SideBar />
        {children}
      </div>
    </div>
  )
}

export default Layout