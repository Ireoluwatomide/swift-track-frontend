// src/components/common/Toast.tsx
import React, { useEffect } from 'react';

type ToastVariant = 'info' | 'success' | 'warning' | 'error';

interface ToastProps {
    message: string;
    variant?: ToastVariant;
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const Toast: React.FC<ToastProps> = ({
                                         message,
                                         variant = 'info',
                                         isVisible,
                                         onClose,
                                         duration = 3000,
                                         position = 'top-right',
                                     }) => {
    // Auto-close after duration
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    // Variants
    const variantClasses = {
        info: 'bg-primary text-white',
        success: 'bg-success text-white',
        warning: 'bg-warning text-white',
        error: 'bg-danger text-white',
    };

    // Position
    const positionClasses = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
    };

    if (!isVisible) return null;

    return (
        <div
            className={`
        fixed z-50 max-w-md px-4 py-3 rounded-md shadow-lg
        ${variantClasses[variant]}
        ${positionClasses[position]}
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}
            role="alert"
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">{message}</div>
                <button
                    onClick={onClose}
                    className="ml-4 text-white hover:text-white/80 focus:outline-none"
                    aria-label="Close"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Toast;