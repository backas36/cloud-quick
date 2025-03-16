// 檔案類型
export type FileType = "image" | "video" | "audio" | "document" | "archive" | "other";

// 上傳檔案資訊類型
export interface UploadFile {
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

// 檔案類型和大小限制常數
export const ALLOWED_FILE_TYPES = {
    image: [".jpg", ".jpeg", ".png", ".gif", ".svg", ".bmp"],
    document: [".pdf", ".txt", ".doc", ".docx", ".xlsx", ".pptx"],
    archive: [".zip", ".tar", ".gz", ".rar"],
};

export const FILE_SIZE_LIMITS = {
    image: 5 * 1024 * 1024, // 5MB
    video: 60 * 1024 * 1024, // 60MB
    audio: 20 * 1024 * 1024, // 20MB
    document: 5 * 1024 * 1024, // 5MB
    archive: 60 * 1024 * 1024, // 60MB
    default: 5 * 1024 * 1024, // 5MB
};
