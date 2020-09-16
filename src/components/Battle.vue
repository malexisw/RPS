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
            <div :class="textY">
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
            <div :class="textIa">
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
    //set class depending on the action selected previously
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
    textIa(){
      return "text text-ia t-"+ this.actionIa.name
    },
    textY(){
      return "text text-Y t-"+ this.actionIa.name
    }
  },
  created(){
    //get the size of the object actions
    const size = Object.keys(this.actions)
    //get the action with the same name and put it in actionYou
    for(let i=0; i<size.length;i++){
      if(this.actions[i].name == localStorage.getItem("action")){
        this.actionYou = this.actions[i]
      }
    }
    //get a random number between 0 and 2
    const choice = Math.floor(Math.random() * 3)
    //set action Ia with the random number chosen ( 0 = rock, 1 = paper, 2 = scissors)
    this.actionIa = this.actions[choice]
  },
  mounted(){
    //calcul the score at the creation of the page
    this.calcScore()
  },
  methods:{
    ...mapActions({
        incScore:'incScore',
        decScore:'decScore',
        resetScore:'resetScore'
    }),

    //calcul the score
    calcScore(){
      if((this.actionYou.name == "rock" && this.actionIa.name == "paper") || (this.actionYou.name == "paper" && this.actionIa.name == "scissors") || (this.actionYou.name == "scissors" && this.actionIa.name == "rock")){
        //-1 on the score
        this.decScore();
        this.result = "Lost"
      } else if((this.actionYou.name == "rock" && this.actionIa.name == "scissors") || (this.actionYou.name == "paper" && this.actionIa.name == "rock") || (this.actionYou.name == "scissors" && this.actionIa.name == "paper")){
        //+1 on the score
        this.incScore();
        this.result = "Win"
      } else {
        this.result = "Draw"
      }
      //save the score in the local storage to get it even if the player quit the game and comeback
      localStorage.setItem("score", this.score)
    },
    //go to the previous page
    again(){
      this.$router.push({
        name:'Choice',
      })
    },
    //reset the score to 0 and go to the previous page
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
  height: 70vh;
}
.game{
  display: flex;
  height: 60vh;
}

.game-content{
  position: relative;
}

.title-battle{
  text-align: center;
  font-weight: 700;
  text-transform: uppercase;
}

.contentA{
  position: absolute;
  z-index: -1;
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

.image-paper{
  top: 50px;
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
  text-transform: uppercase;
  color: var(--bg-primary);
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
  position: relative;
  text-align: center;
  height: fit-content;
  animation: spin 1s forwards;
}

.result{
  text-align: center;
  font-weight: bold;
  position: relative;
  z-index: 2;
}

.score{
  border: 2px solid var(--text-primary);
  width: max-content;
  text-transform: uppercase;
  position: absolute;
}

.continue,.restart{
  cursor: pointer;
  width: max-content;
  margin: auto;
}

.text-result{
  text-transform: uppercase;
  animation: fadeIn 1.2s forwards;
}

.continue{
  border: 3px solid var(--text-primary);
  padding: 5px 15px;
}

.continue:hover,.restart:hover{
  opacity: 0.8;
}

.continue:active,.restart:active{
  opacity: 0.5;
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

@media only screen and (min-width: 800px) {
  .score{
    padding: 10px 15px;
    font-size: 36px;
    left: 65%;
    top: 70px;
  }

  .game-content{
    top: 100px;
    width: 45%;
  }

  .title-battle{
    font-size: 50px;
  }

  .versus{
    font-weight: 900;
    font-size: 150px;
    top: 70%;
  }

  .contentA{
    height: 250px;
  }

  .image-paper,.image-scissors{
    width: 200px;
    height: 200px;
  }

  .image-ia.image-scissors,.image-ia.image-paper,.image-ia.image-rock{
    position: relative;
    left: 70%;
  }

  .image-rock{
    height: 250px;
    width: 250px;
  }

  .text{
    top: 58%;
    font-size: 125px;
  }

  .result{
    line-height: 100px;
  }

  .text-result{
    font-size: 80px;
    line-height: 150px;
  }

  .continue{
    font-size: 90px;
  }

  .restart{
    font-size: 50px;
  }
}

@media only screen and (max-width: 800px) {
  .battle{
    overflow-x: hidden;
  }

  .score{
    padding: 5px 10px;
    font-size: 24px;
    left: 50%;
    transform: translateX(-50%);
    top: 170px;
  }

  .game-content{
    top: 150px;
  }

  .title-battle{
    font-size: 32px;
  }

  .versus{
    font-weight: 900;
    font-size: 50px;
    top: 350px;
  }

  .contentA{
    height: 200px;
  }

  .image-paper,.image-scissors{
    width: 100px;
    height: 100px;
  }

  .image-ia.image-scissors,.image-ia.image-paper,.image-ia.image-rock{
    position: relative;
    left: 40%;
  }

  .image-rock{
    height: 100px;
    width: 100px;
    top: 20px;
  }

  .text{
    top: 70%;
    font-size: 32px;
  }

  .text-Y{
    position: relative;
    left: -100px;
  }

  .text-ia{
    left: -100px;
  }

  .result{
    line-height: 40px;
    z-index: 2;
  }

  .text-result{
    font-size: 42px;
    line-height: 100px;
  }

  .continue{
    font-size: 50px;
  }

  .restart{
    position: relative;
    top: 25px;
    font-size: 30px;
  }

  .game-content{
    width: 44%;
    position: relative;
  }

}

</style>
