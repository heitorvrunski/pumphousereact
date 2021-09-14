import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div className="position-absolute top-50 start-50">
      <div className="d-flex flex-column align-items-center">
        <ReactLoading
          type="spokes"
          color="#ffffff"
          height={"40px"}
          width={"40px"}
        ></ReactLoading>
        <h6 className="my-2">Loading...</h6>
      </div>
    </div>
  );
}
