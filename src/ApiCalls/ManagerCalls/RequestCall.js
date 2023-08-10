
const host = "http://localhost:5001";

export const ViewRequests = async()=>{
    const response = await fetch(`${host}/api/manager/requests`,{
        method:'GET',
        headers:{
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('auth-token')
        }
    });
    const res = await response.json();
    return res;
}
