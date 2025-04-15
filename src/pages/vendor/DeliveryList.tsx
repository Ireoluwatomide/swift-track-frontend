import React, { useState, useEffect } from 'react';
import VendorLayout from '../../layouts/VendorLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { RecentDeliveriesTable } from '../../components/vendor/RecentDeliveriesTable';

// Mock data interface
interface Delivery {
    id: string;
    customer: string;
    driver: string;
    status: 'pending' | 'in-progress' | 'completed' | 'failed';
    createdAt: string;
    estimatedDelivery: string;
}

const DeliveryList: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        // Simulate API call to get deliveries
        setIsLoading(true);
        setTimeout(() => {
            // Mock data for deliveries
            const mockDeliveries: Delivery[] = [
                {
                    id: 'DEL-1001',
                    customer: 'John Doe',
                    driver: 'Michael Smith',
                    status: 'in-progress',
                    createdAt: '2023-09-01T10:00:00',
                    estimatedDelivery: '2023-09-01T11:30:00',
                },
                {
                    id: 'DEL-1002',
                    customer: 'Jane Smith',
                    driver: 'Robert Johnson',
                    status: 'completed',
                    createdAt: '2023-09-01T09:30:00',
                    estimatedDelivery: '2023-09-01T10:45:00',
                },
                {
                    id: 'DEL-1003',
                    customer: 'Alice Johnson',
                    driver: 'William Brown',
                    status: 'pending',
                    createdAt: '2023-09-01T11:15:00',
                    estimatedDelivery: '2023-09-01T12:30:00',
                },
                {
                    id: 'DEL-1004',
                    customer: 'Bob Williams',
                    driver: 'James Davis',
                    status: 'failed',
                    createdAt: '2023-09-01T08:45:00',
                    estimatedDelivery: '2023-09-01T10:00:00',
                },
                {
                    id: 'DEL-1005',
                    customer: 'Charlie Brown',
                    driver: 'Richard Wilson',
                    status: 'completed',
                    createdAt: '2023-09-01T07:30:00',
                    estimatedDelivery: '2023-09-01T09:00:00',
                },
                {
                    id: 'DEL-1006',
                    customer: 'Daniel White',
                    driver: 'Thomas Moore',
                    status: 'in-progress',
                    createdAt: '2023-09-01T12:15:00',
                    estimatedDelivery: '2023-09-01T13:45:00',
                },
                {
                    id: 'DEL-1007',
                    customer: 'Eva Green',
                    driver: 'David Anderson',
                    status: 'completed',
                    createdAt: '2023-09-01T06:45:00',
                    estimatedDelivery: '2023-09-01T08:15:00',
                },
                {
                    id: 'DEL-1008',
                    customer: 'Frank Johnson',
                    driver: 'Joseph Taylor',
                    status: 'pending',
                    createdAt: '2023-09-01T13:30:00',
                    estimatedDelivery: '2023-09-01T15:00:00',
                },
            ];

            setDeliveries(mockDeliveries);
            setIsLoading(false);
        }, 1500);
    }, []);

    // Filter deliveries based on search query and status filter
    const filteredDeliveries = deliveries.filter(delivery => {
        const matchesQuery =
            delivery.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            delivery.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            delivery.driver.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;

        return matchesQuery && matchesStatus;
    });

    return (
        <VendorLayout>
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-neutral-900">
                        All Deliveries
                    </h1>
                    <p className="mt-1 text-sm text-neutral-600">
                        View and manage all your delivery requests
                    </p>
                </div>
                <div className="mt-4 md:mt-0">
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
                        onClick={() => window.location.href = '/vendor/create'}
                    >
                        Create Delivery
                    </Button>
                </div>
            </div>

            <Card className="mb-8">
                <div className="mb-6">
                    <h2 className="text-lg font-heading font-semibold text-neutral-900 mb-4">
                        Filter Deliveries
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Input
                            placeholder="Search by ID, customer, or driver"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            icon={
                                <svg
                                    className="w-5 h-5 text-neutral-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                            }
                        />

                        <Select
                            options={[
                                { value: 'all', label: 'All Statuses' },
                                { value: 'pending', label: 'Pending' },
                                { value: 'in-progress', label: 'In Progress' },
                                { value: 'completed', label: 'Completed' },
                                { value: 'failed', label: 'Failed' },
                            ]}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        />
                    </div>
                </div>

                <RecentDeliveriesTable
                    deliveries={filteredDeliveries}
                    isLoading={isLoading}
                />
            </Card>
        </VendorLayout>
    );
};

export default DeliveryList;