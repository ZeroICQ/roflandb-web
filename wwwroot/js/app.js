Vue.use(Vuex);

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
        database: ""
    },
    actions: {
        loadData({commit}) {
            commit('SET_LOADING');
            
            this.state.titles = ['id', 'phone', 'name'];
            let max = 100;
            let min = 1;

            let phoneMax = 79141999999;
            let phoneMin = 79141000000;
            
            
            
            let ldata = [];
            
            for (var i = 0; i < 20; i++) {
                let sample_data = [Math.floor(Math.random() * (max - min + 1)) + min,
                    Math.floor(Math.random() * (phoneMax - phoneMin+ 1)) + phoneMin,
                    "Alexey"];
                ldata.push(sample_data)
            }
            
            this.state.data = ldata;
            
            setTimeout(() => commit('SET_NOT_LOADING'), 3000);
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
                this.$store.dispatch("updateQuery", value)
            }
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
