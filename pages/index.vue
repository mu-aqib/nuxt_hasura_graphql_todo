<template>
  <v-row align="center">
    <v-col cols="12" class="py-10">
      <PageHeader title="Books" />
    </v-col>
    <v-col cols="12">
      <v-data-table
        v-if="allBooks"
        :headers="headers"
        :items="allBooks"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import BaseCard from '../components/utilities/BaseCard.vue';
import PageHeader from '../components/utilities/PageHeader.vue';
// Graph ql Queries
import FETCH_ALL_BOOKS from "~/graphql/queries/books/fetchAllBooks.gql";

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
      ],

      headers: [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Title',
          sortable: false,
          value: 'title',
        },
        {
          text: 'Isbn',
          align: 'center',
          sortable: false,
          value: 'isbn',
        },
      ],
      allBooks: undefined,
    }
  },

  methods: {
    async fetchAllBooks() {
      $nuxt.$apollo.query({
          query: FETCH_ALL_BOOKS,
        })
        .then(({ data }) => {
          console.log(".... Data added ....")
          console.log(data.book)
          this.allBooks = data.book
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

  components: {
    BaseCard,
    PageHeader
  }
}
</script>
