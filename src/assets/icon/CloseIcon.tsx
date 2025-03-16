import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

export const CloseIcon: React.FC<IconProps> = ({ size = 16, className = "", ...props }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={size}
            height={size}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
            className={`${className}`}
            {...props}
        >
            <path d='M6 18L18 6M6 6l12 12' />
        </svg>
    );
};

export default CloseIcon;
