import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";

export default function ModalWrapper({ isOpen, onClose, title, children }) {
  const theme = useSelector((state) => state.theme.colors);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (isOpen) setPosition({ x: 0, y: 0 });
  }, [isOpen]);

  const handleMouseDown = (e) => {
    if (e.target.closest(".modal-content") || e.target.closest("button")) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        className={`relative z-50 rounded-lg shadow-xl ${theme.background.card} ${theme.text.primary} border ${theme.border.primary}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          minWidth: "500px",
          minHeight: "300px",
          maxWidth: "90vw",
          maxHeight: "90vh",
          resize: "both",
          overflow: "hidden",
          transition: isDragging ? "none" : "transform 0.2s ease",
          cursor: isDragging ? "grabbing" : "default",
        }}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 border-b ${theme.border.primary} cursor-grab active:cursor-grabbing`}
          onMouseDown={handleMouseDown}
        >
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className={`p-1 rounded-full ${theme.text.secondary} ${theme.text.action_hover}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div
          className="modal-content p-6 overflow-auto"
          style={{ maxHeight: "calc(90vh - 80px)" }}
        >
          {children}
        </div>

        {/* Resize indicator */}
        <div className="absolute bottom-1 right-2 text-gray-400 select-none pointer-events-none">
          ⇲
        </div>
      </div>
    </div>
  );
}
