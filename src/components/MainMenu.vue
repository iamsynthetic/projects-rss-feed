<template>
   <div class="menu">
      <div class="col1">
         <div class="title">
            title of column
         </div>
         <div class="add-button">
            <div class="plusbtn" @click="isShow = !isShow">+</div>
         </div>
      </div>
      <div class="col2">
         column 2
         <feedlist key="mainmenucomponentkey"/>
      </div>
      <feedsearchmodal v-show="isShow"/>
   </div>
</template>

<script>

import feedsearchmodal from '../components/FeedSearchModal.vue'
import feedlist from '../components/FeedList.vue'
import { mapState } from "vuex";

export default {
   name: 'MainMenu',
   data(){
      return{
         isShow: false,
         mainmenucomponentkey: 0
      }
   },
   components: {
      feedsearchmodal,
      feedlist
   },
  computed: {
      ...mapState(['modalNewRssURL'])
  },
   watch:{
    modalNewRssURL(newValue, oldValue){
      if(newValue != oldValue){
        if(this.mainmenucomponentkey == 0){
          this.mainmenucomponentkey = 1;
        }
        else{
          this.mainmenucomponentkey = 0;
        }
        console.log('mainmenucomponentkey is: ' + this.mainmenucomponentkey);
      }
    }
  },
  methods:{
  }
}
</script>
    
<style>
.menu{
    display:flex;
    height:100vh;
  }
.col1{
   width:50px;
   background-color:#fff
}
.col2{
   width:300px;
}

</style>