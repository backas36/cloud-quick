import React, { createContext, PropsWithChildren, useContext, useRef } from "react";

import useUploadFile from "../hooks/useUploadFile";

// 創建上下文以共享狀態和處理函數
export type UploadContextType = ReturnType<typeof useUploadFile> & {
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleClickSelect: () => void;
};

const UploadContext = createContext<UploadContextType | null>(null);

// 自定義 hook 用於存取上下文
export const useUpload = () => {
    const context = useContext(UploadContext);
    if (!context) {
        throw new Error("useUpload must be used within an UploadProvider");
    }
    return context;
};

// 上下文提供者組件
export const UploadProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const uploadState = useUploadFile();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClickSelect = () => {
        fileInputRef.current?.click();
    };

    const contextValue: UploadContextType = {
        ...uploadState,
        fileInputRef,
        handleClickSelect,
    };

    return (
        <UploadContext.Provider value={contextValue}>
            {children}
            <input
                type='file'
                multiple
                ref={fileInputRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                        uploadState.handleFileSelect(Array.from(e.target.files));
                    }
                }}
                className='hidden'
            />
        </UploadContext.Provider>
    );
};
