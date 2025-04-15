import React, { SelectHTMLAttributes } from 'react';

interface Option {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: Option[];
    error?: string;
    helpText?: string;
    fullWidth?: boolean;
}

const Select: React.FC<SelectProps> = ({
                                           label,
                                           options,
                                           error,
                                           helpText,
                                           fullWidth = true,
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
                <select
                    className={`
            w-full px-4 py-3 rounded-md border appearance-none
            ${error ? 'border-danger focus:ring-danger' : 'border-neutral-300 focus:ring-primary'}
            focus:outline-none focus:ring-2 focus:border-transparent transition-all
            ${className}
          `}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            {error && <p className="mt-1 text-sm text-danger">{error}</p>}
            {helpText && !error && <p className="mt-1 text-sm text-neutral-500">{helpText}</p>}
        </div>
    );
};

export default Select;