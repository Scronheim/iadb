<template>
  <v-container>
    <v-card>
      <v-card-title>{{ album.band.title }} - {{ album.title }} ({{ album.releaseDate | dateOnlyYear }})
        <v-btn icon color="success" @click="saveAlbum">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-spacer/>
        <v-rating background-color="orange lighten-3" color="orange" hover v-model="album.rating"/>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col :cols="$vuetify.breakpoint.lg ? 3: 2">
            <v-avatar
                size="290"
                rounded>
              <v-img :src="album.cover"/>
            </v-avatar>
          </v-col>
          <v-col>
            <v-list dense>
              <v-hover v-slot="{hover}">
                <v-list-item>
                  <template v-if="showBandInput">
                    <v-autocomplete dense label="Band"
                                    :search-input.sync="searchBand"
                                    :items="searchResult"
                                    item-text="title"
                                    item-value="title"
                                    return-object
                                    @change="changeAlbumBand">
                      <template v-slot:append-outer>
                        <v-btn icon color="error" @click="showBandInput = false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </template>
                    </v-autocomplete>
                  </template>
                  <template v-else>
                    Band/Artist:
                    <v-btn link text color="orange"
                           :to="`/band/${album.band._id}`">{{ album.band.title }}</v-btn>
                    <v-btn icon color="info" v-if="hover" @click="showBandInput = true">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                </v-list-item>
              </v-hover>
              <v-hover v-slot="{hover}">
                <v-list-item>
                  <template v-if="showTypeSelect">
                    <v-select dense label="Type" v-model="album.type"
                              :items="$store.getters.albumTypes"
                              @change="changeAlbumType">
                      <template v-slot:append-outer>
                        <v-btn icon color="error" @click="showTypeSelect = false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </template>
                    </v-select>
                  </template>
                  <template v-else>
                    Type: <v-btn text color="orange">{{ album.type }}</v-btn>
                    <v-btn icon color="info" v-if="hover" @click="showTypeSelect = true">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                </v-list-item>
              </v-hover>
              <v-hover v-slot="{hover}">
                <v-list-item>
                  <template v-if="showReleaseDateInput">
                    <v-text-field dense label="Release date" v-model="album.releaseDate">
                      <template v-slot:append-outer>
                        <v-btn icon color="success" @click="changeAlbumReleaseDate">
                          <v-icon>mdi-content-save</v-icon>
                        </v-btn>
                        <v-btn icon color="error" @click="showReleaseDateInput = false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </template>
                    </v-text-field>
                  </template>
                  <template v-else>
                    Release date:
                    <v-btn text color="orange">{{ album.releaseDate | humanDate }}</v-btn>
                    <v-btn icon color="info" v-if="hover" @click="showReleaseDateInput = true">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                </v-list-item>
              </v-hover>
              <v-hover v-slot="{hover}">
                <v-list-item>
                  <template v-if="showLabelInput">
                    <v-autocomplete dense label="Label"
                                    :search-input.sync="searchLabel"
                                    :items="searchResultLabel"
                                    item-text="title"
                                    item-value="title"
                                    return-object
                                    @change="changeAlbumLabel">
                      <template v-slot:append-outer>
                        <v-btn icon color="error" @click="showLabelInput = false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </template>
                    </v-autocomplete>
                  </template>
                  <template v-else>
                    Label:
                    <v-btn link text color="orange"
                           :to="`/label/${album.label._id}`">{{ album.label.title }}</v-btn>
                    <v-btn icon color="info" v-if="hover" @click="showLabelInput = true">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                </v-list-item>
              </v-hover>
            </v-list>
            <v-expansion-panels :value="0">
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div>Line up
                    <v-btn icon color="info" @click="openLineUpDialog">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div v-for="(person) in album.lineUp" :key="person._id">
                    <v-btn text color="orange" link class="pl-1 pr-1"
                           :to="`/person/${person._id}`">
                      {{ person.name }}
                    </v-btn> - {{ person.instruments }} <br/>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col>
            <v-btn rounded fab x-small color="info" @click="tracklistDialog = true">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-simple-table dense>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Song</th>
                  <th>Duration</th>
                  <th>Lyrics</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(track, index) in album.trackList" :key="index">
                  <td>{{ track.number }}</td>
                  <td>{{ track.title }}</td>
                  <td>{{ track.duration }}</td>
                  <td>
                    <v-btn icon
                           v-if="track.lyrics"
                           @click="showLyrics(track, false)">
                      <v-icon>mdi-card-text</v-icon>
                    </v-btn>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">Total length</td>
                  <td>{{ totalAlbumDuration }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog v-model="lineUpDialog" width="40%">
      <line-up :entity="album" @refreshData="refreshData"/>
    </v-dialog>

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

    <v-dialog v-model="tracklistDialog" width="40%">
      <v-card>
        <v-card-title>Tracklist edit</v-card-title>
        <v-card-text>
          <tracklist
              :track-list="album.trackList"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Tracklist from '@/components/album/Tracklist'
import LineUp from '@/components/LineUp'
export default {
  name: "AlbumInfo",
  components: {Tracklist, LineUp},
  mounted() {
    this.refreshData()
  },
  watch: {
    '$route.params.id'(value) {
      this.$store.dispatch('getAlbumInfo', value)
    },
    searchBand(value) {
      if (!value) {
        this.searchResult = []
      } else {
        this.$store.dispatch('searchBand', value).then(({data}) => {
          this.searchResult = data.data
        })
      }
    },
    searchLabel(value) {
      if (!value) {
        this.searchResultLabel = []
      } else {
        this.$store.dispatch('searchLabel', value).then(({data}) => {
          this.searchResultLabel = data.data
        })
      }
    }
  },
  computed: {
    album() {
      return this.$store.getters.currentAlbum
    },
    totalAlbumDuration() {
      const sum = this.album.trackList.map((track) => {
        return track.duration
      }).reduce((acc, time) => acc.add(this.$moment.duration(time)), this.$moment.duration())
      return [Math.floor(sum.asHours()), sum.minutes()].join(':')
    }
  },
  data: () => ({
    currentSong: {},
    searchBand: null,
    searchLabel: null,
    searchResult: [],
    searchResultLabel: [],
    showBandInput: false,
    showTypeSelect: false,
    showReleaseDateInput: false,
    showLabelInput: false,
    tracklistDialog: false,
    lyricsDialog: false,
    editLyrics: false,
    lineUpDialog: false,
  }),
  methods: {
    refreshData() {
      this.$store.dispatch('getAlbumInfo', this.$route.params.id)
    },
    openLineUpDialog(event) {
      event.stopPropagation()
      this.lineUpDialog = true
    },
    showLyrics(song, showEditLyrics) {
      this.currentSong = song
      this.editLyrics = showEditLyrics
      this.lyricsDialog = true
    },
    changeAlbumLabel(label) {
      this.album.label = label._id
      this.saveAlbum()
      this.showLabelInput = false
    },
    changeAlbumReleaseDate() {
      this.saveAlbum()
      this.showReleaseDateInput = false
    },
    changeAlbumType(type) {
      this.album.type = type
      this.saveAlbum()
      this.showTypeSelect = false
    },
    changeAlbumBand(band) {
      this.album.bandId = band._id
      this.saveAlbum()
      this.showBandInput = false
    },
    saveAlbum() {
      this.$store.commit('setCurrentAlbum', this.album)
      this.$store.dispatch('saveAlbum').then(() => {
        this.$toast.success('Album successful saved')
        this.$store.dispatch('getAlbumInfo', this.$route.params.id)
      })
    },
  }
}
</script>

<style scoped>

</style>
