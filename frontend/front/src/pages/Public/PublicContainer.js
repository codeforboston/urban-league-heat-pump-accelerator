import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './home/Home'
import Contact from './contact/Contact'
import About from './about/About'
import Nav from './nav/Nav'
import Info from './info/Info'
import Footer from './footer/Footer'

const PublicContainer = () => {
  return (
    <Box>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='contact' element={<Contact />}></Route>
        <Route path='about' element={<About />}></Route>
        <Route path='info' element={<Info />}></Route>
      </Routes>
      <Footer />
    </Box>
  )
}

export default PublicContainer
