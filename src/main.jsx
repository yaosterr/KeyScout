import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Regular KeyScout pages
import KeyScoutHomepage from './pages/KeyScout/HomePage';
import GettingStartedPage from './pages/KeyScout/GettingStartedPage';
import UploadPage from './pages/KeyScout/UploadPage';
import FinalPage from './pages/KeyScout/FinalPage';

// Admin pages
import MembersPage from './pages/KeyScout/Admin/MembersPage';
import AddUserPage from './pages/KeyScout/Admin/AddUserPage';
import AdminHomePage from './pages/KeyScout/Admin/AdminHomePage';
import TimeCapsulePage from './pages/KeyScout/Admin/TimeCapsulePage';
import BadgesPage from './pages/KeyScout/Admin/BadgesPage';

// Import CSS
import './index.css';

// Import Contexts
import { DesignProvider } from './context/DesignContext';
import { MembersProvider } from './pages/KeyScout/Admin/MembersPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/keyscout" replace />} />

          {/* KeyScout admin login route - unprotected */}
          <Route path="/keyscout-admin/login" element={
            <DesignProvider>
              <AdminHomePage />
            </DesignProvider>
          } />

          {/* Protected KeyScout admin routes */}
          <Route path="/keyscout-admin/*" element={
            <ProtectedRoute>
              <DesignProvider>
                <MembersProvider>
                  <Routes>
                    <Route path="/" element={<MembersPage />} />
                    <Route path="/add-user" element={<AddUserPage />} />
                    <Route path="/timecapsule" element={<TimeCapsulePage />} />
                    <Route path="/badges" element={<BadgesPage />} />
                  </Routes>
                </MembersProvider>
              </DesignProvider>
            </ProtectedRoute>
          } />

          {/* Regular KeyScout routes */}
          <Route path="/keyscout/*" element={
            <DesignProvider>
              <Routes>
                <Route path="/" element={<KeyScoutHomepage />} />
                <Route path="/getting-started" element={<GettingStartedPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/final" element={<FinalPage />} />
              </Routes>
            </DesignProvider>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);