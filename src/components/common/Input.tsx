import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helpText?: string;
    fullWidth?: boolean;
    icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
                                         label,
                                         error,
                                         helpText,
                                         fullWidth = true,
                                         icon,
                                         className = '',
                                         ...props
                                     }) => {
    return (
        <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
            {label && (
                <label htmlFor={props.id} className="block text-sm font-medium text-neutral-700 mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    className={`
            w-full px-4 py-3 rounded-md border 
            ${error ? 'border-danger focus:ring-danger' : 'border-neutral-300 focus:ring-primary'}
            focus:outline-none focus:ring-2 focus:border-transparent transition-all
            ${icon ? 'pl-10' : ''}
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-sm text-danger">{error}</p>}
            {helpText && !error && <p className="mt-1 text-sm text-neutral-500">{helpText}</p>}
        </div>
    );
};

export default Input;