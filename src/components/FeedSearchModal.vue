<template>
  <div class="feed-modal">

    <div class="feed-list" v-show="showfeedlist">
      <p>Feed Search Modal</p>
      <input v-model="theURL" />
      <input type="submit" @click="saveAndChangeNewURL()"/>
      <div class="group-list">
        <!--{{ list }}-->
      </div>
      <div class="create-group-btn">
        <div class="plusbtn" @click="showHideGroups(false, true)">+ new group</div>
      </div>
    </div>

    <div class="feed-create" v-show="showfeedcreate">
      <p>new feed name</p>
      <input v-model="newFeedName" />
      <div @click="saveAndChangeNewURL()">create group</div>
      <div @click="showHideGroups(true, false)">cancel</div>
    </div>


  </div>
</template>

<script>

export default {
  name: '',
  data(){
    return{
      theURL: "",
      allURLS: [],
      newFeedName: 'favorites',
      showfeedlist: true,
      showfeedcreate: false
    }
  },
  methods:{
    saveAndChangeNewURL(){
      let dataobj = {
        'groupname': this.newFeedName,
        'url': this.theURL
      }
      
      this.allURLS.push(this.theURL);
      this.$store.dispatch('saveURL', this.allURLS)
      this.$store.dispatch('changeModalRssURL', dataobj)
    },
    showHideGroups(feedlist, feedcreate){
      this.showfeedlist = feedlist;
      this.showfeedcreate = feedcreate;
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