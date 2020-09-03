<template>
  <div id="app">
    <ul class="title">
      <li class="rock">Rock</li>  
      <li class="paper">Paper</li>
      <li class="scissors">Scissors</li>
    </ul>

    <router-view/>
  </div>
</template>

<style>
:root{
  font-size: 16px;
  font-weight: normal;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6rem;
  --bg-primary: #18181b;
  --bg-secondary: #111113;
  --text-primary: rgb(239, 239, 241);
  --text-secondary: #111113;
  --transition-speed: 0.3s
}

*{
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    list-style: none;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body{
  background: var(--bg-primary);
  color: var(--text-primary);
}

.title{
  position: relative;
  top: 25px;
  left: 45%;
  transform: translateX(-50%);
  width: max-content;
  letter-spacing: 5px;
}

.rock,.paper,.scissors{
  text-transform: uppercase;
  font-size: 32px;
  line-height: 35px;
}

.paper{
  margin-left: 30px;
}

.scissors{
  margin-left: 60px;
}

.rock::after, .paper::after, .scissors::after{
  content: "";
  margin-top: .1em;
  display: block;
  width: 1em;
  height: 3px;
}

.rock::after{
    background-color: red;
}

.paper::after{
    background-color: green;
}

.scissors::after{
    background-color: blue;
}

</style>
