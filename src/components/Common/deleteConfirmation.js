import { X } from "lucide-react";
import DeleteAdminSvg from '../../assets/Admin/logo/DeletePopIcon.svg'
export default function DeleteConfirmation({isLangArab,isShowConfirmation,Label,handleDeleteConfirm, handleDeleteCancel }) {
    if (!isShowConfirmation) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-200 rounded-xl shadow-lg px-5 py-8 w-[440px] relative">
                
                {/* Close Button */}
                <X
                    className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer"
                    onClick={handleDeleteCancel}
                    aria-label="Cancel"
                />

                <div className="flex justify-start pt-4 pb-1     ">
                    <img src={DeleteAdminSvg} alt="Logo" /> 
                </div>
                
                <h1 className="text-start py-4 text-lg font-semibold text-black">
                {isLangArab?"تأكيد للحذف":"Confirm to Delete"} { Label === "user" ?(isLangArab?"مستخدم": "User") :(isLangArab?"ملاحظات":"FeedBack")}
                </h1>
                <h2 className=" text-sm text-black/65">{isLangArab?"هل أنت متأكد أنك تريد حذف هذا":"Are you sure you want to delete this"} { Label === "user" ?(isLangArab?"مستخدم": "User") :(isLangArab?"ملاحظات":"FeedBack")}? {isLangArab?"هذا الإجراء لا يمكن":"This action cannot"} <br/> {isLangArab?"يمكن التراجع عنه":"be undone"}</h2>
                    <div className=" flex gap-3 pt-4 ">
                <button
                    className="w-full  py-2 rounded-lg bg-white text-black/85 border border-gray-500 font-medium"
                    onClick={handleDeleteCancel}
                    aria-label="Cancel"
                >
                    {isLangArab?"إلغاء":"Cancel"}
                </button>

                <button
                    className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg text-white"
                    onClick={handleDeleteConfirm}
                    aria-label="Confirm"
                >
                    {isLangArab?"يتأكد":"Confirm"}
                </button>
                </div>
            </div>
        </div>
    );
}
