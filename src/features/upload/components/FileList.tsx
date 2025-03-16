import React from "react";

import { ArchiveIcon, CloseIcon, DocumentIcon, FileIcon, ImageIcon } from "@/assets/icon";
import CopyIcon from "@/assets/icon/CopyIcon";
import DeleteIcon from "@/assets/icon/DeleteIcon";

import { UploadFile } from "../types";

interface FileListProps {
    files: UploadFile[];
    formatFileSize: (bytes: number) => string;
    handleCopyUrl: (url: string, fileName: string) => void;
    handleDeleteFile: (id: string, fileName: string) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, formatFileSize, handleCopyUrl, handleDeleteFile }) => {
    if (files.length === 0) return null;

    return (
        <div className='mb-6 max-h-60 overflow-y-auto rounded-md border border-gray-200'>
            <ul className='divide-y divide-gray-200'>
                {files.map((file) => (
                    <li key={file.id} className='p-3'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-2'>
                                <span className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100'>
                                    {file.fileType === "image" && <ImageIcon className='text-gray-600' />}
                                    {file.fileType === "document" && <DocumentIcon className='text-gray-600' />}
                                    {file.fileType === "archive" && <ArchiveIcon className='text-gray-600' />}
                                    {file.fileType === "other" && <FileIcon className='text-gray-600' />}
                                </span>
                                <div>
                                    <p
                                        className='max-w-[150px] truncate text-sm font-medium text-gray-700'
                                        title={file.name}
                                    >
                                        {file.name}
                                    </p>
                                    <p className='text-xs text-gray-500'>{formatFileSize(file.size)}</p>
                                </div>
                            </div>
                            <div className='flex items-center space-x-2'>
                                {file.status === "pending" && (
                                    <div className='flex items-center space-x-2'>
                                        <span className='text-xs text-gray-500'>待上傳</span>
                                        <button
                                            onClick={() => handleDeleteFile(file.id, file.name)}
                                            className='rounded-md bg-gray-100 p-1 text-xs text-gray-600 hover:bg-gray-200'
                                            title='刪除檔案'
                                        >
                                            <CloseIcon />
                                        </button>
                                    </div>
                                )}
                                {file.status === "uploading" && (
                                    <div className='w-24'>
                                        <div className='h-1.5 w-full rounded-full bg-gray-200'>
                                            <div
                                                className='h-1.5 rounded-full bg-gray-600'
                                                style={{ width: `${file.progress}%` }}
                                            ></div>
                                        </div>
                                        <p className='mt-1 text-right text-xs text-gray-500'>{file.progress}%</p>
                                    </div>
                                )}
                                {file.status === "success" && (
                                    <div className='flex items-center space-x-2'>
                                        <button
                                            onClick={() => file.url && handleCopyUrl(file.url, file.name)}
                                            className='rounded-md bg-gray-100 p-1 text-xs text-gray-600 hover:bg-gray-200'
                                            title='複製 URL'
                                        >
                                            <CopyIcon />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteFile(file.id, file.name)}
                                            className='rounded-md bg-gray-100 p-1 text-xs text-gray-600 hover:bg-gray-200'
                                            title='刪除檔案'
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                )}
                                {file.status === "error" && (
                                    <div className='flex items-center space-x-2'>
                                        <span className='text-xs text-gray-700' title={file.errorMessage}>
                                            {file.errorMessage}
                                        </span>
                                        <button
                                            onClick={() => handleDeleteFile(file.id, file.name)}
                                            className='rounded-md bg-gray-100 p-1 text-xs text-gray-600 hover:bg-gray-200'
                                            title='刪除檔案'
                                        >
                                            <CloseIcon />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;
