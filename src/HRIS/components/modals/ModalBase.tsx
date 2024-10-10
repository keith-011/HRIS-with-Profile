import CloseIcon from "@mui/icons-material/Close";
import { useModalContext } from "../../context/HRISContext";
import DefaultButton from "../../../Shared/components/ui/button/DefaultButton";
import { modalFormId } from "../../../utils/Globals";

const ModalBase = () => {
  const { isModalOpen, closeModal, content } = useModalContext();
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 ${!isModalOpen && "hidden"}`}
        onClick={() => {
          closeModal();
        }}
      />
      <div
        className={`fixed right-0 top-0 z-50 flex w-full max-w-[700px] lg:w-2/5 ${!isModalOpen && "translate-x-full"} h-screen flex-col justify-between bg-accent-100 transition-transform duration-500 max-sm:w-full`}
      >
        <div className="flex items-center justify-between gap-3 bg-forest-200 p-6">
          <span>
            <h3 className="text-xl font-medium text-accent-50">
              {content?.header}
            </h3>
            <p className="text-sm text-accent-50">{content?.subheading} </p>
          </span>
          <button
            className="flex items-center justify-center self-start rounded-full bg-accent-50 p-2"
            onClick={closeModal}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="grow overflow-y-auto">{content?.content}</div>
        <div className="flex justify-between gap-6 bg-forest-200 px-6 py-8">
          <DefaultButton
            text="Cancel"
            handleClick={() => {
              closeModal();
            }}
            className="bg-forest-500 font-medium hover:bg-forest-600"
          />
          <DefaultButton
            formId={modalFormId}
            text="Submit"
            type="submit"
            handleClick={() => {
              // TO DO
            }}
            className="bg-forest-800 hover:bg-forest-900"
          />
        </div>
      </div>
    </>
  );
};

export default ModalBase;

// import CloseIcon from "@mui/icons-material/Close";
// import { useModalContext } from "../../context/HRISContext";
// import DefaultButton from "../../../Shared/components/ui/button/DefaultButton";
// import { modalFormId } from "../../../utils/Globals";

// const ModalBase = () => {
//   const { isModalOpen, closeModal, content } = useModalContext();
//   return (
//     <>
//       <div
//         className={`absolute z-40 min-h-screen w-full bg-black bg-opacity-50 ${!isModalOpen && "hidden"}`}
//         onClick={() => {
//           closeModal();
//         }}
//       />
//       <div
//         className={`absolute right-0 z-50 flex w-full max-w-[700px] lg:w-2/5 ${!isModalOpen && "translate-x-full"} h-screen flex-col justify-between bg-accent-100 transition-transform duration-500 max-sm:w-full`}
//       >
//         <div className="flex items-center justify-between gap-3 bg-forest-200 p-6">
//           <span>
//             <h3 className="text-xl font-medium text-accent-50">
//               {content?.header}
//             </h3>
//             <p className="text-sm text-accent-50">{content?.subheading} </p>
//           </span>
//           <button
//             className="flex items-center justify-center self-start rounded-full bg-accent-50 p-2"
//             onClick={closeModal}
//           >
//             <CloseIcon />
//           </button>
//         </div>
//         <div className="grow overflow-y-auto">{content?.content}</div>
//         <div className="flex justify-between gap-6 bg-forest-200 px-6 py-8">
//           <DefaultButton
//             text="Cancel"
//             handleClick={() => {
//               closeModal();
//             }}
//             className="bg-forest-500 font-medium hover:bg-forest-600"
//           />
//           <DefaultButton
//             formId={modalFormId}
//             text="Submit"
//             type="submit"
//             handleClick={() => {
//               // TO DO
//             }}
//             className="bg-forest-800 hover:bg-forest-900"
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ModalBase;
