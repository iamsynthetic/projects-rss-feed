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
         <feedlist />
      </div>
      <feedsearchmodal v-show="isShow"/>
   </div>
</template>

<script>

import feedsearchmodal from '../components/FeedSearchModal.vue'
import feedlist from '../components/FeedList.vue'

export default {
   name: 'MainMenu',
   data(){
      return{
         isShow: false
      }
   },
   components: {
      feedsearchmodal,
      feedlist
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