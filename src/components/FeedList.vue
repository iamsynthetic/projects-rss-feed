<template>
   <div>
      <p>feed list</p>
      
      <div v-for="item in items" :key="item">
        <div v-if="isdata = false">
          <div @click="sendNewURL(item)">{{item}}</div>
        </div>

        <div class="feedlist-item" @click="sendNewURL(item.url)" v-else>
          <ul>
            <li class="feedlist-item-groupname">
              {{item.groupname}}
            </li>
            <ul>
              <li>
                <div class="feedlist-item-content">
                  <div class="title">{{item.title}}</div>
                  <div class="amount">{{item.amount}}</div>
                </div>
              </li>
            </ul>
          </ul>
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
      groupname: "",
      isData: true
    }
  },
  mounted(){
    this.savedURLlist = this.$store.state.savedURLS;
  },
  computed: {
    ...mapState(['modalNewRssURL','modalNewRssURLGroupName','savedURLS'])
  },
  watch: {
    savedURLS(newValue, oldValue){
      this.savedURLlist = newValue;
    },
    modalNewRssURL(newValue, oldValue){
      console.log(`updating modalnewrssurl from ${oldValue} to ${newValue}`);
      this.rssUrl = newValue;
      this.sanitizedRssURL = newValue.replace('https://api.allorigins.win/get?url=', '')
      this.getRss(); 
    },
    modalNewRssURLGroupName(newValue, oldValue){
      if(newValue == ''){
        this.groupname = 'favorites'
      }
      else{
        this.groupname = newValue
      }
    }
  },
  methods:{
    
    sendNewURL(theURL){
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

      if(items.length == 0 || items.length == null || items.length < 1){
        this.isdata = false;
      }
      else{
        this.isdata = true;
        //this works, gets the title from the channel node
        const channeltitle = feed.querySelector('channel').querySelector('title').innerHTML;
        
        let dataobj = {
          'groupname': this.groupname,
          groupdetails: {
            'title': channeltitle,
            'amount': items.length,
            'url': this.sanitizedRssURL
          }
        }

        let i = 0;
        while(i < this.items.length){
          
          if(this.items[i].groupname === this.groupname){
            //this is working
            let groupdetails = {
              "title": channeltitle,
              "amount": items.length,
              "url": this.sanitizedRssURL
            }
            
            this.items[i]['groupdetails' + 2] = groupdetails;
            
            /*
            console.log('----- ' + this.items[i])
            console.log('items.length is: ' + this.items.length)
            console.log('how many sub objects ' + Object.keys(this.items[i]).length)
            console.log('what is going on?')
            */
            break;
          }
          else{
            i++
            console.log('i is: ' + i)
          }
        }
        
        this.items.push(dataobj);
        //console.log('OUTSIDE OF LOOP: ' + JSON.stringify(this.items));
      }
    }
  }
}
</script>

<style>

.feedlist-item-groupname:hover{
  background: #F5C6E1;
  cursor:pointer;
}

ul{
  padding:0;
}
ul li {
  list-style-type: none;
}

.feedlist-item{
  font-size:14px;
  text-align:left;
  cursor:pointer;
}

.feedlist-item-groupname{
  list-style-type: none;
  padding-left:15px;
}

.feedlist-item-content{
  display:flex;
  padding-top:5px;
}

.feedlist-item-content .title{
  flex:1;
  margin-left:35px;
  list-style-type: none
}

.feedlist-item-content .amount{
  margin-right:30px;
  list-style-type: none
}
</style>