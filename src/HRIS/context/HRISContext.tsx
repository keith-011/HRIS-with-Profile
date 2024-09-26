import { ModalClassKey } from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";

type ModalContent = {
  header: string;
  subheading: string;
  content: ReactNode;
};

interface ModalInterface {
  isModalOpen: boolean;
  openModal: (modalContent: ModalContent) => void;
  closeModal: () => void;
  content: ModalContent | null;
}

// Context
const ModalContext = createContext<ModalInterface | undefined>(undefined);

// Context Hooks
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext provider missing");
  }
  return context;
};

// Context Providers
export const ModalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setModalStatus] = useState<boolean>(false);
  const [content, setContent] = useState<ModalContent | null>(null);

  const openModal = (modalContent: ModalContent) => {
    setModalStatus(true);
    setContent(modalContent);
  };

  const closeModal = () => {
    setModalStatus(false);
  };

  return (
    <>
      <ModalContext.Provider
        value={{ isModalOpen, closeModal, openModal, content }}
      >
        {children}
      </ModalContext.Provider>
    </>
  );
};
