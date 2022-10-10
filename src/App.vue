<template>
  <div class="main-body">
    <nav class="header">
      <p>🎬 The Movie Search App</p>
    </nav>
    <router-view />
    <figure class="bg-image">
      <img src="./assets/new-york.png" alt="" />
    </figure>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-body {
  background: #242222;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  /* background-image: url("./assets/new-york.png"); */
  /* background-repeat: no-repeat;
  background-position: bottom; */
  /* height: 100vh; */
  /* overflow: scroll; */
  /* border: #242222 1px solid red; */
}

.header {
  background: #313030;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 22px 0;
  position: sticky;
  top: 0;
  z-index: 20;
}
.header p {
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #ffffff;
}
.bg-image {
  position: fixed;
  bottom: 0;
  background: transparent;
  z-index: 1;
}

.bg-image img {
  width: 100%;
}

main {
  background: #242222;
}

@media screen and (max-width: 600px) {
  .header {
    padding: 18px 0;
  }
  .header p {
    font-size: 12px;
  }
}
</style>
