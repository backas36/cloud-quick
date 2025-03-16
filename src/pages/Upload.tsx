import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

// 檔案類型和大小限制
const ALLOWED_FILE_TYPES = {
    image: [".jpg", ".jpeg", ".png", ".gif", ".svg", ".bmp"],
    document: [".pdf", ".txt", ".doc", ".docx", ".xlsx", ".pptx"],
    archive: [".zip", ".tar", ".gz", ".rar"],
};

const FILE_SIZE_LIMITS = {
    image: 5 * 1024 * 1024, // 5MB
    video: 60 * 1024 * 1024, // 60MB
    audio: 20 * 1024 * 1024, // 20MB
    document: 5 * 1024 * 1024, // 5MB
    archive: 60 * 1024 * 1024, // 60MB
    default: 5 * 1024 * 1024, // 5MB
};

// 模擬檔案類型
type FileType = "image" | "video" | "audio" | "document" | "archive" | "other";

// 模擬上傳檔案類型
interface UploadFile {
    id: string;
    name: string;
    size: number;
    type: string;
    fileType: FileType;
    progress: number;
    status: "pending" | "uploading" | "success" | "error";
    url?: string;
    errorMessage?: string;
    uploadedAt: Date;
}

// 通知類型
interface Notification {
    id: string;
    message: string;
    type: "info" | "success" | "error";
    duration?: number;
}

