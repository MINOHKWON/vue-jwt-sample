import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    state: {
        userInfo : {},
        token : {
            grant_type : '',
            access_token : ''
        }
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo;
        },
        getACT(state) {
            return state.token.access_token;
        },
        isAuth(state) {
            return (null != state.token.access_token && '' != state.token.access_token);
        }
    },
    mutations: {
        setUserInfo(value) {
            state.userInfo = value;
        },
        setACT(state, value) {
            state.token.grant_type = value.grant_type;
            state.token.access_token = value.access_token;
        }
    },
    plugins : [ createPersistedState({
        paths : [ "userInfo", "token" ]  
    }) ],
});

export default store;
 