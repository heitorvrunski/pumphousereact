export default function Modal(props) {
    const isOpen= props.isOpen;
  
    const handleOnClose = (event) => {
      props.handleOnClose();
    };
    return (
      <div
        className="modal"
        style={isOpen ? { display: "flex" } : { display: "none" }}
      >
        <div className="modal-content" style={{ width: "300px" }}>
          <div className="d-flex m-2 flex-column">
            <div className="d-flex flex-row">
              <svg className="btn-Icon" onClick={handleOnClose} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              <h6 className="ms-2 mb-0">{props.header}</h6>
            </div>
            
            {props.children}
          </div>
        </div>
      </div>
    );
  }
  