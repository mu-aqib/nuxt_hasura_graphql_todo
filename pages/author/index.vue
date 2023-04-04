<template>
  <v-row align="center">
    <v-col cols="12" class="py-10">
      <PageHeader title="Authors" />
    </v-col>
    <v-col cols="10">
      <v-data-table
        v-if="allAuthors"
        :headers="headers"
        :items="allAuthors"
        :items-per-page="5"
        class="elevation-1"
      >

      </v-data-table>
      <!-- <v-card variant="outlined" class="pa-8">
        
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
      </v-card> -->
    </v-col>
  </v-row>
</template>

<script>
  import PageHeader from '@/components/utilities/PageHeader.vue';
  import FETCH_ALL_AUTHORS from "~/graphql/queries/authors/fetchAllAuthors.gql";

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
        ],

        headers: [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Full Name',
          sortable: false,
          value: 'full_name',
        },
        {
          text: 'Email Address',
          sortable: false,
          value: 'email',
        },
      ],
      allAuthors: undefined,
      }
    },

    methods: {
      async fetchAllBooks() {
        $nuxt.$apollo.query({
            query: FETCH_ALL_AUTHORS,
          })
          .then(({ data }) => {
            console.log(".... Data added ....")
            console.log(data)
            this.allAuthors = data.author
          })
          .catch((err) => {
            console.log(".... Data not added ....")
            console.log(err);
          })
      }
    },

    mounted() {
      this.fetchAllBooks()
    },

  }

</script>
