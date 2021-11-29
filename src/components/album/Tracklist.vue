<template>
  <div>
    <v-row>
      <v-col>
        <v-btn icon color="success" @click="addTrack">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row dense v-for="(track, index) in trackList" :key="track.number">
      <v-col cols="2">
        <v-text-field hide-details label="Number" dense type="number" min="1" v-model.number="track.number"/>
      </v-col>
      <v-col>
        <v-text-field hide-details label="Title" dense v-model="track.title"/>
      </v-col>
      <v-col cols="2">
        <v-text-field hide-details label="Duration" dense v-model="track.duration"/>
      </v-col>
      <v-col cols="1">
        <v-btn icon @click="showLyrics(track, true)">
          <v-icon>mdi-card-text</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn icon color="error" @click="removeTrack(index)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="lyricsDialog">
      <v-card>
        <v-card-title>Lyrics for {{ currentSong.title }}
          <v-btn icon color="info" @click="editLyrics = !editLyrics">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-textarea auto-grow v-if="editLyrics" dense v-model="currentSong.lyrics"/>
          <pre v-else>{{ currentSong.lyrics }}</pre>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Tracklist",
  props: {
    trackList: {
      type: Array,
      required: true,
    }
  },
  data: () => ({
    currentSong: {},
    editLyrics: false,
    lyricsDialog: false,
  }),
  methods: {
    showLyrics(song, showEditLyrics) {
      this.currentSong = song
      this.editLyrics = showEditLyrics
      this.lyricsDialog = true
    },
    addTrack() {
      let number = 1
      if (this.trackList.length > 0) {
        number = this.trackList[this.trackList.length-1].number + 1
      }
      this.trackList.push({
        number: number,
        title: '',
        duration: '00:00',
        lyrics: '',
      })
    },
    removeTrack(index) {
      this.trackList.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
