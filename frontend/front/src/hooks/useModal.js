import { useState } from "react";

const useModal = (confirmFunction = 0, cancelFunction = 0) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return {
    handleOpen,
    handleClose,
    isOpen,

  };
};

export default useModal;
