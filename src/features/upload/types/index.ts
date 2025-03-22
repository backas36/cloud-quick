/**
 * 檔案類型
 */
export type FileType = "image" | "video" | "audio" | "document" | "archive" | "other";

/**
 * 上傳狀態
 */
export type UploadStatus = "pending" | "uploading" | "success" | "error";

/**
 * 檔案驗證結果
 */
export interface ValidationResult {
    /** 是否通過驗證 */
    valid: boolean;
    /** 錯誤訊息，如果驗證失敗才會有值 */
    message?: string;
}

/**
 * 上傳檔案物件
 */
export interface UploadFile {
    /** 檔案唯一識別碼 */
    id: string;
    /** 檔案名稱 */
    name: string;
    /** 檔案大小（bytes） */
    size: number;
    /** MIME 類型 */
    type: string;
    /** 檔案類型分類 */
    fileType: FileType;
    /** 上傳進度（0-100） */
    progress: number;
    /** 上傳狀態 */
    status: UploadStatus;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 上傳時間 */
    uploadedAt: Date;
    /** 檔案 URL，上傳成功後才會有值 */
    url?: string;
}

/**
 * 允許的檔案類型
 */
export const ALLOWED_FILE_TYPES: { [K in Exclude<FileType, "other">]: string[] } = {
    image: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".ico"],
    video: [".mp4", ".mov", ".avi", ".mkv", ".webm"],
    audio: [".mp3", ".wav", ".m4a", ".ogg", ".flac"],
    document: [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".txt", ".csv", ".ppt", ".pptx"],
    archive: [".zip", ".rar", ".7z", ".tar", ".gz", ".rar"],
};

/**
 * 檔案大小限制（bytes）
 */
export const FILE_SIZE_LIMITS = {
    image: 5 * 1024 * 1024, // 5MB
    video: 60 * 1024 * 1024, // 10MB
    audio: 20 * 1024 * 1024, // 10MB
    document: 10 * 1024 * 1024, // 10MB
    archive: 50 * 1024 * 1024, // 50MB
    default: 10 * 1024 * 1024, // 10MB
} as const;