export default function Upload() {
    const [files, setFiles] = useState<UploadFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 顯示通知
    const showNotification = useCallback(
        (message: string, type: "info" | "success" | "error" = "info", duration = 3000) => {
            const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

            setNotifications((prev) => [...prev, { id, message, type, duration }]);

            // 自動移除通知
            if (duration > 0) {
                setTimeout(() => {
                    setNotifications((prev) => prev.filter((n) => n.id !== id));
                }, duration);
            }

            return id;
        },
        []
    );

    // 移除通知
    const removeNotification = useCallback((id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    // 判斷檔案類型
    const getFileType = (fileName: string): FileType => {
        const extension = fileName.slice(fileName.lastIndexOf(".")).toLowerCase();

        if (ALLOWED_FILE_TYPES.image.includes(extension)) return "image";
        if (ALLOWED_FILE_TYPES.document.includes(extension)) return "document";
        if (ALLOWED_FILE_TYPES.archive.includes(extension)) return "archive";

        // 這裡可以添加更多類型判斷
        return "other";
    };

    // 檢查檔案是否符合要求
    const validateFile = (file: File): { valid: boolean; message?: string } => {
        const fileType = getFileType(file.name);

        // 檢查檔案類型是否允許
        if (fileType === "other") {
            return { valid: false, message: "不支援的檔案類型" };
        }

        // 檢查檔案大小
        const sizeLimit = FILE_SIZE_LIMITS[fileType] || FILE_SIZE_LIMITS.default;
        if (file.size > sizeLimit) {
            const sizeMB = Math.round(sizeLimit / (1024 * 1024));
            return { valid: false, message: `檔案大小超過限制 (${sizeMB}MB)` };
        }

        return { valid: true };
    };

    // 處理檔案選擇
    const handleFileSelect = useCallback(
        (selectedFiles: File[]) => {
            // 計算目前待上傳和上傳中的檔案數量
            const activeFilesCount = files.filter(
                (file) => file.status === "pending" || file.status === "uploading"
            ).length;

            // 計算可以再添加的檔案數量
            const remainingSlots = 5 - activeFilesCount;

            if (remainingSlots <= 0) {
                showNotification("一次最多只能上傳五個檔案", "error");
                return;
            }

            // 如果選擇的檔案超過可用數量，只取前 remainingSlots 個
            const filesToProcess = Array.from(selectedFiles).slice(0, remainingSlots);

            if (filesToProcess.length < selectedFiles.length) {
                showNotification(`已達上限，只選取了前 ${filesToProcess.length} 個檔案`, "info");
            }

            const newFiles = filesToProcess.map((file) => {
                const fileType = getFileType(file.name);
                const validation = validateFile(file);

                const uploadFile: UploadFile = {
                    id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    fileType,
                    progress: 0,
                    status: validation.valid ? "pending" : "error",
                    errorMessage: validation.message,
                    uploadedAt: new Date(),
                };

                return uploadFile;
            });

            if (newFiles.length > 0) {
                setFiles((prevFiles) => [...prevFiles, ...newFiles]);
                showNotification(`已選擇 ${newFiles.length} 個檔案`, "success");
            }
        },
        [files, showNotification]
    );

    // 處理檔案上傳
    const handleUploadFiles = useCallback(() => {
        // 篩選出待上傳的檔案
        const pendingFiles = files.filter((file) => file.status === "pending");

        if (pendingFiles.length === 0) return;

        // 更新檔案狀態為上傳中
        setFiles((prevFiles) =>
            prevFiles.map((file) => (file.status === "pending" ? { ...file, status: "uploading" } : file))
        );

        showNotification(`開始上傳 ${pendingFiles.length} 個檔案`, "info");

        // 模擬上傳過程
        pendingFiles.forEach((file) => {
            const uploadInterval = setInterval(() => {
                setFiles((prevFiles) => {
                    const updatedFiles = prevFiles.map((f) => {
                        if (f.id === file.id && f.status === "uploading") {
                            const newProgress = f.progress + 10;

                            if (newProgress >= 100) {
                                clearInterval(uploadInterval);

                                // 上傳完成後顯示通知
                                setTimeout(() => {
                                    showNotification(`${f.name} 上傳成功`, "success");
                                }, 300);

                                return {
                                    ...f,
                                    progress: 100,
                                    status: "success" as const,
                                    url: `https://example.com/files/${f.id}/${f.name}`,
                                };
                            }

                            return { ...f, progress: newProgress };
                        }
                        return f;
                    });

                    return updatedFiles;
                });
            }, 300);
        });
    }, [files, showNotification]);

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
                handleFileSelect(Array.from(e.dataTransfer.files));
            }
        },
        [handleFileSelect]
    );

    // 處理點擊選擇檔案
    const handleClickSelect = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                handleFileSelect(Array.from(e.target.files));
                // 重置 input 值，以便可以再次上傳相同的檔案
                e.target.value = "";
            }
        },
        [handleFileSelect]
    );

    // 複製 URL 到剪貼簿
    const handleCopyUrl = useCallback(
        (url: string, fileName: string) => {
            navigator.clipboard
                .writeText(url)
                .then(() => {
                    showNotification(`已複製 ${fileName} 的 URL`, "success");
                })
                .catch((err) => {
                    console.error("複製失敗:", err);
                    showNotification("複製 URL 失敗", "error");
                });
        },
        [showNotification]
    );

    // 刪除檔案
    const handleDeleteFile = useCallback(
        (id: string, fileName: string) => {
            setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
            showNotification(`已刪除 ${fileName}`, "info");
        },
        [showNotification]
    );

    // 格式化檔案大小
    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    // 計算待上傳檔案數量
    const pendingFilesCount = files.filter((file) => file.status === "pending").length;

    return (
        <div className='flex w-full flex-1 flex-col items-center justify-center space-y-6 bg-gray-50 p-4'>
            <h1 className='text-3xl font-medium tracking-tight'>檔案上傳</h1>

            {/* 通知區域 */}
            {notifications.length > 0 && (
                <div className='fixed top-4 right-4 z-50 flex w-72 flex-col space-y-2'>
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 shadow-md transition-all duration-300 ease-in-out ${
                                notification.type === "error"
                                    ? "border-l-4 border-l-gray-800"
                                    : notification.type === "success"
                                      ? "border-l-4 border-l-gray-600"
                                      : "border-l-4 border-l-gray-400"
                            }`}
                        >
                            <div className='flex items-center space-x-2'>
                                {notification.type === "error" && (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-5 w-5 text-gray-800'
                                        viewBox='0 0 20 20'
                                        fill='currentColor'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                )}
                                {notification.type === "success" && (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-5 w-5 text-gray-600'
                                        viewBox='0 0 20 20'
                                        fill='currentColor'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                )}
                                {notification.type === "info" && (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-5 w-5 text-gray-400'
                                        viewBox='0 0 20 20'
                                        fill='currentColor'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                )}
                                <p className='text-sm text-gray-700'>{notification.message}</p>
                            </div>
                            <button
                                onClick={() => removeNotification(notification.id)}
                                className='text-gray-400 hover:text-gray-600'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-4 w-4'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M6 18L18 6M6 6l12 12'
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className='w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm'>
                <div
                    className={`mb-6 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed ${
                        isDragging ? "border-gray-600 bg-gray-50" : "border-gray-300 bg-gray-50"
                    } transition-colors duration-200 hover:bg-gray-100`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClickSelect}
                >
                    <input
                        type='file'
                        ref={fileInputRef}
                        className='hidden'
                        multiple
                        onChange={handleFileInputChange}
                    />
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='mb-2 h-6 w-6 text-gray-400'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                        />
                    </svg>
                    <p className='text-sm text-gray-500'>拖曳檔案至此或點擊選擇檔案</p>
                    <p className='mt-1 text-xs text-gray-400'>支援的檔案格式：圖片、文件、壓縮檔</p>
                    <p className='mt-1 text-xs text-gray-400'>一次最多上傳 5 個檔案</p>
                </div>

                {files.length > 0 && (
                    <div className='mb-6 max-h-60 overflow-y-auto rounded-md border border-gray-200'>
                        <ul className='divide-y divide-gray-200'>
                            {files.map((file) => (
                                <li key={file.id} className='p-3'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center space-x-2'>
                                            <span className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100'>
                                                {file.fileType === "image" && (
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        className='h-4 w-4 text-gray-600'
                                                        fill='none'
                                                        viewBox='0 0 24 24'
                                                        stroke='currentColor'
                                                    >
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            strokeWidth={2}
                                                            d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                                                        />
                                                    </svg>
                                                )}
                                                {file.fileType === "document" && (
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        className='h-4 w-4 text-gray-600'
                                                        fill='none'
                                                        viewBox='0 0 24 24'
                                                        stroke='currentColor'
                                                    >
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            strokeWidth={2}
                                                            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                                                        />
                                                    </svg>
                                                )}
                                                {file.fileType === "archive" && (
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        className='h-4 w-4 text-gray-600'
                                                        fill='none'
                                                        viewBox='0 0 24 24'
                                                        stroke='currentColor'
                                                    >
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            strokeWidth={2}
                                                            d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
                                                        />
                                                    </svg>
                                                )}
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
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='h-4 w-4'
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            stroke='currentColor'
                                                        >
                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                strokeWidth={2}
                                                                d='M6 18L18 6M6 6l12 12'
                                                            />
                                                        </svg>
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
                                                    <p className='mt-1 text-right text-xs text-gray-500'>
                                                        {file.progress}%
                                                    </p>
                                                </div>
                                            )}
                                            {file.status === "success" && (
                                                <div className='flex items-center space-x-2'>
                                                    <button
                                                        onClick={() => file.url && handleCopyUrl(file.url, file.name)}
                                                        className='rounded-md bg-gray-100 p-1 text-xs text-gray-600 hover:bg-gray-200'
                                                        title='複製 URL'
                                                    >
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='h-4 w-4'
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            stroke='currentColor'
                                                        >
                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                strokeWidth={2}
                                                                d='M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3'
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteFile(file.id, file.name)}
                                                        className='rounded-md bg-gray-100 p-1 text-xs text-gray-600 hover:bg-gray-200'
                                                        title='刪除檔案'
                                                    >
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='h-4 w-4'
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            stroke='currentColor'
                                                        >
                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                strokeWidth={2}
                                                                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                                                            />
                                                        </svg>
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
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='h-4 w-4'
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            stroke='currentColor'
                                                        >
                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                strokeWidth={2}
                                                                d='M6 18L18 6M6 6l12 12'
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className='flex justify-between'>
                    <Button variant='outline' asChild className='border-gray-700 hover:bg-gray-100'>
                        <Link to='/'>返回首頁</Link>
                    </Button>
                    {pendingFilesCount > 0 ? (
                        <Button className='bg-gray-800 hover:bg-gray-700' onClick={handleUploadFiles}>
                            確認上傳 ({pendingFilesCount})
                        </Button>
                    ) : (
                        <Button className='bg-gray-800 hover:bg-gray-700' onClick={handleClickSelect}>
                            選擇檔案
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
