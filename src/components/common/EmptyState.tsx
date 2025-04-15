// src/components/common/EmptyState.tsx
import React from 'react';
import Button from './Button';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    actionText?: string;
    onAction?: () => void;
    className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
                                                   icon,
                                                   title,
                                                   description,
                                                   actionText,
                                                   onAction,
                                                   className = '',
                                               }) => {
    return (
        <div className={`text-center p-8 ${className}`}>
            {icon && <div className="mx-auto mb-4">{icon}</div>}
            <h3 className="text-lg font-medium text-neutral-900 mb-2">{title}</h3>
            {description && <p className="text-sm text-neutral-600 mb-6">{description}</p>}
            {actionText && onAction && (
                <Button variant="primary" onClick={onAction}>
                    {actionText}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;