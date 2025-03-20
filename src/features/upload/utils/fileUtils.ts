import { ALLOWED_FILE_TYPES, FileType } from "../types";

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
