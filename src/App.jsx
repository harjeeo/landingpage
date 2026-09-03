import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AllApps from "./pages/AllApps";
import CafeRestaurantPOS from "./pages/CafeRestaurantPOS";
import AccountingSoftware from "./pages/AccountingSoftware";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundCancellationPolicy from "./pages/RefundCancellationPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import DataSecurityPolicy from "./pages/DataSecurityPolicy";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import SuperAdminLoginPage from "./pages/superadmin/SuperAdminLoginPage";
import SuperAdminDashboardPage from "./pages/superadmin/SuperAdminDashboardPage";
import SuperAdminLeadsPage from "./pages/superadmin/SuperAdminLeadsPage";
import SuperAdminSubscriptionsPage from "./pages/superadmin/SuperAdminSubscriptionsPage";
import SuperAdminPaymentsPage from "./pages/superadmin/SuperAdminPaymentsPage";
import SuperAdminUsersPage from "./pages/superadmin/SuperAdminUsersPage";
import SuperAdminActivityPage from "./pages/superadmin/SuperAdminActivityPage";
import SuperAdminSettingsPage from "./pages/superadmin/SuperAdminSettingsPage";
import RequireAuth from "./components/superadmin/RequireAuth";

export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/login");
  const isSuperAdmin = location.pathname.startsWith("/super-admin");
  const hideChrome = isAuthPage || isSuperAdmin;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      {!hideChrome && <AnnouncementBar />}
      {!hideChrome && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apps" element={<AllApps />} />
        <Route path="/pos/cafe-restaurant" element={<CafeRestaurantPOS />} />
        <Route path="/accounting-software" element={<AccountingSoftware />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refund-cancellation-policy" element={<RefundCancellationPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/data-security-policy" element={<DataSecurityPolicy />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/super-admin" element={<SuperAdminLoginPage />} />
        <Route
          path="/super-admin"
          element={
            <RequireAuth role="super-admin">
              <SuperAdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<SuperAdminDashboardPage />} />
          <Route path="leads" element={<SuperAdminLeadsPage />} />
          <Route path="subscriptions" element={<SuperAdminSubscriptionsPage />} />
          <Route path="payments" element={<SuperAdminPaymentsPage />} />
          <Route path="users" element={<SuperAdminUsersPage />} />
          <Route path="activity" element={<SuperAdminActivityPage />} />
          <Route path="settings" element={<SuperAdminSettingsPage />} />
        </Route>
      </Routes>
      {!hideChrome && <Footer />}
    </div>
  );
}
