import { ComponentsData } from "@/views/library/ComponentsStore";
import React, { useState, useEffect, useRef } from "react";

export const ComponentsCards = (data: ComponentsData) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
  }, [showModal]);

  const closeOnBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) setShowModal(false);
  };

  return (
    <>
      {/* Card */}
      <div className="border border-teal-300 rounded-xl p-4 shadow-sm bg-white flex flex-col h-full">
        <div className="space-y-2 flex flex-col flex-1">
          <div className="flex gap-2 flex-wrap border-b border-teal-200 pb-2 justify-between items-center -mx-4 px-4">
            <h3 className="text-xl font-semibold">{data.name}</h3>

            <span className="text-sm bg-red-200 px-2 py-1 rounded-full font-semibold text-red-600">
              {data.tags}
            </span>
          </div>

          <div
            className="p-4 mt-3 flex-1 flex items-center justify-center cursor-pointer hover:bg-teal-50 rounded transition"
            onClick={() => setShowModal(true)}
          >
            {data.preview()}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          ref={modalRef}
          onClick={closeOnBackdrop}
          className="
            fixed inset-0 z-50 
            flex items-center justify-center 
            bg-black/40 backdrop-blur-sm
            transition
          "
        >
          <div
            className="
              bg-white border border-teal-300
              rounded-2xl shadow-2xl 
              max-w-4xl w-[92%] md:w-[80%]
              p-6 md:p-8
              animate-fadeInUp
              relative
            "
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="
                absolute top-3 right-3 
                text-gray-500 hover:text-gray-700 
                rounded-lg p-1
                hover:bg-gray-100
                transition
              "
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-5">{data.name}</h2>

            <div className="rounded-lg border border-slate-200 p-4 bg-gray-50">
              {data.preview()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComponentsCards;
