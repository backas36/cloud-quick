import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className='flex min-h-svh flex-col items-center justify-center'>
            <h1 className='mb-4 text-3xl font-bold'>Cloud Quick</h1>
            <p className='mb-6'>歡迎使用 Cloud Quick 應用</p>
            <Button variant='outline' asChild className='border-gray-700 hover:bg-gray-100'>
                <Link to='/upload'>前往上傳</Link>
            </Button>
        </div>
    );
}
