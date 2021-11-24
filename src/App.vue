<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-row>
        <v-col cols="1">
          <v-btn block color="yellow" class="black--text font-weight-bold" link to="/">IADB</v-btn>
        </v-col>
        <v-divider vertical/>
        <v-col>
          <v-text-field
              solo flat dense hide-details
              append-icon="mdi-magnify"
              placeholder="Search albums, bands, etc"/>
        </v-col>
        <v-divider vertical/>
        <v-col cols="1">
          <v-btn>
            <v-icon>mdi-format-list-checks</v-icon>
            Wishlist
          </v-btn>
        </v-col>
        <v-divider vertical/>
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
  }),
};
</script>

<style>
html { overflow-y: auto }
</style>
