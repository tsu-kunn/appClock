import { createStore } from "redux";

const initialState = {
    count0: 0,
    count1: 100,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "INCREASE_COUNT":
            return {
                ...state,
                count0: state.count0 + 1,
            };
        case "DECREASE_COUNT":
            return {
                ...state,
                count0: state.count0 - 1,
            };
        case "INC_COUNT1":
            return {
                ...state,
                count1: state.count1 + 1
            };
        case "DEC_COUNT1":
            return {
                ...state,
                count1: state.count1 - 1
            };
        default:
            return state;
    }
};

const store = createStore(reducer);


export default store;
