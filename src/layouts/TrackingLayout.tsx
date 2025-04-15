// src/layouts/TrackingLayout.tsx
import React from 'react';
import {Link} from "react-router-dom";

interface TrackingLayoutProps {
    children: React.ReactNode;
    mode: 'driver' | 'customer';
    deliveryId?: string;
}

const TrackingLayout: React.FC<TrackingLayoutProps> = ({
                                                           children,
                                                           mode,
                                                           deliveryId
                                                       }) => {
    return (
        <div className="flex flex-col min-h-screen bg-neutral-50">
            <TrackingHeader mode={mode} deliveryId={deliveryId} />
            <main className="flex-grow">{children}</main>
            <TrackingFooter />
        </div>
    );
};

export default TrackingLayout;

// Tracking Header Component
interface TrackingHeaderProps {
    mode: 'driver' | 'customer';
    deliveryId?: string;
}

const TrackingHeader: React.FC<TrackingHeaderProps> = ({ mode, deliveryId }) => {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
              <span className="text-primary font-heading font-bold text-xl">
                WhatsApp Tracker
              </span>
                        </Link>
                        {deliveryId && (
                            <span className="ml-3 px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary">
                ID: {deliveryId}
              </span>
                        )}
                    </div>
                    <div className="flex items-center">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-800">
              {mode === 'driver' ? 'Driver View' : 'Customer Tracking'}
            </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

// Tracking Footer Component
const TrackingFooter: React.FC = () => {
    return (
        <footer className="bg-white border-t border-neutral-200">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 text-center text-xs text-neutral-500">
                <p>Powered by WhatsApp Tracker &copy; {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
};