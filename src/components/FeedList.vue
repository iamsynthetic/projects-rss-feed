<template>
   <div>
      <p>feed list</p>
      
      <div v-for="(item, index) in items" :key="index">
        <div v-if="isdata = false">
          <div @click="sendNewURL(item)">no item {{item}}</div>
        </div>

        <div class="feedlist-item" @click="sendNewURL(item.feeddata['data'+index]['groupdetails'+index].url)" v-else>
          <ul>
            <div>
              {{item}}<br><br>{{index}}<br><br><br>{{items}}
            </div>
            <li class="feedlist-item-groupname">
              {{groupname}}
            </li>
            <ul> 
              <li>
                <div class="feedlist-item-content">
                  <div>{{index}}</div>
                    <div class="title">
                      {{item.feeddata['data'+index]['groupdetails'+index].title}}
                      </div>
                    <div class="amount">{{item.feeddata['data'+index]['groupdetails'+index].amount}}</div>
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
import _ from 'lodash'

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
      
      console.log('getrss - items is: ' + items)
      console.log('getrss - items.length is: ' + items.length)
      if(items.length == 0 || items.length == null || items.length < 1){
        this.isdata = false;
      }
      else{
        this.isdata = true;
        //this works, gets the title from the channel node
        const channeltitle = feed.querySelector('channel').querySelector('title').innerHTML;
        
        if(this.items.length == 0){
          console.log('this.items.length is 0')
          console.log(this.items.length)
          let thefeed = {
            feeddata: {

            }
          }
          
          let data0 = {
            groupname: this.groupname,
            groupdetails0: {
              title: channeltitle,
              amount: items.length,
              url: this.sanitizedRssURL
            }
          }
          console.log('------ A ' + JSON.stringify(thefeed))
          console.log('------ B ' + JSON.stringify(thefeed.feeddata))
          this.items.push(thefeed)
          console.log('------ C - items.thefeed is : ' +  JSON.stringify(this.items[0].feeddata));
          this.items[0].feeddata['data0'] = data0;
          console.log('------ D - items.thefeed is : ' +  JSON.stringify(this.items[0].feeddata));
          console.log('------ E - items json.stringified is: ' + JSON.stringify(this.items[0].feeddata['data0']));
          console.log('------ F - items is now: ' + JSON.stringify(this.items))
          console.log('------ G - length of feeddata: ' + _.size(this.items[0].feeddata));
        
        }
        
        let i = 0;
        console.log('this is working')
        while(i < _.size(this.items[0].feeddata)){
          
          if(this.items[0].feeddata['data' + i].groupname === this.groupname){
            console.log('groupname for this.items[0] etc is: ' + this.items[0].feeddata['data' + i].groupname)
            let groupdetails = {
              title: channeltitle,
              amount: items.length,
              url: this.sanitizedRssURL
            }
            
            this.items[0].feeddata['data' +i]['groupdetails'+i] = groupdetails;
            console.log('------ H - length of feeddata: ' + _.size(this.items[0].feeddata));
            console.log('------ I - length of feeddata groupdetails: ' + _.size(this.items[0].feeddata['data' + i]));
            break;
          }
          else{
            let dataobj = {
              groupname: this.groupname,
              groupdetails0: {
                title: channeltitle,
                amount: items.length,
                url: this.sanitizedRssURL
              }
            }
            console.log('still working')
            this.items[0].feeddata['data' + i] = dataobj
            i++
            console.log('i is: ' + i)
            
          }
        }
        
        console.log('OUTSIDE OF LOOP - items: ' + JSON.stringify(this.items));
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