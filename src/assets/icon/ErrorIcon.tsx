import React from "react";

import { IconProps } from "./types";

export const ErrorIcon: React.FC<IconProps> = ({ size = 20, className = "", ...props }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={size}
            height={size}
            viewBox='0 0 20 20'
            fill='#ef4444'
            className={className}
            {...props}
        >
            <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z'
                clipRule='evenodd'
            />
        </svg>
    );
};

export default ErrorIcon;
