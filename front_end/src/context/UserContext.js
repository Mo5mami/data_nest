import React ,{useReducer,createContext} from 'react'
import axios from 'axios'

const initialState = {
    user : null,
    token:null,
    login:false,
    error:null,
}

//Create context 
export const UserContext = createContext(initialState)


//reducer 
const reducer = (state,action)=>{
    switch(action.type){
        case "REGISTER_SUCCESS" : 
            return{
                
                user:action.payload.user,
                token:action.payload.token,
                login:true,
                error:null
            }
            case "REGISTER_ERROR" : 
                return{
                    ...state,
                    error:action.payload.message
                }
         

        case "LOGIN_SUCCESS" : 
            return{
                
                user:action.payload.user,
                token:action.payload.token,
                login:true,
                error:null
            }
            case "LOGIN_ERROR" : 
                return{
                    ...state,
                    error:action.payload.message
                }
            default:
                return state
        }
       
    }


//provider component 

export const UserProvider = ({children})=>{
    const [state,dispatch] = useReducer(reducer,initialState)

    // Actions 
    async function register(data){
        axios({
            method: 'post',
            url: 'http://localhost:5000/users/register',
            config: { headers: {'Content-Type': 'application/json' }},
            data: data,
            })
            .then( (response)=> {
                
                if(response.data.success)
                { 
                  dispatch({
                      type:"REGISTER_SUCCESS",
                      payload:response.data
                  })
                  
                }
                else{
                    dispatch({
                        type:"REGISTER_ERROR",
                        payload:response.data
                    })
                }
            })
            .catch(e=>{
                console.log(e)
            })
            
    }
    

    async function flogin(data){
        axios({
            method: 'post',
            url: 'http://localhost:5000/users/login',
            config: { headers: {'Content-Type': 'application/json' }},
            data: data,
            })
            .then( (response)=> {
                console.log(response)
                if(response.data.success)
                { 
                  dispatch({
                      type:"LOGIN_SUCCESS",
                      payload:response.data
                  })
                  
                }
                else{
                    dispatch({
                        type:"LOGIN_ERROR",
                        payload:response.data
                    })
                }
            })
            .catch(e=>{
                console.log(e)
            })
            
    }
    

    return(
        <UserContext.Provider value={{
            user:state.user,
            login:state.login,
            token:state.token,
            error:state.error,
            register,
            flogin
        }}>
            {children}
        </UserContext.Provider>
    )
}