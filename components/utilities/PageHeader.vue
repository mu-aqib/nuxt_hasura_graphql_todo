<template>
    <div>
        <h2 class="display-1">{{ title }}</h2>
    </div>
  </template>
  <script>
  export default {
    name: "PageHeader",
    components: {},
    props: {
      title: {
        type: String,
        required: true,
        default: "Page Title",
      },
    },
    data() {
      return {};
    },
    methods: {
    },
  };
  </script>