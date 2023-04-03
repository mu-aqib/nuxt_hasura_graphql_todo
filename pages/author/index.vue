<template>
  <v-row align="center">
    <v-col cols="12" class="py-10">
      <PageHeader title="Authors" />
    </v-col>
    <v-col cols="12" sm="8" md="6" v-for="singleAuthor in authorBooks" :key="singleAuthor.id">
      <v-card variant="outlined" class="pa-8">

        <v-avatar>
            <v-img
                :src="singleAuthor.img"
                :alt="singleAuthor.full_name"
            ></v-img>
        </v-avatar>

        <v-card-title class="px-0"> {{ singleAuthor.full_name }} </v-card-title>

        <v-card-actions class="pa-0">
          <v-btn text class="blue--text" :to="`/books/${singleAuthor.id}`">
            view book
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import PageHeader from '@/components/utilities/PageHeader.vue';
  export default {
    name: 'InspirePage',
    components:{
        PageHeader
    },
    data() {
      return {
        authorBooks: [{
            id: 1,
            full_name: 'Aqib',
            img: 'https://cdn.vuetifyjs.com/images/john.jpg'
          },
          {
            id: 2,
            full_name: 'Waqas',
            img: 'https://cdn.vuetifyjs.com/images/john.jpg'
          }
        ]
      }
    },
  }

</script>
