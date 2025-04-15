import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';

const TrackDelivery: React.FC = () => {
    const navigate = useNavigate();
    const [trackingId, setTrackingId] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!trackingId.trim()) {
            setError('Please enter a tracking ID');
            return;
        }

        setIsLoading(true);
        setError(null);

        // Simulate API call to validate tracking ID
        setTimeout(() => {
            // For demo purposes, we'll accept any ID that starts with "DEL-"
            if (trackingId.startsWith('DEL-')) {
                navigate(`/track/${trackingId}`);
            } else {
                setError('Invalid tracking ID. Please check and try again.');
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-md mx-auto">
                    <h1 className="text-2xl font-heading font-bold text-neutral-900 mb-6 text-center">
                        Track Your Delivery
                    </h1>

                    <Card>
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <Alert
                                    variant="error"
                                    className="mb-4"
                                    onClose={() => setError(null)}
                                >
                                    {error}
                                </Alert>
                            )}

                            <Input
                                label="Tracking ID"
                                placeholder="Enter your tracking ID (e.g., DEL-1234)"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                                fullWidth
                            />

                            <div className="mt-6">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    fullWidth
                                    isLoading={isLoading}
                                >
                                    Track Delivery
                                </Button>
                            </div>

                            <p className="mt-4 text-sm text-neutral-500 text-center">
                                Enter the tracking ID you received via WhatsApp
                            </p>
                        </form>
                    </Card>

                    <div className="mt-8">
                        <div className="bg-primary/5 rounded-md p-4">
                            <h3 className="font-medium text-neutral-900 mb-2">For demo purposes:</h3>
                            <p className="text-sm text-neutral-600">
                                Use "DEL-1234" as a test tracking ID to see the customer tracking interface.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default TrackDelivery;