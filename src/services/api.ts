// src/services/api.ts
import axios from 'axios';

// In a real application, this would come from environment variables
const API_URL = 'https://api.whatsapp-tracker.com';

// Create axios instance with base URL and default headers
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// For demo purposes, we'll simulate API responses
// In a real application, this would communicate with a real backend
const simulateResponse = (data: any, delay = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), delay);
    });
};

// Interface for delivery creation request
interface CreateDeliveryRequest {
    customerName: string;
    customerPhone: string;
    driverName: string;
    driverPhone: string;
    packageInfo: string;
    deliveryNotes?: string;
}

// Interface for delivery response
interface DeliveryResponse {
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

// Delivery API service
export const deliveryService = {
    // Create a new delivery
    createDelivery: async (data: CreateDeliveryRequest): Promise<DeliveryResponse> => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.post('/deliveries', data);
            // return response.data;

            // Simulate API response
            const deliveryId = `DEL-${Math.floor(1000 + Math.random() * 9000)}`;

            return simulateResponse({
                id: deliveryId,
                customer: {
                    name: data.customerName,
                    phone: data.customerPhone,
                },
                driver: {
                    name: data.driverName,
                    phone: data.driverPhone,
                },
                package: {
                    description: data.packageInfo,
                    notes: data.deliveryNotes,
                },
                tracking: {
                    createdAt: new Date().toISOString(),
                },
                status: 'pending',
            }) as Promise<DeliveryResponse>;
        } catch (error) {
            console.error('Error creating delivery:', error);
            throw error;
        }
    },

    // Get delivery by ID
    getDelivery: async (id: string): Promise<DeliveryResponse> => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.get(`/deliveries/${id}`);
            // return response.data;

            // Simulate API response
            return simulateResponse({
                id,
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
                    destination: {
                        lat: 6.5350,
                        lng: 3.3892,
                        address: '123 Ikorodu Road, Lagos',
                    },
                    eta: new Date(Date.now() + 20 * 60 * 1000).toISOString(), // 20 minutes from now
                },
                status: 'in-progress',
            }) as Promise<DeliveryResponse>;
        } catch (error) {
            console.error('Error getting delivery:', error);
            throw error;
        }
    },

    // Get all deliveries
    getDeliveries: async (): Promise<DeliveryResponse[]> => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.get('/deliveries');
            // return response.data;

            // Simulate API response
            return simulateResponse([
                {
                    id: 'DEL-1001',
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
                        createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
                        startedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
                        eta: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
                    },
                    status: 'in-progress',
                },
                {
                    id: 'DEL-1002',
                    customer: {
                        name: 'Jane Smith',
                        phone: '+234 800 234 5678',
                    },
                    driver: {
                        name: 'Robert Johnson',
                        phone: '+234 800 876 5432',
                    },
                    package: {
                        description: 'Electronics (1kg)',
                    },
                    tracking: {
                        createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
                        startedAt: new Date(Date.now() - 100 * 60 * 1000).toISOString(),
                        completedAt: new Date(Date.now() - 70 * 60 * 1000).toISOString(),
                    },
                    status: 'completed',
                },
                // Add more mock deliveries as needed
            ]) as Promise<DeliveryResponse[]>;
        } catch (error) {
            console.error('Error getting deliveries:', error);
            throw error;
        }
    },

    // Update delivery status
    updateDeliveryStatus: async (id: string, status: string): Promise<DeliveryResponse> => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.patch(`/deliveries/${id}`, { status });
            // return response.data;

            // Simulate API response
            return simulateResponse({
                id,
                status,
                tracking: {
                    completedAt: status === 'completed' ? new Date().toISOString() : undefined,
                },
            }) as Promise<DeliveryResponse>;
        } catch (error) {
            console.error('Error updating delivery status:', error);
            throw error;
        }
    },

    // Verify OTP
    verifyOTP: async (id: string, otp: string): Promise<{ success: boolean; message: string }> => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.post(`/auth/verify-otp`, { id, otp });
            // return response.data;

            // Simulate API response - in a real app, this would verify the OTP
            // For demo, we'll accept any 6-digit OTP
            const isValid = otp.length === 6;

            return simulateResponse({
                success: isValid,
                message: isValid
                    ? 'OTP verification successful'
                    : 'Invalid OTP, please try again',
            }) as Promise<{ success: boolean; message: string }>;
        } catch (error) {
            console.error('Error verifying OTP:', error);
            throw error;
        }
    },
};

