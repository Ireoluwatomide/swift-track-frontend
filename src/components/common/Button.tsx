import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           variant = 'primary',
                                           size = 'md',
                                           isLoading = false,
                                           fullWidth = false,
                                           icon,
                                           className = '',
                                           disabled,
                                           ...props
                                       }) => {
    // Variants
    const variantClasses = {
        primary: 'bg-primary text-white hover:bg-primary-dark',
        secondary: 'bg-white text-primary border border-primary hover:bg-neutral-50',
        success: 'bg-success text-white hover:bg-success/90',
        danger: 'bg-danger text-white hover:bg-danger/90',
        outline: 'bg-transparent text-neutral-700 border border-neutral-300 hover:bg-neutral-50',
    };

    // Sizes
    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3',
        lg: 'px-6 py-4 text-lg',
    };

    return (
        <button
            className={`
        rounded font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary/50
        active:scale-[0.98] flex items-center justify-center
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || isLoading ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
      `}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {icon && !isLoading && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;