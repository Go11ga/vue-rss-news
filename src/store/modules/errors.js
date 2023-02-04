let errors = {

    state: {
        error: {}
    },

    getters: {
        getError: state => state.error
    },

    mutations: {
        setError(state, error) {
            state.error = error
        },

        clearError(state) {
            state.error = {}
        }
    },

    actions: {}
}

export { errors }
