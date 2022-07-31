import React, { useEffect } from "react";
import { useState } from "react";
import { Alert } from "@mui/material";
import { ButtonGroup, Button } from "@mui/material";
import moment from "moment";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import MediaCard from "./Mediacard";
import { speak } from "../utils/speechsynthesis";
import Artyom from "./artyom";

const artyom = new Artyom();

function Botcard({ message, handleSubmit }) {
  const [stateSet, setStateSet] = useState(false);
  const [messageAlert, setMessageAlert] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    if (!stateSet) {
      if (message.response.length > 0) {
        message.response.forEach((data) => {
          if (data.text) {
            const textmsg = data.text;
            if (!textmsg.startsWith("You may select any product")) {
              if(artyom.speechSupported()){
                console.log("yes");
                artyom.say(textmsg, {
                  onStart: function () {
                    console.log("The text has been started.");
                  },
                  onEnd: function () {
                    console.log("The text has been finished.");
                  },
                });
              }else{
                console.log("no");
              }
             
              //
            }
          }
          if (data.buttons) {
            setIsDisable(false);

            let textmsg =
              "please click to select from the list of these " +
              data.buttons.length +
              ' items or, you can also say first, second, third. . .       Say, "START", to Speak, or "CLEAR", to retry.';

            artyom.say(textmsg);
            //speak(textmsg);
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

                  <p className="small ms-3 mb-3 rounded-3 text-muted">
                    {moment().format("LT")}
                  </p>
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
                    <MediaCard src={image}></MediaCard>
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
                      <Button
                        key={index}
                        value={payload}
                        onClick={(e) => handleButton(e)}
                        disabled={isDisable}
                      >
                        {" "}
                        {title}{" "}
                      </Button>
                    ))}
                  </ButtonGroup>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      <div>
        <SentimentVeryDissatisfiedIcon color="error"></SentimentVeryDissatisfiedIcon>
        <SentimentVerySatisfiedIcon color="success"></SentimentVerySatisfiedIcon>
      </div>
    </React.Fragment>
  );
}

export default Botcard;
