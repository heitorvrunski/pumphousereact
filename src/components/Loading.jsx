import ReactLoading from "react-loading";

export default function Loading({ label }) {
  return (
    <div className="center-screen">
      <div className="d-flex flex-column align-items-center">
        <ReactLoading
          type="spokes"
          color="#ffffff"
          height={"40px"}
          width={"40px"}
        ></ReactLoading>
        <h6
          className="my-2 flex-wrap text-center"
          style={{ maxWidth: "220px" }}
        >
          {label ?? "Loading..."}
        </h6>
      </div>
    </div>
  );
}
