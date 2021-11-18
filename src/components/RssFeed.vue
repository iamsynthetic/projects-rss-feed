<template>
  <div>
    <form @submit.prevent="getRss">
      <div>
        <label> rss URL</label>
        <br />
        <input v-model="rssURL" />
      </div>
      <input type="submit" @click="sendNewURL(rssURL)"/>
    </form>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      rssURL: "",
      thesearchterm: ""
    };
  },
  computed: {
      //...mapState(['newRssURL'])

  },
  watch:{
    // newRssURL(newValue, oldValue){
    //   console.log(`updating from ${oldValue} to ${newValue}`);

    //   this.sendNewURL(newValue)
    // }
  },
  methods: {
    //...mapActions(['changeRssURL']),

    sendNewURL(theURL){
      console.log('sendNewURL - ' + theURL)
      this.rssURL = ""
      this.$store.dispatch('changeRssURL', theURL)
      //   this.changeRssURL(theURL)
      //   //this.$router.push('/')
      //this.$store.commit('CHANGE_RSS_URL')
      // //console.log(this.$store.state.num);
      // //console.log(this.$store.state.newRssURL)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .feed-loop{
    
    display:flex;
  }
  .feed-content {
    flex-direction:column;
    text-align:left;
    margin-bottom:40px;
    width:100%;
  }

  .feed-content .feed-container{
    display:flex;
    flex-wrap:wrap;
    width:100%;
  }

  .feed-content .img-container{
    width:220px;
  }

  .feed-content .img-container .theimg{
    width:200px;
    height:auto;
  }

  .feed-content .content-container{
    flex:1;
  }


  .feed-content .thecontent{
    height:300px;
  }

  .feed-content .title {
    font-size:18px;
    font-family: 'Roboto', sans-serif;
    font-weight:900;
  }

  .feed-content .description {
    
    /* height:100px; */
    font-size:16px;
    font-family: 'Roboto', sans-serif;
    font-weight:100;
    /* display:flex; */
  }

  /* .feed-content .description img {
    height:100px;
    width:auto;
  } */

  .feed-content .link {
    font-size:14px;
    font-family: 'Roboto', sans-serif;
    font-weight:100;
    color:blue;
  }

</style>