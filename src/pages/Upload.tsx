import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
    ArchiveIcon,
    CloseIcon,
    CopyIcon,
    DeleteIcon,
    DocumentIcon,
    FileIcon,
    ImageIcon,
    UploadIcon,
} from "@/assets/icon";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "@/components/ui/sonner";

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

export default function Upload() {
    const [files, setFiles] = useState<UploadFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
                toast.error("一次最多只能上傳五個檔案");
                return;
            }

            // 如果選擇的檔案超過可用數量，只取前 remainingSlots 個
            const filesToProcess = Array.from(selectedFiles).slice(0, remainingSlots);

            if (filesToProcess.length < selectedFiles.length) {
                toast.error(`已達上限，只選取了前 ${filesToProcess.length} 個檔案`);
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
                toast.success(`已選擇 ${newFiles.length} 個檔案`);
            }
        },
        [files]
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

        toast.info(`開始上傳 ${pendingFiles.length} 個檔案`);

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
                                    toast.success(`${f.name} 上傳成功`);
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
    }, [files]);

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
    const handleCopyUrl = useCallback((url: string, fileName: string) => {
        navigator.clipboard
            .writeText(url)
            .then(() => {
                toast.success(`已複製 ${fileName} 的 URL`);
            })
            .catch((err) => {
                console.error("複製失敗:", err);
                toast.error("複製 URL 失敗");
            });
    }, []);

    // 刪除檔案
    const handleDeleteFile = useCallback((id: string, fileName: string) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
        toast.info(`已刪除 ${fileName}`);
    }, []);

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
            <Toaster position='top-right' />
            <h1 className='text-3xl font-medium tracking-tight'>檔案上傳</h1>

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
                    <UploadIcon className='mb-2 text-gray-400' size={24} />
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
                                                {file.fileType === "image" && <ImageIcon className='text-gray-600' />}
                                                {file.fileType === "document" && (
                                                    <DocumentIcon className='text-gray-600' />
                                                )}
                                                {file.fileType === "archive" && (
                                                    <ArchiveIcon className='text-gray-600' />
                                                )}
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
