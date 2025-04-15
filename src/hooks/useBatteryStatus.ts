mport { useState, useEffect } from 'react';

interface BatteryStatus {
    level: number; // 0 to 1
    charging: boolean;
    chargingTime: number; // seconds
    dischargingTime: number; // seconds
}

export function useBatteryStatus() {
    const [batteryStatus, setBatteryStatus] = useState<BatteryStatus | null>(null);
    const [isSupported, setIsSupported] = useState<boolean>(true);

    useEffect(() => {
        // Check if Battery API is supported
        if (!('getBattery' in navigator)) {
            setIsSupported(false);
            return;
        }

        // Get initial battery status
        const getBatteryInfo = async () => {
            try {
                // @ts-ignore - getBattery is not in the standard Navigator type
                const battery = await navigator.getBattery();

                // Update state with current battery info
                setBatteryStatus({
                    level: battery.level,
                    charging: battery.charging,
                    chargingTime: battery.chargingTime,
                    dischargingTime: battery.dischargingTime,
                });

                // Add event listeners for battery changes
                battery.addEventListener('levelchange', () => {
                    setBatteryStatus((prevStatus) =>
                        prevStatus ? { ...prevStatus, level: battery.level } : null
                    );
                });

                battery.addEventListener('chargingchange', () => {
                    setBatteryStatus((prevStatus) =>
                        prevStatus ? { ...prevStatus, charging: battery.charging } : null
                    );
                });

                battery.addEventListener('chargingtimechange', () => {
                    setBatteryStatus((prevStatus) =>
                        prevStatus ? { ...prevStatus, chargingTime: battery.chargingTime } : null
                    );
                });

                battery.addEventListener('dischargingtimechange', () => {
                    setBatteryStatus((prevStatus) =>
                        prevStatus ? { ...prevStatus, dischargingTime: battery.dischargingTime } : null
                    );
                });
            } catch (error) {
                console.error('Error getting battery status:', error);
                setIsSupported(false);
            }
        };

        getBatteryInfo();
    }, []);

    // Helper to get battery percentage
    const getBatteryPercentage = () => {
        return batteryStatus ? Math.round(batteryStatus.level * 100) : null;
    };

    return {
        batteryStatus,
        isSupported,
        getBatteryPercentage,
    };
}
