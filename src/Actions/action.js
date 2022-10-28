import {ACTIONS} from "./actionType"


// action creators

export const callApi = () => {
    return {
        type: ACTIONS.CALL_API,
    }
}

export const getSuccess = (payload) => {
    return {
        type: ACTIONS.SUCCESS,
        data : payload
    }
}

export const getError = (payload) => {
    return {
        type: ACTIONS.ERROR,
        error : payload
    }
}