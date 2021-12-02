<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-row>
        <v-col cols="1">
          <v-btn block color="yellow" class="black--text font-weight-bold text-h4" link to="/">IADB</v-btn>
        </v-col>
        <v-col cols="1">
          <v-select solo flat dense hide-details
                    :items="['Band', 'Album', 'Label']"
                    v-model="searchType"
          />
        </v-col>
        <v-col>
          <v-autocomplete v-model="searchTextModel"
                          :search-input.sync="searchText"
                          :items="searchResult"
                          item-value="_id"
                          item-text="title"
                          no-data-text="Type something"
                          solo flat dense hide-details clearable
                          placeholder="Search"
                          @change="goToPage">
            <template v-slot:item="{item}">
              <template v-if="searchType === 'Album'">
                {{ item.title }} - {{ item.band.title }}
              </template>
              <template v-else-if="searchType === 'Band'">
                {{ item.title }} ({{ item.country.name }})
              </template>
            </template>
          </v-autocomplete>
        </v-col>
        <template v-if="$store.getters.isLogin">
          <v-col cols="1">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-on="on" v-bind="attrs">{{ $store.getters.user.username }}</v-btn>
              </template>
              <v-list dense>
                <v-list-item dense link to="/profile">Profile</v-list-item>
                <v-list-item dense link @click="logout">Logout</v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </template>
        <template v-else>
          <v-col cols="1">
            <v-btn block link to="/login">Login</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn block link to="/register">Register</v-btn>
          </v-col>
        </template>
      </v-row>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    this.$vuetify.theme.dark = true
    if (localStorage.getItem('token')) {
      this.$store.dispatch('aboutMe')
    }
  },
  watch: {
    searchText(value) {
      if (!value) {
        this.searchResult = []
        return
      }
      if (this.searchType === 'Band') {
        this.$store.dispatch('searchBand', value).then(({data}) => {
          this.searchResult = data.data
        })
      } else if (this.searchType === 'Album') {
        this.$store.dispatch('searchAlbum', value).then(({data}) => {
          this.searchResult = data.data
        })
      }
    }
  },
  data: () => ({
    drawer: false,
    searchType: 'Band',
    searchText: null,
    searchTextModel: null,
    searchResult: [],
  }),
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    goToPage(id) {
      if (id && id !== this.$route.params.id) {
        switch (this.searchType) {
          case "Band":
            this.$router.push(`/band/${id}`)
            break
          case "Album":
            this.$router.push(`/album/${id}`)
            break
          case "Label":
            this.$router.push(`/label/${id}`)
            break
        }
      }
    }
  }
};
</script>
