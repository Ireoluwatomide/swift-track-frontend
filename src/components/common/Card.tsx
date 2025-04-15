import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    padding?: 'none' | 'sm' | 'md' | 'lg';
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    border?: boolean;
    fullWidth?: boolean;
}

const Card: React.FC<CardProps> = ({
                                       children,
                                       padding = 'md',
                                       shadow = 'md',
                                       border = false,
                                       fullWidth = true,
                                       className = '',
                                       ...props
                                   }) => {
    // Padding
    const paddingClasses = {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4 md:p-6',
        lg: 'p-6 md:p-8',
    };

    // Shadow
    const shadowClasses = {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow',
        lg: 'shadow-lg',
    };

    return (
        <div
            className={`
        bg-white rounded-md 
        ${paddingClasses[padding]}
        ${shadowClasses[shadow]}
        ${border ? 'border border-neutral-200' : ''}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;