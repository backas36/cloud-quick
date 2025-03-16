import React, { useCallback, useRef, useState } from "react";

import { UploadIcon } from "@/assets/icon";

interface DropZoneProps {
    onFilesSelected: (files: File[]) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFilesSelected }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 處理拖曳事件
    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(false);

            if (e.dataTransfer.files.length > 0) {
                onFilesSelected(Array.from(e.dataTransfer.files));
            }
        },
        [onFilesSelected]
    );

    // 處理點擊選擇檔案
    const handleClickSelect = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                onFilesSelected(Array.from(e.target.files));
                // 重置 input 值，以便可以再次上傳相同的檔案
                e.target.value = "";
            }
        },
        [onFilesSelected]
    );

    return (
        <div
            className={`mb-6 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed ${
                isDragging ? "border-gray-600 bg-gray-50" : "border-gray-300 bg-gray-50"
            } transition-colors duration-200 hover:bg-gray-100`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClickSelect}
        >
            <input type='file' ref={fileInputRef} className='hidden' multiple onChange={handleFileInputChange} />
            <UploadIcon className='mb-2 text-gray-400' size={24} />
            <p className='text-sm text-gray-500'>拖曳檔案至此或點擊選擇檔案</p>
            <p className='mt-1 text-xs text-gray-400'>支援的檔案格式：圖片、文件、壓縮檔</p>
            <p className='mt-1 text-xs text-gray-400'>一次最多上傳 5 個檔案</p>
        </div>
    );
};

export default DropZone;
