Vue.use(Vuex);

const CancelToken = axios.CancelToken;
var source;

const store = new Vuex.Store({
    state: {
        isLoading: false,
        titles: [],
        data: [],
        query: "",
        username: "",
        password: "",
        host: "",
        port:  3307,
        database: "",
        
        showError: false,
        errorMessage: ""
    },
    actions: {
        loadData({commit, state}) {
            if (state.isLoading)
                return;
            
            commit('SET_LOADING');
            commit("SET_ERRORSHOW", false);
            state.data = [];
            source = CancelToken.source();
            axios({
                method: "POST",
                url: "http://127.0.0.1:5000/api/sql",
                timeout: 2000,
                headers : {
                    "Content-Type": "application/json"
                },
                cancelToken: source.token,
                data : {
                    user: state.username,
                    password: state.password,
                    host: state.host,
                    database: state.database,
                    port: state.port,
                    query: state.query
                }
            }).then(response => {
                state.data = response.data;
            }).catch(
                e => {
                    if (axios.isCancel(e)) {
                        console.log("Request canceled. ", e.message);
                        return;
                    } 
                    
                    if (e.code === "ECONNABORTED") {
                        commit("SET_ERRORMESSAGE", e.message);
                    }
                    else {
                        commit("SET_ERRORMESSAGE", e.response.data);
                    }
                    // console.log(e.response.data);
                    commit("SET_ERRORSHOW", true);
                }
            ).finally(
                () => commit('SET_NOT_LOADING')
            );
        },
        
        abortPendingRequest({commit}) {
            source.cancel("Abort by user");
            commit("SET_LOADING", false);
        },
        
        closeErrorNotification({commit}, value) {
            commit("SET_ERRORSHOW", value)
        },
        
        updateQuery({commit}, value) {
            commit("SET_QUERY", value)
        },

        updateUsername({commit}, value) {
            commit("SET_USERNAME", value)
        },
        
        updatePassword({commit}, value) {
            commit("SET_PASSWORD", value)
        },

        updateHost({commit}, value) {
            commit("SET_HOST", value)
        },

        updatePort({commit}, value) {
            commit("SET_PORT", value)
        },

        updateDatabase({commit}, value) {
            commit("SET_DATABASE", value)
        },
    },
    mutations: {
        SET_LOADING(state) {
            state.isLoading = true;
        },
        
        SET_NOT_LOADING(state) {
            state.isLoading = false;
        },
        
        SET_QUERY(state, value) {
            state.query = value;
        },
        
        SET_USERNAME(state, value) {
            state.username = value;
        },

        SET_PASSWORD(state, value) {
            state.password = value;
        },
        
        SET_HOST(state, value) {
            state.host = value;
        },

        SET_PORT(state, value) {
            state.port = value;
        },

        SET_DATABASE(state, value) {
            state.database = value;
        },

        SET_ERRORSHOW(state, value) {
            state.showError = value;
        },
        
        SET_ERRORMESSAGE(state, value) {
            state.errorMessage = value;
        }
        
    },
    getters: {
        isLoading(state) { 
            return state.isLoading 
        },
        
        data(state) {
            return state.data;
        },
        
        titles(state) {
            return state.titles;
        },
        
        query(state) {
            return state.query;
        },

        username(state) {
            return state.username;
        },

        password(state) {
            return state.password;
        },

        host(state) {
            return state.host;
        },

        port(state) {
            return state.port;
        },

        database(state) {
            return state.database;
        },

        showError(state) {
            return state.showError;
        },
        
        errorMessage(state) {
            return state.errorMessage;
        }
    },
    modules: {}
});

const DatabaseForm = new Vue({
    el: "#db-form",
    store,
    computed: {
        username : {
            get () {
                return this.$store.getters.username
            },
            set (value) {
                this.$store.dispatch("updateUsername", value)
            }
        },

        password : {
            get () {
                return this.$store.getters.password
            },
            set (value) {
                this.$store.dispatch("updatePassword", value)
            }
        },

        host : {
            get () {
                return this.$store.getters.host
            },
            set (value) {
                this.$store.dispatch("updateHost", value)
            }
        },

        port : {
            get () {
                return this.$store.getters.port
            },
            set (value) {
                this.$store.dispatch("updatePort", value)
            }
        },

        database : {
            get () {
                return this.$store.getters.database
            },
            set (value) {
                this.$store.dispatch("updateDatabase", value)
            }
        },
    }
});

const QueryTextArea  = new Vue({
    el: "#query",
    store,
    computed: {
        query: {
            get () {
                return this.$store.getters.query
            },
            set (value) {
                this.$store.dispatch("updateQuery", value);
            }
        }
    },
    methods: {
        submit() {
            this.$store.dispatch('loadData');
        }
    }
});

const ErrorNotification = new Vue({
    el: ".error-notification",
    store,
    computed : {
        isShowError() {
            return this.$store.getters.showError
        },
        
        errorMessage() {
            return this.$store.getters.errorMessage
        }
    },
    methods: {
        closeNotification() {
            this.$store.dispatch("closeErrorNotification")
        }
    }
});

const SubmitButton = new Vue({
    el: "#submit-button",
    store,
    data: {
        progress: 0
    },
    computed : {
        isLoading() {
            return this.$store.getters.isLoading;
        }
    },
    methods: {
        submit() {
            this.$store.dispatch('loadData');
        }
    }
});


const ProgressBar = new Vue({
    el: "#progress-bar",
    store,
    computed: {
        isLoading() {
            return this.$store.getters.isLoading;
        }
    },
    methods : {
        abortRequest() {
            this.$store.dispatch("abortPendingRequest")
        }
    }
});


const ResultTable = new Vue({
    el: "#result-table",
    store,
    computed: {
        isLoading() {
            return this.$store.getters.isLoading;
        },
        
        titles() {
            return this.$store.getters.titles;
        },
        
        data() {
            return this.$store.getters.data;
        }
        
    }
});
