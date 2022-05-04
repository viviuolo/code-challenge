import ReactDOM from "react-dom";
import "./modal.sass";

interface IProps {
  onClose: any,
  children: any
}

const Modal = (props: IProps) => {
  return ReactDOM.createPortal(
    <div
      className="modal-container ui dimmer modals visible active"
      onClick={props.onClose}
    >
      <div
        className="modal-content ui standard modal visible active"
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>,
    (document as any).querySelector("#modal")
  );
};

export default Modal;
