import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icon issue
// In a real app, you would use proper assets
const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface DeliveryMapProps {
    currentLocation: {
        lat: number;
        lng: number;
    };
    destinationLocation?: {
        lat: number;
        lng: number;
    };
    height?: string;
}

export const DeliveryMap: React.FC<DeliveryMapProps> = ({
                                                            currentLocation,
                                                            destinationLocation,
                                                            height = '400px',
                                                        }) => {
    // Default zoom level
    const zoom = 13;

    // Default center on current location
    const center = [currentLocation.lat, currentLocation.lng];

    return (
        <div style={{ height, width: '100%' }}>
            <MapContainer
                center={[center[0], center[1]]}
                zoom={zoom}
                style={{ height: '100%', width: '100%', borderRadius: '8px' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Current Location Marker */}
                <Marker
                    position={[currentLocation.lat, currentLocation.lng]}
                    icon={defaultIcon}
                >
                    <Popup>
                        Current driver location
                    </Popup>
                </Marker>

                {/* Destination Marker (if provided) */}
                {destinationLocation && (
                    <Marker
                        position={[destinationLocation.lat, destinationLocation.lng]}
                        icon={defaultIcon}
                    >
                        <Popup>
                            Delivery destination
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

// Fix for Leaflet's default icon
// Add this to a useEffect in your main component when you implement the map
// or in a global stylesheet
/*
useEffect(() => {
  // Fix Leaflet's default icon
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
}, []);
*/