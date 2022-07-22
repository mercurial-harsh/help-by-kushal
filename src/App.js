
import { LinearProgress } from '@mui/material';
import { useState,useEffect,useRef } from 'react';
import './App.css';
import Botcard from './components/Botcard';
import Usercard from './components/Usercard';




function App() {

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  
  const USER_ID = uuidv4();

  

    const [chat,setChat] = useState([]);
    const [inputMessage,setInputMessage] = useState('');
    const [botTyping,setbotTyping] = useState(false);
    const listItems = useRef(null);
    
    useEffect(() => {
      const lastItem = listItems.current.lastElementChild;
      if (lastItem) {
        lastItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, [chat]);

    


    const handleSubmit=(evt)=>{



        

        evt.preventDefault();
        
        const request_temp = {sender : "user", sender_id : USER_ID , msg : inputMessage};
        
        if(inputMessage !== ""){
            
            setChat(chat => [...chat, request_temp]);
            setbotTyping(true);
            setInputMessage('');
            rasaAPI(USER_ID,inputMessage);
        }
        else{
            window.alert("Please enter valid message");
        }
        
    }


    const rasaAPI = async function handleClick(name,msg) {
    
        //chatData.push({sender : "user", sender_id : name, msg : msg});
        

          await fetch('https://vaishali.ravitomar.in/webhooks/rest/webhook', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'charset':'UTF-8',
            },
            credentials: "same-origin",
            body: JSON.stringify({ "sender": USER_ID, "message": inputMessage }),
        })
        .then(response => response.json())
        .then((response) => {
            if(response){
                const temp = response[0];
                const recipient_id = temp["recipient_id"];
                const recipient_msg = temp["text"];        


                const response_temp = {sender: "bot",recipient_id : recipient_id,msg: recipient_msg};
                setbotTyping(false);
                
                setChat(chat => [...chat, response_temp]);
               // scrollBottom();

            }
        }) 
    }







  return (
    <div>
      <section style={{backgroundColor: '#eee'}}>
  <div className="container py-5" style={{height:"100vh"}}>

    <div className="row d-flex justify-content-center">
      <div className="col-md-8 col-lg-6 col-xl-4">

        {/* <!-- Buttons trigger collapse --> */}
        <a className="btn btn-info btn-lg btn-block" data-mdb-toggle="collapse" href="#collapseExample"
          role="button" aria-expanded="false" aria-controls="collapseExample">
          <div className="d-flex justify-content-between align-items-center">
            <span>Talk to V-AI-SHALLY</span>
            <i className="fas fa-chevron-down"></i>
          </div>
        </a>

        {/* <!-- Collapsed content --> */}
        <div className="collapse mt-3" id="collapseExample">
          <div className="card" id="chat4">
            <div>{botTyping ? <LinearProgress></LinearProgress> : null}</div>
            <div className="card-body" id="messagearea" ref={listItems} style={{position: 'relative', height:'500px',overflow:'auto'}}>

              
             

              
              {chat.map((user,key) => (
                                <div key={key}>
                                    {user.sender==='bot' ?
                                        <Botcard message={user.msg}></Botcard>

                                        :<Usercard message={user.msg}></Usercard>
                                    }
                                </div>
                            ))} 
                           
            </div>
              


              

              {/* divider for signifiying today */}
              {/* <div className="divider d-flex align-items-center mb-4">
                <p className="text-center mx-3 mb-0" style={{color: '#a2aab7'}}>Today</p>
              </div> */}

              

             

          

            <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                alt="avatar 3" style={{width: '40px', height: '100%'}}></img>
              
              <input type="text" onChange={e => setInputMessage(e.target.value)} value={inputMessage} className="form-control form-control-lg" id="exampleFormControlInput3"
                placeholder="Type message"></input>
              <a className="ms-1 link-info" href="#!"><i className="fas fa-microphone"></i></a>
              <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a>
              <a className="ms-3 link-info" href="#!"><i className="fas fa-paper-plane" onClick={handleSubmit}></i></a>  
                
              
              
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
