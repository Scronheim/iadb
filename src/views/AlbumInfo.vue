<template>
  <v-container>
    <v-card>
      <v-card-title>{{ album.band.title }} - {{ album.title }} ({{ album.year }})
        <v-spacer/>
        <v-rating background-color="orange lighten-3" color="orange" hover v-model="album.rating"/>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <v-avatar
                size="290"
                rounded>
              <v-img :src="album.cover"/>
            </v-avatar>
          </v-col>
          <v-col>
            <v-list dense>
              <v-list-item>Band/Artist: <router-link :to="`/band/${album.band._id}`">{{ album.band.title }}</router-link></v-list-item>
              <v-list-item>Type: {{ album.type }}</v-list-item>
              <v-list-item>Release date: {{ album.releaseDate | humanDate }}</v-list-item>
              <v-list-item>Label: <router-link :to="`/label/${album.label._id}`">{{ album.label.title }}</router-link></v-list-item>
            </v-list>
          </v-col>
          <v-col>
            <v-simple-table dense>
              <thead>
                <tr>
                  <th>Tracklist</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(track, index) in album.trackList" :key="index">
                  <td>{{ track.title }}</td>
                  <td>{{ track.duration }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "AlbumInfo",
  mounted() {
    this.$store.dispatch('getAlbumInfo', this.$route.params.id)
  },
  computed: {
    album() {
      return this.$store.getters.currentAlbum
    }
  }
}
</script>

<style scoped>

</style>
