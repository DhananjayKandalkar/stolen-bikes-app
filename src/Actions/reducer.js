import { ACTIONS } from "./actionType"



export const reducer = (state, action) => {
    switch(action.type){
        case ACTIONS.CALL_API : {
            return {
                ...state,
                loading: true,
            }
        }
        case ACTIONS.SUCCESS : {
            return {
                ...state,
                loading: false,
                data: action.data
            }
        }
        case ACTIONS.ERROR : {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
    }
}