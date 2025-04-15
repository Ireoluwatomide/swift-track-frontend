// src/layouts/MainLayout.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-neutral-50">
            <Header />
            <main className="flex-grow px-4 py-6 md:px-6">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;

// Header Component
const Header: React.FC = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

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
                        {!isHome && (
                            <nav className="hidden md:ml-8 md:flex md:space-x-8">
                                <NavLink to="/vendor" text="Vendor Dashboard" />
                                <NavLink to="/track" text="Track Delivery" />
                                <NavLink to="/help" text="Help & Support" />
                            </nav>
                        )}
                    </div>
                    {!isHome && (
                        <div className="flex items-center">
                            <MobileMenu />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

// NavLink Component
interface NavLinkProps {
    to: string;
    text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, text }) => {
    const location = useLocation();
    const isActive = location.pathname.startsWith(to);

    return (
        <Link
            to={to}
            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
            }`}
        >
            {text}
        </Link>
    );
};

// Mobile Menu Component
const MobileMenu: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="md:hidden">
            <button
                type="button"
                className="p-2 rounded-md text-neutral-500 hover:text-neutral-700 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="sr-only">Open menu</span>
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
                        d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-16 inset-x-0 bg-white shadow-md z-10">
                    <div className="pt-2 pb-3 space-y-1">
                        <MobileNavLink to="/vendor" text="Vendor Dashboard" />
                        <MobileNavLink to="/track" text="Track Delivery" />
                        <MobileNavLink to="/help" text="Help & Support" />
                    </div>
                </div>
            )}
        </div>
    );
};

// Mobile NavLink Component
interface MobileNavLinkProps {
    to: string;
    text: string;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, text }) => {
    const location = useLocation();
    const isActive = location.pathname.startsWith(to);

    return (
        <Link
            to={to}
            className={`block px-3 py-2 text-base font-medium ${
                isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
            }`}
        >
            {text}
        </Link>
    );
};

// Footer Component
const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-neutral-200">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="text-center md:text-left">
                        <p className="text-sm text-neutral-500">
                            &copy; {new Date().getFullYear()} WhatsApp Tracker. All rights reserved.
                        </p>
                    </div>
                    <div className="mt-4 flex justify-center md:mt-0">
                        <div className="flex space-x-6">
                            <FooterLink href="#" text="Privacy Policy" />
                            <FooterLink href="#" text="Terms of Service" />
                            <FooterLink href="#" text="Contact Us" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Footer Link Component
interface FooterLinkProps {
    href: string;
    text: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, text }) => {
    return (
        <a
            href={href}
            className="text-sm text-neutral-500 hover:text-neutral-900"
        >
            {text}
        </a>
    );
};