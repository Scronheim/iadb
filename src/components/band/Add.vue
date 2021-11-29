<template>
  <v-card>
    <v-card-title class="elevation-3">Add new band</v-card-title>
    <v-card-text class="mt-3">
      <v-row>
        <v-col>
          <v-text-field dense hide-details label="Title" v-model="band.title"/>
        </v-col>
        <v-col>
          <v-text-field dense hide-details label="Origin" v-model="band.origin"/>
        </v-col>
        <v-col>
          <v-autocomplete hide-details dense label="Formed in"
                          :items="$store.getters.yearsRange"
                          v-model.number="band.formedIn"/>
        </v-col>
        <v-col>
          <v-select dense hide-details label="Status"
                    :items="$store.getters.statuses"
                    item-value="status"
                    item-text="status"
                    v-model="band.status"/>
        </v-col>
        <v-col>
          <v-autocomplete dense label="Country" v-model="band.countryId"
                          :search-input.sync="searchCountry"
                          :items="searchResultCountry"
                          item-text="name"
                          item-value="_id">
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea auto-grow rows="2" dense label="Description" v-model="band.description"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field dense hide-details label="Official site" v-model="band.officialSite"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-autocomplete dense label="Label" v-model="band.label"
                          :search-input.sync="searchLabel"
                          :items="searchResultLabel"
                          item-text="title"
                          item-value="_id">
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-text-field dense label="Logo url" v-model="band.logo"/>
        </v-col>
        <v-col>
          <v-text-field dense label="Photo url" v-model="band.photo"/>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" @click="addBand">Add</v-btn>
      <v-btn color="error">Clear form</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Add",
  watch: {
    searchLabel(value) {
      if (!value) {
        this.searchResultLabel = []
        return
      } else {
        this.$store.dispatch('searchLabel', value).then(({data}) => {
          this.searchResultLabel = data.data
        })
      }
    },
    searchCountry(value) {
      if (!value) {
        this.searchResultCountry = []
        return
      } else {
        this.$store.dispatch('searchCountry', value).then(({data}) => {
          this.searchResultCountry = data.data
        })
      }
    }
  },
  data: () => ({
    searchLabel: null,
    searchCountry: null,
    searchResultLabel: [],
    searchResultCountry: [],
    band: {
      title: null,
      origin: null,
      description: null,
      labelId: null,
      countryId: null,
      status: 'active',
      logo: null,
      photo: null,
      officialSite: null,
    }
  }),
  methods: {
    addBand() {
      this.$store.dispatch('addBand', this.band).then(() => {
        this.$toast.success(`Band ${this.band.title} successful added`)
      })
    }
  }
}
</script>

<style scoped>

</style>
