// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/common/Button';

const NotFound: React.FC = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-md mx-auto text-center">
                    <svg
                        className="mx-auto h-16 w-16 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        ></path>
                    </svg>

                    <h1 className="mt-4 text-3xl font-heading font-bold text-neutral-900">
                        Page Not Found
                    </h1>

                    <p className="mt-2 text-neutral-600">
                        The page you're looking for doesn't exist or has been moved.
                    </p>

                    <div className="mt-8">
                        <Link to="/">
                            <Button variant="primary">
                                Return to Homepage
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default NotFound;
