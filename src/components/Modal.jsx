import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Button from "./UI/Button.jsx";

const Modal = forwardRef(function Modal({ onConfirmDelete }, ref) {
  const [hasConfirmedDeletion, setHasConfirmedDeletion] = useState(false);
  const modal = useRef();

  const confirmedDeletion = () => {
    setHasConfirmedDeletion(true);
    setTimeout(() => {
      modal.current.close();
      setHasConfirmedDeletion(false);
      onConfirmDelete();
    }, 200);
  };

  useImperativeHandle(ref, () => {
    return {
      openModal() {
        modal.current.showModal();
      },
    };
  });
  return (
    <dialog
      ref={modal}
      className={`bg-white rounded-3xl p-5 animate-fadeIn duration-[0.15s] transition-all shadow ${
        hasConfirmedDeletion ? "opacity-0" : ""
      }`}
    >
      <h1 className={`font-bold text-2xl`}>Delete Project</h1>
      <p>Are you sure you want to delete the project ?</p>
      <div className={`flex justify-between mt-10`}>
        <Button
          isSmall={true}
          className={`text-xs hover:bg-red-900`}
          bgColor={`black`}
          textColor={`white`}
          onClick={confirmedDeletion}
        >
          Delete
        </Button>
        <Button
          isSmall={true}
          className={`cursor-pointer bg-[#38A7B6] rounded-3xl text-xs text-white shadow`}
          onClick={() => {
            setHasConfirmedDeletion(true);
            setTimeout(() => {
              setHasConfirmedDeletion(false);
              modal.current.close();
            }, 200);
          }}
        >
          Cancel
        </Button>
      </div>
    </dialog>
  );
});

export default Modal;
