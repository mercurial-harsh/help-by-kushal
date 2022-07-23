import React from "react";
import { useState } from "react";
import { Alert } from "@mui/material";
import { ButtonGroup, Button } from "@mui/material";


function Botcard({ message }) {

  const [stateset, setStateset] = useState(false);
  const [messagealert, setMessagealert] = useState(false);
  const [textmsg, setTextmsg] = useState('');
  const [buttonvalues, setButtonvalues] = useState(false);
  const [gallery, setGallery] = useState(null);

  const [buttonsarraycomponent,setButtonsarraycomponent] = useState([]);





  (() => {

    if (!stateset) {
      if (Object.keys(message).length < 1) {
        setMessagealert(true);
      }
      else {
        if ((message.response[0].hasOwnProperty("text"))) {
          setTextmsg(message.response[0].text)
        }
        if ((message.response[0].hasOwnProperty("image"))) {
          setGallery(message.response[0].image)
        }
        if ((message.response[0].hasOwnProperty("buttons"))) {
          if(!buttonvalues){
            const buttonsarray = message.response[0].buttons;
          let i = 0;
          buttonsarray.forEach(element => {
            setButtonsarraycomponent(old=>[...old,{id:i,payload:element.payload,title:element.title}]); i++;

          });

          

          
          setButtonvalues(true);
          }
          
          



        }


      }
      setStateset(true);
    }





  })();






  return (

    <React.Fragment>


      {
        (messagealert && stateset) ? <Alert severity="error">Either No Connection or No Response</Alert> : null
      }
      {(textmsg && stateset) ?
        <div className="d-flex flex-row justify-content-start">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
            alt="avatar 1" style={{ width: '45px', height: '100%' }}></img>
          <div>
            <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: '#f5f6f7' }}>{textmsg}</p>

            <p className="small ms-3 mb-3 rounded-3 text-muted">23:58</p>
          </div>
        </div> : null
      }
      {(gallery && stateset) ?
        <div className="d-flex flex-row justify-content-start">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
            alt="avatar 1" style={{ width: '45px', height: '100%' }}></img>
          <div>
            <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: '#f5f6f7' }}>
              <img src={gallery} alt="product-gallery"></img>

            </p>

            <p className="small ms-3 mb-3 rounded-3 text-muted">23:58</p>
          </div>
        </div> : null
      }
      {(buttonvalues && buttonsarraycomponent&&stateset) ?
        <div className="d-flex flex-row justify-content-start">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
            alt="avatar 1" style={{ width: '45px', height: '100%' }}></img>
          <div>
          <ButtonGroup>
          {buttonsarraycomponent.map(({ payload, title, id },index) => (
              <button key={index} value={payload}> {title} </button>
          ))}



          </ButtonGroup>
            
          
            
          </div>
        </div> : null
      }

    </React.Fragment>
  )




}

export default Botcard;