import React from "react";

const AnswerModal = ({ answer, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2 className="modal-title">Recommended Restaurant</h2>
        <h1 className="modal-answer">{answer}</h1>
      </div>
    </div>
  );
};

export default AnswerModal;
