<template>
  <v-container>
    <v-card>
      <v-card-title>{{ $store.getters.user.username }}
        <v-btn icon color="success" @click="saveUser">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <v-avatar size="250">
              <v-img :src="$store.getters.user.avatar"/>
            </v-avatar>
          </v-col>
          <v-col>
            <v-tabs color="orange" v-model="tab">
              <v-tab>Activity</v-tab>
              <v-tab>Listen list</v-tab>
              <v-tab>Liked</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item>
                123
              </v-tab-item>
              <v-tab-item>
                <v-row>
                  <v-col>
                    <v-btn icon color="success">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-data-table :headers="listenListHeaders">

                    </v-data-table>
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item>
                dfghdfgh
              </v-tab-item>
            </v-tabs-items>
<!--            <v-data-table dense-->
<!--                          :headers="likesHeader"-->
<!--                          :items="$store.getters.user.likedAlbums">-->
<!--              <template v-slot:item.title="{item}">-->
<!--                <v-btn class="pl-1 pr-1" text color="orange" link :to="`/album/${item._id}`">{{ item.title }}</v-btn>-->
<!--              </template>-->
<!--              <template v-slot:item.rating="{item}">-->
<!--                {{ item._id | albumRating }}-->
<!--              </template>-->
<!--              <template v-slot:item.createdAt="{item}">-->
<!--                {{ item._id | albumRatingDate | humanDate }}-->
<!--              </template>-->
<!--            </v-data-table>-->
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
    tab: 1,
    likesHeader: [
      {text: 'Album', align: 'start', sortable: true, value: 'title'},
      {text: 'Rating', align: 'start', sortable: true, value: 'rating'},
      {text: 'Date', align: 'start', sortable: true, value: 'createdAt'},
    ],
    listenListHeaders: [
      {text: 'Album', align: 'start', sortable: true, value: 'title'},
    ],
  }),
  methods: {
    saveUser() {
      this.$store.dispatch('saveUser')
    }
  }
}
</script>

<style scoped>

</style>
