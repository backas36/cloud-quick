import { useCallback, useMemo, useState } from "react";

import { toast } from "@/components/ui/sonner";

import { UploadFile } from "../types";
import { MAX_FILE_COUNT } from "../types/constants";
import { calculateFilesToProcess, createUploadFile } from "../utils/fileUtils";
import { validateFile } from "../utils/validation";

const useUploadFile = () => {
    const [files, setFiles] = useState<UploadFile[]>([]);

    // 計算目前待上傳和上傳中的檔案數量
    const activeFilesCount = useMemo(() => {
        return files.filter((file) => file.status === "pending" || file.status === "uploading").length;
    }, [files]);

    const getFilesToProcess = useCallback(
        (selectedFiles: File[]) => {
            const { result, hasExceeded } = calculateFilesToProcess(selectedFiles, activeFilesCount, MAX_FILE_COUNT);

            if (hasExceeded) {
                toast.error("一次最多只能上傳五個檔案");
            }

            return result;
        },
        [activeFilesCount]
    );

    // 處理檔案選擇
    const handleFileSelect = useCallback(
        (selectedFiles: File[]) => {
            // 處理檔案數量限制
            const filesToProcess = getFilesToProcess(selectedFiles);

            if (filesToProcess.length < selectedFiles.length) {
                toast.error(`已達上限，只選取了前 ${filesToProcess.length} 個檔案`);
            }

            // 處理檔案轉換
            const newFiles = filesToProcess
                .map((file) => ({
                    file,
                    validation: validateFile(file),
                }))
                .map(createUploadFile);

            if (newFiles.length > 0) {
                setFiles((prevFiles) => [...prevFiles, ...newFiles]);
            }
        },
        [getFilesToProcess]
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
