
const loading = (state=false,action)=>{
    switch(action.type){
        case 'showloader':return true
        case 'hideloader':return false
        default:
            return state
    }
}

export default loading;