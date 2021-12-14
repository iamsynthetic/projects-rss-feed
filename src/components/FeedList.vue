<template>
   <div>
      <p>feed list</p>
      
      <div class="group" v-for="(parent_value, parent_name, parent_index) in testobject" :key="parent_index">
        <div @click='removeItem(parent_index, null)'>
           <span class="sub-menu" @click="parent_value.visible = !parent_value.visible"></span> <span>{{parent_name}}</span>
        </div>
        
        <div class="sub-group" v-for="(child_value, child_name, child_index) in parent_value" :key="child_index">
          <!-- adding .visible adds this to the object so it shows as an extra item in categories fix below -->
          <div v-show="parent_value.visible">
            <div v-if="child_index < 1"></div>
            <div v-if="child_name == 'visible' || child_name == 'track' "></div>
            <div v-else>
              <div @click="sendNewURL(value.url)">
                {{ child_value['title'] }} - {{ child_value['amount'] }}
              </div>
              <div class="delete-btn" @click="removeItem(parent_name, child_name)">delete</div>
            </div>
          </div>
        </div>
      </div>
   </div>
</template>

<script>
  
import { mapState } from 'vuex'
import _ from 'lodash'
import { defineComponent, ref } from 'vue'

export default {
  name: '',
  data(){
    return{
      test2: [{
        array: [0, 0, 0, 0]
      }, {
        array: [0, 0, 0, 0]
      }],
      savedURLlist: [],
      items: [],
      test:[{data0:'zero'}, {data1:'one'}, {data2:'two'}],
      testobject: {},
      rssUrl: "",
      sanitizedRssURL: '',
      groupname: "",
      isData: true,
      i: 0,
      count: 0,
      changenum: 0,
      theid: ''
    }
  },
  mounted(){
    this.savedURLlist = this.$store.state.savedURLS;
  },
  computed: {
    ...mapState(['modalNewRssURL','modalNewRssURLGroupName','savedURLS', 'saveditemslist'])
  },
  watch: {
    saveditemslist(newValue, oldValue){
      //console.log('saveItemsList newvalue is: ' + newValue);
      //this.items = newValue
    },
    savedURLS(newValue, oldValue){
      this.savedURLlist = newValue;
    },
    modalNewRssURL(newValue, oldValue){
      this.rssUrl = newValue;
      this.sanitizedRssURL = newValue.replace('https://api.allorigins.win/get?url=', '')
      this.getRss(); 
    },
    modalNewRssURLGroupName(newValue, oldValue){
      this.changenum++;
      if(newValue == ''){
        this.groupname = 'favorites'
      }
      else{
        this.groupname = newValue
      }
    }
  },
  methods:{
    myFilter(id, key){
      this.theid = id;
      this.isActive = !this.isActive;
    },
    computeditem(index){
      return true
    },

    sendNewURL(theURL){
      this.$store.dispatch('changeRssURL', theURL)
    },
    //need to work on this function more
    removeItem(parent_name, child_name) {
      if(child_name == null){
        delete this.testobject[parent_name]
      }
      else{
        delete this.testobject[parent_name][child_name];
      }
    },
    async getRss(){
      const res = await fetch(
        `${this.rssUrl}`
      )
      const { contents } = await res.json();
      const feed = new window.DOMParser().parseFromString(contents, "text/xml");
      const items = feed.querySelectorAll("item");
      const channeltitle = feed.querySelector('channel').querySelector('title').innerHTML;
      
      //this is for the testobject object
      
      //check if the data received is null
      if(items.length == 0 || items.length == null || items.length < 1){
        this.isdata = false;
      }
      //if the data isn't null check that the object is empty
      else if(_.size(this.testobject) == 0)
      {
        //since object is completely empty, make a new object
        let thedataobject = {
          track:this.count,
          groupdetails0: {
            title: channeltitle,
            amount: items.length,
            url: this.sanitizedRssURL,
            track: this.count+1
          }
        }
        //then add the new object (thedataobject)  
        //to the parent object ([this.groupname])
        //add 1 to the count variable, need this
        //to keep track of how many items have been added
        //to the list regardless of position so that we can
        //delete items later on easily
        this.testobject[this.groupname] = thedataobject;
        this.count = this.count+1
      }
      //if the object isn't empty, meaning there is a child object
      //then first check that the group name isn't the same
      //as another group name in the object
      else if(Object.getOwnPropertyNames(this.testobject).includes(this.groupname) == true)
      {
        let groupnamenum = _.size(this.testobject[this.groupname]);
        this.testobject[this.groupname]['groupdetails'+groupnamenum] = {}
        this.testobject[this.groupname]['groupdetails'+groupnamenum].title = channeltitle;
        this.testobject[this.groupname]['groupdetails'+groupnamenum].amount = items.length;
        this.testobject[this.groupname]['groupdetails'+groupnamenum].url = this.sanitizedRssURL;
        this.testobject[this.groupname]['groupdetails'+groupnamenum].track = this.count;
        this.count++;
    }
    //if the object isn't empty, meaning there is a child object
    //but the groupname the user inputted doesn't match anything in the parent
    //object then add the groupname to the object as well as the contents under
    //it.
    else if(Object.getOwnPropertyNames(this.testobject).includes(this.groupname) == false)
    {
      let thedataobject = {
        track: this.count,
        groupdetails0: {
          title: channeltitle,
          amount: items.length,
          url: this.sanitizedRssURL,
          track: this.count+1
        }
      }

      this.testobject[this.groupname] = thedataobject;
      this.count = this.count+2
    }
    },
  }
}
</script>

<style>


.sub-menu::after {
  content: "> ";
  color: green;
}

.group{
  text-align: left;
  margin-left: 20px;
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
}
.sub-group{
  margin-left: 30px;
  padding-bottom: 10px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
}

.delete-btn{
  cursor: pointer;
  background-color: blue;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 4px 2px;
}

/*
/////////////////////////////////////////////////////////////////////////////
*/

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