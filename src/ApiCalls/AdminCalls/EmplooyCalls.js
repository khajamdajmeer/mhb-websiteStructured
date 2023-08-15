import { host } from "../Host";

export const AllEmploydata = async()=>{
    const response = await fetch(`${host}/api/admin/emplooy`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('auth-token')
        }
    })
    const res = await response.json();
    return res;
}

export const CreateNewEmploy = async(data)=>{
    const response = await fetch(`${host}/api/admin/newemplooy`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('auth-token')
        },
        body:JSON.stringify(
            {
                name:data.name,
                age:data.age,
                email:data.email,
                mobilenumber:data.mobilenumber,
                joiningdate:data.joiningdate,
                AdharNumber:data.adharnumber,
                presentAdress:data.presentaddress,
                permanentAdress:data.permanentaddress,
                designation:data.designation,username:data.username
            }
        )

    });
    const res = await response.json();
    return res;

}

export const viewSingleEmplooy = async(id)=>{
    const response = await fetch(`${host}/api/admin/emplooy/${id}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('auth-token')
        },
    });
    return response.json()
}

export const UpdateEmplooy=async(data)=>{
    const {name,age,mobilenumber,email,joiningdate,adharnumber,presentaddress,permanentaddress,designation,username}=data;
    const response = await fetch(`${host}/api/admin/emplooy/update/${data._id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('auth-token')
        },
        body:JSON.stringify({
            name:name,
            age:age,
            mobilenumber:mobilenumber,
            email:email,
            joiningdate:joiningdate,
            AdharNumber:adharnumber, presentAdress:presentaddress,
            permanentAdress:permanentaddress,
            designation:designation,
            username:username

        })
    });
    const res = await response.json()
    return res


}