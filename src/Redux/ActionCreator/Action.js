
export const showloading = ()=>{
    return(dispatch)=>{
        dispatch({
            type:'showloader'
        })
    }
}

export const hideloading = ()=>{
    return(dispatch)=>{
        dispatch({
            type:'hideloader',
        })
    }
}