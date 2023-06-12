import * as React from 'react';
import { Table } from 'antd';
import { useGlobalData } from '../../../global';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CreateIcon from '@mui/icons-material/Create';
import style from "./index.module.css";
import Swal from "sweetalert2"

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { DeleteSlider, PutSlider } from '../../../api/slider.requests';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { validationSlider } from './validation.slider';
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
//
const stylew = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const HomeAdmin = () => {
  const [globalSlider] = useGlobalData()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleBagla = () => setOpen(false);
  const handleClose = () => setOpen(false);
  function handleSubmit(values,actions){
    console.log(values);
    // PutSlider(values)
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      title: "",
      url: "",
      email: ""
    },
    validationSchema: validationSlider,
    onSubmit: handleSubmit,
  });
  const columns = [
    {
      title: 'Image',
      render: (value) =><img src={value.url} alt="" width={"80px"} height={"80px"} style={{borderRadius:"50%"}}/>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      filters:
      globalSlider.map((item) => {
       return {
         text: item.name,
         value: item.name,
       }}),
    
      
       filterSearch: true,
       onFilter: (value, record) => record.name.includes(value),
       sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Title',
      dataIndex: 'title',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      onFilter: (value, record) => record.email.indexOf(value) === 0,
    },
    {
      title: 'Update',
      render: (value) =><Button variant='outlined' onClick={handleOpen}>
        <CreateIcon/>
        Update
        </Button>
    },
    {
      title: 'Delete',
      render: (value) =><Button variant="outlined"  color="error" startIcon={<DeleteIcon />} onClick={(_id)=>{
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            DeleteSlider(value._id)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
      }}>
      Delete
    </Button>
    }
  ];
  return (
    <>
      <div className={style.Table}>
      <h1>Sliders Data</h1>
      <Link style={{boxShadow: "0px 1px 9px 0px rgba(0,0,0,0.1)"}} to="/admin/addSlider">
      <Button  variant="outlined"  color="success">
      <AddShoppingCartIcon />
      Add Slider
    </Button>
      </Link>
      <div className={style.Table__item}>
      <Table columns={columns} dataSource={globalSlider} onChange={onChange} />
      </div>
   </div> 
   <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={stylew}>
        <h2>Update Slider</h2>
        <form onSubmit={formik.handleSubmit}>
     <div className={style.modal}>
     <div>
     <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} error={formik.errors.name && formik.touched.name ?true : false} name='name' id="outlined-basic" label="Name" variant="outlined" />
      <TextField  style={{marginTop:"10px"}}   className={style.input} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} error={formik.errors.title && formik.touched.title ?true : false} name='title' id="outlined-basic" label="Title" variant="outlined" />
     </div>
     <div className={style.inputs}>
     <TextField  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.url} error={formik.errors.url && formik.touched.url ?true : false} name='url' id="outlined-basic"  variant="outlined" label="Image"/>
      <TextField style={{marginTop:"10px"}}  className={style.input} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} error={formik.errors.email && formik.touched.email ?true : false} name='email' id="outlined-basic" label="Email" variant="outlined" />
     </div>
     </div>
     <div style={{display:"block", margin:"20px auto"}}>
     <Button style={{marginLeft:"25%"}} variant='outlined'  type='submit' onClick={handleBagla}>Update</Button>
     <Button style={{marginLeft:"30px"}} variant="outlined" color="error" onClick={handleBagla}>X</Button>
     </div>
      </form>
      </Box>
      </Modal>
     
    </>
  
  )
}

export default HomeAdmin