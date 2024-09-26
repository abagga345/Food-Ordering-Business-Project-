import React from "react";

const ConfirmationModal = ({ modalData }) => {
  const { text1, text2, btn1Text, btn2Text, btn1Handler, btn2Handler } =
    modalData;

  return (
    <div className="fixed inset-0 flex flex-col gap-8 items-center justify-center z-50 backdrop-blur-sm">
      <div className="md:w-[25%] p-4 rounded-lg shadow-lg flex flex-col gap-2 bg-green-600">
        <p className="text-xl text-white font-semibold">{text1}</p>
        <p className="text-white text-sm">{text2}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={btn1Handler}
            className="px-4 py-2 bg-yellow-50 font-inter text-black rounded-md hover:bg-green-100 mr-2 font-semibold"
          >
            {btn1Text}
          </button>
          <button
            onClick={btn2Handler}
            className="px-4 py-2 text-white rounded-md "
          >
            {btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
