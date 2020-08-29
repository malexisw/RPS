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
        <img :class="img(index)" :src="require('../assets/' + action.image)" width="200">
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
      localStorage.setItem("image",this.actions[i].image)
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

.img-paper{
  position: relative;
  left: 80%;
  top: 20px;
}

.img-rock, .img-scissors{
  position: relative;
  left: 10%;
}

.img-scissors{
  transform: rotate(-10deg);
  bottom: 10px;
}

.img-rock{
  height: 250px;
  width: 250px;
  bottom: 40px;
}

.text-action{
  position: relative;
  left: 15%;
  top: 45%;
  text-transform: uppercase;
  color: var(--bg-primary);
  font-size: 190px;
  font-weight: 700;
  text-align: center;
  width: 50%;
}

.content{
  position: absolute;
  top: 350px;
  width: 100%;
  overflow: hidden;
}

.title-choice{
  font-weight: bold;
  font-size: 50px;
  color: var(--text-primary);
  text-transform: uppercase;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 250px;
}

.score{
  border: 2px solid var(--text-primary);
  width: max-content;
  padding: 10px 15px;
  font-size: 36px;
  text-transform: uppercase;
  position: absolute;
  left: 65%;
  top: 70px;
}

</style>