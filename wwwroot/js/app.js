Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isLoading: false,
        titles: [],
        data: []
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
        }
    },
    mutations: {
        SET_LOADING(state) {
            state.isLoading = true;
        },
        
        SET_NOT_LOADING(state) {
            state.isLoading = false;
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
        }
        
    },
    modules: {}
});

const ServerForm = new Vue({
    
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
