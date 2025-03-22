import { FileUploadGuide } from "@/features/upload";

export default function Guide() {
    return (
        <div className='flex w-full flex-1 flex-col items-center justify-center bg-white p-4'>
            {/* 頁面標題 */}
            <h1 className='text-2xl font-medium tracking-tight text-black'>上傳指南</h1>
            {/* 主要內容 */}
            <div className='w-full max-w-max pt-4'>
                <FileUploadGuide />
            </div>
        </div>
    );
}
