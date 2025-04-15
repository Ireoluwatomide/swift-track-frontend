import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VendorLayout from '../../layouts/VendorLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { RecentDeliveriesTable } from '../../components/vendor/RecentDeliveriesTable';
import { StatisticCard } from '../../components/vendor/StatisticCard';

const VendorDashboard: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    // This would typically come from an API
    const statistics = [
        {
            title: 'Active Deliveries',
            value: 24,
            change: 12,
            isPositive: true,
            icon: (
                <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
            ),
        },
        {
            title: 'Completed Today',
            value: 8,
            change: 2,
            isPositive: true,
            icon: (
                <svg
                    className="w-6 h-6 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
            ),
        },
        {
            title: 'Average Delivery Time',
            value: '42m',
            change: 8,
            isPositive: false,
            icon: (
                <svg
                    className="w-6 h-6 text-warning"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
            ),
        },
        {
            title: 'Failed Deliveries',
            value: 2,
            change: 1,
            isPositive: false,
            icon: (
                <svg
                    className="w-6 h-6 text-danger"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
            ),
        },
    ];

    // Mock data for recent deliveries
    const recentDeliveries = [
        {
            id: 'DEL-001',
            customer: 'John Doe',
            driver: 'Michael Smith',
            status: 'in-progress',
            createdAt: '2023-09-01T10:00:00',
            estimatedDelivery: '2023-09-01T11:30:00',
        },
        {
            id: 'DEL-002',
            customer: 'Jane Smith',
            driver: 'Robert Johnson',
            status: 'completed',
            createdAt: '2023-09-01T09:30:00',
            estimatedDelivery: '2023-09-01T10:45:00',
        },
        {
            id: 'DEL-003',
            customer: 'Alice Johnson',
            driver: 'William Brown',
            status: 'pending',
            createdAt: '2023-09-01T11:15:00',
            estimatedDelivery: '2023-09-01T12:30:00',
        },
        {
            id: 'DEL-004',
            customer: 'Bob Williams',
            driver: 'James Davis',
            status: 'failed',
            createdAt: '2023-09-01T08:45:00',
            estimatedDelivery: '2023-09-01T10:00:00',
        },
        {
            id: 'DEL-005',
            customer: 'Charlie Brown',
            driver: 'Richard Wilson',
            status: 'completed',
            createdAt: '2023-09-01T07:30:00',
            estimatedDelivery: '2023-09-01T09:00:00',
        },
    ];

    // Simulating loading (this would be a real API call in production)
    React.useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <VendorLayout>
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-neutral-900">
                        Vendor Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-neutral-600">
                        Manage your deliveries and track your drivers
                    </p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Link to="/vendor/create">
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
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    ></path>
                                </svg>
                            }
                        >
                            Create Delivery
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statistics.map((stat, index) => (
                    <StatisticCard key={index} {...stat} isLoading={isLoading} />
                ))}
            </div>

            {/* Recent Deliveries */}
            <Card className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-heading font-semibold text-neutral-900">
                        Recent Deliveries
                    </h2>
                    <Link
                        to="/vendor/deliveries"
                        className="text-sm font-medium text-primary hover:text-primary-dark"
                    >
                        View All
                    </Link>
                </div>
                <RecentDeliveriesTable deliveries={recentDeliveries} isLoading={isLoading} />
            </Card>
        </VendorLayout>
    );
};

export default VendorDashboard;