import React from 'react';
import cross from '../imgClient/navlogo/bgcross.png'
import './Message.css'
import success from '../imgClient/addgif.gif';

const Message = (props) => {

    const cancle = props.cancel;
    const handlecancle = async(e)=>{
        e.preventDefault();
     

        const data = false
       await cancle(data);
    }
    setTimeout(() => {
        const gif = document.getElementById('successgif')
        const msg = document.getElementById('fullmessage')
        const fullbg = document.getElementById('msgclose');
        gif.style.display='none';
        fullbg.style.backgroundColor="rgba(0, 0, 0, 0.782)";
        msg.style.display='inline';
        
    }, 2000);
  return (
    <>
    <div className="fullscreen" id='msgclose'>
        <button onClick={handlecancle}>
            <img src={cross} alt="" />
        </button>
        <div className="msgcenter" id='fullmessage'>
            <div className="msghead">
            Service Booked 
                <span className='orangecolor'> Succesfully
                <span class="material-symbols-outlined">
verified
</span>
                 </span>
               
            </div>
            <div className="msgbody">
               Booking Details
               <table className='msgtable'>
                <tbody>
                <tr>
                    <td className="dleft">Name :</td>
                    <td className="dright">{props.Name}</td>
                </tr>
                <tr>
                    <td className="dleft">Mobile :</td>
                    <td className="dright">{props.mobilenumber}</td>
                </tr> <tr>
                    <td className="dleft">Locaiton :</td>
                    <td className="dright">{props.location}</td>
                </tr> <tr>
                    <td className="dleft">Address :</td>
                    <td className="dright address">{props.Address}</td>
                </tr>
                <tr>
                    <td className="dleft">Service Type :</td>
                    <td className="dright">{props.Type}</td>
                </tr>
                <tr>
                    <td className="dleft">Date :</td>
                    <td className="dright">{props.Date}</td>
                </tr><tr>
                    <td className="dleft">Time :</td>
                    <td className="dright">{props.Time}</td>
                </tr>
                </tbody>
               </table>
             
            </div>
            <div className="greetmsg">
                ThankYou For Booking Our Service
            </div>
            <div className="greetfooter">
                For Any Queries regarding Your Booking Plese call 8919168521
            </div>
        </div>
        <div className="servicegif" id='successgif'>
            <img  src={success} alt="" />

        </div>
        
        
        
    </div>
    </>
  );
}

export default Message;
