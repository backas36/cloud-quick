import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

export const DocumentIcon: React.FC<IconProps> = ({ size = 16, className = "", ...props }) => {
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
            <path d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
        </svg>
    );
};

export default DocumentIcon;
