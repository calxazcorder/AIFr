

// const Waiting = ({onClose}) => { 

//     return (<>
    
//     <div className="modal-overlay" onClick={onClose}>
//       <div
//         className="modal-content"
//         onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
//       >
//         {/* <button className="modal-close" onClick={onClose}> */}
//           {/* × */}
//         {/* </button> */}

//         {/* <h2 className="modal-title">Recommended Restaurant</h2> */}
//         <h1 className="modal-answer">please let the AI model cook</h1>
//       </div>
//     </div>
    
//     </>)
// }

// export default Waiting;


const Waiting = ({ onClose }) => {
  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <h1 className="modal-answer">waiting for prediction</h1>

          {/* Spinner */}
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .modal-content {
          background: #fff;
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
          position: relative;
          min-width: 300px;
        }

        .modal-answer {
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }

        /* Spinner */
        .spinner {
          display: inline-block;
          position: relative;
          width: 50px;
          height: 50px;
        }

        .spinner div {
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: 40px;
          height: 40px;
          margin: 6px;
          border: 4px solid #ff4500;
          border-radius: 50%;
          animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          border-color: #ff4500 transparent transparent transparent;
        }

        .spinner div:nth-child(1) {
          animation-delay: -0.45s;
        }
        .spinner div:nth-child(2) {
          animation-delay: -0.3s;
        }
        .spinner div:nth-child(3) {
          animation-delay: -0.15s;
        }

        @keyframes spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Waiting;
