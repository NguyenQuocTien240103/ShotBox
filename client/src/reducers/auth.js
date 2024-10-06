const initialState = {
    isAuthenticated: !!localStorage.getItem('authToken'),
}

const authReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'LOGIN_SUCCESS':{
            const newState = action.payload;
            return{
                ...state,
                isAuthenticated:newState,
            }
        }
        case 'LOGOUT': {
            const newState = action.payload;
            return{
                ...state,
                isAuthenticated:newState,
            }
        }
        default:
            return state;    
    }
}

export default authReducer;