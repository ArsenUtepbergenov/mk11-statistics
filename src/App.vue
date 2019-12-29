<template>
  <div id="app">
    <video autoplay muted loop class="bg-video">
      <source src="./assets/bg-video.mp4" type="video/mp4">
    </video>
    <div class="app__content">
      <div class="flex-ec menu">
        <router-link class="menu__link" to="/">Players</router-link>
        <router-link class="menu__link" to="/tournament">Tournament</router-link>
        <router-link class="menu__link" to="/statistics">Statistics</router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>
