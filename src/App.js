import { LinearProgress } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import Botcard from "./components/Botcard";
import Usercard from "./components/Usercard";
import uuidv4 from "./utils/utility";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { speak, chooseVoice } from "./utils/speechsynthesis";

function App() {
  const [userId, setUserId] = useState("");
  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setbotTyping] = useState(false);
  const listItems = useRef(null);
  const [listen, setListen] = useState(false);
  // const [chatMessages, setChatMessages] = useState([]);
  const [timer, setTimer] = useState(null);
  const [visible, setVisible] = useState(false);

  const commands = [
    {
      command: "Start",
      callback: (command) => {
        console.log("Start recognized");
        setListen(true);
        speechSynthesis.cancel();
        resetTranscript();
      },
      fuzzyMatchingThreshold: 0.6,
      isFuzzyMatch: true,
      matchInterim: true,
    },
    {
      command: "clear",
      callback: (command) => {
        console.log("Clear triggered");
        resetTranscript();
      },
      fuzzyMatchingThreshold: 0.6,
      isFuzzyMatch: true,
      matchInterim: true,
    },
  ];

  const { transcript, listening, finalTranscript, resetTranscript } =
    useSpeechRecognition({
      commands,
    });

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
  }, []);

  useEffect(() => {
    if (!listen) return;

    clearTimeout(timer);

    const newTimer = setTimeout(
      () => voiceSubmit(finalTranscript, userId),
      3000
    );
    setTimer(newTimer);
  }, [transcript, finalTranscript, listen]);

  useEffect(() => {
    if (!userId) {
      setUserId(uuidv4);
      chooseVoice("Veena");
    }
  }, [userId, chooseVoice()]);

  useEffect(() => {
    const lastItem = listItems.current.lastElementChild;
    if (lastItem) {
      lastItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [chat]);

  const [mount, setMount] = useState(false);
  useEffect(() => {
    if (userId && visible) {
      setMount(true);
      rasaAPI(userId, "Hi");
    }
  }, [userId, visible]);

  const voiceSubmit = (transcript, userId) => {
    const request_temp = {
      senderType: "user",
      sender_id: userId,
      msg: transcript,
    };

    if (transcript !== "") {
      setChat((prevState) => [...prevState, request_temp]);
      setbotTyping(true);

      rasaAPI(userId, transcript);
      setListen(false);
      // resetTranscript();
    } else {
      speak("sorry I didnt hear anything from you");
      document.getElementById("failsafe").innerText =
        "sorry I didnt hear anything from you";
      setTimeout(setListen(false), 1000);
    }
  };

  const enterSubmit = (message, userId) => {
    const request_temp = {
      senderType: "user",
      sender_id: userId,
      msg: message,
    };

    if (message !== "") {
      setChat((prevState) => [...prevState, request_temp]);
      setbotTyping(true);
      console.log(userId);
      rasaAPI(userId, message);
      setListen(false);
      // resetTranscript();
    }
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        // 👇️ call submit function here
        enterSubmit(event.target.value, userId);
        setInputMessage("");
      }
    };

    document
      .getElementById("exampleFormControlInput3")
      .addEventListener("keydown", keyDownHandler);
    return () => {
      document
        .getElementById("exampleFormControlInput3")
        .removeEventListener("keydown", keyDownHandler);
    };
  }, [userId]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const { value } = evt.target;

    const request_temp = {
      senderType: "user",
      sender_id: userId,
      msg: inputMessage,
    };
    setInputMessage(value);
    if (inputMessage !== "" || value) {
      setChat((prevState) => [...prevState, request_temp]);
      console.log(chat);
      setbotTyping(true);
      setInputMessage("");
      rasaAPI(userId, value || inputMessage);
    } else {
      window.alert("Please enter valid message");
    }
  };

  const rasaAPI = async function handleClick(USER_ID, inputMessage) {
    //chatData.push({sender : "user", sender_id : name, msg : msg});
    await fetch("http://34.86.33.139/webhooks/rest/webhook", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        charset: "UTF-8",
      },
      credentials: "same-origin",
      body: JSON.stringify({ sender: USER_ID, message: inputMessage }),
    })
      .then((res) => res.json())
      .then((response) => {
        // Set bot response and toggle typing indicator
        const response_temp = { senderType: "bot", msg: { response } };
        setbotTyping(false);
        setChat((prevState) => [...prevState, response_temp]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <section className="gradient-custom">
        <div className="container py-5" style={{ height: "100vh" }}>
          <div className="row d-flex justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-4">
              {/* <!-- Buttons trigger collapse --> */}
              <a
                className="btn btn-info btn-lg btn-block"
                aria-expanded="false"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>
                    Say <span style={{ color: "red" }}> "START" </span>to Speak,{" "}
                    <span style={{ color: "red" }}> "CLEAR" </span> to Retry
                  </span>
                </div>
              </a>
              <a
                className="btn btn-info btn-lg btn-block"
                data-mdb-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                onClick={() => setVisible(true)}
              >
                <div
                  className="d-flex justify-content-between align-items-center"
                  id="gradientglass"
                >
                  <span>
                    <p style={{ fontVariant: "normal" }}>
                      Welcome to the World of{" "}
                      <span style={{ fontSize: "15px", color: "#200baa" }}>
                        Conversational AI
                      </span>{" "}
                      (Click to Start)
                    </p>
                  </span>
                  <i className="fas fa-chevron-down"></i>
                </div>
              </a>

              {/* <!-- Collapsed content --> */}
              <div className="collapse mt-3" id="collapseExample">
                <div className="card" id="chat4">
                  <div>{botTyping ? <LinearProgress /> : null}</div>
                  <div
                    className="card-body"
                    id="messagearea"
                    ref={listItems}
                    style={{
                      position: "relative",
                      height: "500px",
                      overflow: "auto",
                    }}
                  >
                    {chat.map((user, key) => {
                      return (
                        <div key={key}>
                          {user.msg &&
                            (user.senderType === "bot" ? (
                              <Botcard
                                message={user.msg}
                                handleSubmit={handleSubmit}
                              ></Botcard>
                            ) : (
                              <Usercard message={user.msg} />
                            ))}
                        </div>
                      );
                    })}
                  </div>

                  <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                    {listen && (
                      <div className="mask mask-custom">
                        <span style={{ color: "white" }}>
                          <h1 id="failsafe">{transcript}</h1>
                        </span>
                      </div>
                    )}
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      alt="avatar 3"
                      style={{ width: "40px", height: "100%" }}
                    ></img>

                    <input
                      type="text"
                      onChange={(e) => setInputMessage(e.target.value)}
                      value={inputMessage}
                      className="form-control form-control-lg"
                      id="exampleFormControlInput3"
                      placeholder="Type message"
                    ></input>
                    <a className="ms-1 link-info" href="#!">
                      <i
                        className="fas fa-microphone"
                        style={{ color: "red" }}
                      ></i>
                    </a>
                    <a className="ms-3 link-info" href="#!">
                      <i
                        className="fas fa-paper-plane"
                        onClick={handleSubmit}
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
