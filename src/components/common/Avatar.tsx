import React from 'react';

interface AvatarProps {
    src?: string;
    alt?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    name?: string;
    bgColor?: string;
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
                                           src,
                                           alt = 'avatar',
                                           size = 'md',
                                           name,
                                           bgColor = 'bg-primary',
                                           className = '',
                                       }) => {
    // Sizes
    const sizeClasses = {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
    };

    // Get initials from name
    const getInitials = (name: string): string => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div
            className={`
        rounded-full overflow-hidden flex items-center justify-center
        ${sizeClasses[size]}
        ${className}
      `}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover"
                />
            ) : name ? (
                <div className={`h-full w-full flex items-center justify-center text-white ${bgColor}`}>
                    {getInitials(name)}
                </div>
            ) : (
                <div className="h-full w-full bg-neutral-200 flex items-center justify-center text-neutral-500">
                    <svg className="h-3/4 w-3/4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default Avatar;