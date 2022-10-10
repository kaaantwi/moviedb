<template>
  <div class="card">
    <figure>
      <img
        class="image"
        v-if="movieImage !== 'N/A'"
        :src="movieImage"
        alt="image of movie"
      />
      <img
        src="../assets/0-6402_free-download-no-stamp-transparent.png"
        alt=""
        v-else
        class="no-image"
      />
    </figure>
    <p class="movie-name">{{ movieTitle }}</p>
    <div class="movie-info">
      <p class="movie-type">{{ movieType }}</p>
      <p class="interpunct">・</p>
      <p class="movie-year">{{ movieYear }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cards",
  props: ["movieTitle", "movieType", "movieYear", "movieImage"],
};
</script>

<style scoped>
.card {
  text-overflow: ellipsis;
  width: 200px;
}
.movie-info {
  display: flex;
  align-items: center;
}
.movie-type,
.movie-year {
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: rgba(255, 255, 255, 0.55);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.movie-year,
.interpunct {
  margin-left: 8px;
}

.interpunct {
  color: rgba(255, 255, 255, 0.55);
}

.movie-name {
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  color: #ffffff;
  margin-top: 14px;
}

.movie-cards {
  margin-top: 42px;
}

figure {
  height: 299.34px;
}

.card img {
  width: 100%;
  height: 100%;
}

.card {
  text-align: start;
  cursor: pointer;
  transition: all 0.5s ease; /* back to normal */
}
.card:hover {
  transition: all 0.4s ease; /* zoom in */
  transform: translate3D(0, -1px, 0) scale(1.03);
}

.image {
  object-fit: cover;
}
.no-image {
  object-fit: contain;
}

.skeleton-loader {
  position: relative;
  gap: 5px;
  width: 200px;
  background: #313030;
  overflow: hidden;
}

.skeleton-loader::before {
  position: absolute;
  content: "";
  width: 10px;
  height: 100%;
  background: #ffffff;
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
</style>
