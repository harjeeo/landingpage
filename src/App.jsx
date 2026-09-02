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
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import SuperAdminLoginPage from "./pages/superadmin/SuperAdminLoginPage";
import SuperAdminDashboardPage from "./pages/superadmin/SuperAdminDashboardPage";
import SuperAdminTenantsPage from "./pages/superadmin/SuperAdminTenantsPage";
import SuperAdminReportsPage from "./pages/superadmin/SuperAdminReportsPage";
import SuperAdminActivityPage from "./pages/superadmin/SuperAdminActivityPage";
import SuperAdminIconLibraryPage from "./pages/superadmin/SuperAdminIconLibraryPage";
import SuperAdminSettingsPage from "./pages/superadmin/SuperAdminSettingsPage";
import RequireAuth from "./components/superadmin/RequireAuth";

export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/login");
  const isSuperAdmin = location.pathname.startsWith("/super-admin");
  const hideChrome = isAuthPage || isSuperAdmin;

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
          <Route path="tenants" element={<SuperAdminTenantsPage />} />
          <Route path="reports" element={<SuperAdminReportsPage />} />
          <Route path="activity" element={<SuperAdminActivityPage />} />
          <Route path="icon-library" element={<SuperAdminIconLibraryPage />} />
          <Route path="settings" element={<SuperAdminSettingsPage />} />
        </Route>
      </Routes>
      {!hideChrome && <Footer />}
    </div>
  );
}
