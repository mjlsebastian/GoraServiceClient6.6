import React, {  useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import  Axios from 'axios';
import deleteIcon from '../images/delete.png';

function AdminContact() {


  const navigate = useNavigate();

  const [allContact,setAllContact] = useState([]);
  
    useEffect(()=>{
      async function getContactList(){
        let response = await Axios.get('http://localhost:3001/contact',{headers:{userToken:localStorage.getItem("userToken")}});
        if(response.data.error){
          alert(response.data.error);
          navigate('/');
        }
        else{
  setAllContact(...allContact,response.data);

        }
      }
  getContactList();
    },[])

//delete contact
async function deleteContact(id){
if(window.confirm("are you sure?")){
  let response = await Axios.delete(`http://localhost:3001/contact/${id}`,{headers:{userToken:localStorage.getItem("userToken")}});
  if(response.data.error){
    alert(response.data.error)
  }
  else{
    alert('Delete Success')
   setAllContact(allContact.filter((data)=>{
    return data.id != id;
   }))
  }
}
};

  return (
<section className='adminUserAccountSection'>
<div className='adminLeftNav'>
<h1>ADMIN PAGES</h1>
<div className='adminNavContainer'>
<Link to={'/admin'}>User Account</Link>
<Link to={'/admincontact'}>Contact Request</Link>
<Link to={'/adminbook'}>Availed by Customer</Link>
</div>
</div>

<div className='adminRightData'>
{
  allContact.length > 0 ? allContact.map((data)=>{
    return(
      
<div key={data.id} className='adminContactRequest'>
    <p>Name: <strong>{data.name}</strong></p>
    <p>Email: <strong>{data.email}</strong></p>
    <p>Date: <strong>{data.createdAt.substring(0,10)}</strong></p>
    <p>Message:</p>
    <p className='ContactMessage'><strong>{data.message}</strong></p>
    <img src={deleteIcon} onClick={()=>{deleteContact(data.id)}} alt="deleteIcon" />
</div>
    )
  }) 
  :
  <div className='EmptyContactList'>Contact is empty!!!</div>
}
</div>
    </section>
     
  )
}

export default AdminContact
