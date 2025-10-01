
interface Props {
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>,
}

const DeleteModal = ({ setIsDelete }: Props) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={() => setIsDelete(false)}></div>
            <div className="w-[25%] relative bg-white rounded-lg shadow-xl transform transition-all">
                <div className="bg-white sm:p-6 sm:pb-4">
                    <div className="mt-3">
                        <h3 id="dialog-title" className="text-left text-[20px] mb-[10px] font-bold text-gray">Bạn có chắc chắn muốn xóa thông tin này?</h3>
                        {/* <div className='w-full flex flex-col'>
                            
                        </div> */}
                    </div>
                </div>
                <div className="w-full pr-[20px] pb-[20px] flex flex-row justify-end">
                    <button onClick={() => setIsDelete(false)} className="p-[8px] justify-center rounded-[10px] bg-[#ccc] cursor-pointer mr-[10px]">
                        Hủy bỏ
                    </button>
                    <button onClick={() => setIsDelete(false)} className="p-[8px] justify-center rounded-[10px] bg-[#1447E6] text-white cursor-pointer">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
