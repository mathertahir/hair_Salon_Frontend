import { ToastService } from "../../utils/ToastService";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuPaperclip } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";



export const FileUploadField = ({ label, files, setFiles, error, maxFiles, value }) => {
    const handleFileChange = (e) => {
        const selected = Array.from(e.target.files || []);
        const existing = Array.isArray(files) ? files : [];
        const combined = [...existing, ...selected];

        if (maxFiles && combined.length > maxFiles) {
            ToastService.error(`You can upload a maximum of ${maxFiles} files.`);
            e.target.value = "";
            return;
        }

        setFiles(combined);
        // Clear the input so the same file can be selected again if needed
        e.target.value = "";
    };

    const handleFileRemove = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
    };

    return (
        <div className="space-y-8">
            <label className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-2 text-blueCD">
                    <IoNewspaperOutline size={20} />
                    <span>{label}</span>
                </div>
                <LuPaperclip size={20} className="text-blueCD" />
                <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>

            {files && files.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                    {files.map((file, i) => (
                        <div key={`${file.name || 'file'}-${i}`} className="relative">
                            <img
                                src={URL.createObjectURL(file)}
                                alt="preview"
                                className="w-16 h-16 border rounded object-cover"
                            />
                            <button className="absolute top-[-10px] right-[-10px] bg-red-500 rounded-full p-2 text-background" onClick={() => handleFileRemove(i)} >
                                <RxCross1 size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};