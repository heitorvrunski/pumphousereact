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
      <div className="modal-content bg-secundary" style={{ width: "300px" }}>
        <div className="d-flex m-2 flex-column">
          <h6 className="btn-Icon text-Mid" onClick={handleOnClose}>
            X
          </h6>
          {props.children}
        </div>
      </div>
    </div>
  );
}
