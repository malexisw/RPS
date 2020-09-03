<template>
  <div class="choice">
    <div class="title-choice">
      Choose your weapon :
    </div>
    <div class="score">
      Score : {{ score }}
    </div>
    <div class="content">
      <div :class="btn(index)" v-for="(action, index) in actions" :key="action.id" @click="choice(index)">
        <img :class="img(index)" :src="require('../assets/' + action.image)">
        <div :class="text(index)">
          {{ action.name }}
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {

  name: 'Choice',
  computed: mapGetters({
    actions: 'allActions',
    score: 'allScore'
  }),
  mounted(){
    this.initScore()
  },
  methods:{
    ...mapActions({
      fetchScore:'fetchScore'
    }),
    btn(i){
      return "shape btn-" + this.actions[i].name
    },
    text(i){
      return "text-action text-" + this.actions[i].name
    },
    img(i){
      return "img-action img-" + this.actions[i].name
    },
    choice(i){
      localStorage.setItem("action", this.actions[i].name)
      this.$router.push({
        name:'Battle',
      })
    },
    initScore(){
      if(localStorage.getItem("score") !== null){
        const sc = localStorage.getItem("score")
        this.fetchScore(sc); 
      }
    }
  }
}
</script>

<style scoped>


.shape{
  cursor: pointer;
  display: flex;
}

.shape:hover{
  opacity: 0.8;
}

.btn-rock, .btn-scissors{
  position: relative;
  z-index: 1;
  clip-path: polygon(0 0, 100% calc(0% + 2vw), 100% calc(100% - 2vw), 0 100%);
  height: 200px;
}

.btn-paper{
  background: green;
  position: relative;
  z-index: 1;
  clip-path: polygon(0 calc(0% + 2vw), 100% 0%,100% 100%, 0 calc(100% - 2vw));
  height: 200px;
  position: relative;
  top: -25px;
}

.btn-scissors{
  position: relative;
  top: -50px;
}

.btn-rock{
  background: red;
}

.btn-scissors{
  background: blue;
}

.img-scissors{
  transform: rotate(-10deg);
  bottom: 10px;
}

.text-action{
  position: relative;
  text-transform: uppercase;
  color: var(--bg-primary);
  font-weight: 700;
  text-align: center;
}

.content{
  position: absolute;
  top: 350px;
  width: 100%;
  overflow: hidden;
}

.title-choice{
  font-weight: bold;
  color: var(--text-primary);
  text-transform: uppercase;
  position: absolute;
}

.score{
  border: 2px solid var(--text-primary);
  width: max-content;
  text-transform: uppercase;
  position: absolute;
}

@media only screen and (max-width: 800px) {
  .score{
    padding: 5px 10px;
    font-size: 24px;
    left: 50%;
    transform: translateX(-50%);
    top: 170px;
  }

  .title-choice{
    font-size: 32px;
    left: 50%;
    transform: translateX(-50%);
    top: 250px;
    width: 90%;
  }

  .img-paper{
    position: relative;
    left: 65%;
    top: 50%;
    transform: translateY(-50%);
    width: 150px;
    height: 150px;
  }

  .img-rock, .img-scissors{
    position: relative;
    left: 10px;
  }

  .img-rock, .img-scissors{
    height: 150px;
    width: 150px;
    top: 50%;
    transform: translateY(-50%);
  }

  .text-action{
    right: 5%;
    top: 45%;
    font-size: 70px;
    width: 100%;
  }

  .text-paper{
    text-align: left;
    right: 100px;
  }
}

@media only screen and (min-width: 800px) {
  .score{
    padding: 10px 15px;
    font-size: 36px;
    left: 65%;
    top: 70px;
  }

  .title-choice{
    font-size: 50px;
    left: 50%;
    transform: translateX(-50%);
    top: 250px;
  }

  .img-paper{
    position: relative;
    left: 80%;
    top: 20px;
    width: 200px;
  }

  .img-scissors{
    width: 200px;
  }

  .img-rock, .img-scissors{
    position: relative;
    left: 10%;
  }

  .img-rock{
    height: 250px;
    width: 250px;
    bottom: 40px;
  }

  .text-action{
    left: 15%;
    top: 45%;
    font-size: 190px;
    width: 50%;
  }
}
</style>