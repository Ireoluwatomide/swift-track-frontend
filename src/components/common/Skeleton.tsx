import React from 'react';

interface SkeletonProps {
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string;
    height?: string;
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
                                               variant = 'text',
                                               width,
                                               height,
                                               className = '',
                                           }) => {
    const baseClasses = 'animate-pulse bg-neutral-200';

    const variantClasses = {
        text: 'rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-md',
    };

    const style: React.CSSProperties = {
        width: width,
        height: height,
    };

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            style={style}
        />
    );
};

export default Skeleton;