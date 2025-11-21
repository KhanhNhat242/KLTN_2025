interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const AlertModal = ({ isOpen, onClose, message }: AlertProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[350px]">
        <p className="text-lg">{message}</p>

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
