<template>
  <div class="battle">
    <div class="score">Score : {{score}}</div>
    <div class="game">
      <div class="game-content you">
        <div class="title-battle">
          You
        </div>
          <div :class="contentY">
            <img :class="imageY" :src="require('../assets/' + actionYou.image)">
            <div class="text text-Y">
              {{ actionYou.name }}
            </div>
          </div>
    </div>


      <div class="versus">
        VS
      </div>


      <div class="game-content ia">
        <div class="title-battle">
          i.a
        </div>
          <div :class="contentIa">
            <img :class="imageIa" :src="require('../assets/' + actionIa.image)">
            <div :class="text">
              {{ actionIa.name }}
            </div>
          </div>
      </div>
    </div>

    <div class="result">
      <div class="text-result">
        {{ result }}
      </div>
      <div class="continue" @click="again()">
        Continue
      </div>
      <div class="restart" @click="restart()">
        Restart
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Battle',
  data(){
    return{
      actionIa: Object,
      actionYou: Object,
      result: String
    }
  },
  computed: { ...mapGetters({
    actions: 'allActions',
    score: 'allScore'
    }),
    contentY(){
      return "contentA Y " + this.actionYou.name + "-action"
    },
    contentIa(){
      return "contentA IA " + this.actionIa.name + "-action"
    },
    imageIa(){
      return "image-ia image-"+ this.actionIa.name
    },
    imageY(){
      return "image-you image-"+ this.actionYou.name
    },
    text(){
      return "text text-ia t-"+ this.actionIa.name
    }
  },
  created(){
    const size = Object.keys(this.actions)
    for(let i=0; i<size.length;i++){
      if(this.actions[i].name == localStorage.getItem("action")){
        this.actionYou = this.actions[i]
      }
    }
    const choice = Math.floor(Math.random() * 3)
    this.actionIa = this.actions[choice]
  },
  mounted(){
    this.calcScore()
  },
  methods:{
    ...mapActions({
        incScore:'incScore',
        decScore:'decScore',
        resetScore:'resetScore'
      }),
    calcScore(){
      if((this.actionYou.name == "rock" && this.actionIa.name == "paper") || (this.actionYou.name == "paper" && this.actionIa.name == "scissors") || (this.actionYou.name == "scissors" && this.actionIa.name == "rock")){
        this.decScore();
        this.result = "Lost"
      } else if((this.actionYou.name == "rock" && this.actionIa.name == "scissors") || (this.actionYou.name == "paper" && this.actionIa.name == "rock") || (this.actionYou.name == "scissors" && this.actionIa.name == "paper")){
        this.incScore();
        this.result = "Win"
      } else {
        this.result = "Draw"
      }
      localStorage.setItem("score", this.score)
    },
    again(){
      this.$router.push({
        name:'Choice',
      })
    },
    restart(){
      this.resetScore()
      localStorage.removeItem("score")
      this.$router.push({
        name:'Choice',
      })
    }
}
}
</script>


<style scoped>
.battle{
  height: 85vh;
  overflow: hidden;
}
.game{
  display: flex;
  height: 70vh;
}

.game-content{
  width: 50%;
  position: relative;
  top: 100px;
}

.title-battle{
  text-align: center;
  font-size: 50px;
  font-weight: 700;
  text-transform: uppercase;
}

.contentA{
  position: absolute;
  z-index: -1;
  height: 250px;
  position: relative;
  top: 10%;
  display: flex;
}

.contentA.Y{
  left: -1000px;
  clip-path: polygon(0 0, 100% 50%, 100% calc(100% - 2.5vw), 0 100%);
  animation: slideLeft .5s forwards;
}

.contentA.IA{
  right: -1000px;
  clip-path: polygon(0 50%, 100% 0%,100% 100%, 0 calc(100% - 2.5vw));
  animation: slideRight 1s forwards;
}

.rock-action{
  background: red;
}
.paper-action{
  background: green;
}
.scissors-action{
  background: blue;
}

.image-you.image-scissors,.image-you.image-paper{
  transform: scaleX(-1);
}

.image-paper,.image-scissors{
  width: 200px;
  height: 200px;
}

.image-paper{
  top: 50px;
}

.image-rock{
  height: 250px;
  width: 250px;
}

.image-scissors{
  top: 40px;
  transform: rotate(-10deg);
}

.image-ia{
  position: relative;
  left: 70%;
}

.image-you{
  position: relative;
  left: 5%;
}

.text{
  position: relative;
  top: 58%;
  text-transform: uppercase;
  color: var(--bg-primary);
  font-size: 125px;
  font-weight: 700;
  height: max-content;
}

.text-Y{
  width: 100%;
}

.text-ia{
  width: 100%;
}

.t-scissors{
  right: 20%;
}

.versus{
  z-index: 1;
  font-weight: 900;
  font-size: 150px;
  position: relative;
  text-align: center;
  top: 50%;
  height: fit-content;
  animation: spin 1s forwards;
}

.result{
  text-align: center;
  font-weight: bold;
  line-height: 100px;
  position: relative;
  top: -200px;
  z-index: 2;
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

.continue,.restart{
  cursor: pointer;
  width: max-content;
  margin: auto;
}

.text-result{
  font-size: 80px;
  text-transform: uppercase;
  line-height: 150px;
  animation: fadeIn 1.2s forwards;
}

.continue{
  font-size: 90px;
  border: 3px solid var(--text-primary);
  padding: 5px 15px;
}

.continue:hover,.restart:hover{
  opacity: 0.8;
}

.continue:active,.restart:active{
  opacity: 0.5;
}

.restart{
  font-size: 50px;
}

@keyframes slideLeft {
  100%{left: 0;}
}

@keyframes slideRight {
  50%{right: -1000px;}
  100%{right: 0;}
}

@keyframes spin {
  0%{
    opacity: 0;
  }
  30%{
    opacity: 0;
    -webkit-transform: rotate(0deg);
  }
  100%{
    opacity: 1;
    -webkit-transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  0%{opacity: 0;}
  80%{opacity: 0;}
  100%{opacity: 1;}
}

</style>
