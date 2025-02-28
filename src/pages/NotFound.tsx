import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className='flex min-h-svh flex-col items-center justify-center'>
            <h1 className='mb-4 text-3xl font-bold'>404 - 頁面未找到</h1>
            <p className='mb-6'>您訪問的頁面不存在或已被移除。</p>
            <Button variant='default' asChild>
                <Link to='/'>返回首頁</Link>
            </Button>
        </div>
    );
}
