<template>
  <v-row align="center">
    <v-col cols="12" class="py-10">
      <PageHeader title="Authors" />
    </v-col>
    <v-col cols="10" class="text-end"> 
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
                    label="Your full name"
                    required
                    v-model="author.full_name"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="your email address"
                    required
                    v-model="author.email"
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
              @click.prevent="addNewAuthor"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      
    </v-col>
  </v-row>
</template>

<script>
  import PageHeader from '@/components/utilities/PageHeader.vue';
  import FETCH_ALL_AUTHORS from "~/graphql/queries/authors/fetchAllAuthors.gql";
  import ADD_NEW_AUTHOR from "~/graphql/queries/authors/addAuthor.gql";

  export default {
    name: 'InspirePage',
    components:{
      PageHeader
    },

    data() {
      return {
        dialog: false,
        author: {
          full_name: '',
          email: '',

        },

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
      },

      async addNewAuthor() {
        const {data} = await $nuxt.$apollo.mutate({
          mutation: ADD_NEW_AUTHOR,
          variables: {
            ...this.author
          },
        })
        if(data.insert_author_one) {
          this.dialog = false;
          if(this.allAuthors.length > 0) {
            this.allAuthors.push(data.insert_author_one)
          }
          else {
            let data = [];
            data.push(data.insert_author_one)
            this.allAuthors = data
          }
        }
      }
    },

    mounted() {
      this.fetchAllBooks()
    },

  }

</script>
