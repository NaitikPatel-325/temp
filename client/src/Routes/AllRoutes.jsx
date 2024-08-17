import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {Home} from '../Pages/Home/Home'
import {Dashboard} from '../Pages/Dashboard/Dashboard'
import {Expanses} from '../Pages/Expanse/Expanses'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path="/dashboard" element = {<Dashboard />} />
        <Route path="/group/:id" element={<Expanses />} />
    </Routes>
  )
}
