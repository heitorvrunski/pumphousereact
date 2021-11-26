import { useEffect, useState } from "react";
import "./Toast.scss";

export default function Toast(props) {
  const [errorShow, setErrorShow] = useState(false);
  const [message, setMessage] = useState(...props.messageError);

  useEffect(() => {
    setMessage(props.messageError);

    if (props.messageError) setErrorShow(true);

    const timer = setTimeout(() => {
      setErrorShow(false);
      props.onChangeErrorMessage();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [props.messageError, props]);

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: "11" }}>
      <div
        className={
          "toast align-items-center toastFadeIn " +
          (errorShow === true ? " show " : " ") +
          props.className
        }
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex p-2">
          <h6 className="me-2"> ERROR:</h6> {message}
        </div>
      </div>
    </div>
  );
}
