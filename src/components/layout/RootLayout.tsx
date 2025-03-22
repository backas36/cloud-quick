import { Link, Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function RootLayout() {
    return (
        <div className='flex h-svh flex-col'>
            <header className='border-border border-b py-4'>
                <div className='container mx-auto flex items-center justify-between'>
                    <Link to='/' className='text-xl font-bold'>
                        Cloud Quick
                    </Link>
                    <nav className='flex gap-4'>
                        <Button variant='ghost' asChild>
                            <Link to='/'>首頁</Link>
                        </Button>
                        <Button variant='ghost' asChild>
                            <Link to='/guide'>上傳指南</Link>
                        </Button>
                    </nav>
                </div>
            </header>
            <main className='flex flex-1'>
                <Outlet />
            </main>
            <footer className='border-border border-t py-4'>
                <div className='text-muted-foreground container mx-auto text-center text-sm'>
                    &copy; {new Date().getFullYear()} Cloud Quick. 保留所有權利。
                </div>
            </footer>
        </div>
    );
}
