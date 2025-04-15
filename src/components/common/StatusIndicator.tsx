// src/components/common/StatusIndicator.tsx
import React from 'react';

type StatusType = 'pending' | 'in-progress' | 'completed' | 'failed';

interface StatusIndicatorProps {
    status: StatusType;
    withText?: boolean;
    className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
                                                             status,
                                                             withText = true,
                                                             className = '',
                                                         }) => {
    // Status configuration
    const statusConfig = {
        'pending': {
            color: 'bg-warning',
            text: 'Pending',
        },
        'in-progress': {
            color: 'bg-primary',
            text: 'In Progress',
        },
        'completed': {
            color: 'bg-success',
            text: 'Completed',
        },
        'failed': {
            color: 'bg-danger',
            text: 'Failed',
        },
    };

    const config = statusConfig[status];

    return (
        <div className={`flex items-center ${className}`}>
            <div className={`h-2.5 w-2.5 rounded-full ${config.color} mr-2`}></div>
            {withText && <span className="text-sm">{config.text}</span>}
        </div>
    );
};

export default StatusIndicator;