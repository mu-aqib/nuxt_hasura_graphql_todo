<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn link text :to="item.to" v-for="item in items" :key="item.title" class="me-3"> {{ item.title }} </v-btn>
    </v-app-bar>
    
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      fixed: false,
      items: [
        {
          title: 'home',
          to: '/'
        },
        {
          title: 'Authors',
          to: '/author'
        },
      ],
      right: true,
      title: 'CRUD APP'
    }
  }
}
</script>
