import React, { PropsWithChildren } from "react";

import { UploadProvider, useUpload } from "../context";
import DropZone from "./DropZone";
import FileList from "./FileList";
import UploadActions from "./UploadActions";

// 主要元件
export const UploadSection: React.FC<PropsWithChildren> & {
    DropZone: typeof UploadDropZone;
    FileList: typeof UploadFileList;
    Actions: typeof UploadActionsCompound;
} = ({ children }) => {
    return (
        <UploadProvider>
            <div className='w-full max-w-md rounded-sm border border-black bg-white p-8 shadow-sm'>
                {children || (
                    <>
                        <UploadDropZone />
                        <UploadFileList />
                        <UploadActionsCompound />
                    </>
                )}
            </div>
        </UploadProvider>
    );
};

// 複合子元件
const UploadDropZone: React.FC = () => {
    const { handleFileSelect } = useUpload();
    return <DropZone onFilesSelected={handleFileSelect} />;
};

const UploadFileList: React.FC = () => {
    const { files, formatFileSize, handleCopyUrl, handleDeleteFile } = useUpload();
    return (
        <FileList
            files={files}
            formatFileSize={formatFileSize}
            handleCopyUrl={handleCopyUrl}
            handleDeleteFile={handleDeleteFile}
        />
    );
};

const UploadActionsCompound: React.FC = () => {
    const { pendingFilesCount, handleUploadFiles, handleClickSelect } = useUpload();
    return (
        <UploadActions
            pendingFilesCount={pendingFilesCount}
            onUpload={handleUploadFiles}
            onSelectClick={handleClickSelect}
        />
    );
};

// 附加子元件到主元件
UploadSection.DropZone = UploadDropZone;
UploadSection.FileList = UploadFileList;
UploadSection.Actions = UploadActionsCompound;

export default UploadSection;
