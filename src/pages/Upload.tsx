import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function Upload() {
    return (
        <div className='flex w-full flex-1 flex-col items-center justify-center space-y-6 bg-gray-50'>
            <h1 className='text-3xl font-medium tracking-tight'>檔案上傳</h1>
            <div className='w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm'>
                <div className='mb-6 flex h-32 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100'>
                    <p className='text-sm text-gray-500'>拖曳檔案至此或點擊上傳</p>
                </div>
                <div className='flex justify-between'>
                    <Button variant='outline' asChild className='border-gray-700 hover:bg-gray-100'>
                        <Link to='/'>返回首頁</Link>
                    </Button>
                    <Button className='bg-gray-800 hover:bg-gray-700'>上傳檔案</Button>
                </div>
            </div>
        </div>
    );
}
