import React, { useRef, useState } from 'react';
import './Request.css'
import { AddRequest } from '../../../ApiCalls/ClientCall/CreateReq';
import Message from '../Message/Message';
import { Howl } from 'howler';
import ordertone from '../../images and tones/mewe.mp3'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreator } from '../../../Redux/index'

// import { isDisabled } from '@testing-library/user-event/dist/utils';


const Request = (props) => {


    ///using readux state here
    const dispatch = useDispatch();
    const { showloading, hideloading } = bindActionCreators(actionCreator, dispatch)
    const loading = useSelector(state => state.load)



    const [data, setData] = useState({ name: "", mobilenumber: "", location: "", address: "", servicetype: "", servicedate: "", servicetime: "" })


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
    const onchange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const cancelmessage = async (data) => {

        setNotification(data)
        setData({ name: "", mobilenumber: "", location: "", address: "", ServiceType: "0", servicedate: "", servicetime: "" })
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


    const inputnameRef = useRef(null)



    const ServiceLocations=['L B Nagar','Dilshuknagar','Malakpet','Nampally','Lakdi-ka-pul','Khairatabad','Panjagutta','Ameerpet','S R Nagar','Erragadda','Moosapet','Kukatpally'
                                ,'Nagole','Uppal','Habsiguda','Secunderabad','Begumpet','Yousufguda','Jubliee Hills','Madhapur','HITEC City','Musheerabad',
                                'Chikkadpally','MasabTank','Banjara Hills','Bahadurpura','Balapur','Santhosh Nagar','Kaarmanghat','Kothapet','Champapet','Shaikpet','Hastinapur',
                                'Hayatnagar','Mansoorabad','Vanastalipuram','Manikonda','HimayatNagar','Aram Ghar','Ibrahimpatnam','BN Reddy','Ramanthapur','Saroornagar','Narayanguda','MehendiPatnam','Gachibowli','Shamshabad','Golconda','TowliChowki','Shivrampally','Falaknuma','Koti']


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
                            cancel={cancelmessage} />


                    </>
                )}

            

            <div className=" iptextbox" id='bookingContainer'>
                    Book service Now
                </div>
            <div className="c-book-container">
                <div className="c-bookservice">
                    <div className="c-book-row">
                        <h2 className="c-book-column">
                            <span class="material-symbols-outlined">person</span>
                            Name <span className='text-orange'>*</span>
                        </h2>
                        <div className="c-book-column">
                        <input type='text' ref={inputnameRef} onChange={onchange} value={data.name} name="name" id="" placeholder='Enter Your Name' required />
                        </div>
                    </div> <div className="c-book-row">
                        <h2 className="c-book-column">
                            <span class="material-symbols-outlined">
                                call
                            </span>
                            MobileNumber <span className='text-orange'>*</span>
                        </h2>
                        <div className="c-book-column">
                        <input type='tel' className='' pattern="[6-9]{1}[0-9]{9}" title='Enter a valid mobile number' onChange={onchange} value={data.mobilenumber} name="mobilenumber" placeholder='Enter Mobile number' minLength={10} maxLength={10} />
                        </div>
                    </div> <div className="c-book-row">
                        <h2 className="c-book-column"><span class="material-symbols-outlined">
                            pin_drop
                        </span>
                            Location <span className='text-orange'> </span>
                        </h2>
                        <div className="c-book-column">
                        <select name="location" onChange={onchange} value={data.location} id="" required>
                            <option value={null} >---SELECT--- </option>
                        {ServiceLocations.sort().map((ele,index)=>{
                            return( <option value={ele}>{ele}</option>)
                        })}
                            {/* <option value="tolichowki">towlichoki</option>
                            <option value="malakpet">malakpet</option>
                            <option value="dilshuknagar">dilshuknagar</option>
                            <option value="charminar">charminar</option>
                            <option value="nampally">nampally</option> */}
                        </select>
                        </div>
                    </div> 
                    <div className="c-book-row">
                        <h2 className="c-book-column">
                            <span class="material-symbols-outlined">home_pin</span>
                            Address <span className='text-orange'> </span>
                        </h2>
                        <div className="c-book-column">
                        <textarea className='textarea' rows={4} type="text" onChange={onchange} value={data.address} name="address" placeholder='Enter Your address' required />
                        </div>
                    </div>
                    <div className="c-book-row">
                        <h2 className="c-book-column">
                        <span class="material-symbols-outlined">home_repair_service</span>
                            Service Type <span className='text-orange'> </span>
                        </h2>
                        <div className="c-book-column">
                        <select onChange={onchange} value={data.servicetype} name='servicetype' className=' req-select' id="">
                            <option value="0" defaultValue >---Select--- </option>
                            <option value="Regular AC Servicing" >General AC Service</option>
                            <option value="Ac Water Jet Service" > AC Water Jet Service</option>
                            <option value="Ac Water Jet With Foam Service" > AC Water Jet with Foam Service</option>
                            <option value="AC service + gas charging">AC service + gas charging</option>
                            <option value="ac gas charging">AC gas charging</option>
                            <option value="Ac installation">AC installation</option>
                            <option value="AC dismantle">AC dismantle</option>
                            <option value="AC shifting">AC shifting</option>
                            <option value="AC Annual Maintenance Contract">AC Annual Maintenance Contract</option>
                            <option value="Advance piping">Advance piping</option>
                            <option value="Other Ac Repairs">Other AC Repairs</option>
                            <option value="refrigerator  ">Refrigerator</option>
                            <option value="washing machine">Washing Machine</option>
                        </select>
                        </div>
                    </div>
                    <div className="c-book-row">
                        <h2 className="c-book-column">
                        <span class="material-symbols-outlined">event</span>
                            Service Date <span className='text-orange'> </span>
                        </h2>
                        <div className="c-book-column">
                        <input type="date" onChange={onchange} value={data.servicedate} name='servicedate' min={getCurrentDate()} max={getMaxDate()} />
                        </div>
                    </div> <div className="c-book-row">
                        <h2 className="c-book-column">
                        <span class="material-symbols-outlined">schedule</span>
                            Service Time <span className='text-orange'> </span>
                        </h2>
                        <div className="c-book-column">
                        <select onChange={onchange} value={data.servicetime} name='servicetime' className='requppercase' id="">
                            <option value="0" defaultValue >---Select--- </option>
                            <option value="9 Am - 12 Am" >9 Am - 12 am</option>
                            <option value="12 pm - 3 pm"> 12 pm - 3 pm</option>
                            <option value="3 pm - 6 pm">3 pm - 6 pm</option>
                            <option value="6 pm - 9 pm">6 pm - 9 pm</option>
                        </select>
                        </div>
                    </div><div className="c-book-row">
                        <h2 className="c-book-column">
                        <span class="material-symbols-outlined">notes</span>
                            Note <span className='text-orange'> </span>
                        </h2>
                        <div className="c-book-column">
                            <input type="text" />
                        </div>
                    </div> <div className="c-book-row">
                        <h2 className="c-book-column">
                            <span className=' invisible'>a</span>
                        </h2>
                        <div className="c-book-column">
                        <button type='submit' onClick={handleRequest}
                            disabled={
                                data.name.length < 3 ||
                                data.mobilenumber.length !== 10 || loading

                            }>
                            {
                                !(data.name.length > 3 &&
                                    data.mobilenumber.length === 10) && ("Fill Details To ")
                            }
                            Book service</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Request;
