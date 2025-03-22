import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { ALLOWED_FILE_TYPES, FILE_SIZE_LIMITS, FileType } from "../types";
import { formatFileSize } from "../utils/fileUtils";

/**
 * 檔案上傳指南元件，顯示允許的檔案類型和大小限制
 */
const FileUploadGuide: React.FC = () => {
    const fileTypeLabels: Record<Exclude<FileType, "other">, string> = {
        image: "圖片",
        video: "影片",
        audio: "音訊",
        document: "文件",
        archive: "壓縮檔",
    };

    return (
        <div className='w-full max-w-5xl rounded-sm bg-white p-8'>
            <div className='grid gap-8 md:grid-cols-2'>
                {/* 左側欄 */}
                <div>
                    {/* 檔案類型區塊 */}
                    <h3 className='mb-6 text-lg font-semibold text-gray-900'>允許的檔案類型</h3>
                    <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2'>
                        {(Object.keys(ALLOWED_FILE_TYPES) as Array<keyof typeof ALLOWED_FILE_TYPES>).map((type) => (
                            <div key={type} className='space-y-1'>
                                <h4 className='font-medium text-gray-800'>{fileTypeLabels[type]}</h4>
                                <p className='text-sm text-gray-600'>{ALLOWED_FILE_TYPES[type].join(", ")}</p>
                            </div>
                        ))}
                    </div>

                    {/* 其他限制 */}
                    <h3 className='mt-8 mb-4 text-lg font-semibold text-gray-900'>其他限制</h3>
                    <ul className='list-disc space-y-2 pl-6 text-gray-700'>
                        <li>同時最多可上傳 5 個檔案</li>
                        <li>不支援的檔案類型將無法上傳</li>
                        <li>上傳過程中請勿關閉瀏覽器或重新整理頁面</li>
                    </ul>
                </div>

                {/* 右側欄 */}
                <div>
                    {/* 檔案大小限制區塊 */}
                    <h3 className='mb-6 text-lg font-semibold text-gray-900'>檔案大小限制</h3>
                    <div className='space-y-4'>
                        {(Object.keys(FILE_SIZE_LIMITS) as Array<keyof typeof FILE_SIZE_LIMITS>)
                            .filter((key) => key !== "default")
                            .map((type) => (
                                <div
                                    key={type}
                                    className='flex items-center justify-between rounded-md bg-gray-50 px-4 py-3'
                                >
                                    <span className='font-medium text-gray-700'>
                                        {fileTypeLabels[type as Exclude<FileType, "other">] || type}
                                    </span>
                                    <span className='rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700'>
                                        {formatFileSize(FILE_SIZE_LIMITS[type])}
                                    </span>
                                </div>
                            ))}
                    </div>

                    {/* 上傳提示 */}
                    <div className='mt-8 rounded-md bg-yellow-50 p-4'>
                        <div className='flex'>
                            <div className='flex-shrink-0'>
                                <svg className='h-5 w-5 text-yellow-400' viewBox='0 0 20 20' fill='currentColor'>
                                    <path
                                        fillRule='evenodd'
                                        d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </div>
                            <div className='ml-3'>
                                <h3 className='text-sm font-medium text-yellow-800'>注意事項</h3>
                                <div className='mt-2 text-sm text-yellow-700'>
                                    <p>請確保您的網路連線穩定，較大檔案的上傳時間可能較長，請耐心等待上傳完成。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-8 flex justify-between border-t border-gray-200 pt-6'>
                <Button
                    variant='outline'
                    asChild
                    className='rounded-sm border-black text-sm font-medium hover:bg-gray-50'
                >
                    <Link to='/'>返回首頁</Link>
                </Button>

                <Button asChild className='rounded-sm bg-black text-sm font-medium text-white hover:bg-gray-900'>
                    <Link to='/upload'>前往上傳</Link>
                </Button>
            </div>
        </div>
    );
};

export default FileUploadGuide;
