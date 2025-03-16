import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

export const UploadIcon: React.FC<IconProps> = ({ size = 24, className = "", ...props }) => {
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
            <path d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' />
        </svg>
    );
};

export default UploadIcon;
