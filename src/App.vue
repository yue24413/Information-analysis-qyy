<script setup lang="ts"></script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />

    <div class="wrapper">
      <nav>
        <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
        <!-- <LibraryVue /> -->
      </nav>
    </div>
    <!-- <LoginVue /> -->
  </header>

  <RouterView id="router" />
</template>

<style scoped>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  max-width: calc(100vw - 17px);
}
#app {
  /**横向弹性 */
  background-color: #ffee99;
  display: flex;
  margin: 10px auto;
}
header {
  line-height: 1.5;
  max-height: 100vh;
  border-bottom: solid 1px #a8abb2;
}
.wrapper {
  flex: 1;
}
.logo {
  display: block;
  margin: 0 auto;
  width: 10%;
  height: 10%;
}
.router {
  background-color: #ee6f6f;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  text-decoration: none;
  color: #178237;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
nav a:hover {
  color: #2e2f48;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  .logo {
    display: block;
    margin: 0 3%;
    width: 40px;
    height: 40px;
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.el-radio-group {
  margin-right: 12px;
}
</style>
