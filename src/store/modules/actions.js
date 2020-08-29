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
        const response = i
        commit('setScore', response)
    },
    incScore({ commit }){
        const response = state.score+1
        commit('setScore', response);
    },
    decScore({ commit }){
        const response = state.score-1
        commit('setScore', response);
    },
    resetScore({ commit }){
        const response = 0
        commit('setScore', response);
    }
};

const mutations = {
    setScore: (state, score) => (state.score = score),
}

export default {
    state,
    getters,
    actions,
    mutations
};