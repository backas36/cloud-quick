import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function About() {
    return (
        <div className='flex min-h-svh flex-col items-center justify-center'>
            <h1 className='mb-4 text-3xl font-bold'>關於我們</h1>
            <p className='mb-6'>Cloud Quick 是一個現代化的前端專案，使用 Vite、React、TypeScript 和 pnpm 構建。</p>
            <p className='mb-6'>我們使用了 shadcn/ui 來提供美觀且功能豐富的 UI 組件。</p>
            <Button variant='outline' asChild>
                <Link to='/'>返回首頁</Link>
            </Button>
        </div>
    );
}
