const state = {
    actions: [
    {
        id: 0,
        name: 'rock',
        image: 'rock.png',
    },
    {
        id: 1,
        name: 'paper',
        image: 'paper.png',
    },
    {
        id: 2,
        name: 'scissors',
        image: 'scissors.png',
    }
    ],
    score: 0
}

const getters = {
    allActions: (state) => state.actions,
    allScore: (state) => state.score
}

const actions = {
    fetchScore({ commit }, i){
        commit('setScore', i)
    },
    incScore({ commit }){
        commit('incScore');
    },
    decScore({ commit }){
        commit('decScore');
    },
    resetScore({ commit }){
        commit('resetScore');
    }
};

const mutations = {
    setScore: (state, score) => (state.score = score),
    incScore: (state) => state.score++,
    decScore: (state) => state.score--,
    resetScore: (state) => state.score = 0
}

export default {
    state,
    getters,
    actions,
    mutations
};