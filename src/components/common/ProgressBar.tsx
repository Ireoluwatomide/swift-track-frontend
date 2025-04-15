import React from 'react';

interface ProgressBarProps {
    progress: number;
    variant?: 'primary' | 'success' | 'warning' | 'danger';
    height?: 'sm' | 'md' | 'lg';
    showPercentage?: boolean;
    className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
                                                     progress,
                                                     variant = 'primary',
                                                     height = 'md',
                                                     showPercentage = false,
                                                     className = '',
                                                 }) => {
    // Ensure progress is between 0 and 100
    const safeProgress = Math.min(Math.max(progress, 0), 100);

    // Variants
    const variantClasses = {
        primary: 'bg-primary',
        success: 'bg-success',
        warning: 'bg-warning',
        danger: 'bg-danger',
    };

    // Heights
    const heightClasses = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-4',
    };

    return (
        <div className={`w-full ${className}`}>
            <div className="flex justify-between items-center mb-1">
                {showPercentage && (
                    <span className="text-sm font-medium text-neutral-700">{safeProgress}%</span>
                )}
            </div>
            <div className={`w-full bg-neutral-200 rounded-full ${heightClasses[height]}`}>
                <div
                    className={`${variantClasses[variant]} rounded-full ${heightClasses[height]} transition-all duration-300 ease-in-out`}
                    style={{ width: `${safeProgress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;