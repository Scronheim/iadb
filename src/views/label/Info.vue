<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>{{ label.title }}</v-card-title>
          <v-card-text>
            <v-row dense>
              <v-col cols="2">
                <v-img contain :src="label.logo"/>
              </v-col>
              <v-col>
                <v-list dense>
                  <v-list-item>Country: <v-btn text color="orange">{{ label.country }}</v-btn></v-list-item>
                  <v-list-item>Address: <v-btn text color="orange">{{ label.address }}</v-btn></v-list-item>
                  <v-list-item>Phone: <v-btn text color="orange">{{ label.phone }}</v-btn></v-list-item>
                  <v-list-item>Official site: <v-btn text link :to="label.officialSite" color="orange">{{ label.officialSite }}</v-btn></v-list-item>
                </v-list>
              </v-col>
              <v-col>
                <v-list dense>
                  <v-list-item>Status: <v-btn text :color="$store.state.statuses[label.status].color">{{ label.status }}</v-btn></v-list-item>
                  <v-list-item>Styles: <v-btn text color="orange">{{ label.styles }}</v-btn></v-list-item>
                  <v-list-item>Founding date: <v-btn text color="orange">{{ label.foundingDate }}</v-btn></v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mt-3">
          <v-card-title>Bands on this label</v-card-title>
          <v-card-text>
            <v-data-table dense
                          :headers="headers"
                          :items="label.bands"
                          item-key="_id"
            >
              <template v-slot:item.title="{item}">
                <v-btn class="pl-1 pr-1" text link color="orange" :to="`/band/${item._id}`">{{ item.title }}</v-btn>
              </template>
              <template v-slot:item.origin="{item}">
                <v-btn class="pl-1 pr-1" text link color="orange">{{ item.origin }}</v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mt-3">
          <v-card-title>Albums on this label</v-card-title>
          <v-card-text>
            <v-data-table dense
                          :headers="albumHeaders"
                          :items="label.albums"
                          item-key="_id"
            >
              <template v-slot:item.title="{item}">
                <v-btn class="pl-1 pr-1" color="orange" text link :to="`/album/${item._id}`">{{ item.title }}</v-btn>
<!--                <router-link :to="`/album/${item._id}`">{{ item.title }}</router-link>-->
              </template>
              <template v-slot:item.band.title="{item}">
                <v-btn class="pl-1 pr-1" color="orange" text link :to="`/band/${item.band._id}`">{{ item.band.title }}</v-btn>
<!--                <router-link :to="`/band/${item.band._id}`">{{ item.band.title }}</router-link>-->
              </template>
              <template v-slot:item.releaseDate="{item}">
                <v-btn class="pl-1 pr-1" color="orange" text>{{ item.releaseDate | humanDate }}</v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LabelInfo",
  mounted() {
    this.$store.dispatch('getLabelInfo', this.$route.params.id)
  },
  computed: {
    label() {
      return this.$store.getters.currentLabel
    },
    statusColor() {
      switch (this.label.status) {
        case 'active':
          return 'green'
        case 'unknown':
          return 'orange'
        case 'split-up':
          return 'red'
        case 'on-hold':
          return 'yellow'
        default:
          return ''
      }
    }
  },
  data: () => ({
    headers: [
      {text: 'Band', align: 'start', sortable: true, value: 'title'},
      {text: 'Origin', align: 'start', sortable: false, value: 'origin'},
      // {text: 'Tags', align: 'start', sortable: false, value: 'tags'},
    ],
    albumHeaders: [
      {text: 'Title', align: 'start', sortable: true, value: 'title'},
      {text: 'Band', align: 'start', sortable: false, value: 'band.title'},
      {text: 'Release date', align: 'start', sortable: false, value: 'releaseDate'},
    ]
  })
}
</script>

<style scoped>

</style>
