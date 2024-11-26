import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Card from '../components/Card'
import VideoPlayer from '../components/VideoPlayer'


export default function Home() {



  return (
    <>
    <Navbar/>
    <Sidebar/>
    <VideoPlayer/>
    </>
  )
}
