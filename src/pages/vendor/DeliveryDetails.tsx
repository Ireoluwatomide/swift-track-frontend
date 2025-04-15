import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import VendorLayout from '../../layouts/VendorLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Skeleton from '../../components/common/Skeleton';
import StatusIndicator from '../../components/common/StatusIndicator';
import { DeliveryMap } from '../../components/vendor/DeliveryMap';

// Mock delivery data interface
interface DeliveryDetails {
    id: string;
    status: 'pending' | 'in-progress' | 'completed' | 'failed';
    customer: {
        name: string;
        phone: string;
    };
    driver: {
        name: string;
        phone: string;
    };
    package: {
        description: string;
        notes?: string;
    };
    tracking: {
        createdAt: string;
        startedAt?: string;
        completedAt?: string;
        currentLocation?: {
            lat: number;
            lng: number;
        };
        eta?: string;
    };
}

const DeliveryDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [delivery, setDelivery] = useState<DeliveryDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API call to get delivery details
        setIsLoading(true);
        setTimeout(() => {
            // Mock data for the specific delivery
            const mockDelivery: DeliveryDetails = {
                id: id || 'DEL-0000',
                status: 'in-progress',
                customer: {
                    name: 'John Doe',
                    phone: '+234 800 123 4567',
                },
                driver: {
                    name: 'Michael Smith',
                    phone: '+234 800 765 4321',
                },
                package: {
                    description: 'Clothing items (2kg)',
                    notes: 'Please call the customer before arriving',
                },
                tracking: {
                    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
                    startedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
                    currentLocation: {
                        lat: 6.5244,
                        lng: 3.3792,
                    },
                    eta: new Date(Date.now() + 20 * 60 * 1000).toISOString(), // 20 minutes from now
                },
            };

            setDelivery(mockDelivery);
            setIsLoading(false);
        }, 1500);
    }, [id]);

    // Format date
    const formatDateTime = (dateString?: string): string => {
        if (!dateString) return 'N/A';

        const date = new Date(dateString);
        return date.toLocaleString('en-NG', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Calculate duration
    const calculateDuration = (start?: string, end?: string): string => {
        if (!start) return 'N/A';

        const startDate = new Date(start);
        const endDate = end ? new Date(end) : new Date();

        const durationMs = endDate.getTime() - startDate.getTime();
        const minutes = Math.floor(durationMs / (1000 * 60));

        if (minutes < 60) {
            return `${minutes} min`;
        } else {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours}h ${remainingMinutes}m`;
        }
    };

    return (
        <VendorLayout>
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-neutral-900">
                        Delivery Details
                    </h1>
                    <p className="mt-1 text-sm text-neutral-600">
                        {isLoading ? (
                            <Skeleton width="16rem" height="1rem" />
                        ) : (
                            <>
                                Tracking ID: <span className="font-medium">{delivery?.id}</span>
                            </>
                        )}
                    </p>
                </div>
                <div className="mt-4 md:mt-0 flex">
                    <Button
                        variant="secondary"
                        className="mr-3"
                        icon={
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                ></path>
                            </svg>
                        }
                    >
                        Share Link
                    </Button>
                    <Button
                        variant="primary"
                        icon={
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                ></path>
                            </svg>
                        }
                    >
                        Contact Customer
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Details Column */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Status Card */}
                    <Card>
                        <h2 className="text-lg font-heading font-semibold text-neutral-900 mb-4">
                            Delivery Status
                        </h2>
                        {isLoading ? (
                            <div className="space-y-3">
                                <Skeleton width="70%" height="1.5rem" />
                                <Skeleton width="100%" height="1rem" />
                                <Skeleton width="60%" height="1rem" />
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center mb-3">
                                    <StatusIndicator status={delivery?.status || 'pending'} />
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
                                        className="ml-2"
                                    >
                                        {delivery?.tracking.eta && delivery.status === 'in-progress'
                                            ? `ETA: ${formatDateTime(delivery.tracking.eta)}`
                                            : ''}
                                    </Badge>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p>
                                        <span className="text-neutral-500">Created:</span>{' '}
                                        <span className="font-medium">{formatDateTime(delivery?.tracking.createdAt)}</span>
                                    </p>
                                    {delivery?.tracking.startedAt && (
                                        <p>
                                            <span className="text-neutral-500">Started:</span>{' '}
                                            <span className="font-medium">{formatDateTime(delivery.tracking.startedAt)}</span>
                                        </p>
                                    )}
                                    {delivery?.tracking.completedAt && (
                                        <p>
                                            <span className="text-neutral-500">Completed:</span>{' '}
                                            <span className="font-medium">{formatDateTime(delivery.tracking.completedAt)}</span>
                                        </p>
                                    )}
                                    {delivery?.status === 'in-progress' && (
                                        <p>
                                            <span className="text-neutral-500">Duration:</span>{' '}
                                            <span className="font-medium">
                        {calculateDuration(delivery.tracking.startedAt)}
                      </span>
                                        </p>
                                    )}
                                    {delivery?.status === 'completed' && (
                                        <p>
                                            <span className="text-neutral-500">Total Time:</span>{' '}
                                            <span className="font-medium">
                        {calculateDuration(delivery.tracking.startedAt, delivery.tracking.completedAt)}
                      </span>
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                    </Card>

                    {/* Customer Info Card */}
                    <Card>
                        <h2 className="text-lg font-heading font-semibold text-neutral-900 mb-4">
                            Customer Information
                        </h2>
                        {isLoading ? (
                            <div className="space-y-3">
                                <Skeleton width="60%" height="1rem" />
                                <Skeleton width="50%" height="1rem" />
                            </div>
                        ) : (
                            <div className="space-y-2 text-sm">
                                <p>
                                    <span className="text-neutral-500">Name:</span>{' '}
                                    <span className="font-medium">{delivery?.customer.name}</span>
                                </p>
                                <p>
                                    <span className="text-neutral-500">Phone:</span>{' '}
                                    <a
                                        href={`tel:${delivery?.customer.phone}`}
                                        className="font-medium text-primary hover:text-primary-dark"
                                    >
                                        {delivery?.customer.phone}
                                    </a>
                                </p>
                            </div>
                        )}
                    </Card>

                    {/* Driver Info Card */}
                    <Card>
                        <h2 className="text-lg font-heading font-semibold text-neutral-900 mb-4">
                            Driver Information
                        </h2>
                        {isLoading ? (
                            <div className="space-y-3">
                                <Skeleton width="60%" height="1rem" />
                                <Skeleton width="50%" height="1rem" />
                            </div>
                        ) : (
                            <div className="space-y-2 text-sm">
                                <p>
                                    <span className="text-neutral-500">Name:</span>{' '}
                                    <span className="font-medium">{delivery?.driver.name}</span>
                                </p>
                                <p>
                                    <span className="text-neutral-500">Phone:</span>{' '}
                                    <a
                                        href={`tel:${delivery?.driver.phone}`}
                                        className="font-medium text-primary hover:text-primary-dark"
                                    >
                                        {delivery?.driver.phone}
                                    </a>
                                </p>
                            </div>
                        )}
                    </Card>

                    {/* Package Info Card */}
                    <Card>
                        <h2 className="text-lg font-heading font-semibold text-neutral-900 mb-4">
                            Package Information
                        </h2>
                        {isLoading ? (
                            <div className="space-y-3">
                                <Skeleton width="100%" height="1rem" />
                                <Skeleton width="90%" height="1rem" />
                                <Skeleton width="80%" height="1rem" />
                            </div>
                        ) : (
                            <div className="space-y-2 text-sm">
                                <p>
                                    <span className="text-neutral-500">Description:</span>{' '}
                                    <span className="font-medium">{delivery?.package.description}</span>
                                </p>
                                {delivery?.package.notes && (
                                    <div>
                                        <span className="text-neutral-500">Notes:</span>{' '}
                                        <p className="mt-1 text-neutral-700 bg-neutral-50 p-2 rounded">
                                            {delivery.package.notes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                </div>

                {/* Map Column */}
                <div className="lg:col-span-2">
                    <Card className="h-full">
                        <h2 className="text-lg font-heading font-semibold text-neutral-900 mb-4">
                            Live Tracking
                        </h2>
                        {isLoading ? (
                            <div className="w-full h-96 bg-neutral-100 rounded animate-pulse"></div>
                        ) : (
                            <>
                                {delivery?.tracking.currentLocation ? (
                                    <DeliveryMap
                                        currentLocation={delivery.tracking.currentLocation}
                                        height="500px"
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
        </VendorLayout>
    );
};

export default DeliveryDetails;