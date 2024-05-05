import React, { useEffect, useState } from 'react'
import { FaArrowCircleLeft, FaArrowCircleRight, FaPause, FaPlay } from 'react-icons/fa'

export default function Slide({children:slides}) {
    const [current,setCurrent]=useState(0)
    const [autoplay,setAutoplay] = useState(true)

    const nextSlide=()=>{
        setCurrent((curr)=>(curr===slides.length-1?0:curr+1))
    }
    const prevSlide=()=>{
        setCurrent((curr)=>(curr===0?slides.length-1:curr-1))
    }
    const autoSlide=()=>{
        let interval;
        autoplay && (setInterval(nextSlide,2000))
        return ()=>clearInterval(interval)
    }
    useEffect
    (autoSlide,[autoplay])

    const pause=()=>setAutoplay(!autoplay)
  return (
    <div className='relative overflow-hidden rounded-xl' >
        <div className='w-[450px] flex transition duration-500 ' style={{ transform:`translateX(-${current * 100}%)` }}>{slides}</div>
        <button className='text-3xl text-yellow-800 absolute top-1/2 left-2 bg-white rounded-full' onClick={prevSlide}><FaArrowCircleLeft /></button>
        <button className='text-3xl text-yellow-800 absolute top-1/2 right-2  bg-white rounded-full'onClick={nextSlide}><FaArrowCircleRight /></button>
        <button className='text-4xl text-white absolute button-5 left-1/2 -translate-x-1/2' onClick={pause}>{autoplay ? <FaPause/> : <FaPlay/>}</button>
        <h1>{current}</h1>
        </div>
  )
}
