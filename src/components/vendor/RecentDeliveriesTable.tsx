// src/components/vendor/RecentDeliveriesTable.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import StatusIndicator from '../common/StatusIndicator';
import Skeleton from '../common/Skeleton';

interface Delivery {
    id: string;
    customer: string;
    driver: string;
    status: 'pending' | 'in-progress' | 'completed' | 'failed';
    createdAt: string;
    estimatedDelivery: string;
}

interface RecentDeliveriesTableProps {
    deliveries: Delivery[];
    isLoading?: boolean;
}

export const RecentDeliveriesTable: React.FC<RecentDeliveriesTableProps> = ({
                                                                                deliveries,
                                                                                isLoading = false,
                                                                            }) => {
    // Format date
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (isLoading) {
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                    <thead className="bg-neutral-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Driver
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            ETA
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Skeleton width="4rem" height="1rem" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Skeleton width="6rem" height="1rem" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Skeleton width="6rem" height="1rem" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Skeleton width="5rem" height="1rem" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Skeleton width="3rem" height="1rem" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Skeleton width="3rem" height="1rem" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <Skeleton width="5rem" height="1rem" />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Driver
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        ETA
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                {deliveries.map((delivery) => (
                    <tr key={delivery.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-primary">
                                {delivery.id}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-neutral-900">{delivery.customer}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-neutral-900">{delivery.driver}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <StatusIndicator status={delivery.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-neutral-600">
                                {formatDate(delivery.createdAt)}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-neutral-600">
                                {formatDate(delivery.estimatedDelivery)}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                            <Link
                                to={`/vendor/deliveries/${delivery.id}`}
                                className="text-primary hover:text-primary-dark text-sm font-medium"
                            >
                                View
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default RecentDeliveriesTable;