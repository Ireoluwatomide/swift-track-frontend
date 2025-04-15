// src/layouts/VendorLayout.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface VendorLayoutProps {
    children: React.ReactNode;
}

const VendorLayout: React.FC<VendorLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-neutral-50">
            <VendorHeader />
            <div className="flex flex-col md:flex-row flex-grow">
                <VendorSidebar />
                <main className="flex-grow p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
};

export default VendorLayout;

// Vendor Header Component
const VendorHeader: React.FC = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary font-heading font-bold text-xl">
                WhatsApp Tracker
              </span>
                        </Link>
                        <span className="ml-4 px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary">
              Vendor Dashboard
            </span>
                    </div>
                    <div className="flex items-center">
                        <button className="p-2 rounded-md text-neutral-500 hover:text-neutral-700 focus:outline-none">
                            <span className="sr-only">Notifications</span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                        </button>
                        <div className="ml-4 flex items-center">
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="User"
                            />
                            <span className="ml-2 hidden md:block text-sm font-medium text-neutral-700">
                Vendor Account
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

// Vendor Sidebar Component
const VendorSidebar: React.FC = () => {
    const location = useLocation();

    const isActiveRoute = (path: string) => {
        return location.pathname.startsWith(path);
    };

    const navItems = [
        {
            path: '/vendor',
            exact: true,
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
            ),
            text: 'Dashboard',
        },
        {
            path: '/vendor/deliveries',
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            ),
            text: 'Deliveries',
        },
        {
            path: '/vendor/drivers',
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ),
            text: 'Drivers',
        },
        {
            path: '/vendor/customers',
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            ),
            text: 'Customers',
        },
        {
            path: '/vendor/settings',
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            ),
            text: 'Settings',
        },
    ];

    return (
        <aside className="md:w-64 bg-white shadow md:shadow-none md:border-r border-neutral-200">
            <div className="h-full px-3 py-4">
                <div className="mb-6">
                    <Link
                        to="/vendor/create"
                        className="flex items-center justify-center w-full py-3 px-4 rounded-md bg-primary text-white font-medium hover:bg-primary-dark"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                        </svg>
                        Create Delivery
                    </Link>
                </div>
                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-md
                ${
                                isActiveRoute(item.path) && (item.exact ? location.pathname === item.path : true)
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                            }
              `}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.text}
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
};
