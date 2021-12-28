<template>
  <div class="home">
    <div class="main-menu">
      <mainmenu></mainmenu>
    </div>
    <div class="feed">
      <rssfeedsearch></rssfeedsearch>
      <feedoutput key="componentkey"></feedoutput>  
    </div>
  </div>
</template>

<script>
  import mainmenu from '../components/MainMenu.vue'
  import rssfeedsearch from '../components/RssFeed.vue'
  import feedoutput from '../components/FeedOutput.vue'
  import { mapState } from "vuex";

export default {
  name: 'Home',
  data(){
    return {
      componentkey: 0
    }
  },
  components: {
    mainmenu,
    rssfeedsearch,
    feedoutput
  },
  computed: {
      ...mapState(['newRssURL', 'contextnav'])
  },
  watch:{
    newRssURL(newValue, oldValue){
      if(newValue != oldValue){
        if(this.componentkey == 0){
          this.componentkey = 1;
        }
        else{
          this.componentkey = 0;
        }
        console.log('componentkey is: ' + this.componentkey);
      }
    }
   
  },
  methods:{
    removeRightClickMenu(){
      this.$store.dispatch('removeTheRightClickNav', 'close')
    }
  }
}
</script>

<style>
  .home{
    display:flex;
  }

  .main-menu{
    background-color:#F0F0F0;
  }

  .feed{
    background-color:#F9F9F9;
    width:100%;
  }
</style>