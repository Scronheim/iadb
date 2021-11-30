<template>
  <v-card>
    <v-card-title>Line up editor
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="success" v-on="on" v-bind="attrs">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item link dense @click="showNewPersonEditor = true">New</v-list-item>
          <v-list-item link dense @click="showNewPersonEditor = false">Exist</v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-card-text>
      <template v-if="showNewPersonEditor">
        <v-row>
          <v-col>
            <v-text-field dense hide-details label="Name" v-model="addablePerson.name"/>
          </v-col>
          <v-col>
            <v-text-field dense hide-details label="Birthdate" type="date" v-model="addablePerson.birthDate"/>
          </v-col>
          <v-col>
            <v-autocomplete dense hide-details clearable label="Country"
                            v-model="addablePerson.countryId"
                            :items="countrySearchResult"
                            item-value="_id"
                            item-text="name"
                            :search-input.sync="countrySearch"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field dense hide-details label="Instruments" placeholder="Comma separated" v-model="addablePerson.instruments"/>
          </v-col>
          <v-col>
            <v-text-field dense hide-details label="Photo url" v-model="addablePerson.photo"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn color="success" @click="addPersonToLineUp">Add</v-btn>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-row>
          <v-col>
            <v-autocomplete :search-input.sync="personSearch"
                            :items="personSearchResult"
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
      </template>
      <v-row v-for="person in entity.lineUp" :key="person.name">
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
</template>

<script>
export default {
  name: "LineUp",
  props: {
    entity: { // band or album
      type: Object,
      required: true,
    }
  },
  watch: {
    personSearch(value) {
      if (!value) {
        this.personSearchResult = []
      } else {
        this.$store.dispatch('searchPeople', value).then(({data}) => {
          this.personSearchResult = data.data
        })
      }
    },
    countrySearch(value) {
      if (!value) {
        this.countrySearchResult = []
      } else {
        this.$store.dispatch('searchCountry', value).then(({data}) => {
          this.countrySearchResult = data.data
        })
      }
    },
  },
  data: () => ({
    addablePerson: {
      name: null,
      bandIds: [],
      birthDate: null,
      countryId: null,
      instruments: null,
      photo: null,
    },
    countrySearch: null,
    countrySearchResult: [],
    personSearch: null,
    personSearchResult: [],
    showNewPersonEditor: false,
  }),
  methods: {
    async addPersonToLineUp(person) {
      if (this.$route.path.includes('album')) {
        if (this.showNewPersonEditor) {
          const {data} = await this.$store.dispatch('addPerson', this.addablePerson)
          const payload = {
            personId: data.data._id,
            albumId: this.entity._id,
          }
          await this.$store.dispatch('addPersonToAlbum', payload)
        } else {
          const payload = {
            personId: person._id,
            albumId: this.entity._id,
          }
          await this.$store.dispatch('addPersonToAlbum', payload)
        }
      } else if (this.$route.path.includes('band')) {
        if (this.showNewPersonEditor) {
          const {data} = await this.$store.dispatch('addPerson', this.addablePerson)
          const payload = {
            personId: data.data._id,
            bandId: this.entity._id,
          }
          await this.$store.dispatch('addPersonToBand', payload)
        } else {
          const payload = {
            personId: person._id,
            bandId: this.entity._id,
          }
          await this.$store.dispatch('addPersonToBand', payload)
        }
      }
      this.$emit('refreshData')
      this.personSearch = null
      this.personSearchResult = []
      this.$toast.success(`Person successful added to this band`)
    },
    async removeFromLineUp(person) {
      if (this.$route.path.includes('album')) {
        const payload = {
          albumId: this.entity._id,
          personId: person._id
        }
        await this.$store.dispatch('removePersonFromAlbum', payload)
      } else if (this.$route.path.includes('band')) {
        const payload = {
          bandId: this.entity._id,
          personId: person._id
        }
        await this.$store.dispatch('removePersonFromBand', payload)
      }
      this.$emit('refreshData')
      this.$toast.success('Person successful removed from this band')
    },
  }
}
</script>

<style scoped>

</style>
