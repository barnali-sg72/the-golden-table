import ReactDOM from 'react-dom';

function Dialog({ title, children, onClose }) {
    return ReactDOM.createPortal(
      <div className='modal'>
        <dialog open>
          {children}
          <button className="bg-yellow" onClick={onClose}>Ok</button>
        </dialog>
      </div>
      , document.getElementById("portal")
    );
  }
  export default Dialog;