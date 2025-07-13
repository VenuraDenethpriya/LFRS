// src/AppRoutes.jsx
import { Routes, Route } from "react-router";
import { useUser } from "@clerk/clerk-react";
import RootLayout from "./layouts/root.page";
import HomePage from "./pages/home.page";
import LostReportPage from "./pages/lostReport.page";
import FoundReportPage from "./pages/foundReport.page";
import ReportPage from "./pages/reports.page";
import TestPage from "./pages/test.page";
import ReportView from "./pages/police/reportview";
import PoliceDashboard from "./pages/police/dashboard";
import LoginPage from "./pages/login.page";
import SignUpPage from "./pages/signin.page";

export default function AppRoutes() {
  const { user } = useUser();

  return (
    <Routes>
      <Route element={<RootLayout />}>
        {user?.publicMetadata?.role === "admin" && (
          <Route path="/dashboard" element={<PoliceDashboard />} />
        )}
        <Route path="/" element={<HomePage />} />
        <Route path="/lostreport" element={<LostReportPage />} />
        <Route path="/foundreport" element={<FoundReportPage />} />
        <Route path="/reports" element={<ReportPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/reports/:id/:type" element={<ReportView />} />
      </Route>

      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}
