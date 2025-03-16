import { useRef } from "react";

import { Toaster } from "@/components/ui/sonner";
import { DropZone, FileList, UploadActions, useUploadFile } from "@/features/upload";

export default function Upload() {
    const {
        files,
        pendingFilesCount,
        handleFileSelect,
        handleUploadFiles,
        handleCopyUrl,
        handleDeleteFile,
        formatFileSize,
    } = useUploadFile();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClickSelect = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className='flex w-full flex-1 flex-col items-center justify-center space-y-6 bg-gray-50 p-4'>
            <Toaster position='top-right' />
            <h1 className='text-3xl font-medium tracking-tight'>檔案上傳</h1>

            <div className='w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm'>
                <DropZone onFilesSelected={handleFileSelect} />

                <FileList
                    files={files}
                    formatFileSize={formatFileSize}
                    handleCopyUrl={handleCopyUrl}
                    handleDeleteFile={handleDeleteFile}
                />

                <UploadActions
                    pendingFilesCount={pendingFilesCount}
                    onUpload={handleUploadFiles}
                    onSelectClick={handleClickSelect}
                />
            </div>
        </div>
    );
}
