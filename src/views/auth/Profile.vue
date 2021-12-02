<template>
  <v-container>
    <v-card>
      <v-card-title>{{ $store.getters.user.username }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <v-avatar size="250">
              <v-img :src="$store.getters.user.avatar"/>
            </v-avatar>
          </v-col>
          <v-col>
            <v-data-table dense
                          :headers="likesHeader"
                          :items="$store.getters.user.likedAlbums">
              <template v-slot:item.title="{item}">
                <v-btn class="pl-1 pr-1" text color="orange">{{ item.title }}</v-btn>
              </template>
              <template v-slot:item.rating="{item}">
                {{ item._id | albumRating }}
              </template>
              <template v-slot:item.createdAt="{item}">
                {{ item._id | albumRatingDate | humanDate }}
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Profile",
  data: () => ({
    likesHeader: [
      {text: 'Album', align: 'start', sortable: true, value: 'title'},
      {text: 'Rating', align: 'start', sortable: true, value: 'rating'},
      {text: 'Date', align: 'start', sortable: true, value: 'createdAt'},
    ]
  }),
  methods: {

  }
}
</script>

<style scoped>

</style>
