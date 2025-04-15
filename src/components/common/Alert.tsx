import React from 'react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
    children: React.ReactNode;
    variant?: AlertVariant;
    title?: string;
    icon?: React.ReactNode;
    onClose?: () => void;
    className?: string;
}

const Alert: React.FC<AlertProps> = ({
                                         children,
                                         variant = 'info',
                                         title,
                                         icon,
                                         onClose,
                                         className = '',
                                     }) => {
    // Variants
    const variantClasses = {
        info: 'bg-primary/10 text-primary border-primary/20',
        success: 'bg-success/10 text-success border-success/20',
        warning: 'bg-warning/10 text-warning border-warning/20',
        error: 'bg-danger/10 text-danger border-danger/20',
    };

    return (
        <div
            className={`
        rounded-md border p-4
        ${variantClasses[variant]}
        ${className}
      `}
            role="alert"
        >
            <div className="flex">
                {icon && <div className="flex-shrink-0 mr-3">{icon}</div>}
                <div className="flex-1">
                    {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
                    <div className="text-sm">{children}</div>
                </div>
                {onClose && (
                    <button
                        type="button"
                        className="ml-auto -mx-1.5 -my-1.5 rounded-md p-1.5 inline-flex focus:outline-none focus:ring-2 focus:ring-offset-2"
                        onClick={onClose}
                        aria-label="Dismiss"
                    >
                        <span className="sr-only">Dismiss</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Alert;