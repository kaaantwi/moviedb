<template>
  <div class="skeleton-loader">
    <div class="loader"></div>
    <div class="bottom">
      <p class="title"></p>
      <p class="description"></p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.skeleton-loader {
  position: relative;
  gap: 5px;
  width: 200px;
  height: 379px;
  background: #313030;
  overflow: hidden;
}

.skeleton-loader::before {
  position: absolute;
  content: "";
  width: 10px;
  height: 100%;
  background: #ffffff;
  opacity: 0.5;
  filter: blur(25px);
  animation: mymove 1s infinite;
}

@keyframes mymove {
  from {
    left: 0%;
  }
  to {
    left: 100%;
  }
}
.bottom {
  width: 90%;
  position: absolute;
  bottom: 0;
}
.title,
.description {
  position: relative;
  height: 21px;
  background: #242222;
  margin: 10px;
}
.title::before,
.description::before {
  position: absolute;
  content: "";
  width: 10px;
  height: 100%;
  background: #ffffff;
  filter: blur(25px);
  animation: mymove 1s infinite;
}

@media screen and (max-width: 600px) {
}
</style>
