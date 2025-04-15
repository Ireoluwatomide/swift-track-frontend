import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TrackingLayout from '../layouts/TrackingLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import OTPInput from '../components/common/OTPInput';
import { DeliveryMap } from '../components/vendor/DeliveryMap';
import ProgressBar from '../components/common/ProgressBar';

// Mock data interface
interface DeliveryData {
    id: string;
    customer: {
        name: string;
        phone: string;
    };
    package: {
        description: string;
        notes?: string;
    };
    destination?: {
        address: string;
        lat: number;
        lng: number;
    };
}

const DriverTracking: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // States
    const [isVerifying, setIsVerifying] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isTracking, setIsTracking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [otpValue, setOtpValue] = useState('');
    const [deliveryData, setDeliveryData] = useState<DeliveryData | null>(null);
    const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
    const [batteryStatus, setBatteryStatus] = useState<'charging' | 'discharging' | null>(null);

    // Verify OTP
    const verifyOTP = () => {
        if (otpValue.length !== 6) {
            setError('Please enter all 6 digits');
            return;
        }

        setIsLoading(true);

        // Simulate API call to verify OTP
        setTimeout(() => {
            // For demo purposes, any 6-digit code works
            if (otpValue.length === 6) {
                setIsVerifying(false);
                setError(null);

                // Mock delivery data
                setDeliveryData({
                    id: id || 'DEL-0000',
                    customer: {
                        name: 'John Doe',
                        phone: '+234 800 123 4567',
                    },
                    package: {
                        description: 'Clothing items (2kg)',
                        notes: 'Please call the customer before arriving',
                    },
                    destination: {
                        address: '123 Ikorodu Road, Lagos',
                        lat: 6.5244,
                        lng: 3.3792,
                    },
                });
            } else {
                setError('Invalid OTP, please try again');
            }

            setIsLoading(false);
        }, 1500);
    };

    // Start tracking
    const startTracking = () => {
        // Check for geolocation support
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        setIsTracking(true);
        setError(null);

        // First get the current position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                setIsTracking(false);
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
            },
            {
                enableHighAccuracy: true,
            }
        );
    };

    // Stop tracking
    const stopTracking = () => {
        setIsTracking(false);
    };

    // Get battery status if available
    useEffect(() => {
        const getBatteryInfo = async () => {
            if ('getBattery' in navigator) {
                try {
                    // @ts-ignore - getBattery is not in the standard Navigator type
                    const battery = await navigator.getBattery();

                    setBatteryLevel(battery.level * 100);
                    setBatteryStatus(battery.charging ? 'charging' : 'discharging');

                    // Add event listeners for battery changes
                    battery.addEventListener('levelchange', () => {
                        setBatteryLevel(battery.level * 100);
                    });

                    battery.addEventListener('chargingchange', () => {
                        setBatteryStatus(battery.charging ? 'charging' : 'discharging');
                    });
                } catch (error) {
                    console.error('Error getting battery status:', error);
                }
            }
        };

        getBatteryInfo();
    }, []);

    // Setup location tracking with WebSocket
    useEffect(() => {
        let watchId: number;

        if (isTracking) {
            // Watch position changes
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const newLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    setCurrentLocation(newLocation);

                    // This is where you would send the location update to your WebSocket server
                    // For demo purposes, we're just updating the state
                    console.log('Location update:', newLocation);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    // Only show error if we're still trying to track
                    if (isTracking) {
                        setError('Error tracking location. Please check your GPS signal.');
                    }
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 10000, // Accept positions that are up to 10 seconds old
                    timeout: 30000, // Wait up to 30 seconds for a position
                }
            );
        }

        // Cleanup
        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, [isTracking]);

    // Handle delivery completion
    const completeDelivery = () => {
        setIsLoading(true);

        // Simulate API call to mark delivery as complete
        setTimeout(() => {
            setIsTracking(false);
            navigate(`/driver/complete/${id}`);
        }, 1500);
    };

    return (
        <TrackingLayout mode="driver" deliveryId={id}>
            <div className="container mx-auto px-4 py-6">
                {isVerifying ? (
                    // OTP Verification Screen
                    <Card className="max-w-md mx-auto">
                        <div className="text-center">
                            <h1 className="text-xl font-heading font-bold text-neutral-900 mb-2">
                                Verify Your Identity
                            </h1>
                            <p className="text-neutral-600 mb-6">
                                Enter the 6-digit OTP sent to your phone to start the delivery tracking.
                            </p>

                            <OTPInput
                                length={6}
                                value={otpValue}
                                onChange={setOtpValue}
                                error={error || undefined}
                                disabled={isLoading}
                            />

                            <div className="mt-6">
                                <Button
                                    variant="primary"
                                    onClick={verifyOTP}
                                    isLoading={isLoading}
                                    fullWidth
                                >
                                    Verify OTP
                                </Button>
                            </div>

                            <p className="mt-4 text-sm text-neutral-500">
                                Didn't receive the code?{' '}
                                <button
                                    className="text-primary font-medium hover:text-primary-dark"
                                    onClick={() => {
                                        // Simulate resending OTP
                                        setError('New OTP has been sent to your phone');
                                    }}
                                >
                                    Resend OTP
                                </button>
                            </p>
                        </div>
                    </Card>
                ) : (
                    // Driver Tracking Screen
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Delivery Info Column */}
                        <div className="lg:col-span-1">
                            <Card className="mb-6">
                                <h2 className="text-lg font-heading font-semibold text-neutral-900 mb-4">
                                    Delivery Information
                                </h2>

                                <div className="space-y-4">
                                    {/* Customer Info */}
                                    <div>
                                        <h3 className="text-sm font-medium text-neutral-500 mb-1">
                                            Customer
                                        </h3>
                                        <p className="font-medium">{deliveryData?.customer.name}</p>
                                        <a
                                            href={`tel:${deliveryData?.customer.phone}`}
                                            className="text-primary hover:text-primary-dark text-sm"
                                        >
                                            {deliveryData?.customer.phone}
                                        </a>
                                    </div>

                                    {/* Package Info */}
                                    <div>
                                        <h3 className="text-sm font-medium text-neutral-500 mb-1">
                                            Package
                                        </h3>
                                        <p>{deliveryData?.package.description}</p>
                                    </div>

                                    {/* Delivery Notes */}
                                    {deliveryData?.package.notes && (
                                        <div>
                                            <h3 className="text-sm font-medium text-neutral-500 mb-1">
                                                Notes
                                            </h3>
                                            <p className="bg-neutral-50 p-3 rounded-md text-sm">
                                                {deliveryData.package.notes}
                                            </p>
                                        </div>
                                    )}

                                    {/* Destination */}
                                    {deliveryData?.destination && (
                                        <div>
                                            <h3 className="text-sm font-medium text-neutral-500 mb-1">
                                                Destination
                                            </h3>
                                            <p>{deliveryData.destination.address}</p>
                                        </div>
                                    )}
                                </div>
                            </Card>

                            {/* Tracking Controls */}
                            <Card>
                                <h2 className="text-lg font-heading font-semibold text-neutral-900 mb-4">
                                    Tracking Controls
                                </h2>

                                {error && (
                                    <Alert
                                        variant="error"
                                        title="Location Error"
                                        className="mb-4"
                                        onClose={() => setError(null)}
                                    >
                                        {error}
                                    </Alert>
                                )}

                                {/* Battery Status */}
                                {batteryLevel !== null && (
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm text-neutral-600">Battery Level</span>
                                            <span className="text-sm font-medium">
                        {Math.round(batteryLevel)}%
                                                {batteryStatus === 'charging' && (
                                                    <span className="ml-1 text-success">⚡</span>
                                                )}
                      </span>
                                        </div>
                                        <ProgressBar
                                            progress={batteryLevel}
                                            variant={
                                                batteryLevel > 50
                                                    ? 'success'
                                                    : batteryLevel > 20
                                                        ? 'warning'
                                                        : 'danger'
                                            }
                                        />
                                    </div>
                                )}

                                {/* Tracking Status */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-neutral-600">Tracking Status</span>
                                        <span
                                            className={`text-sm font-medium ${
                                                isTracking ? 'text-success' : 'text-neutral-500'
                                            }`}
                                        >
                      {isTracking ? 'Active' : 'Inactive'}
                    </span>
                                    </div>
                                    {isTracking && currentLocation && (
                                        <div className="text-xs text-neutral-500 mt-1">
                                            Lat: {currentLocation.lat.toFixed(6)}, Lng: {currentLocation.lng.toFixed(6)}
                                        </div>
                                    )}
                                </div>

                                {/* Control Buttons */}
                                <div className="space-y-3">
                                    {isTracking ? (
                                        <>
                                            <Button
                                                variant="danger"
                                                fullWidth
                                                onClick={stopTracking}
                                            >
                                                Stop Tracking
                                            </Button>
                                            <Button
                                                variant="success"
                                                fullWidth
                                                onClick={completeDelivery}
                                                isLoading={isLoading}
                                            >
                                                Complete Delivery
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            variant="primary"
                                            fullWidth
                                            onClick={startTracking}
                                        >
                                            Start Tracking
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        </div>

                        {/* Map Column */}
                        <div className="lg:col-span-2">
                            <Card className="h-full">
                                <h2 className="text-lg font-heading font-semibold text-neutral-900 mb-4">
                                    Live Location
                                </h2>

                                {currentLocation ? (
                                    <DeliveryMap
                                        currentLocation={currentLocation}
                                        destinationLocation={deliveryData?.destination}
                                        height="600px"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-96 bg-neutral-50 rounded-md">
                                        <div className="text-center">
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
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                ></path>
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                ></path>
                                            </svg>
                                            <h3 className="mt-2 text-sm font-medium text-neutral-900">
                                                Location tracking not started
                                            </h3>
                                            <p className="mt-1 text-sm text-neutral-500">
                                                Press "Start Tracking" to begin sharing your location.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </TrackingLayout>
    );
};

export default DriverTracking;