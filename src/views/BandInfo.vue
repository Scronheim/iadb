<template>
  <v-container>
    <v-card>
      <v-card-title class="elevation-3">{{ band.title }} ({{ band.origin }})
        <v-spacer/>
        <v-rating background-color="orange lighten-3" color="orange" hover/>
      </v-card-title>
      <v-card-text class="pt-3">
        <v-row>
          <v-col cols="2">
            <v-img :src="'https://horrorpatch.com/wp-content/uploads/2021/07/SIX_32F3984C-A366-4B0B-B3DE-187FE2BF798F.png?resize=620%2C479&ssl=1'"/>
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
                    <v-btn class="ml-2 mt-5"
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
  data: () => ({
    band: {
      title: 'Shadow of Intent',
      origin: 'Hartford, Connecticut, United States',
      description: 'Shadow of Intent is an American death metal band from Connecticut.\n' +
          ' They formed in 2013 as a Halo-themed studio project by Ben Duerr and Chris Wiseman. The band\'s name is a reference to a ship in the Halo series.\n' +
          ' They are not signed to a label and have released their albums independently.\n' +
          ' They have released three studio albums to date, along with two instrumental versions of previous releases. Their fourth studio album entitled "Elegy" is set to release independently on January 14th, 2022.',
      albums: [
        {
          title: 'Primordial',
          year: 2016,
          cover: 'https://img.discogs.com/b0ufkslu6mF1tYmEqox7cojtUxI=/fit-in/600x539/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-8532826-1507578514-7124.jpeg.jpg',
        },
        {
          title: 'Reclaimer',
          year: 2017,
          cover: 'https://img.discogs.com/vu54Ex2jCt9D29ec8cM6Ym53lpU=/fit-in/600x536/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-10206627-1507579876-4863.jpeg.jpg',
        },
        {
          title: 'Melancholy',
          year: 2019,
          cover: 'https://img.discogs.com/ABHiAj5iXTrt7Rz6eZ6xkTQ0nRI=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-20158693-1631102171-1381.jpeg.jpg',
        },
      ],
      tags: ['Deathcore', 'Symphonic', 'USA', 2013],
    },
    expPanels: 0,
  }),
};
</script>