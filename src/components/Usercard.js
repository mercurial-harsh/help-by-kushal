import React from "react";
import moment from "moment";

function Usercard(props) {
  return (
    <React.Fragment>
      <div className="d-flex flex-row justify-content-end mb-4 pt-1">
        <div>
          <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
            {props.message}
          </p>
          <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
          {moment().format("LT")}
          </p>
        </div>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
          alt="avatar 1"
          style={{ width: "45px", height: "100%" }}
        ></img>
      </div>
    </React.Fragment>
  );
}

export default Usercard;
