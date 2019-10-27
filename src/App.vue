<template>
  <div id="app">
    <div class="flex-cc flex-col menu">
      <router-link class="menu__link" to="/">Statistics</router-link>
      <router-link class="menu__link" to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
