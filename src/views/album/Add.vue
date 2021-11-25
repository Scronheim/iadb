<template>
  <v-container>
    <v-card>
      <v-card-title class="elevation-3">
        Add new album
      </v-card-title>
      <v-card-text class="mt-5">
        <v-row>
          <v-col>
            <v-text-field dense label="Title" v-model="album.title"/>
          </v-col>
          <v-col>
            <v-autocomplete v-model="album.bandId"
                            :search-input.sync="searchText"
                            :items="searchResult"
                            item-value="_id"
                            item-text="title"
                            no-data-text="Type something"
                            dense hide-details clearable
            />
          </v-col>
          <v-col>
            <v-text-field dense label="Release date" type="date" v-model="album.year"/>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Add",
  watch: {
    searchText(value) {
      this.$store.dispatch('searchBand', value).then(({data}) => {
        this.searchResult = data.data
      })
    },
  },
  data: () => ({
    searchText: null,
    searchResult: [],
    album: {
      title: null,
      bandId: null,
      year: null,
      cover: null,
      type: 'Full-length',
      label: null,
      releaseDate: null,
      trackList: [],
      rating: null,
    }
  }),
}
</script>

<style scoped>

</style>
