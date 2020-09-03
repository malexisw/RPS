<template>
  <div class="home">
    

    <div class="illustration">
      <div class="rock-img">
        <img src="../assets/rock.png">
      </div>
      <div class="paper-img">
        <img src="../assets/paper.png" width="200">
      </div>
      <div class="scissors-img">
        <img src="../assets/scissors.png" width="200">
      </div>
    </div>

    <div class="btn">
      <router-link class="btn-start" to="/choice">Start</router-link>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>

<style>

.home{
  width: 80%;
  height: 60vh;
  margin: auto;
}

.illustration{
  display: flex;
  position: relative;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border-radius: 100px;
}

.rock-img, .paper-img{
  border-right: 2px solid var(--text-primary);
}

.btn{
  width: max-content;
  position: relative;
  left: 50%;
  top: 60%;
  transform: translateX(-50%);
}

.btn-start{
  border: solid 3px var(--text-primary);
  width: max-content;
  text-decoration: none;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 10px;
  font-size: 85px;
  padding: 5px 20px;
  transition-duration: var(--transition-speed);
}

.btn-start:hover{
  opacity: 0.7;
}

.btn-start:active{
  opacity: 0.5;
}

@media only screen and (max-width: 800px) {
  .rock-img, .paper-img, .scissors-img{
    width: 250px;
    height: 100px;
  }
  .rock-img img{
    width: 125px;
  }

  .scissors-img img{
    width: 100px;
    position: relative;
    top: 5px;
  }

  .paper-img img{
    width: 100px;
    position: relative;
    top: 10px;
  }
}

@media only screen and (min-width: 800px) {
  .rock-img, .paper-img, .scissors-img{
    width: 500px;
    height: 200px;
  }
  .rock-img img{
    width: 250px;
  }

  .scissors-img img{
    width: 190px;
    position: relative;
    top: 5px;
  }

  .paper-img img{
    position: relative;
    top: 20px;
  }
}
</style>
