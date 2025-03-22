import { FILE_SIZE_LIMITS } from "../types";
import { getFileType } from "./fileUtils";

interface ValidationResult {
    valid: boolean;
    message?: string;
}

/**
 * 驗證檔案是否符合上傳規則
 * @param file 要驗證的檔案
 * @returns ValidationResult 驗證結果
 */
export const validateFile = (file: File): ValidationResult => {
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
