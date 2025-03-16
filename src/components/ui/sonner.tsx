import { useTheme } from "next-themes";
import { ExternalToast, toast as sonnerToast, Toaster as Sonner, ToasterProps } from "sonner";

// 定義通用樣式類型
type ToastStylePreset = Partial<ExternalToast> & {
    style?: React.CSSProperties;
};

// 預設樣式組合
const toastStyles = {
    // 成功通知樣式
    success: {
        duration: 3000,
        style: {
            backgroundColor: "#f0fdf4",
            color: "#166534",
            border: "1px solid #bbf7d0",
        },
    } as ToastStylePreset,

    // 錯誤通知樣式
    error: {
        duration: 4000,
        style: {
            backgroundColor: "#fee2e2",
            color: "#dc2626",
            border: "1px solid #fca5a5",
        },
    } as ToastStylePreset,

    // 警告通知樣式
    warning: {
        duration: 3500,
        style: {
            backgroundColor: "#fffbeb",
            color: "#92400e",
            border: "1px solid #fde68a",
        },
    } as ToastStylePreset,

    // 資訊通知樣式
    info: {
        duration: 3000,
        style: {
            backgroundColor: "#f0f9ff",
            color: "#0369a1",
            border: "1px solid #bae6fd",
        },
    } as ToastStylePreset,

    // 暗色系/中性通知
    neutral: {
        duration: 3000,
        style: {
            backgroundColor: "#f9fafb",
            color: "#374151",
            border: "1px solid #e5e7eb",
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
    info: (message: string, data?: ExternalToast) => sonnerToast(message, { ...toastStyles.info, ...data }),

    // 中性通知
    neutral: (message: string, data?: ExternalToast) => sonnerToast(message, { ...toastStyles.neutral, ...data }),

    // 使用指定樣式通知
    styled: (message: string, preset: keyof typeof toastStyles, data?: ExternalToast) =>
        sonnerToast(message, { ...toastStyles[preset], ...data }),

    // 自定義通知樣式
    custom: (message: string, customStyle: ToastStylePreset, data?: ExternalToast) =>
        sonnerToast(message, { ...customStyle, ...data }),
};

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className='toaster group'
            style={
                {
                    "--normal-bg": "var(--popover)",
                    "--normal-text": "var(--popover-foreground)",
                    "--normal-border": "var(--border)",
                } as React.CSSProperties
            }
            {...props}
        />
    );
};

export { toast, Toaster, toastStyles };
