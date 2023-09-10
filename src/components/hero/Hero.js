import React from 'react'
import './Hero.scss'
import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate();
  return (
    <div className='Hero'>
      <div className="hero-content center">
        <h1 className="heading">Exclusive Print and ArtWork</h1>
        <p className="subheading">Exclusive Art Pieces , for the exclusive You</p>
        <button onClick={() =>{navigate('/category')}} className='cta btn-primary'>Explore more</button>
      </div>
    </div>
  )
}

export default Hero