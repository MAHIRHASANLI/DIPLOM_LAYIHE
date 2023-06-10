import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../../components/USER/Navbar'
import Footer from '../../components/USER/Footer'

const MainRoot = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default MainRoot