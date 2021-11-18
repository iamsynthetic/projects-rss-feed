<template>
   <div>
      <p>feed list</p>
      <div v-for="item in items" :key="item">
        <div v-if="isdata = false">
          <div @click="sendNewURL(item)">{{item}}</div>
        </div>
        <div class="feedlist-item" @click="sendNewURL(item.url)" v-else>
          <div class="title">{{item.title}}</div>
          <div class="amount">{{item.amount}}</div>
        </div>
      </div>
   </div>
</template>

<script>
  
import { mapState } from 'vuex'

export default {
  name: '',
  data(){
    return{
      savedURLlist: [],
      items: [],
      rssUrl: "",
      sanitizedRssURL: '',
      isData: true
    }
  },
  mounted(){
    this.savedURLlist = this.$store.state.savedURLS;
  },
  computed: {
    ...mapState(['modalNewRssURL','savedURLS'])
  },
  watch: {
    savedURLS(newValue, oldValue){
      console.log(`updating from ${oldValue} to ${newValue}`);
      this.savedURLlist = newValue;
    },
    modalNewRssURL(newValue, oldValue){
      console.log(`updating CHANGE_RSS_URL from ${oldValue} to ${newValue}`)
      this.rssUrl = newValue;
      this.sanitizedRssURL = newValue.replace('https://api.allorigins.win/get?url=', '')
      this.getRss();
    }
  },
  methods:{
    
    // themouseover(e){  
    //   console.log('mouseover')

    // },

    // themouseleave(e){
    //   console.log('mouseleave')
    // },

    sendNewURL(theURL){
      console.log('sendNewURL - ' + theURL)
      this.$store.dispatch('changeRssURL', theURL)
    },
    async getRss() {
      //this.items = [];

      const res = await fetch(
        `${this.rssUrl}`
      )
      const { contents } = await res.json();
      const feed = new window.DOMParser().parseFromString(contents, "text/xml");
      const items = feed.querySelectorAll("item");
      //console.log('items is: ' + items);

      if(items.length == 0 || items.length == null || items.length < 1){
        this.isdata = false;
      }
      else{
        this.isdata = true;
        //this works, gets the title from the channel node
        const channeltitle = feed.querySelector('channel').querySelector('title').innerHTML;
        //console.log('channeltitle is: ' + channeltitle);
        //console.log('amount of articles is: ' + items.length);
        
        let dataobj = {
          'title': channeltitle,
          'amount': items.length,
          'url': this.sanitizedRssURL
        }

        this.items.push(dataobj);
        
        for(let i = 0; i < this.items.length; i++){
          console.log('in loop title is: ' + this.items[i].title)
          console.log('in loop amount is: ' + this.items[i].amount)
          console.log('in loop url is: ' + this.items[i].url)
        }
        /*
        let dataobj = {
          "title": thetitle,
          "img": theimgurl,
          "description": thedescription,
          "link": thelink
        }*/
        // for(let i=0; i<items.length;i++){
        //   let checktitle = items[i].querySelectorAll('title')[0].innerHTML;
        //   let checkdescription = items[i].querySelectorAll('description')[0].innerHTML;
        //   let checklink = items[i].querySelectorAll('link')[0].innerHTML;
        // }
      }
    }
  }
}
</script>

<style>

.feedlist-item:hover{
  background: #F5C6E1;
  cursor:pointer;
}

.feedlist-item{
  display:flex;
  font-size:14px;
  text-align:left;
  cursor:pointer;
}

.feedlist-item .title{
  flex:1;
  margin-left:50px;
}

.feedlist-item .amount{
  margin-right:30px;
}
</style>