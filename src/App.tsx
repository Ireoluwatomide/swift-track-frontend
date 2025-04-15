// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import VendorDashboard from './pages/vendor/VendorDashboard';
import CreateDelivery from './pages/vendor/CreateDelivery';
import DeliveryDetails from './pages/vendor/DeliveryDetails';
import DriverTracking from './pages/DriverTracking';
import DriverComplete from './pages/DriverComplete';
import CustomerTracking from './pages/CustomerTracking';
import TrackDelivery from './pages/TrackDelivery';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Router>
            <Routes>
                {/* Home */}
                <Route path="/" element={<Home />} />

                {/* Vendor Routes */}
                <Route path="/vendor" element={<VendorDashboard />} />
                <Route path="/vendor/create" element={<CreateDelivery />} />
                <Route path="/vendor/deliveries/:id" element={<DeliveryDetails />} />

                {/* Driver Routes */}
                <Route path="/driver/:id" element={<DriverTracking />} />
                <Route path="/driver/complete/:id" element={<DriverComplete />} />

                {/* Customer Routes */}
                <Route path="/track" element={<TrackDelivery />} />
                <Route path="/track/:id" element={<CustomerTracking />} />

                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
