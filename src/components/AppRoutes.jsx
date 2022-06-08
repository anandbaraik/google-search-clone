import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import {Results} from "./Results";
const AppRoutes = () => {
  return (
    <div className='p-4'>
        <Routes>
            <Route exact path="/" element={<Navigate to="/search" replace={true} />}>
            </Route>
            <Route exact path="/google-search-clone" element={<Navigate to="/search" replace={true} />}>
            </Route>
            <Route exact path="/search" element={<Results/>}>
            </Route>
            <Route exact path="/news" element={<Results/>}>
            </Route>
            <Route exact path="/videos" element={<Results/>}>
            </Route>
            <Route exact path="/images" element={<Results/>}>
            </Route>
        </Routes>
    </div>
  )
}

export default AppRoutes