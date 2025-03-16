import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

export const ErrorIcon: React.FC<IconProps> = ({ size = 20, className = "", ...props }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={size}
            height={size}
            viewBox='0 0 20 20'
            fill='currentColor'
            className={`${className}`}
            {...props}
        >
            <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                clipRule='evenodd'
            />
        </svg>
    );
};

export default ErrorIcon;
