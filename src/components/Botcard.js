import React, { useEffect } from "react";
import { useState } from "react";
import { Alert } from "@mui/material";
import { ButtonGroup } from "@mui/material";

function Botcard({ message, handleSubmit }) {
  const [stateSet, setStateSet] = useState(false);
  const [messageAlert, setMessageAlert] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    if (!stateSet) {
      if (message.response.length > 0) {
        message.response.forEach((data) => {
          if (data.buttons) {
            setIsDisable(false);
          }
        });
        setStateSet(true);
      } else {
        setMessageAlert(true);
      }
    }
  }, [message, stateSet]);

  const handleButton = (e) => {
    setIsDisable(true);
    handleSubmit(e);
  };

  return (
    <React.Fragment>
      {messageAlert && (
        <Alert severity="error">Either No Connection or No Response</Alert>
      )}
      {message.response.length > 0 &&
        message.response.map(({ text, buttons, image }, index) => (
          <React.Fragment key={index}>
            {text && (
              <div className="d-flex flex-row justify-content-start mt-3">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                ></img>
                <div>
                  <p
                    className="small p-2 ms-3 mb-1 rounded-3"
                    style={{ backgroundColor: "#f5f6f7" }}
                  >
                    {text}
                  </p>

                  <p className="small ms-3 mb-3 rounded-3 text-muted">23:58</p>
                </div>
              </div>
            )}
            {image && (
              <div className="d-flex flex-row justify-content-start mt-3">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                ></img>
                <div>
                  <p
                    className="small p-2 ms-3 mb-1 rounded-3"
                    style={{ backgroundColor: "#f5f6f7" }}
                  >
                    <img src={image} alt="product-gallery"></img>
                  </p>

                  <p className="small ms-3 mb-3 rounded-3 text-muted">23:58</p>
                </div>
              </div>
            )}
            {buttons?.length > 0 && (
              <div className="d-flex flex-row justify-content-start mt-3">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                ></img>
                <div>
                  <ButtonGroup
                   orientation="vertical"
                   aria-label="vertical contained button group"
                   variant="contained"
                  >
                    {buttons.map(({ payload, title }, index) => (
                      <button
                        key={index}
                        value={payload}
                        onClick={(e) => handleButton(e)}
                        disabled={isDisable}
                      >
                        {" "}
                        {title}{" "}
                      </button>
                    ))}
                  </ButtonGroup>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
    </React.Fragment>
  );
}

export default Botcard;
