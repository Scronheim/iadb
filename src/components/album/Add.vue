<template>
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
          <v-text-field dense label="Release date" type="date" v-model="album.releaseDate"/>
        </v-col>
        <v-col>
          <v-select dense hide-details label="Type"
                    :items="$store.getters.albumTypes"
                    v-model="album.type"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field dense hide-details label="Cover url"
                        v-model="album.cover"/>
        </v-col>
        <v-col>
          <v-autocomplete v-model="album.labelId"
                                      :search-input.sync="searchLabel"
                                      :items="searchResult"
                                      item-value="_id"
                                      item-text="title"
                                      label="Label"
                                      no-data-text="Type something"
                                      dense hide-details clearable>
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Tracklist
              :track-list="album.trackList"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn color="success" @click="addAlbum">Add</v-btn>
      <slot name="actions"/>
    </v-card-actions>
  </v-card>
</template>

<script>
import Tracklist from "@/components/album/Tracklist"
export default {
  name: "Add",
  components: {Tracklist},
  mounted() {
    this.album.bandId = this.$route.params.id || null
  },
  watch: {
    searchLabel(value) {
      this.$store.dispatch('searchLabel', value).then(({data}) => {
        this.searchResult = data.data
      })
    },
  },
  data: () => ({
    searchLabel: null,
    searchResult: [],
    album: {
      title: null,
      bandId: null,
      year: null,
      cover: null,
      type: 'Full-length',
      labelId: null,
      releaseDate: null,
      trackList: [],
      rating: null,
    }
  }),
  methods: {
    addAlbum() {
      this.$emit('addAlbum', this.album)
    }
  }
}
</script>

<style scoped>

</style>
