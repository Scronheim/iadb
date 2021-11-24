<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-row>
        <v-col cols="1">
          <v-btn block color="yellow" class="black--text font-weight-bold text-h4" link to="/">IADB</v-btn>
        </v-col>
        <v-col>
          <v-text-field
              solo flat dense hide-details
              append-icon="mdi-magnify"
              placeholder="Type something">
            <template v-slot:prepend>
              <v-select solo flat dense hide-details style="top: -7px"
                        :items="['Band', 'Album', 'Label']"
                        v-model="searchType"
              />
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn>
            <v-icon>mdi-format-list-checks</v-icon>
            Wishlist
          </v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn block>
            <v-icon>mdi-account</v-icon>
            User</v-btn>
        </v-col>
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
  },
  data: () => ({
    drawer: false,
    searchType: 'Band'
  }),
};
</script>

<style>
html { overflow-y: auto }
</style>
