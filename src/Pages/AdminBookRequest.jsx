import React, {  useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import  Axios from 'axios';
import deleteIcon from '../images/delete.png';
function AdminBookRequest() {

  const navigate = useNavigate();

  const [allBooked,setAllBooked] = useState([]);
  
    useEffect(()=>{
  
      async function getBookedList(){
        let response = await Axios.get('http://localhost:3001/booked/',{headers:{userToken:localStorage.getItem("userToken")}});
        if(response.data.error){
          alert(response.data.error);
          navigate('/');
        }
        else{
  setAllBooked(...allBooked,response.data);

        }
      }
  getBookedList();
    },[]);

//delete contact
async function deleteContact(id){
  if(window.confirm("are you sure?")){
    let response = await Axios.delete(`http://localhost:3001/booked/${id}`,{headers:{userToken:localStorage.getItem("userToken")}});
    if(response.data.error){
      alert(response.data.error)
    }
    else{
      alert('Delete Success')
      setAllBooked(allBooked.filter((data)=>{
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
      allBooked.length > 0 ? allBooked.map((data)=>{
        return(
          <div key={data.id} className='adminContactRequest'>
          <p>Package Plan : <strong>{data.packageplan}</strong></p>
          <p>Name: <strong>{data.firtname}</strong> <strong>{data.middlename}</strong> <strong>{data.lastname}</strong></p>
          <p>Email: <strong>{data.email}</strong></p>
          <p>Phone: <strong>{data.phonenumber}</strong></p>
          <p>Date: <strong>{data.createdAt.substring(0,10)}</strong></p>
          <p>Message:</p>
          <p className='ContactMessage'><strong>{data.message}</strong></p>
          <img src={deleteIcon} onClick={()=>{deleteContact(data.id)}} alt="deleteIcon" />
        </div>
        )
              }) 
              :
              <div className='EmptyContactList'>Booked is empty!!!</div>
    }
    </div>
        </section>
  )
}

export default AdminBookRequest
