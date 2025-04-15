import React, { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helpText?: string;
    fullWidth?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
                                               label,
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
            <textarea
                className={`
          w-full px-4 py-3 rounded-md border 
          ${error ? 'border-danger focus:ring-danger' : 'border-neutral-300 focus:ring-primary'}
          focus:outline-none focus:ring-2 focus:border-transparent transition-all
          ${className}
        `}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-danger">{error}</p>}
            {helpText && !error && <p className="mt-1 text-sm text-neutral-500">{helpText}</p>}
        </div>
    );
};

export default TextArea;