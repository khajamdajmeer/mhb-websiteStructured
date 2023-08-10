import React, { useEffect, useState } from 'react';
import './ViewRequest.css'
import { ViewRequests,UpdateRequest,forwordRequest } from '../../../../ApiCalls/ManagerCalls/RequestCall';

const ViewRequest = () => {

    const [data, setData] = useState([
        {
            _id: "", name: "", mobileNumber: "", Location: "", Address: "", ServiceDate: "", ServiceTime: "", ServiceType: '',
            Requestdate: "",
            __v: ""
        }
    ])

    const [showingdata, setShowingdata] = useState({
        _id: "", name: "", mobileNumber: "", Location: "", Address: "", ServiceType: '', ServiceDate: "", ServiceTime: "",
        Requestdate: "",
        __v: ""
    })

    const [showupdate, setShowupdate] = useState(true);
    const [showview, setShowview] = useState(false);
    const [updatedata, setUpdatedata] = useState({
        _id: "", name: "", mobileNumber: "", Location: "", Address: "", ServiceType: '', ServiceDate: "", ServiceTime: "",
        Requestdate: "", __v: ""
    })

    const onchange = (e) => {
        // e.preventDefault();
        setUpdatedata({ ...updatedata, [e.target.name]: e.target.value })
    }


    const handleviewdata = (index) => {
        setShowview(true)
        setShowupdate(false)
        setShowingdata(data[index])
    }


    const handelEdit = (showingdata) => {
        setShowupdate(true);
        setShowview(false);
        setUpdatedata(showingdata)
    }

    const onMount = async () => {

        const res = await ViewRequests();
        setData(res)
        console.log(res)
        setShowview(true)
        setShowupdate(false)
    }

    useEffect(() => {
        onMount();

    }, [])

const handleupdate=async()=>{
   const res = await UpdateRequest(updatedata);
   console.log(res);
   if(res.success){
    setShowview(true);
    setShowupdate(false);
    setShowingdata(res.update);
   }

}
 const hadleupdateForword=async()=>{
    const res = await UpdateRequest(updatedata);
    if(res.success){
        setShowview(true);
    setShowupdate(false);

 const fdata = await forwordRequest(res.update);

        console.log(fdata)
        onMount();
        setShowingdata({
            _id: "", name: "", mobileNumber: "", Location: "", Address: "", ServiceType: '', ServiceDate: "", ServiceTime: "",
            Requestdate: "",
            __v: ""
        })
    }

 }
 const handleForwordOnly = async(index)=>{
    const fdata = await forwordRequest(showingdata)
    console.log(fdata)
    setShowingdata({
        _id: "", name: "", mobileNumber: "", Location: "", Address: "", ServiceType: '', ServiceDate: "", ServiceTime: "",
        Requestdate: "",
        __v: ""
    })
    onMount();
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


    return (
        <>
            <div className="viewreq">
                <div className="reqcenter">
                    <div className="reqleft">
                        <div className="reqhead">
                            <div>Name</div>
                            <div>Mobilenumber</div>
                        </div>
                        {
                            data.map((ele, index) => {

                                return (
                                    <div className="maps" onClick={() => handleviewdata(index)} key={ele._id}>
                                        {index + 1} <div className="mapname">{ele.name}</div>
                                        <div className="mapnumber">{ele.mobileNumber}</div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="reqright">
                        <h2>Details</h2>
                        {showview &&showingdata._id.length>5&& (
                            <>
                                <div className="detailsbox">
                                    <div className="dblock">
                                        <div className="dataleft">Name</div>
                                        <div className="dataright">{showingdata.name}</div>

                                    </div>
                                    <div className="dblock">
                                        <div className="dataleft">MobileNumber</div>
                                        <div className="dataright">{showingdata.mobileNumber}</div>

                                    </div>
                                    <div className="dblock">
                                        <div className="dataleft">Location</div>
                                        <div className="dataright">{showingdata.Location}</div>

                                    </div>
                                    <div className="dblock">
                                        <div className="dataleft">Address</div>
                                        <div className="dataright">{showingdata.Address}</div>

                                    </div>
                                    <div className="dblock">
                                        <div className="dataleft">ServiceType</div>
                                        <div className="dataright">{showingdata.ServiceType}</div>

                                    </div>
                                    <div className="dblock">
                                        <div className="dataleft">ServiceDate</div>
                                        <div className="dataright">{showingdata.ServiceDate}</div>

                                    </div>
                                    <div className="dblock">
                                        <div className="dataleft">ServiceTime</div>
                                        <div className="dataright">{showingdata.ServiceTime}</div>
                                    </div>
                                    <div className="dblock">
                                        <div className="dataleft">Request date</div>
                                        <div className="dataright">{showingdata.Requestdate.slice(0, 10)}</div>
                                    </div>
                                </div>
                                <div className="detailsbuttons">
                                    <button onClick={() => { handelEdit(showingdata) }} disabled={showingdata._id.length<5}>Edit</button>
                                    {/* <button >update</button> */}
                                    <button onClick={handleForwordOnly}  disabled={showingdata._id.length<5}>forward</button>
                                </div>
                            </>
                        )

                        }


                        {showupdate && (
                            <>
                                <div className="detailsbox">
                                    <div className="dblock">
                                        <div className="dataleft">Name</div>


                                        <input type='text' onChange={onchange} value={updatedata.name} name='name' className="dataright" />
                                    </div>
                                    <div className="dblock">
                                        <div className="dataleft">MobileNumber</div>
                                        {/* <div className="dataright">{updatedata.mobileNumber}</div> */}

                                        <input type='text' name='mobileNumber' value={updatedata.mobileNumber} onChange={onchange} className="dataright" disabled />
                                    </div>
                                    <div className="dblock">
                                        <div className="dataleft">Location</div>
                                        <input type='text' name='Location' value={updatedata.Location} onChange={onchange} className="dataright" />
                                    </div>
                                    <div className="dblock">
                                        <div className="dataleft">Address</div>
                                        <textarea type='textarea' name='Address' value={updatedata.Address} onChange={onchange} className="dataright textarea" row='4' />
                                    </div>
                                    <div className="dblock">
                                        <div className="dataleft">ServiceType</div>
                                        <input type='text' name='ServiceType' value={updatedata.ServiceType} onChange={onchange} className="dataright" />
                                    </div>
                                    <div className="dblock">
                                        <div className="dataleft">ServiceDate</div>
                                        <select onChange={onchange} value={updatedata.ServiceDate} className='dataright' name='ServiceDate' id="">
                                            <option value="0" defaultValue  >---  SELECT --- </option>
                                            <option value={today.toDateString()} >{today.toDateString()} today </option>
                                            <option value={today_1.toDateString()} >{today_1.toDateString()} tomorrow </option>
                                            <option value={today_2.toDateString()} >{today_2.toDateString()}  </option>
                                            <option value={today_3.toDateString()} >{today_3.toDateString()}  </option>
                                            <option value={today_4.toDateString()} >{today_4.toDateString()}  </option>
                                            <option value={today_5.toDateString()} >{today_5.toDateString()}  </option>
                                            <option value={today_6.toDateString()} >{today_6.toDateString()}  </option>

                                        </select>
                                    </div>
                                    <div className="dblock">
                                        <div className="dataleft">ServiceTime</div>

                                        <select onChange={onchange} value={updatedata.ServiceTime} name='ServiceTime' className='dataright' id="">
                                            <option value="0" defaultValue >---Select--- </option>
                                            <option value="8 Am - 10 Am" >8 Am - 10 am</option>
                                            <option value="10 Am - 12 pm">10 am - 12 pm</option>
                                            <option value="12 pm - 2 pm">12 pm - 2 pm</option>
                                            <option value="2 pm - 4 pm">2 pm - 4 pm</option>
                                            <option value="4 pm - 6 pm">4 pm - 6 pm</option>
                                        </select>
                                    </div>
                                    <div className="dblock">
                                        <div className="dataleft">Request date</div>
                                        <div className="dataright">{updatedata.Requestdate.slice(0, 10)}</div>


                                    </div>

                                </div>
                                <div className="detailsbuttons">
                                    <button onClick={handleupdate} >update</button>
                                    <button onClick={hadleupdateForword}>Update & forward</button>
                                </div>


                            </>
                        )
                        }

                    </div>
                </div>
            </div>
        </>

    );
}

export default ViewRequest;