<template>
  <v-card variant="outlined">

    <div>
      <div class="text-overline mb-1">
        {{ singleData.isbn }}
      </div>
      <div class="text-h6 mb-1">
        {{ singleData.title }}
      </div>
      <div class="text-caption">
        {{ singleData.description }}
      </div>
    </div>


    <v-card-actions class="pa-0 py-3">
      <v-btn
        text
        class="blue--text"
        :to="`/authors/${singleData.id}`"
      >
      view author
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: {
      singleData: {
        type: Object,
      }
    }
  }
</script>