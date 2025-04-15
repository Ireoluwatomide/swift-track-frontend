import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    rounded?: boolean;
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
                                         children,
                                         variant = 'default',
                                         size = 'md',
                                         rounded = false,
                                         className = '',
                                     }) => {
    // Variants
    const variantClasses = {
        default: 'bg-neutral-100 text-neutral-800',
        primary: 'bg-primary/10 text-primary',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        danger: 'bg-danger/10 text-danger',
    };

    // Sizes
    const sizeClasses = {
        sm: 'px-1.5 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
    };

    return (
        <span
            className={`
        inline-block font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${rounded ? 'rounded-full' : 'rounded'}
        ${className}
      `}
        >
      {children}
    </span>
    );
};

export default Badge;