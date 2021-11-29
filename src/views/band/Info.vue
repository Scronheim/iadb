<template>
  <v-container>
    <v-card>
      <v-card-title class="elevation-3">
        {{ band.title }}
        <v-btn icon color="success" @click="saveBand">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-spacer/>
        <v-rating background-color="orange lighten-3" color="orange" hover/>
      </v-card-title>
      <v-card-text class="pt-3">
        <v-row>
          <v-col cols="2">
            <v-img contain :src="band.logo"/>
            <v-img max-height="300" :src="band.photo"/>
          </v-col>
          <v-col>
            <v-expansion-panels accordion v-model="expPanels">
              <v-expansion-panel>
                <v-expansion-panel-header color="#313131">
                  <div>
                    General info
                    <v-btn small icon color="info" @click="openGeneralInfoDialog">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col>
                      <v-list dense class="pa-0">
                        <v-list-item class="pa-0">Origin:
                          <v-btn text color="orange">{{ band.origin }}</v-btn>
                        </v-list-item>
                        <v-list-item class="pa-0">Formed in:
                          <v-btn text color="orange">{{ band.formedIn }}</v-btn>
                        </v-list-item>
                        <v-list-item class="pa-0">Country:
                          <v-btn text color="orange">{{ band.country.name }}</v-btn>
                        </v-list-item>
                        <v-list-item class="pa-0">Status:
                          <v-btn text :color="$store.state.statuses[band.status].color">{{ band.status }}</v-btn>
                        </v-list-item>
                      </v-list>
                    </v-col>
                    <v-col>
                      <v-list dense>
                        <v-list-item>
                          Official site: <v-btn color="info" small text link :href="band.officialSite" target="_blank">{{ band.officialSite }}</v-btn>
                        </v-list-item>
                        <v-list-item>
                          Tags:
                          <v-chip-group column>
                            <v-chip v-for="(tag, index) in band.tags" :key="tag" @click:close="removeTag(index)"
                                    class="ml-2"
                                    color="gray"
                                    label
                                    close
                                    outlined>{{ tag }}
                            </v-chip>
                          </v-chip-group>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header color="#313131">
                  <div>
                    Description
                    <v-btn small icon color="info" @click="openDescriptionDialog">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ band.description }}
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header color="#313131">
                  <div>
                    Current line up
                    <v-btn small icon color="info" @click="openLineUpDialog">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-list dense>
                    <v-list-item v-for="person in band.lineUp" :key="person.name" class="pa-0">
                      <v-btn text link :to="`/person/${person._id}`" color="orange" class="pa-1">{{ person.name }}</v-btn> - {{ person.instruments }}
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col cols="3">
            <v-card>
              <v-btn color="success" small absolute top left fab @click="addAlbumDialog = true">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-card-title class="elevation-3" style="background-color: #313131">Band album's</v-card-title>
              <v-card-text>
                <v-card class="mt-2" elevation="3" v-for="album in band.albums" :key="album.title">
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="text-h6">{{ album.title }} ({{ album.releaseDate | dateOnlyYear }})</v-card-title>
                      <v-card-actions>
                        <v-btn class="ml-2 mt-5" link :to="`/album/${album._id}`"
                               outlined
                               small>
                          Show album
                        </v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar
                        class="ma-3"
                        size="125"
                        tile>
                      <v-img :src="album.cover"/>
                    </v-avatar>
                  </div>
                </v-card>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog v-model="addAlbumDialog" width="50%" persistent>
      <add-album-form @addAlbum="addAlbum">
        <template v-slot:actions>
          <v-btn color="error" @click="addAlbumDialog = false">Close</v-btn>
        </template>
      </add-album-form>
    </v-dialog>

    <v-dialog v-model="lineUpDialog" width="40%">
      <v-card>
        <v-card-title>Line up editor
          <v-btn icon color="success" @click="showAddPersonInput = true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row v-if="showAddPersonInput">
            <v-col>
              <v-autocomplete :search-input.sync="personSearch"
                              :items="searchPersonResult"
                              item-value="_id"
                              item-text="name"
                              label="People"
                              no-data-text="Type person name"
                              dense hide-details clearable
                              return-object
                              @input="addPersonToLineUp"
              />
            </v-col>
          </v-row>
          <v-row v-for="person in band.lineUp" :key="person.name">
            <v-col cols="3">
              {{ person.name }}
            </v-col>
            <v-col>
              {{ person.instruments }}
            </v-col>
            <v-col cols="1">
              <v-btn icon color="error" @click="removeFromLineUp(person)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="descriptionEditDialog" width="30%">
      <v-card>
        <v-card-title>Description editor</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-textarea auto-grow dense hide-details label="Description" v-model="band.description"/>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="generalInfoDialog" width="40%">
      <v-card>
        <v-card-title>General info</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field dense hide-details label="Origin" v-model="band.origin"/>
            </v-col>
            <v-col cols="2">
              <v-autocomplete dense hide-details label="Formed in"
                              :items="$store.getters.yearsRange"
                              v-model="band.formedIn"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete dense hide-details clearable label="Country"
                              v-model="band.countryId"
                              :items="searchCountryResult"
                              item-value="_id"
                              item-text="title"
                              :search-input.sync="countrySearch"
              />
            </v-col>
            <v-col>
              <v-select dense hide-details label="Status"
                        :items="$store.getters.statuses"
                        item-text="status"
                        item-value="status"
                        v-model="band.status"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field dense hide-details label="Official site" v-model="band.officialSite"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field dense hide-details label="Logo url" v-model="band.logo"/>
            </v-col>
            <v-col>
              <v-text-field dense hide-details label="Photo url" v-model="band.photo"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-divider/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn icon color="success" @click="addTag">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row dense v-for="(tag, index) in band.tags" :key="index">
            <v-col>
              <v-text-field hide-details label="Tag" v-model="band.tags[index]"/>
            </v-col>
            <v-col cols="1">
              <v-btn icon color="error" @click="removeTag(index)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import AddAlbumForm from '@/components/album/Add'
