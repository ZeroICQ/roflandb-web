Vue.use(Vuex);

const presets = ["", "MySQL", "Postgres"];
const dbTypes = ["MySQL", "Postgres"];

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
        errorMessage: "",
        
        selectedPreset: 0,
        selectedDbType: 0,
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
                timeout: 20000,
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
                    query: state.query,
                    dbtype: state.selectedDbType
                }
            }).then(response => {
                state.titles = response.data.titles;
                state.data = response.data.result;
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

        updateSelectedPreset({commit}, value) {
            commit("SET_SELECTEDPRESET", value);
            switch (value) {
                //MySQL
                case 1:
                    commit("SET_USERNAME", "app");
                    commit("SET_PASSWORD", "app");
                    commit("SET_DATABASE", "app");
                    commit("SET_HOST", "127.0.0.1");
                    commit("SET_PORT", "3307");
                    commit("SET_SELECTEDDBTYPE", 0);
                    commit("SET_QUERY", "select * from users");
                    break;
                case 2:
                    commit("SET_USERNAME", "postgres-user");
                    commit("SET_PASSWORD", "postgres-password");
                    commit("SET_DATABASE", "rnddbname");
                    commit("SET_HOST", "127.0.0.1");
                    commit("SET_PORT", "5433");
                    commit("SET_SELECTEDDBTYPE", 1);
                    commit("SET_QUERY", "select * from users");
                    break
            }
        },

        closeErrorNotification({commit}, value) {
            commit("SET_ERRORSHOW", value)
        },

        updateSelectedDbType({commit}, value) {
            commit("SET_SELECTEDPRESET", 0);
            commit("SET_SELECTEDDBTYPE", value);
        },
        
        updateQuery({commit}, value) {
            commit("SET_SELECTEDPRESET", 0);
            commit("SET_QUERY", value)
        },

        updateUsername({commit}, value) {
            commit("SET_SELECTEDPRESET", 0);
            commit("SET_USERNAME", value)
        },
        
        updatePassword({commit}, value) {
            commit("SET_SELECTEDPRESET", 0);
            commit("SET_PASSWORD", value)
        },
        
        updateHost({commit}, value) {
            commit("SET_SELECTEDPRESET", 0);
            commit("SET_HOST", value)
        },

        updatePort({commit}, value) {
            commit("SET_SELECTEDPRESET", 0);
            commit("SET_PORT", value)
        },

        updateDatabase({commit}, value) {
            commit("SET_SELECTEDPRESET", 0);
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
        },
        
        SET_SELECTEDPRESET(state, value) {
            state.selectedPreset = value;
        },
        
        SET_SELECTEDDBTYPE(state, value) {
            state.selectedDbType = value;
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
        },
        
        selectedPreset(state) {
            return state.selectedPreset;
        },
        
        selectedDbType(state) {
            return state.selectedDbType;
        }
    },
    modules: {}
});

const DatabaseForm = new Vue({
    el: "#db-form",
    store,
    data: {
      presets : presets,
      dbTypes: dbTypes,  
    },
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
        
        selectedPreset: {
            get() {
                return this.$store.getters.selectedPreset
            },
            set (value) {
                this.$store.dispatch("updateSelectedPreset", value)
            }
        },

        dbType: {
            get() {
                return this.$store.getters.selectedDbType
            },
            set (value) {
                this.$store.dispatch("updateSelectedDbType", value)
            }
        }
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
