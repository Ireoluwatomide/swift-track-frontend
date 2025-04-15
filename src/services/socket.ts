// src/services/socket.ts
import { io, Socket } from 'socket.io-client';

// In a real application, this would come from environment variables
const SOCKET_URL = 'https://api.whatsapp-tracker.com';

// Interface for location update
interface LocationUpdate {
    deliveryId: string;
    location: {
        lat: number;
        lng: number;
        timestamp: string;
        accuracy?: number;
        speed?: number;
    };
}

class SocketService {
    private socket: Socket | null = null;
    private isConnected = false;
    private deliveryId: string | null = null;

    // Connect to socket server with delivery ID
    connect(deliveryId: string): Promise<boolean> {
        return new Promise((resolve) => {
            this.deliveryId = deliveryId;

            // In a real app, this would connect to a real socket server
            // this.socket = io(`${SOCKET_URL}?deliveryId=${deliveryId}`);

            // For demo purposes, we'll simulate a connection
            console.log(`Socket connecting for delivery ${deliveryId}...`);

            // Simulate connection success
            setTimeout(() => {
                this.isConnected = true;
                console.log(`Socket connected for delivery ${deliveryId}`);
                resolve(true);
            }, 1000);
        });
    }

    // Disconnect from socket server
    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }

        this.isConnected = false;
        this.deliveryId = null;
        console.log('Socket disconnected');
    }

    // Send location update
    sendLocationUpdate(location: { lat: number; lng: number }): Promise<boolean> {
        return new Promise((resolve) => {
            if (!this.isConnected || !this.deliveryId) {
                console.error('Socket not connected or delivery ID not set');
                resolve(false);
                return;
            }

            const update: LocationUpdate = {
                deliveryId: this.deliveryId,
                location: {
                    ...location,
                    timestamp: new Date().toISOString(),
                },
            };

            // In a real app, this would send the update to the socket server
            // this.socket.emit('location-update', update);

            // For demo purposes, we'll just log it
            console.log('Sending location update:', update);

            // Simulate sending success
            setTimeout(() => {
                resolve(true);
            }, 300);
        });
    }

    // Subscribe to location updates (for customers)
    subscribeToLocationUpdates(deliveryId: string, callback: (location: LocationUpdate['location']) => void): Promise<boolean> {
        return new Promise((resolve) => {
            this.deliveryId = deliveryId;

            // In a real app, this would subscribe to a real socket server
            // this.socket = io(`${SOCKET_URL}?deliveryId=${deliveryId}`);
            // this.socket.on('location-update', (data: LocationUpdate) => {
            //   callback(data.location);
            // });

            // For demo purposes, we'll simulate updates
            console.log(`Subscribing to location updates for delivery ${deliveryId}...`);

            // Simulate connection success
            setTimeout(() => {
                this.isConnected = true;
                console.log(`Subscribed to location updates for delivery ${deliveryId}`);

                // Simulate periodic location updates
                const interval = setInterval(() => {
                    if (!this.isConnected) {
                        clearInterval(interval);
                        return;
                    }

                    // Generate a small random movement
                    const lat = 6.5244 + (Math.random() - 0.5) * 0.005;
                    const lng = 3.3792 + (Math.random() - 0.5) * 0.005;

                    callback({
                        lat,
                        lng,
                        timestamp: new Date().toISOString(),
                        accuracy: 10,
                        speed: 15, // km/h
                    });
                }, 5000);

                resolve(true);
            }, 1000);
        });
    }

    // Check if socket is connected
    isSocketConnected(): boolean {
        return this.isConnected;
    }
}

export const socketService = new SocketService();