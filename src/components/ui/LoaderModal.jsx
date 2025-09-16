import React from 'react';
import loaderGif from '@/assets/loader.gif';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";

const LoaderModal = ({ open, message, subMessage }) => {
    return (
        <Dialog open={open}>
            <DialogContent hideClose className="bg-white rounded-2xl max-w-md w-full items-center text-center flex flex-col">
                <img src={loaderGif} alt="Loading..." className="h-20 w-20 mb-4" />
                <DialogTitle className="text-xl font-semibold text-left w-full">{message}</DialogTitle>
                {subMessage && (
                    <DialogDescription className="text-gray-500 text-left">
                        {subMessage}
                    </DialogDescription>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default LoaderModal;
