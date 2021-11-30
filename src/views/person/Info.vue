<template>
  <v-container>
    <v-card>
      <v-card-title class="elevation-3">{{ person.name }}
        <v-btn icon color="info" @click="personEditDialog = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="success" @click="savePerson">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="mt-3">
        <v-row>
          <v-col cols="2">
            <v-avatar size="280">
              <v-img :src="person.photo"/>
            </v-avatar>
          </v-col>
          <v-col>
            <v-list dense>
              <v-list-item>Country: <v-btn text color="orange">{{ person.country.name }}</v-btn></v-list-item>
              <v-list-item>Birth date: <v-btn text color="orange">{{ person.birthDate | humanDate }}</v-btn></v-list-item>
              <v-list-item>Instruments: <v-btn text color="orange">{{ person.instruments }}</v-btn></v-list-item>
            </v-list>
          </v-col>
          <v-col cols="2">
            <v-card>
              <v-card-title>Groups</v-card-title>
              <v-card-text>
                <template v-for="band in person.bands">
                  <v-btn text color="orange" link :to="`/band/${band._id}`" :key="band._id">{{ band.title }}</v-btn>
                </template>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog v-model="personEditDialog" width="40%">
      <v-card>
        <v-card-title>Person edit</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field dense hide-details label="Name" v-model="person.name"/>
            </v-col>
            <v-col>
              <v-text-field dense hide-details label="Birth date" type="date" v-model="person.birthDate"/>
            </v-col>
            <v-col>
              <v-autocomplete dense hide-details clearable label="Country"
                              v-model="person.countryId"
                              :items="searchCountryResult"
                              item-value="_id"
                              item-text="name"
                              :search-input.sync="countrySearch"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field dense hide-details label="Instruments" placeholder="Comma separated" v-model="person.instruments"/>
            </v-col>
            <v-col>
              <v-text-field dense hide-details label="Photo url" v-model="person.photo"/>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
export default {
  name: "Info",
  mounted() {
    this.refreshData()
  },
  computed: {
    person() {
      return this.$store.getters.currentPerson
    }
  },
  watch: {
    countrySearch(value) {
      if (!value) {
        this.searchCountryResult = []
      } else {
        this.$store.dispatch('searchCountry', value).then(({data}) => {
          this.searchCountryResult = data.data
        })
      }
    },
  },
  data: () => ({
    personEditDialog: false,
    countrySearch: null,
    searchCountryResult: [],
  }),
  methods: {
    async savePerson() {
      await this.$store.dispatch('savePerson')
      this.refreshData()
      this.$toast.success(`${this.person.name} successful updated`)
    },
    refreshData() {
      this.$store.dispatch('getPersonInfo', this.$route.params.id)
    }
  }
}
</script>

<style scoped>

</style>
