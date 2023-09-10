import React from 'react'
import { BsFillCartCheckFill } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom'
import './Payments.scss'
import { useDispatch } from 'react-redux';
import { resetCart } from '../../redux/cartSlice';

function Payments() {
    const params = useParams();
    const status = params.status;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const infoData = {
        success : {
            message : "Your order has been placed",
            cta : "Shop More",
            icon : <BsFillCartCheckFill />
        },
        failure : {
            message : "Payment Failed",
            cta: "Try Again",
            icon : <BiErrorCircle />
        }
    }

    if(status === "success"){
        dispatch(resetCart());
    }
    function handleClick(){
        if(status === "success"){
            navigate('/')
        }
    }
  return (
    <div className='Payments'>
        <div className="icon">{infoData[status].icon}</div>
        <div className="message">{infoData[status].message}</div>
        <button className="btn-primary " onClick={handleClick}>{infoData[status].cta}</button>
    </div>
  )
}

export default Payments