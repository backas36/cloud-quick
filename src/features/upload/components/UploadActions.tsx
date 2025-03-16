import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

interface UploadActionsProps {
    pendingFilesCount: number;
    onUpload: () => void;
    onSelectClick: () => void;
}

export const UploadActions: React.FC<UploadActionsProps> = ({ pendingFilesCount, onUpload, onSelectClick }) => {
    return (
        <div className='flex justify-between'>
            <Button variant='outline' asChild className='rounded-sm border-black text-sm font-medium hover:bg-gray-50'>
                <Link to='/'>返回首頁</Link>
            </Button>
            {pendingFilesCount > 0 ? (
                <Button
                    className='rounded-sm bg-black text-sm font-medium text-white hover:bg-gray-900'
                    onClick={onUpload}
                >
                    確認上傳 ({pendingFilesCount})
                </Button>
            ) : (
                <Button
                    className='rounded-sm bg-black text-sm font-medium text-white hover:bg-gray-900'
                    onClick={onSelectClick}
                >
                    選擇檔案
                </Button>
            )}
        </div>
    );
};

export default UploadActions;