export default {
  name: 'BandInfo',
  components: {AddAlbumForm},
  mounted() {
    this.refreshData()
  },
  watch: {
    '$route.params.id'(value) {
      this.$store.dispatch('getBandInfo', value)
    },
    countrySearch(value) {
      if (!value) {
        this.searchCountryResult = []
      } else {
        this.$store.dispatch('searchCountry', value).then(({data}) => {
          this.searchCountryResult = data.data
        })
      }
    },
    personSearch(value) {
      if (!value) {
        this.searchPersonResult = []
      } else {
        this.$store.dispatch('searchPeople', value).then(({data}) => {
          this.searchPersonResult = data.data
        })
      }
    }
  },
  computed: {
    band() {
      return this.$store.getters.currentBand
    },
  },
  data: () => ({
    personSearch: null,
    countrySearch: null,
    searchCountryResult: [],
    searchPersonResult: [],
    expPanels: 0,
    generalInfoDialog: false,
    descriptionEditDialog: false,
    lineUpDialog: false,
    addAlbumDialog: false,
    showAddPersonInput: false,
    newAlbum: {},
  }),
  methods: {
    async addAlbum(album) {
      await this.$store.dispatch('addAlbum', album)
      this.$toast.success(`Album ${album.title} successful added`)
      this.refreshData()
    },
    async addPersonToLineUp(person) {
      const payload = {
        personId: person._id,
        bandId: this.band._id
      }
      await this.$store.dispatch('addPersonToBand', payload)
      this.$toast.success(`${person.name} successful added to this band`)
      this.personSearch = null
      this.refreshData()
    },
    async removeFromLineUp(person) {
      const payload = {
        personId: person._id,
        bandId: this.band._id
      }
      await this.$store.dispatch('removePersonFromBand', payload)
      this.$toast.success(`${person.name} successful removed from this band`)
      this.refreshData()
    },
    openLineUpDialog(event) {
      event.stopPropagation()
      this.lineUpDialog = true
    },
    openDescriptionDialog(event) {
      event.stopPropagation()
      this.descriptionEditDialog = true
    },
    openGeneralInfoDialog(event) {
      event.stopPropagation()
      this.generalInfoDialog = true
    },
    async saveBand() {
      this.$store.commit('setCurrentBand', this.band)
      await this.$store.dispatch('saveBand')
      this.refreshData()
      this.$toast.success(`Band ${this.band.title} successful saved`)
    },
    removeTag(index) {
      this.band.tags.splice(index, 1)
    },
    addTag() {
      this.band.tags.push('')
    },
    refreshData() {
      this.$store.dispatch('getBandInfo', this.$route.params.id)
    }
  }
};
</script>
