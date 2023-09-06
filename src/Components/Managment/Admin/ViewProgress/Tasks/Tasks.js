import React,{useEffect,useState} from 'react';
import './Tasks.css';
import serachicon from '../../../../images and tones/search-icon.png';
import { getcompleteTasks } from '../../../../../ApiCalls/AdminCalls/ProgressCalls';
import FinishedTasksView from '../../Views/FinishedTasksView/FinishedTasksView';

const Tasks = (props) => {

    const [data,setData]=useState([])
    const[showdata,setShowdata]=useState([]);
//Logic to sort data by Date form latest to oldest
    const sortDataByDate = [...showdata].sort((a, b) => {
        // Assuming 'Date' is a property inside 'Service'
        const dateA = new Date(a.Date);
        const dateB = new Date(b.Date);
      
        // Extract only the date part (year, month, and day)
        const datePartA = new Date(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
        const datePartB = new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());
      
        // Compare the date parts
        if (datePartA < datePartB) return 1;
        if (datePartA > datePartB) return -1;
        return 0;
      });

    const getformatemaxdate =()=>{
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
    
        if (mm < 10) {
          mm = `0${mm}`;
        }
        if (dd < 10) {
          dd = `0${dd}`;
        }
    
        return `${yyyy}-${mm}-${dd}`;
    }
    const maxdate=getformatemaxdate()
    

    const [date,setDate]=useState('')
const datechange = (e)=>{
    setDate(e.target.value);
}


const onMount = async()=>{
    const data = await getcompleteTasks(props.id)
    
    if(data.success){
        setShowdata(data.message)
        setData(data.message)
    }
}

useEffect(()=>{
    onMount();
    // eslint-disable-next-line
},[])


//logic for handing the search
const handleserach=()=>{
    const filterdate = data.filter((ele)=>{
        console.log(ele.Date.slice(0,10),date)
        if(ele.Date.slice(0,10)===date){
            return(ele)
           }
           else{
            return(null)
           }
    });
    setShowdata(filterdate);
}

const handlereset =()=>{
    setShowdata(data)
}


//Logic for handling the view button and passing the data to view compnent as props
const [showview,setShowview]=useState(false);
    const [viewdata,setViewdata]=useState('');
const handleshowview= (ele)=>{
    setShowview(true);
    setViewdata(ele);
}
const handleCloseView = ()=>{
    setShowview(false);
}

  return (
    <>
    {showview&&<FinishedTasksView data={viewdata} closefunction={handleCloseView}/>}


    <div className="ma-tsk-head">
        <h1>Tasks</h1>
        <div className="ad-emp-inputdivhead"> <input type="date" max={maxdate} name='data' value={date} onChange={datechange} />
           <button onClick={handleserach}><img src={serachicon} alt="" /></button>
           <button className='ad-emp-rstbtn' onClick={handlereset} >reset</button>
           </div>
    </div>
    <div className="ma-tsk-body">
        <ul>
            <li>Name</li>
            <li>mobile</li>
            <li>Task</li>
            <li>Update</li>
            <li> </li>
        </ul>
    </div>
    {sortDataByDate.map((ele,index)=>{
            return(<div className="ma-tsk-mapitem">
                    <ul>
                        <li>{ele.name}</li>
                        <li>{ele.mobileNumber}</li>
                        <li>{ele.Task}</li>
                        <li>{ele.finished.note}</li>
                        <li className="ma-tsk-viewbtn"><button onClick={()=>handleshowview(ele)}>view</button></li>
                    </ul>
                    </div>)
    })

    }
    {showdata.length<=0 && <div className="ma-tsk-nodata">no Data to show</div>}

    
      
    </>
  );
}

export default Tasks;
