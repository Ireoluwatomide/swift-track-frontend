import { useState, useEffect } from 'react';
import { deliveryService } from '../services/api';

// Interface for delivery data
interface DeliveryData {
    id: string;
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
        destination?: {
            lat: number;
            lng: number;
            address: string;
        };
        eta?: string;
    };
    status: 'pending' | 'in-progress' | 'completed' | 'failed';
}

export function useDelivery(id?: string) {
    const [delivery, setDelivery] = useState<DeliveryData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch delivery data
    const fetchDelivery = async (deliveryId: string) => {
        setLoading(true);
        setError(null);

        try {
            const data = await deliveryService.getDelivery(deliveryId);
            setDelivery(data);
        } catch (err) {
            console.error('Error fetching delivery:', err);
            setError('Failed to fetch delivery data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Create new delivery
    const createDelivery = async (deliveryData: any) => {
        setLoading(true);
        setError(null);

        try {
            const data = await deliveryService.createDelivery(deliveryData);
            setDelivery(data);
            return data;
        } catch (err) {
            console.error('Error creating delivery:', err);
            setError('Failed to create delivery. Please try again.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Update delivery status
    const updateDeliveryStatus = async (deliveryId: string, status: string) => {
        setLoading(true);
        setError(null);

        try {
            const data = await deliveryService.updateDeliveryStatus(deliveryId, status);
            setDelivery((prev) => prev ? { ...prev, status: data.status as any } : null);
            return true;
        } catch (err) {
            console.error('Error updating delivery status:', err);
            setError('Failed to update delivery status. Please try again.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Fetch delivery on mount if ID is provided
    useEffect(() => {
        if (id) {
            fetchDelivery(id);
        }
    }, [id]);

    return {
        delivery,
        loading,
        error,
        fetchDelivery,
        createDelivery,
        updateDeliveryStatus,
    };
}