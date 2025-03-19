import { useCallback, useMemo, useState } from "react";

import { toast } from "@/components/ui/sonner";

import { ALLOWED_FILE_TYPES, FILE_SIZE_LIMITS, FileType, UploadFile } from "../types";

const MAX_FILE_COUNT = 5;

// 判斷檔案類型
const getFileType = (fileName: string): FileType => {
    const extension = fileName.slice(fileName.lastIndexOf(".")).toLowerCase();

    if (ALLOWED_FILE_TYPES.image.includes(extension)) return "image";
    if (ALLOWED_FILE_TYPES.document.includes(extension)) return "document";
    if (ALLOWED_FILE_TYPES.archive.includes(extension)) return "archive";

    // 這裡可以添加更多類型判斷
    return "other";
};

const useUploadFile = () => {
    const [files, setFiles] = useState<UploadFile[]>([]);

    // 檢查檔案是否符合要求
    const validateFile = useCallback((file: File): { valid: boolean; message?: string } => {
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
    }, []);

    // 計算目前待上傳和上傳中的檔案數量
    const activeFilesCount = useMemo(() => {
        return files.filter((file) => file.status === "pending" || file.status === "uploading").length;
    }, [files]);

    const getFilesToProcess = useCallback(
        (selectedFiles: File[]) => {
            const remainingSlots = MAX_FILE_COUNT - activeFilesCount;

            if (remainingSlots <= 0) {
                toast.error("一次最多只能上傳五個檔案");
                return [];
            }

            return Array.from(selectedFiles).slice(0, remainingSlots);
        },
        [activeFilesCount]
    );

    // 處理檔案選擇
    const handleFileSelect = useCallback(
        (selectedFiles: File[]) => {
            // 如果選擇的檔案超過可用數量，只取前 remainingSlots 個
            const filesToProcess = getFilesToProcess(selectedFiles);

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
            }
        },
        [validateFile, getFilesToProcess]
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
    const formatFileSize = useCallback((bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }, []);

    // 計算待上傳檔案數量
    const pendingFilesCount = files.filter((file) => file.status === "pending").length;

    return {
        files,
        pendingFilesCount,
        handleFileSelect,
        handleUploadFiles,
        handleCopyUrl,
        handleDeleteFile,
        formatFileSize,
    };
};

export default useUploadFile;
