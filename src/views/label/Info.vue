<template>
  <v-container>
    <v-card>
      <v-card-title>{{ label.title }}</v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="2">
            <v-img contain :src="label.logo"/>
            <a :href="label.site" target="_blank">{{ label.title }} site</a>
          </v-col>
          <v-col>
            <v-list dense>
              <v-list-item>Country: {{ label.country }}</v-list-item>
              <v-list-item>Address: {{ label.address }}</v-list-item>
              <v-list-item>Phone: {{ label.phone }}</v-list-item>
            </v-list>
          </v-col>
          <v-col>
            <v-list dense>
              <v-list-item>Status: <div :class="`${statusColor}--text`">{{ label.status }}</div></v-list-item>
              <v-list-item>Styles: {{ label.styles }}</v-list-item>
              <v-list-item>Founding date: {{ label.foundingDate }}</v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mt-3">
      <v-card-title>Bands on this label</v-card-title>
      <v-card-text>
        <v-data-table dense
                      :headers="headers"
                      :items="label.bands"
                      item-key="_id"
        >
          <template v-slot:item.title="{item}">
            <router-link :to="`/band/${item._id}`">{{ item.title }}</router-link>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
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
      {text: 'Tags', align: 'start', sortable: false, value: 'tags'},
    ]
  })
}
</script>

<style scoped>

</style>