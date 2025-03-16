import React, { useRef } from "react";

import useUploadFile from "../hooks/useUploadFile";
import DropZone from "./DropZone";
import FileList from "./FileList";
import UploadActions from "./UploadActions";

export const UploadSection: React.FC = () => {
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
        <div className='w-full max-w-md rounded-sm border border-black bg-white p-8 shadow-sm'>
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
    );
};

export default UploadSection;
