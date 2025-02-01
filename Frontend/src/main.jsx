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
import LoginPage from './pages/login.page'
import ReportPage from './pages/reports.page'
import { Provider } from "react-redux";
import { store } from "./lib/store";
import { ClerkProvider } from "@clerk/clerk-react";
import SignUpPage from "./pages/signin.page";
import TestPage from "./pages/test.page";
import EditLostForm from "./EditLostForm";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer autoClose={3000} />
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/lostreport" element={<LostReportPage />} />
              <Route path="/foundreport" element={<FoundReportPage />} />
              <Route path="/reports" element={<ReportPage />} />
              <Route path="/test" element={<TestPage />} />
            </Route>
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ClerkProvider>


  </StrictMode>
)
