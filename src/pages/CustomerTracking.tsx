// src/pages/CustomerTracking.tsx - Update with WebSocket integration
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TrackingLayout from '../layouts/TrackingLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Avatar from '../components/common/Avatar';
import ProgressBar from '../components/common/ProgressBar';
import Skeleton from '../components/common/Skeleton';
import Alert from '../components/common/Alert';
import { DeliveryMap } from '../components/vendor/DeliveryMap';
import { useDelivery } from '../hooks/useDelivery';
import { useLocationTracking } from '../hooks/useLocationTracking';

const CustomerTracking: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { delivery, loading, error, updateDeliveryStatus } = useDelivery(id);
    const [isConfirming, setIsConfirming] = useState(false);

    // Use location tracking hook for customer view
    const {
        currentLocation,
        error: locationError,
    } = useLocationTracking({
        deliveryId: id || '',
        isDriver: false,
    });

    // Format time remaining
    const formatTimeRemaining = (dateString?: string): string => {
        if (!dateString) return 'Unknown';

        const estimatedTime = new Date(dateString).getTime();
        const now = Date.now();

        // If the time has passed
        if (estimatedTime < now) {
            return 'Arriving soon';
        }

        const diffMs = estimatedTime - now;
        const diffMins = Math.round(diffMs / 60000);

        if (diffMins < 1) {
            return 'Less than a minute';
        } else if (diffMins === 1) {
            return '1 minute';
        } else if (diffMins < 60) {
            return `${diffMins} minutes`;
        } else {
            const hours = Math.floor(diffMins / 60);
            const mins = diffMins % 60;
            if (mins === 0) {
                return hours === 1 ? '1 hour' : `${hours} hours`;
            }
            return `${hours} hr ${mins} min`;
        }
    };

    // Calculate progress based on time
    const calculateProgress = (): number => {
        if (!delivery || !delivery.tracking.startedAt || !delivery.tracking.eta) {
            return 0;
        }

        const startTime = new Date(delivery.tracking.startedAt).getTime();
        const endTime = new Date(delivery.tracking.eta).getTime();
        const now = Date.now();

        if (now >= endTime) return 100;
        if (now <= startTime) return 0;

        const totalDuration = endTime - startTime;
        const elapsedDuration = now - startTime;

        return Math.min(Math.round((elapsedDuration / totalDuration) * 100), 99);
    };

    // Handle confirm delivery
    const confirmDelivery = async () => {
        if (!id) return;

        setIsConfirming(true);

        try {
            await updateDeliveryStatus(id, 'completed');
        } catch (err) {
            console.error('Error confirming delivery:', err);
        } finally {
            setIsConfirming(false);
        }
    };

    return (
        <TrackingLayout mode="customer" deliveryId={id}>
            <div className="container mx-auto px-4 py-6">
                {error && (
                    <Alert
                        variant="error"
                        title="Error"
                        className="mb-6"
                        onClose={() => {}}
                    >
                        {error}
                    </Alert>
                )}

                {locationError && (
                    <Alert
                        variant="warning"
                        title="Tracking Issue"
                        className="mb-6"
                        onClose={() => {}}
                    >
                        {locationError}
                    </Alert>
                )}

                {delivery?.status === 'completed' ? (
                    // Delivery Completed View
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
                            Delivery Complete!
                        </h1>
                        <p className="text-neutral-600 mb-6">
                            Your package has been successfully delivered. Thank you for using our service.
                        </p>

                        <div className="bg-neutral-50 p-4 rounded-md mb-6">
                            <h2 className="font-medium mb-2">Delivery Summary</h2>
                            <p className="text-sm text-neutral-600 mb-1">
                                <span className="font-medium">Item:</span> {delivery.package.description}
                            </p>
                            <p className="text-sm text-neutral-600 mb-1">
                                <span className="font-medium">From:</span> {delivery.vendor?.name || 'Vendor'}
                            </p>
                            <p className="text-sm text-neutral-600">
                                <span className="font-medium">Delivered by:</span> {delivery.driver.name}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Button variant="primary" fullWidth onClick={() => window.location.href = '/'}>
                                Return to Homepage
                            </Button>
                        </div>
                    </Card>
                ) : (
                    // Live Tracking View
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Tracking Info Column */}
                        <div className="lg:col-span-1">
                            <Card className="mb-6">
                                <h2 className="text-lg font-heading font-semibold text-neutral-900 mb-4">
                                    Delivery Status
                                </h2>

                                {loading ? (
                                    <div className="space-y-4">
                                        <Skeleton height="5rem" />
                                        <Skeleton height="3rem" />
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-4">
                                            <Badge
                                                variant={
                                                    delivery?.status === 'completed'
                                                        ? 'success'
                                                        : delivery?.status === 'failed'
                                                            ? 'danger'
                                                            : delivery?.status === 'in-progress'
                                                                ? 'primary'
                                                                : 'warning'
                                                }
                                                size="lg"
                                            >
                                                {delivery?.status === 'in-progress'
                                                    ? 'In Transit'
                                                    : delivery?.status === 'pending'
                                                        ? 'Preparing'
                                                        : delivery?.status === 'completed'
                                                            ? 'Delivered'
                                                            : 'Failed'}
                                            </Badge>
                                        </div>

                                        <div className="mb-6">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-medium">Delivery Progress</span>
                                                <span className="text-sm">{calculateProgress()}%</span>
                                            </div>
                                            <ProgressBar
                                                progress={calculateProgress()}
                                                variant="primary"
                                                height="lg"
                                            />
                                        </div>

                                        <div className="bg-primary/5 p-4 rounded-md mb-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="text-sm text-neutral-600">Estimated Arrival</span>
                                                    <h3 className="text-xl font-bold text-primary">
                                                        {formatTimeRemaining(delivery?.tracking.eta)}
                                                    </h3>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl">🕒</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-sm text-neutral-600">
                                            <p>
                                                <span className="font-medium">Delivery Address:</span>{' '}
                                                {delivery?.tracking.destination?.address || 'Address not available'}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </Card>

                            <Card className="mb-6">
                                <h2 className="text-lg font-heading font-semibold text-neutral-900 mb-4">
                                    Driver Information
                                </h2>

                                {loading ? (
                                    <div className="flex items-center space-x-4">
                                        <Skeleton variant="circular" width="50px" height="50px" />
                                        <div className="flex-1">
                                            <Skeleton height="1.5rem" width="60%" className="mb-2" />
                                            <Skeleton height="1rem" width="40%" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <Avatar
                                            name={delivery?.driver.name}
                                            size="lg"
                                            bgColor="bg-primary"
                                        />
                                        <div className="ml-4">
                                            <p className="font-medium">{delivery?.driver.name}</p>
                                            <a
                                                href={`tel:${delivery?.driver.phone}`}
                                                className="text-primary hover:text-primary-dark text-sm"
                                            >
                                                {delivery?.driver.phone}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </Card>

                            <Card>
                                <h2 className="text-lg font-heading font-semibold text-neutral-900 mb-4">
                                    Package Information
                                </h2>

                                {loading ? (
                                    <Skeleton height="3rem" />
                                ) : (
                                    <>
                                        <p className="mb-4">
                                            <span className="text-sm font-medium text-neutral-600">Description:</span>{' '}
                                            {delivery?.package.description}
                                        </p>

                                        <p className="mb-6">
                                            <span className="text-sm font-medium text-neutral-600">From:</span>{' '}
                                            {delivery?.vendor?.name || 'Vendor'}
                                        </p>

                                        <Button
                                            variant="success"
                                            fullWidth
                                            isLoading={isConfirming}
                                            onClick={confirmDelivery}
                                            disabled={delivery?.status !== 'in-progress'}
                                        >
                                            Confirm Package Received
                                        </Button>
                                    </>
                                )}
                            </Card>
                        </div>

                        {/* Map Column */}
                        <div className="lg:col-span-2">
                            <Card className="h-full">
                                <h2 className="text-lg font-heading font-semibold text-neutral-900 mb-4">
                                    Live Tracking
                                </h2>

                                {loading ? (
                                    <div className="w-full h-96 bg-neutral-100 rounded animate-pulse"></div>
                                ) : (
                                    <>
                                        {currentLocation || delivery?.tracking.currentLocation ? (
                                            <DeliveryMap
                                                currentLocation={currentLocation || delivery!.tracking.currentLocation!}
                                                destinationLocation={delivery?.tracking.destination}
                                                height="600px"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-96 bg-neutral-50 rounded">
                                                <div className="text-center p-6">
                                                    <svg
                                                        className="mx-auto h-12 w-12 text-neutral-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                                        ></path>
                                                    </svg>
                                                    <h3 className="mt-2 text-sm font-medium text-neutral-900">
                                                        No location data available
                                                    </h3>
                                                    <p className="mt-1 text-sm text-neutral-500">
                                                        The driver hasn't started the delivery yet.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </TrackingLayout>
    );
};

export default CustomerTracking;
                      