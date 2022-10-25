import { createStore } from 'vuex';
import axios from "axios";
import router from '@/router'




const url_data = 'http://localhost:4000/todos/';

const store = createStore({
    state() {
        return {
            todos: [],
            todoSelected: {},
            todoDetail: {},
            loading: true,
            addLoading: false
        }

    },
    mutations: {
        setData(state, todos) {
            state.todos = todos
            console.log(state.todos);
        },

        setDetail(state, todoDetail) {
            state.todoDetail = todoDetail
        },

        deleteData(state , id) {
            const index = state.todos.findIndex(todo => todo.id === id);
            state.todos.splice(index, 1);
        },

        editData(state, todo) {
           state.todoSelected = todo;
           console.log(state.todoSelected);
        },

        changeLoadingState(state, loading) {
            state.loading = loading
        },

        addLoadingState(state, loading) {
            state.addLoading = loading
        },

        pushData(state, newData) {
            console.log(newData);
            state.todos.unshift(newData) ;
        }

    },
    actions: {
       async loadTask({commit}) {
            try {
                setTimeout( async () => {
                    const result = await axios.get(url_data);
                    commit("setData", result.data);
                    commit('changeLoadingState', false)
                }, 1500)
            }
            catch (err) {
                console.log(err)
            }
        },

        async loadTaskDetail({commit}, idSelected) {
            try {
                setTimeout( async () => {
                  
                    const result = await axios.get(url_data + idSelected);
                    console.log(result.data);
                    commit("setDetail", result.data);
                }, 500)
            }
            
            catch (err) {
                console.log(err)
            }
        },


        async addTask({ commit }, form) {
            try {
                commit('addLoadingState', true)
                const result = await axios.post(url_data, form);
                const newData = result.data;
                commit('pushData', newData);
                commit('addLoadingState', false)
                }
               
             catch (err) {
                console.log(err);
            }
        },

        // async addTask({ commit }, form) {
        //     try {
        //             const result = await axios.post(url_data, form);
        //    
        //     }
        //      catch (err) {
        //         console.log(err);
        //      }
        // },

        async deleteTask({commit}, id) {
            try {
                    const result = await axios.delete(url_data + id);
                    commit('deleteData', id);
                }
            
            catch (err) {
                console.log(err);
            }
        },


        async updateTask({commit}, todoSelected) {
            try {
                    console.log("todoSelected di store" + todoSelected.id)
                    const result = await axios.put(url_data + todoSelected.id, {
                        title: todoSelected.title,
                        description : todoSelected.description,
                        status: todoSelected.status
                    });

                    
            }
            catch (err) {

            }
        },

    },

    getters: {
        todos(state) {
            return state.todos;
        },

        selectedTodos(state) {
            return state.selectedTodos;
        }

    },  

});

export default store;