import React,{useState} from 'react';
import './Request.css'
import { AddRequest } from '../../../ApiCalls/ClientCall/CreateReq';
import Message from '../Message/Message';
import { Howl } from 'howler';
import ordertone from '../../images and tones/mewe.mp3'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {actionCreator} from '../../../Redux/index'

// import { isDisabled } from '@testing-library/user-event/dist/utils';


const Request = (props) => {


    ///using readux state here
    const dispatch = useDispatch();
    const {showloading,hideloading} = bindActionCreators(actionCreator,dispatch)
    const loading = useSelector(state=>state.load)



    const [data, setData] = useState({ name: "", mobilenumber: "", location: "", address: "",servicetype:"" ,servicedate: "", servicetime: "" })


    const [notification, setNotification] = useState(false);
    const [notifydata, setNotiydata] = useState(null);


    const handleRequest = async (e) => {
        showloading()
        e.preventDefault();
            const res = await AddRequest(data);
            const sound = new Howl({
                src: [ordertone]
            });
            sound.play();
            
            if (res.success) {
                hideloading();
                setData({ ...data, [e.target.name]: null });
                setNotification(true);
                setNotiydata(data);
                console.log(res);
            } else {
                hideloading();
                console.log('something went wrong, please try again');
            }
    }
    const onchange = (e)=>{
setData({...data,[e.target.name]:e.target.value})
    }

    const cancelmessage= async(data)=> {
        
        setNotification(data)
        setData({ name: "", mobilenumber: "", location: "", address: "",ServiceType:"0" ,servicedate: "", servicetime: ""})
    }

    // taking the date for the servicedate feild for which the date should be selected
    const today = new Date();
    const today_1 = new Date();
    today_1.setDate(today.getDate() + 1);
    const today_2 = new Date();
    today_2.setDate(today.getDate() + 2);
    const today_3 = new Date();
    today_3.setDate(today.getDate() + 3);
    const today_4 = new Date();
    today_4.setDate(today.getDate() + 4);
    const today_5 = new Date();
    today_5.setDate(today.getDate() + 5);
    const today_6 = new Date();
    today_6.setDate(today.getDate() + 6);


    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const getMaxDate = () => {
        const currentDate = new Date();
        const maxDate = new Date(currentDate);
        maxDate.setDate(currentDate.getDate() + 7);
    
        const year = maxDate.getFullYear();
        const month = (maxDate.getMonth() + 1).toString().padStart(2, '0');
        const day = maxDate.getDate().toString().padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    };





  return (
    <>
    {notification && notifydata &&
        (
        <>
       
    
            <Message
                Name={notifydata.name}
                mobilenumber={notifydata.mobilenumber}
                location={notifydata.location}
                Address={notifydata.address}
                Type={notifydata.servicetype}
                Date={notifydata.servicedate}
                Time={notifydata.servicetime} 
                cancel={cancelmessage}/>
               

        </>
        )}

    <div className="services-container">
        <div className=" iptextbox">
            Book service Now 
        </div>
        <form action="post">
        <div className="ipbox">
            <label htmlFor="Name" className='reqlabel'>name</label>
            <input type='text' onChange={onchange} value={data.name} name="name" id="" placeholder='Enter Your Name' required/>
        </div>
        <div className="ipbox">
            <label htmlFor="MobileNumber" className='reqlabel'>Mobile number</label>
            <input type='tel' className='' pattern="[6-9]{1}[0-9]{9}" title='Enter a valid mobile number' onChange={onchange} value={data.mobilenumber} name="mobilenumber" placeholder='Enter Mobile number' minLength={10} maxLength={10} />
        </div>
        <div className="ipbox">
            <label htmlFor="location" className='reqlabel'>Location</label>
            <select name="location" onChange={onchange} value={data.location} id="" required>
                <option value={null} >---SELECT--- </option>
                <option value="tolichowki">towlichoki</option>
                <option value="malakpet">malakpet</option>
                <option value="dilshuknagar">dilshuknagar</option>
                <option value="charminar">charminar</option>
                <option value="nampally">nampally</option>
            </select>
        </div>
        <div className="ipbox">
            <label htmlFor="Name" className='reqlabel'>Address</label>
            <textarea className='textarea' rows={4} type="text" onChange={onchange} value={data.address} name="address" placeholder='Enter Your address' required />
        </div>
        <div className="ipbox">
            <label htmlFor="Service Time" className="reqlabel ">Select Service</label>
            <select onChange={onchange} value={data.servicetype} name='servicetype' className='requppercase' id="">
            <option value="0" defaultValue >---Select--- </option>
                <option value="Regular AC Servicing" >Regular AC Servicing</option>
                <option value="AC service + gas charging">AC service + gas charging</option>
                <option value="ac gas charging">ac gas charging</option>
                <option value="Ac installation">Ac installation</option>
                <option value="AC dismantle">AC dismantle</option>
                <option value="AC shifting">AC shifting</option>
                <option value="Advance piping">Advance piping</option>
            </select>
        </div>

        <div className="ipbox">
            <label htmlFor="serviceDate" className="reqlabel">service date</label>
            {/* <select onChange={onchange} value={data.servicedate} name='servicedate' id="">
                <option value="0" defaultValue  >---  SELECT --- </option>
                <option value={today.toDateString()} >{today.toDateString()} today </option>
                <option value={today_1.toDateString()} >{today_1.toDateString()} tomorrow </option>
                <option value={today_2.toDateString()} >{today_2.toDateString()}  </option>
                <option value={today_3.toDateString()} >{today_3.toDateString()}  </option>
                <option value={today_4.toDateString()} >{today_4.toDateString()}  </option>
                <option value={today_5.toDateString()} >{today_5.toDateString()}  </option>
                <option value={today_6.toDateString()} >{today_6.toDateString()}  </option>

            </select> */}
            <input type="date" onChange={onchange} value={data.servicedate} name='servicedate' min={getCurrentDate()} max={getMaxDate()}/>

        </div>
        <div className="ipbox">
            <label htmlFor="Service Time" className="reqlabel ">Serive Time</label>
            <select onChange={onchange} value={data.servicetime} name='servicetime' className='requppercase' id="">
            <option value="0" defaultValue >---Select--- </option>
                <option value="8 Am - 10 Am" >8 Am - 10 am</option>
                <option value="10 Am - 12 pm">10 am - 12 pm</option>
                <option value="12 pm - 2 pm">12 pm - 2 pm</option>
                <option value="2 pm - 4 pm">2 pm - 4 pm</option>
                <option value="4 pm - 6 pm">4 pm - 6 pm</option>
            </select>
        </div>


        <div className="ipbox ipsubbox">
            <label htmlFor="none" className='invisible'>d</label>
           
            <button type='submit' onClick={handleRequest} 
            disabled = {
                data.name.length<3||
                data.mobilenumber.length!==10||loading
                
            }>
                    {
                !(data.name.length>3&&
                data.mobilenumber.length===10)&&("fill details to ")
            }

                Book service</button>
        </div>
        </form>
    </div>
</>
  );
}

export default Request;
