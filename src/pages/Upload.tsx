import { Toaster } from "@/components/ui/sonner";
import { UploadSection } from "@/features/upload";

export default function UploadPage() {
    return (
        <div className='flex w-full flex-1 flex-col items-center justify-center space-y-8 bg-white p-4'>
            <Toaster position='top-right' />
            <h1 className='text-2xl font-medium tracking-tight text-black'>檔案上傳</h1>
            <UploadSection />
        </div>
    );
}
