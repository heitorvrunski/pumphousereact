import { useDispatch, useSelector } from "react-redux";
import { ApiNode } from "../middleware/thunk";
import Actions from "../store/actions";

export function UserModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.Users.modelIsOpen);
  const user = useSelector((state) => state.Users.userDeleting);

  const handleOnClose = (event) => {
    dispatch(Actions.SetModalUser({}, false));
  };
  const handleOnDelete = (event) => {
    dispatch(ApiNode.DeleteUser(user));

    dispatch(Actions.SetModalUser({}, false));
  };
  return (
    <div
      className="modal"
      style={isOpen ? { display: "flex" } : { display: "none" }}
    >
      <div className="modal-content" style={{ width: "300px" }}>
        <div className="d-flex m-2 flex-column">
          <h6 className="btn-Icon" onClick={handleOnClose}>
            X
          </h6>
          <h5>Are you sure? This action cannot be undone</h5>
          <div className="d-flex flex-row justify-content-end">
            <button className="btn btn-principal mx-2" onClick={handleOnDelete}>
              {" "}
              Yes
            </button>
            <button className="btn btn-principal" onClick={handleOnClose}>
              {" "}
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
