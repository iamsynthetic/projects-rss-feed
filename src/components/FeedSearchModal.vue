<template>
  <div class="feed-modal">
    <p>Feed Search Modal</p>
    <input v-model="theURL" />
    <input type="submit" @click="saveAndChangeNewURL(theURL)"/>
  </div>
</template>

<script>

export default {
  name: '',
  data(){
    return{
      theURL: "",
      allURLS: []
    }
  },
  methods:{
    saveAndChangeNewURL(theURL){
      this.allURLS.push(theURL);
      this.$store.dispatch('saveURL', this.allURLS)
      this.$store.dispatch('changeModalRssURL', theURL)
    }
  }
}
</script>

<style>
.feed-modal{
  background-color:#99C760;
  float:left;
  position:absolute;
  margin-left:50px;
  margin-top:40px;
  width:400px;
  height:350px;
}
</style>