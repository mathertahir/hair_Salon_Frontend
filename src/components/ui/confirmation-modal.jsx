import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ConfirmationModal({
    open,
    onOpenChange,
    title,
    description,
    onConfirm,
    loading = false
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white rounded-2xl max-w-md w-full">
                <DialogTitle className="text-xl font-semibold">
                    {title}
                </DialogTitle>
                <div className="py-3">
                    <p className="text-gray-600">{description}</p>
                </div>
                <DialogFooter className="flex gap-2 mt-4">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="w-1/2 rounded-lg"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={loading}
                        className="w-1/2 bg-ternary text-white rounded-lg"
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
