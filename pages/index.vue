<template>
  <v-row align="center">
    <v-col cols="12" class="py-10">
      <PageHeader title="Books" />
    </v-col>
    <v-col cols="12" sm="8" md="6" v-for="singleBook in authorBooks" :key="singleBook.id">
      <BaseCard class="pa-10" :singleData="singleBook" />
    </v-col>
  </v-row>
</template>

<script>
import BaseCard from '../components/utilities/BaseCard.vue';
import PageHeader from '../components/utilities/PageHeader.vue';
// Graph ql Queries
import FETCH_ALL_BOOKS from "~/graphql/queries/authors/fetchAllAuthors.gql";

export default {
  name: 'IndexPage',

  data() {
    return {
      authorBooks: [
        {
          id: 1,
          title: 'Ali Baba Chalis Chorr',
          isbn: '987654321',
          description: 'Hello,  Lorem ipsum dolor sit amet, consequat.',
          author_id: 2
        },
        {
          id: 2,
          title: 'The human psyco',
          isbn: '99999999',
          description: 'Hello,  Lorem ipsum dolor sit amet, consequat.',
          author_id: 1
        },
      ]
    }
  },

  methods: {
    async fetchAllBooks() {
      $nuxt.$apollo.query({
          query: FETCH_ALL_BOOKS,
        })
        .then(({ data }) => {
          console.log(".... Data added ....")
          console.log(data)
        })
        .catch((err) => {
          console.log(".... Data not added ....")
          console.log(err);
        })

      // const data = await useAsyncQuery(FETCH_ALL_BOOKS);
      console.log(data);
    }
  },

  async mounted() {
    this.fetchAllBooks()

    // const { data } = await useAsyncQuery(FETCH_ALL_BOOKS);
    // console.log(data, "  datat .....")
  },  

  components: {
    BaseCard,
    PageHeader
  }
}
</script>
