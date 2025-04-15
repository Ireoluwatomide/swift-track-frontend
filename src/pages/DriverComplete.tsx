// src/pages/DriverComplete.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import TrackingLayout from '../layouts/TrackingLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const DriverComplete: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <TrackingLayout mode="driver" deliveryId={id}>
            <div className="container mx-auto px-4 py-6">
                <Card className="max-w-md mx-auto text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-success/20 mb-6">
                        <svg
                            className="h-8 w-8 text-success"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            ></path>
                        </svg>
                    </div>

                    <h1 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
                        Delivery Completed!
                    </h1>
                    <p className="text-neutral-600 mb-6">
                        You have successfully completed this delivery. The customer has been notified.
                    </p>

                    <div className="bg-neutral-50 p-4 rounded-md mb-6">
                        <h2 className="font-medium mb-2">Delivery Summary</h2>
                        <p className="text-sm text-neutral-600 mb-1">
                            <span className="font-medium">ID:</span> {id}
                        </p>
                        <p className="text-sm text-neutral-600 mb-1">
                            <span className="font-medium">Customer:</span> John Doe
                        </p>
                        <p className="text-sm text-neutral-600">
                            <span className="font-medium">Completed:</span> {new Date().toLocaleString()}
                        </p>
                    </div>

                    <Link to="/">
                        <Button variant="primary" fullWidth>
                            Return to Homepage
                        </Button>
                    </Link>
                </Card>
            </div>
        </TrackingLayout>
    );
};

export default DriverComplete;