import { ALLOWED_FILE_TYPES, FileType, UploadFile, UploadStatus, ValidationResult } from "../types";

/**
 * 判斷檔案類型
 * @param fileName 檔案名稱
 * @returns FileType 檔案類型
 */
export const getFileType = (fileName: string): FileType => {
    const extension = fileName.slice(fileName.lastIndexOf(".")).toLowerCase();

    if (ALLOWED_FILE_TYPES.image.includes(extension)) return "image";
    if (ALLOWED_FILE_TYPES.document.includes(extension)) return "document";
    if (ALLOWED_FILE_TYPES.archive.includes(extension)) return "archive";

    return "other";
};

/**
 * 計算可處理的檔案列表
 * @param selectedFiles 選擇的檔案列表
 * @param activeCount 當前活動檔案數量
 * @param maxCount 最大允許檔案數量
 * @returns {result: File[], hasExceeded: boolean} 處理結果
 */
export const calculateFilesToProcess = (
    selectedFiles: File[],
    activeCount: number,
    maxCount: number
): { result: File[]; hasExceeded: boolean } => {
    const remainingSlots = maxCount - activeCount;

    if (remainingSlots <= 0) {
        return { result: [], hasExceeded: true };
    }

    const filesToProcess = Array.from(selectedFiles).slice(0, remainingSlots);
    const hasExceeded = selectedFiles.length > remainingSlots;

    return { result: filesToProcess, hasExceeded };
};

interface CreateUploadFileOptions {
    file: File;
    validation: ValidationResult;
}

/**
 * 建立上傳檔案物件
 */
export const createUploadFile = ({ file, validation }: CreateUploadFileOptions): UploadFile => ({
    id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: file.name,
    size: file.size,
    type: file.type,
    fileType: getFileType(file.name),
    progress: 0,
    status: validation.valid ? "pending" : "error",
    errorMessage: validation.message,
    uploadedAt: new Date(),
});

/**
 * 檔案過濾器集合
 */
export const fileFilters = {
    /**
     * 取得特定狀態的檔案
     */
    byStatus: (status: UploadStatus) => (files: UploadFile[]) => files.filter((file) => file.status === status),

    /**
     * 取得特定類型的檔案
     */
    byType: (fileType: FileType) => (files: UploadFile[]) => files.filter((file) => file.fileType === fileType),
} as const;

// 常用的過濾器
export const getPendingFiles = fileFilters.byStatus("pending");
export const getUploadingFiles = fileFilters.byStatus("uploading");
export const getSuccessFiles = fileFilters.byStatus("success");
export const getErrorFiles = fileFilters.byStatus("error");

/**
 * 格式化檔案大小
 * @param bytes 檔案大小（位元組）
 * @returns 格式化後的檔案大小字串
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
