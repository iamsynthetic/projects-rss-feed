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

export default {
  data() {
    return {
      rssURL: "",
      thesearchterm: ""
    };
  },
  computed: {

  },
  watch:{
  },
  methods: {

    sendNewURL(theURL){
      this.rssURL = ""
      this.$store.dispatch('changeRssURL', theURL)
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