<template>
  <v-container>
    <v-card>
      <v-card-title class="elevation-3">Add new band</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field dense label="Title" v-model="band.title"/>
          </v-col>
          <v-col>
            <v-text-field dense label="Origin" v-model="band.origin"/>
          </v-col>
          <v-col>
            <v-autocomplete dense label="Formed in"
                      :items="$store.getters.yearsRange"
                      v-model.number="band.formedIn"/>
          </v-col>
          <v-col>
            <v-autocomplete dense label="Label" v-model="band.label"
                            :search-input.sync="searchLabel"
                            :items="searchResultLabel"
                            item-text="title"
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
  </v-container>
</template>

<script>
export default {
  name: "Add",
  watch: {
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
  data: () => ({
    searchLabel: null,
    searchResultLabel: [],
    band: {
      title: null,
      origin: null,
      description: null,
      label: null,
      logo: null,
      photo: null,
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
