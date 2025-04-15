import { useState, useEffect, useCallback } from 'react';
import { socketService } from '../services/socket';

interface LocationTrackingOptions {
    deliveryId: string;
    isDriver?: boolean;
    locationUpdateFrequency?: number; // in milliseconds
    batterySavingMode?: boolean;
}

interface LocationData {
    lat: number;
    lng: number;
    timestamp: string;
    accuracy?: number;
    speed?: number;
}

export function useLocationTracking({
                                        deliveryId,
                                        isDriver = false,
                                        locationUpdateFrequency = 15000, // 15 seconds by default
                                        batterySavingMode = false,
                                    }: LocationTrackingOptions) {
    const [isTracking, setIsTracking] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [watchId, setWatchId] = useState<number | null>(null);

    // Start tracking
    const startTracking = useCallback(async () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return false;
        }

        try {
            // For driver: connect to socket and start sending updates
            if (isDriver) {
                const connected = await socketService.connect(deliveryId);
                if (!connected) {
                    setError('Failed to connect to tracking server');
                    return false;
                }

                // Get initial position
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const locationData: LocationData = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            timestamp: new Date().toISOString(),
                            accuracy: position.coords.accuracy,
                            speed: position.coords.speed || undefined,
                        };

                        setCurrentLocation(locationData);
                        socketService.sendLocationUpdate(locationData);
                    },
                    (error) => {
                        handleGeolocationError(error);
                        return false;
                    },
                    {
                        enableHighAccuracy: !batterySavingMode,
                    }
                );

                // Set up watch position for continuous tracking
                const id = navigator.geolocation.watchPosition(
                    (position) => {
                        const locationData: LocationData = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            timestamp: new Date().toISOString(),
                            accuracy: position.coords.accuracy,
                            speed: position.coords.speed || undefined,
                        };

                        setCurrentLocation(locationData);
                        socketService.sendLocationUpdate(locationData);
                    },
                    (error) => {
                        handleGeolocationError(error);
                    },
                    {
                        enableHighAccuracy: !batterySavingMode,
                        maximumAge: batterySavingMode ? 60000 : 30000, // 1 minute for battery saving, 30 seconds otherwise
                        timeout: 30000, // 30 seconds timeout
                    }
                );

                setWatchId(id);
                setIsTracking(true);
                setError(null);
                return true;
            }
            // For customer: subscribe to location updates
            else {
                const subscribed = await socketService.subscribeToLocationUpdates(
                    deliveryId,
                    (location) => {
                        setCurrentLocation(location);
                    }
                );

                if (!subscribed) {
                    setError('Failed to subscribe to location updates');
                    return false;
                }

                setIsTracking(true);
                setError(null);
                return true;
            }
        } catch (err) {
            console.error('Error starting tracking:', err);
            setError('An unexpected error occurred while starting tracking');
            return false;
        }
    }, [deliveryId, isDriver, batterySavingMode]);

    // Stop tracking
    const stopTracking = useCallback(() => {
        if (watchId !== null && isDriver) {
            navigator.geolocation.clearWatch(watchId);
            setWatchId(null);
        }

        socketService.disconnect();
        setIsTracking(false);

        return true;
    }, [watchId, isDriver]);

    // Handle geolocation errors
    const handleGeolocationError = (error: GeolocationPositionError) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setError('Location permission denied. Please enable location access to continue.');
                break;
            case error.POSITION_UNAVAILABLE:
                setError('Location information is unavailable.');
                break;
            case error.TIMEOUT:
                setError('The request to get your location timed out.');
                break;
            default:
                setError('An unknown error occurred while getting your location.');
                break;
        }

        setIsTracking(false);
    };

    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (watchId !== null) {
                navigator.geolocation.clearWatch(watchId);
            }
            socketService.disconnect();
        };
    }, [watchId]);

    return {
        isTracking,
        currentLocation,
        error,
        startTracking,
        stopTracking,
    };
}