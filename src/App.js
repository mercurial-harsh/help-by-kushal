import { LinearProgress } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import Botcard from "./components/Botcard";
import Usercard from "./components/Usercard";
import uuidv4 from "./utils/utility";

function App() {
  const [userId, setUserId] = useState("");
  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setbotTyping] = useState(false);
  const listItems = useRef(null);

  useEffect(() => {
    if (!userId) {
      setUserId(uuidv4);
    }
  }, [userId]);

  useEffect(() => {
    const lastItem = listItems.current.lastElementChild;
    if (lastItem) {
      lastItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [chat]);

  const [mount, setMount] = useState(false);
  useEffect(() => {
    if (userId && !mount) {
      setMount(true);
      rasaAPI(userId, "Hi");
    }
  }, [userId, mount]);

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
      setbotTyping(true);
      setInputMessage("");
      rasaAPI(userId, value || inputMessage);
    } else {
      window.alert("Please enter valid message");
    }
  };

  const rasaAPI = async function handleClick(USER_ID, inputMessage) {
    //chatData.push({sender : "user", sender_id : name, msg : msg});
    await fetch("https://vaishali.ravitomar.in/webhooks/rest/webhook", {
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
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5" style={{ height: "100vh" }}>
          <div className="row d-flex justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-4">
              {/* <!-- Buttons trigger collapse --> */}
              <a
                className="btn btn-info btn-lg btn-block"
                data-mdb-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>Talk to V-AI-SHALLY</span>
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
                  {/* divider for signifiying today */}
                  {/* <div className="divider d-flex align-items-center mb-4">
                    <p
                      className="text-center mx-3 mb-0"
                      style={{ color: "#a2aab7" }}
                    >
                      Today
                    </p>
                  </div> */}
                  <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
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
                      <i className="fas fa-microphone"></i>
                    </a>
                    <a className="ms-3 text-muted" href="#!">
                      <i className="fas fa-smile"></i>
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
