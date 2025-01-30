import { ToastContainer } from "react-toastify";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/home.page'
import { BrowserRouter, Route, Routes } from 'react-router'
import LostReportPage from './pages/lostReport.page'
import FoundReportPage from './pages/foundReport.page'
import RootLayout from './layouts/root.page'
import SigninPage from './pages/signin.page'
import LoginPage from './pages/login.page'
import ReportPage from './pages/reports.page'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer autoClose={3000} />
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout/>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/lostreport" element={<LostReportPage />} />
          <Route path="/foundreport" element={<FoundReportPage />} />
          <Route path="/reports" element={<ReportPage/>}/>
        </Route>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signin" element={<SigninPage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
