import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { MOCK_USER_ROLES } from './data/mockData';
import Login from './pages/Login';
import Explore from './pages/Explore';
import AdminDashboard from './pages/AdminDashboard';
import SellerDashboard from './pages/SellerDashboard';
import SellerListingFlow from './pages/SellerListingFlow';
import PropertyDetails from './pages/PropertyDetails';
import Inbox from './pages/Inbox';
import BottomNav from './components/Navigation/BottomNav';
import AIAssistantBubble from './components/Navigation/AIAssistantBubble';
import AuthModal from './components/Auth/AuthModal';

const DummyPage = ({ title }) => (
    <div className="flex-center" style={{ height: '100%', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
        <h2 className="text-gradient" style={{ fontSize: '2rem' }}>{title}</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            This module is under construction. It features top-tier glassmorphism soon.
        </p>
    </div>
);

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { getRole, isLoading } = useAuth();
    if (isLoading) return null;
    const currentRole = getRole();
    if (!allowedRoles.includes(currentRole)) {
        if (currentRole === MOCK_USER_ROLES.ADMIN) return <Navigate to="/admin" replace />;
        if (currentRole === MOCK_USER_ROLES.SELLER) return <Navigate to="/seller" replace />;
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    const { getRole, isLoading } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    if (isLoading) {
        return (
            <div className="app-container flex-center">
                <h2 className="text-gradient">S A D E N</h2>
            </div>
        );
    }
    return (
        <div className="app-container">
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/map" element={<Explore onLoginClick={() => setShowAuthModal(true)} />} />
                    <Route path="/seller" element={
                        <ProtectedRoute allowedRoles={[MOCK_USER_ROLES.SELLER]}>
                            <SellerDashboard />
                        </ProtectedRoute>}
                    />
                    <Route path="/admin" element={
                        <ProtectedRoute allowedRoles={[MOCK_USER_ROLES.ADMIN]}>
                            <AdminDashboard />
                        </ProtectedRoute>}
                    />
                    <Route path="/list" element={
                        <ProtectedRoute allowedRoles={[MOCK_USER_ROLES.SELLER]}>
                            <SellerListingFlow />
                        </ProtectedRoute>}
                    />
                    <Route path="/property/:id" element={<PropertyDetails />} />
                    <Route path="/saved" element={<DummyPage title="Saved Properties" />} />
                    <Route path="/inbox" element={
                        <ProtectedRoute allowedRoles={[MOCK_USER_ROLES.BUYER, MOCK_USER_ROLES.SELLER]}>
                            <Inbox />
                        </ProtectedRoute>}
                    />
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </div>
            <AIAssistantBubble />
            {showAuthModal && (
                <AuthModal onClose={() => setShowAuthModal(false)} />
            )}
            {getRole() !== MOCK_USER_ROLES.ADMIN && getRole() !== null && <BottomNav onLoginClick={() => setShowAuthModal(true)} />}
        </div>
    );
}

export default App;