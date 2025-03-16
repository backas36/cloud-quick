import { useTheme } from "next-themes";
import { ExternalToast, toast as sonnerToast, Toaster as Sonner, ToasterProps } from "sonner";

import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "@/assets/icon";

// 定義通用樣式類型
type ToastStylePreset = Partial<ExternalToast> & {
    style?: React.CSSProperties;
};

// 預設樣式組合 - 簡約黑白日式風格
const toastStyles = {
    // 成功通知樣式
    success: {
        duration: 3000,
        style: {
            backgroundColor: "#ffffff",
            color: "#1a1a1a",
            border: "1px solid #e0e0e0",
            borderRadius: "2px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
            fontFamily: "'Noto Sans JP', sans-serif",
        },
        icon: <SuccessIcon />,
    } as ToastStylePreset,

    // 錯誤通知樣式
    error: {
        duration: 4000,
        style: {
            backgroundColor: "#ffffff",
            color: "#1a1a1a",
            border: "1px solid #e0e0e0",
            borderRadius: "2px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
            fontFamily: "'Noto Sans JP', sans-serif",
        },
        icon: <ErrorIcon />,
    } as ToastStylePreset,

    // 警告通知樣式
    warning: {
        duration: 3500,
        style: {
            backgroundColor: "#ffffff",
            color: "#1a1a1a",
            border: "1px solid #e0e0e0",
            borderRadius: "2px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
            fontFamily: "'Noto Sans JP', sans-serif",
        },
        icon: <WarningIcon />,
    } as ToastStylePreset,

    // 資訊通知樣式
    info: {
        duration: 3000,
        style: {
            backgroundColor: "#ffffff",
            color: "#1a1a1a",
            border: "1px solid #e0e0e0",
            borderRadius: "2px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
            fontFamily: "'Noto Sans JP', sans-serif",
        },
        icon: <InfoIcon />,
    } as ToastStylePreset,

    // 暗色系/中性通知
    neutral: {
        duration: 3000,
        style: {
            backgroundColor: "#ffffff",
            color: "#1a1a1a",
            border: "1px solid #e0e0e0",
            borderRadius: "2px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
            fontFamily: "'Noto Sans JP', sans-serif",
        },
    } as ToastStylePreset,
};

// 為原始 toast 擴展自定義方法
const toast = {
    // 包裝原始函數
    ...sonnerToast,

    // 成功通知
    success: (message: string, data?: ExternalToast) =>
        sonnerToast.success(message, { ...toastStyles.success, ...data }),

    // 錯誤通知
    error: (message: string, data?: ExternalToast) => sonnerToast.error(message, { ...toastStyles.error, ...data }),

    // 警告通知
    warning: (message: string, data?: ExternalToast) => sonnerToast(message, { ...toastStyles.warning, ...data }),

    // 資訊通知
    info: (message: string, data?: ExternalToast) => sonnerToast.info(message, { ...toastStyles.info, ...data }),

    // 中性通知
    neutral: (message: string, data?: ExternalToast) => sonnerToast(message, { ...toastStyles.neutral, ...data }),

    // 使用指定樣式通知
    styled: (message: string, preset: keyof typeof toastStyles, data?: ExternalToast) =>
        sonnerToast(message, { ...toastStyles[preset], ...data }),

    // 自定義通知樣式
    custom: (message: string, customStyle: ToastStylePreset, data?: ExternalToast) =>
        sonnerToast(message, { ...customStyle, ...data }),
};

// 添加全局樣式來確保圖標顏色
const colorStyles = `
    .sonner-toast-success [data-icon] svg {
        color: #22c55e !important;
        fill: #22c55e !important;
    }
    .sonner-toast-error [data-icon] svg {
        color: #ef4444 !important;
        fill: #ef4444 !important;
    }
    .sonner-toast-warning [data-icon] svg {
        color: #eab308 !important;
        fill: #eab308 !important;
    }
    .sonner-toast-info [data-icon] svg {
        color: #3b82f6 !important;
        fill: #3b82f6 !important;
    }
`;

// 將樣式添加到 document head
if (typeof document !== "undefined") {
    const styleElement = document.createElement("style");
    styleElement.textContent = colorStyles;
    document.head.appendChild(styleElement);
}

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className='toaster group'
            toastOptions={{
                classNames: {
                    toast: "group toast group-[.toaster]:font-sans group-[.toaster]:border group-[.toaster]:bg-white group-[.toaster]:text-black group-[.toaster]:shadow-sm",
                    description: "group-[.toast]:text-black",
                    actionButton: "group-[.toast]:bg-black group-[.toast]:text-white",
                    cancelButton:
                        "group-[.toast]:bg-white group-[.toast]:text-black group-[.toast]:border-black group-[.toast]:border",
                    // 添加識別類以方便樣式選擇
                    success: "sonner-toast-success group-[.toast]:border-l-green-500 group-[.toast]:border-l-2",
                    error: "sonner-toast-error group-[.toast]:border-l-red-500 group-[.toast]:border-l-2",
                    warning: "sonner-toast-warning group-[.toast]:border-l-yellow-500 group-[.toast]:border-l-2",
                    info: "sonner-toast-info group-[.toast]:border-l-blue-500 group-[.toast]:border-l-2",
                },
            }}
            style={
                {
                    "--normal-bg": "white",
                    "--normal-text": "black",
                    "--normal-border": "#e0e0e0",
                } as React.CSSProperties
            }
            {...props}
        />
    );
};

export { toast, Toaster, toastStyles };
