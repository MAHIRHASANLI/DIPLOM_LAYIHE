import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/ADMIN/Navbar'

const AdminRoot = () => {
  return (
<>
<Navbar/>
<Outlet/>
</> 
 )
}

export default AdminRoot