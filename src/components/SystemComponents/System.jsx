import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiNode } from "../../middleware/thunk";
import Select from "react-select";
import Loading from "./Loading";
import update from "react-addons-update";
import Toast from "./Toast";
import Actions from "../../store/actions";
import { useHistory } from "react-router";
import Modal from "./Modal";
import Button from "./Button";
const UsersConfig = () => {
  const history = useHistory();
  const listGroup = [
    { value: "admin", label: "admin" },
    { value: "guest", label: "guest" },
  ];
  const usersRedux = useSelector((state) => state.Users.Users);
  const messageError = useSelector((state) => state.Users.MessageError);
  const [users, setUsers] = useState({});
  const [modalUser,setModalUser] = useState(false)
  const [modalNode,setModalNode] = useState(false)

  const [deleteUser,setDeleteUser] = useState({})

  const [newUser, setNewUser] = useState({
    user: "",
    password: "",
    group: "guest",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(usersRedux).length === 0) {
      dispatch(ApiNode.GetUsers());
    } else {
      var userAux = [];
      for (const user of usersRedux) {
        userAux.push({
          user: user.user,
          block: user.block,
          group: user.group,
          isEdit: false,
        });
      }
      setUsers(userAux);
    }
  }, [usersRedux, dispatch]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSelectedChange = (event) => {
    setNewUser((prevState) => ({
      ...prevState,
      group: event.value,
    }));
  };

  const handleSelectedMapChange = (index) => (event) => {
    const usersAtt = update(users, {
      [index]: {
        group: { $set: event.value },
      },
    });

    setUsers(
      update(usersAtt, {
        [index]: {
          isEdit: { $set: compareUsers(index, usersAtt) },
        },
      })
    );
  };

  const handleCheckBoxMapChange = (index) => (event) => {
    const usersAtt = update(users, {
      [index]: {
        block: { $set: event.target.checked },
      },
    });

    setUsers(
      update(usersAtt, {
        [index]: {
          isEdit: { $set: compareUsers(index, usersAtt) },
        },
      })
    );
  };

  function compareUsers(index, usersAtt) {
    const user = usersAtt[index];
    const userRedux = usersRedux[index];

    if (
      user.user !== userRedux.user ||
      user.group !== userRedux.group ||
      user.block !== userRedux.block
    ) {
      return true;
    } else {
      return false;
    }
  }

  const handleCreateUser = (event) => {
    event.preventDefault();
    if (newUser.user !== "" && newUser.password !== "") {
      dispatch(ApiNode.CreateUser(newUser));
    }
  };

  const handleEditUser = (index) => (event) => {
    const user = users[index];
    if (user.isEdit === true) dispatch(ApiNode.EditUser(user));
  };

  const handleDeleteUser = (index) => (event) => {
    const user = users[index];
    setModalUser(true)
    setDeleteUser(user);
    //dispatch(Actions.SetModalUser(user, true));
  };

  const onChangeErrorMessage = (event) => {
    dispatch(Actions.SetMessageError(""));
  };
  const seeLogs = (event) => {
    history.push("/system/TG9nc1N5c3RlbQ==");
  };

  const handleOnCloseModal = (modal) => event =>{
    if(modal===0)
      setModalUser(false)
    else{
      setModalNode(false)
    }
  }

  const handleOnDelete = (event) => {
    dispatch(ApiNode.DeleteUser(deleteUser));
    setModalUser(false)
  };

  const handleOnRestartNode = e =>{
    dispatch(ApiNode.RestartNode());

  }

  return (
    <div className="justify-content-center d-flex ">
        <div className="mx-2 w-100" style={{maxWidth:"520px"}}>


        <div className="row m-0" >
          <h5>Logs</h5>
          <Button className="btn btn-principal m-2 mt-0" style={{width:"auto"}} onClick={seeLogs}>See Logs</Button>
        </div>
        <div className="row m-0" >
          <h5>Restart Back-End in Docker</h5>
          <Button className="btn btn-danger m-2 mt-0" style={{width:"auto"}} onClick={()=>{setModalNode(true)}}>Restart</Button>
        </div>
    {Object.keys(users).length === 0 ? (
    <Loading />
  ) : (
    <>
      <div className="row m-0" >
        <h5>Users</h5>
      </div>

      <div className="row card m-2" >
        <div className="card-body">
        <h5 className="card-title">New User</h5>
          <form onSubmit={handleCreateUser}>
            <label className="sr-only">Login</label>
            <input
              type="text"
              className="form-control"
              placeholder="user"
              name="user"
              required=""
              autoFocus=""
              onChange={handleInputChange}
            ></input>
            <label htmlFor="inputPassword" className="sr-only">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              required=""
              onChange={handleInputChange}
            ></input>
            <label htmlFor="inputPassword" className="sr-only">
              Group
            </label>

            <Select
              defaultValue={{ value: newUser.group, label: newUser.group }}
              options={listGroup}
              onChange={handleSelectedChange}
            />
            <Button
              type="submit"
              className="btn btn-principal m-0 text-nowrap mx-0 mt-1"
            >
              Create User
            </Button>
          </form>
        </div>
        
      </div>
      <div className="row card m-2" >
        <div className="card-body">
          <h5 className="card-title">List of Users</h5>


          <div className="table-responsive">
          <table
            className="table overflow-auto"
            style={{ minWidth: "350px" }}
          >
            <thead>
              <tr>
                <th scope="col">UserName</th>
                <th scope="col">Group</th>
                <th scope="col flex-wrap">Blocked</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((data, index) => (
                <tr key={index}>
                  <td> {data.user}</td>
                  <td style={{ minWidth: "130px" }}>
                    <Select
                      defaultValue={{
                        value: data.group,
                        label: data.group,
                      }}
                      options={listGroup}
                      onChange={handleSelectedMapChange(index)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={data.block}
                      value={data.block}
                      onChange={handleCheckBoxMapChange(index)}
                    ></input>
                  </td>
                  <td>
                    <div className="d-flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        className={
                          (data.isEdit ? "" : "deactivate-Icon") +
                          " btn-Icon icon-ok me-2"
                        }
                        onClick={handleEditUser(index)}
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        className="btn-Icon icon-danger"
                        onClick={handleDeleteUser(index)}
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

      </div>

      <Toast
        messageError={messageError}
        className="bg-danger text-white"
        onChangeErrorMessage={onChangeErrorMessage}
      />
      <Modal isOpen={modalUser} handleOnClose={handleOnCloseModal(0)}>
        <h5>Are you sure? This action cannot be undone</h5>
          <div className="d-flex flex-row justify-content-end">
            <button className="btn btn-principal mx-2" onClick={handleOnDelete}>
              {" "}
              Yes
            </button>
            <button className="btn btn-principal" onClick={handleOnCloseModal(0)}>
              {" "}
              No
            </button>
        </div>
      </Modal>

      <Modal isOpen={modalNode} handleOnClose={handleOnCloseModal(1)}>
        <h5>Are you sure? The system will not be available for a few seconds</h5>
          <div className="d-flex flex-row justify-content-end">
            <button className="btn btn-principal mx-2" onClick={handleOnRestartNode}>
              {" "}
              Yes
            </button>
            <button className="btn btn-principal" onClick={handleOnCloseModal(1)}>
              {" "}
              No
            </button>
        </div>
      </Modal>
    </>
    )}
    </div>
    </div>

  
  )
};

export default UsersConfig;
