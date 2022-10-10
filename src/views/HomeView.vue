<template>
  <div class="home">
    <main>
      <div class="search-box">
        <input
          type="text"
          placeholder="Enter movie title..."
          v-model="searchTerm"
          @keyup.enter="search"
        />
        <Button text="Search" @click="search" />
      </div>
      <div class="error" v-if="hasError === true">{{ errorMessage1 }}</div>
      <div class="movie-content">
        <div class="skeleton-loader-container" v-if="loading">
          <SkeletonLoader v-for="(n, index) in 10" :key="index" />
        </div>
        <figure
          class="movie-image"
          v-if="movies?.length === 0 && loading === false"
        >
          <img src="../assets/newmovie.svg" alt="" />
        </figure>
        <div class="show" v-else>
          <div class="cards" v-if="movies?.length > 1 && loading === false">
            <Cards
              v-for="(movie, index) in movies"
              :key="index"
              :movieTitle="movie.Title"
              :movieType="movie.Type"
              :movieYear="movie.Year"
              :movieImage="movie.Poster"
              @click="
                this.$router.push({
                  name: 'movie',
                  params: { title: movie.imdbID },
                })
              "
            />
          </div>
          <div class="pagination-container">
            <div
              class="pagination"
              v-if="movies?.length > 1 && loading === false"
            >
              <div
                class="page"
                v-for="(pageNumber, index) in pages.slice(
                  paginationIndex,
                  paginationIndex + 10
                )"
                :key="index"
                @click="setSelectedPage(pageNumber)"
                :class="{ active: selectedPage === pageNumber }"
              >
                <p>{{ pageNumber }}</p>
              </div>
            </div>
            <Button text="next" @click="loadPages" class="next-btn" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from "@/components/Button.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import Cards from "@/components/Cards.vue";
import Spinner from "../components/Spinner.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";

export default {
  name: "HomeView",
  components: {
    Button,
    Cards,
    Spinner,
    SkeletonLoader,
  },
  data() {
    return {
      searchTerm: "",
      searchValuee: "",
      hasError: false,
      pageTotal: null,
      selectedPage: 1,
      pageNum: null,
      errorMessage1: null,
      paginationIndex: 0,
    };
  },
  watch: {
    selectedPage(newValue, oldValue) {
      if (newValue !== 0) {
        let searchValue = this.searchValuee;
        let pageNum = this.selectedPage;
        this.getMovies({ searchValue, pageNum });
      }
    },
  },
  computed: {
    ...mapGetters({
      movies: "getMovies",
    }),
    ...mapState({
      loading: (state) => state.loading,
      errorMessage: (state) => state.errorMessage,
    }),
    pageCalculation() {
      if (this.pageTotal % 10 !== 0) {
        return Math.trunc(this.pageTotal / 10) + 1;
      } else {
        return Math.trunc(this.pageTotal / 10);
      }
    },
    pages() {
      let pagesArray = [];
      for (let i = 1; i <= this.pageCalculation; i++) {
        pagesArray.push(i);
      }
      return pagesArray;
    },
  },
  methods: {
    ...mapActions({
      getMovies: "getMovies",
    }),
    async search() {
      this.hasError = false;
      this.searchValuee = this.searchTerm;
      this.selectedPage = 1;
      this.isClicked = true;
      let searchValue = this.searchValuee;
      let pageNum = this.selectedPage;
      await this.getMovies({ searchValue, pageNum });
      this.pageTotal = this.$store.getters.getTotalResults;

      if (this.$store.state.errorMessage) {
        this.hasError = true;
        this.errorMessage1 = this.$store.state.errorMessage;
      }
    },

    setSelectedPage(page) {
      this.selectedPage = Number(page);
    },
    loadPages() {
      this.paginationIndex += 10;
    },
  },
};
</script>

<style scoped>
.home {
  background: #242222;
}

.header {
  background: #313030;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 22px 0;
}
.header p {
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #ffffff;
}
.movie-content {
  width: calc(100% - 48px);
  max-width: 1128px;
  /* height: 50vh;
  overflow-y: auto; */
  z-index: 10;
  max-width: 1128px;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding: 0 100px; */
  padding-bottom: 30px;
}

.search-box {
  margin-top: 72px;
  background: #313030;
  border-radius: 92px;
  padding: 6px;
  width: calc(100% - 48px);
  max-width: 507px;
  display: flex;
  justify-content: space-between;
  outline-color: #c53939;
  border: 2px solid #313030;
  position: sticky;
  top: 100px;
  z-index: 20;
}

.search-box:focus-within {
  border: 2px solid #c53939;
}

button {
  padding: 6px 15px;
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 21px;
  color: #ffffff;
  background: #c53939;
  border: none;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  border-radius: 68px;
  cursor: pointer;
}

input,
input::placeholder {
  margin-left: 26px;
  border-radius: 92px;
  border: none;
  outline: none;
  background: none;
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 21px;
  color: rgba(255, 255, 255, 0.5);
  width: 100%;
}
.movie-info {
  display: flex;
  justify-content: center;
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

.movie-image {
  margin-top: 47px;
  /* width: 100%; */
  /* height: 100%; */
  /* border: 1px solid red; */
}
.movie-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.cards,
.skeleton-loader-container {
  margin-top: 42px;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  /* grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto; */
  /* gap: 10px; */
}

.page {
  width: 20px;
  max-width: 40px;
  min-width: 20px;
  max-height: 40px;
  height: 20px;
  background: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
}

.page p {
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  color: #ffffff;
  /* text-align: center; */
}

.active {
  background: red;
}
.error {
  color: red;
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 21px;
  margin-top: 20px;
}

.next-btn {
  padding: 6px 15px;
  font-size: 12px;
  margin-top: 15px;
}

.pagination-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (min-width: 530px) {
  .cards,
  .skeleton-loader-container {
    grid-template-columns: 1fr 1fr;
  }
  .page {
    width: 25px;
    height: 25px;
  }
}
@media (min-width: 768px) {
  .cards,
  .skeleton-loader-container {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .page {
    width: 30px;
    height: 30px;
  }
  .pagination-container {
    flex-direction: row;
  }
}
@media (min-width: 980px) {
  .cards,
  .skeleton-loader-container {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .page {
    width: 40px;
    height: 40px;
  }
  .pagination-container {
    flex-direction: row;
  }
  button,
  .next-btn {
    padding: 12px 30px;
    font-size: 16px;
  }
}
@media (min-width: 1300px) {
  .cards,
  .skeleton-loader-container {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  .page {
    width: 40px;
    height: 40px;
  }
  .pagination-container {
    flex-direction: row;
  }
  button,
  .next-btn {
    padding: 12px 30px;
    font-size: 16px;
  }
}
</style>
