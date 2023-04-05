<template>
  <v-row align="center">
    <v-col cols="12" class="py-10">
      <PageHeader title="Books" />
    </v-col>
    <v-col cols="12" class="text-end"> 
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
          >
            +
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Add New Book</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Add title"
                    required
                    v-model="title"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Add isbn"
                    required
                    v-model="isbn"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Add avatar url"
                    required
                    v-model="avatar"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click.prevent="addNewBook"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
    <v-col cols="12">
      <v-data-table
        v-if="allBooks"
        :headers="headers"
        :items="allBooks"
        :items-per-page="5"
        class="elevation-1"
      >

        <template v-slot:[`item.avatar`]="{ item }">
          <v-avatar>
            <img :src="item.avatar" alt="avatar" style="width: 40px; height: 40px;" />
          </v-avatar>
        </template>

      </v-data-table>

    </v-col>
  </v-row>
</template>

<script>
import BaseCard from '../components/utilities/BaseCard.vue';
import PageHeader from '../components/utilities/PageHeader.vue';
// Graph ql Queries
import FETCH_ALL_BOOKS from "~/graphql/queries/books/fetchAllBooks.gql";
import ADD_NEW_BOOK from "~/graphql/queries/books/addNewBook.gql";

export default {
  name: 'IndexPage',

  data() {
    return {
      dialog: false,
      title: '',
      isbn: '',
      avatar: '',
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
          sortable: false,
          value: 'isbn',
        },
        {
          text: 'Image',
          sortable: false,
          value: 'avatar',
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
    },

    async addNewBook() {
      // console.log(this.title, this.avatar, this.isbn)
      const {data} = await $nuxt.$apollo.mutate({
        mutation: ADD_NEW_BOOK,
        variables: {
          title: this.title,
          isbn: this.isbn,
          avatar: this.avatar,
          author_id: 1,
        },
      })
      if(data.insert_book_one) {
        this.dialog = false;
        if(this.allBooks.length > 0) {
          this.allBooks.push(data.insert_book_one)
        }
        else {
          let data = [];
          data.push(data.insert_book_one)
          this.allBooks = data
        }
      }
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
