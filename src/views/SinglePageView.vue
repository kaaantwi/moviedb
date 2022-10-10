<template>
  <div class="single-page">
    <main>
      <Spinner v-if="loading" />
      <div class="movie-details" v-else>
        <figure class="movie-image">
          <img :src="singleMovie.Poster" alt="" />
        </figure>
        <div class="details">
          <Button text="← Back" @click="this.$router.go(-1)" />
          <p class="movie-name">{{ singleMovie.Title }}</p>
          <div class="section-1">
            <p class="movie-type">{{ singleMovie.Type }}</p>
            <p class="middle-dot">・</p>
            <p class="movie-year">{{ singleMovie.Released }}</p>
          </div>
          <div class="section-2">
            <p class="section-title">Plot:</p>
            <p class="plot">
              {{ singleMovie.Plot }}
            </p>
          </div>
          <div class="section-3">
            <p class="section-title">Actors:</p>
            <p class="actors">
              {{ singleMovie.Actors }}
            </p>
          </div>
          <div class="section-4">
            <p class="section-title">Genre:</p>
            <div class="genres">
              <div
                class="genre"
                v-for="(genre, index) in genreArray"
                :key="index"
              >
                <p>{{ genre }}</p>
              </div>
            </div>
          </div>
          <div class="section-5">
            <p class="section-title">IMDB Rating:</p>
            <p class="rating">{{ singleMovie.imdbRating }} <span>⭐️</span></p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import Spinner from "@/components/Spinner.vue";
export default {
  components: { Button, Spinner },
  data() {
    return {
      genreArray: [],
    };
  },
  async created() {
    let imdbID = this.$route.params.title;
    await this.getSingleMovie(imdbID);
    this.genreArray = this.singleMovie.Genre.split(",");
  },
  computed: {
    ...mapGetters({
      singleMovie: "getSingleMovie",
    }),
    ...mapState({
      loading: (state) => state.loading,
    }),
  },
  methods: {
    ...mapActions({
      getSingleMovie: "getSingleMovie",
    }),
  },
};
</script>

<style scoped>
.single-page {
  background: #242222;
}
.header {
  background: #313030;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 22px 0;
}

.movie-image {
  width: 100%;
  height: 100%;
}
.movie-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.header p {
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #ffffff;
}
main {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
}

.movie-details {
  width: calc(100% - 48px);
  max-width: 732px;
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  z-index: 10;
}

/* .details {
  margin-left: 32px;
} */

button {
  padding: 6px 24px;
  border: 1px solid #c43838;
  border-radius: 50px;
  background: none;
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #c43838;
  cursor: pointer;
}

.movie-name {
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 52px;
  margin-top: 20px;
  letter-spacing: -0.02em;
  color: #ffffff;
  /* width: 410px; */
}

.section-1,
.section-2,
.section-3,
.section-4,
.section-5 {
  display: flex;
}

.section-2 {
  margin-top: 28px;
}

.movie-year,
.movie-type {
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: rgba(255, 255, 255, 0.55);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.movie-year {
  margin-left: 10px;
}

.middle-dot {
  color: rgba(255, 255, 255, 0.55);
  margin-left: 10px;
}

.section-title {
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #ffffff;
}

.plot,
.actors,
.rating {
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.55);
  /* width: 346px; */
  margin-left: 12px;
}

.genres {
  display: flex;
  flex-wrap: wrap;
}

.genre {
  background: #373636;
  border-radius: 50px;
  padding: 8px 24px;
  margin-left: 8px;
  margin-top: 10px;
}

.genre p {
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.4);
}

.section-3,
.section-4,
.section-5 {
  margin-top: 16px;
}

.section-4,
.section-5 {
  align-items: center;
}

@media (min-width: 530px) {
  .movie-details {
    flex-direction: row;
  }
  .details {
    margin-left: 32px;
  }
}
</style>
