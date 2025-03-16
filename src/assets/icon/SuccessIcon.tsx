import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

export const SuccessIcon: React.FC<IconProps> = ({ size = 20, className = "", ...props }) => {
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
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                clipRule='evenodd'
            />
        </svg>
    );
};

export default SuccessIcon;
