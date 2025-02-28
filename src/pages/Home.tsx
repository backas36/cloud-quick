import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className='flex min-h-svh flex-col items-center justify-center'>
            <h1 className='mb-4 text-3xl font-bold'>Cloud Quick</h1>
            <p className='mb-6'>歡迎使用 Cloud Quick 應用</p>
            <div className='flex gap-4'>
                <Button variant='default'>默認按鈕</Button>
                <Button variant='outline'>輪廓按鈕</Button>
                <Button variant='destructive'>危險按鈕</Button>
            </div>
        </div>
    );
}
