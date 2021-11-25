<template>
  <v-container>
    <v-card>
      <v-card-title class="elevation-3">{{ band.title }} ({{ band.origin }}) | Status: <div :class="`${statusColor}--text`">{{ band.status }}</div>
        <v-spacer/>
        <v-rating background-color="orange lighten-3" color="orange" hover/>
      </v-card-title>
      <v-card-text class="pt-3">
        <v-row>
          <v-col cols="2">
            <v-img contain :src="band.logo"/>
            <v-img max-height="300" :src="band.photo"/>
            <v-chip v-for="tag in band.tags" :key="tag"
                    class="ma-2"
                    color="orange"
                    label
                    outlined>
              {{ tag }}
            </v-chip>
          </v-col>
          <v-col>
            <v-expansion-panels accordion v-model="expPanels">
              <v-expansion-panel>
                <v-expansion-panel-header>Description</v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ band.description }}
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Line up</v-expansion-panel-header>
                <v-expansion-panel-content>
                  123
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col cols="3">
            <v-card class="mt-2" elevation="3" v-for="album in band.albums" :key="album.title">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5">{{ album.title }} ({{ album.year }})</v-card-title>
                  <v-card-subtitle>{{ band.title }}</v-card-subtitle>
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
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'BandInfo',
  mounted() {
    this.$store.dispatch('getBandInfo', this.$route.params.id)
  },
  watch: {
    '$route.params.id'(value) {
      this.$store.dispatch('getBandInfo', value)
    }
  },
  computed: {
    band() {
      return this.$store.getters.currentBand
    },
    statusColor() {
      switch (this.band.status) {
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
    expPanels: 0,
  }),
};
</script>
