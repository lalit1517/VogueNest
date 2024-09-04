import React, { useState, useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  const [topHeight, setTopHeight] = useState(0);
  const [bottomHeight, setBottomHeight] = useState(0);

  const topPartRef = useRef<HTMLDivElement>(null);
  const bottomPartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topPartRef.current) {
      setTopHeight(topPartRef.current.offsetHeight);
    }
    if (bottomPartRef.current) {
      setBottomHeight(bottomPartRef.current.offsetHeight);
    }
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 z-[10000] duration-1000 transition-all ease-in-out`}
          onClick={onClose}
        />
      )}
      <div
        className={`fixed w-full md:w-1/2 lg:w-2/5 xl:w-[30%] h-[100vh] bg-[#f2f2f2] top-0 right-0 z-[11000] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="container container-xl-custom w-full h-[100vh] flex flex-col justify-between">
          <div
            ref={topPartRef}
            className="w-full text-end top-part bg-[#f2f2f2]"
          >
            <button
              onClick={onClose}
              className="py-4 font-bold cursor-pointer text-end text-[2rem]"
            >
              GO BACK
            </button>
            <div className="h-[1px] bg-black w-full absolute left-0 z-50"></div>
          </div>

          {/* Middle Part - Scrollable Cart Items */}
          <div
            style={{ top: topHeight, bottom: bottomHeight }}
            className="flex-grow overflow-y-auto py-8 w-full absolute left-0 middle-part"
          >
            {children}
          </div>

          <div
            ref={bottomPartRef}
            className="w-full bg-[#f2f2f2] absolute left-0 bottom-0 flex-col items-center justify-between end-part"
          >
            <div className="h-[1px] bg-black w-full"></div>
            <button
              form="userDetailsForm"
              type="submit"
              className="py-4 w-full text-center font-extrabold text-[2rem] bg-black text-white hover:bg-[#E53935] hover:text-black transition-all duration-300"
            >
              PROCEED TO PAY
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
