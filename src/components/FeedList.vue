<template>
   <div>
      <p>feed list</p>
      
      <div class="group" v-for="(parent_value, parent_name, parent_index) in testobject" :key="parent_index" :user="parent_value">
        <div @click='removeItem(parent_index, null)'>
           <span class="sub-menu" @click="parent_value.visible = !parent_value.visible"></span> <span>{{parent_name}}</span>
        </div>
        
        <div class="sub-group" v-for="(child_value, child_name, child_index) in parent_value" :key="child_index">
          <!--
            
          -->
          <div v-show="parent_value.visible">
            <div v-if="child_index < 1">
            </div>
            <div v-else>
              <div>child_index is: {{ child_index}}</div>
              <div @click="sendNewURL(value.url)">
                {{ child_value['title'] }} - {{ child_value['amount'] }}
                {{ parent_name }}
              </div>
              <div class="delete-btn" @click="removeItem(parent_name, child_name)">
                delete
              </div>
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
      console.log("ma filter")
      console.log('the id is: ' + id)
      console.log('the key is: ' + key)
      this.theid = id;
      this.isActive = !this.isActive;
      console.log('isActive is: ' + this.isActive)
    },
    computeditem(index){
      console.log('parent_index is: ' + index)
      return true
    },

    sendNewURL(theURL){
      this.$store.dispatch('changeRssURL', theURL)
    },
    //need to work on this function more
    removeItem(parent_name, child_name) {
      console.log('parent_name is: ' + parent_name)
      console.log('child_name is: ' + child_name)
      //console.log(JSON.stringify(this.testobject[parent_name][child_name]))
      if(child_name == null){
        delete this.testobject[parent_name]
      }
      else{
        delete this.testobject[parent_name][child_name];
      }
      console.log('################################')
      console.log(JSON.stringify(this.testobject))
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
        this.count = this.count+2
        console.log('ADDED NEW OBJECT TO this.testobject')
        console.log('this.count is: ' + this.count)
      }
      //if the object isn't empty, meaning there is a child object
      //then first check that the group name isn't the same
      //as another group name in the object
      else if(Object.getOwnPropertyNames(this.testobject).includes(this.groupname) == true)
      {
        console.log('the users group name is the same as whats already there')
        console.log(Object.getOwnPropertyNames(this.testobject).includes(this.groupname))
        console.log('list out all child objects inside testobject')
        console.log(Object.getOwnPropertyNames(this.testobject))
        console.log('############')
        console.log('then just add the contents to the existing groupname')
        let groupnamenum = _.size(this.testobject[this.groupname]);
        console.log('check length of objects in group name first ' + groupnamenum)
        console.log('then add that number to the groupdetails object key')
        this.testobject[this.groupname]['groupdetails'+groupnamenum] = {}
        console.log('then add all the key value pairs to the new groupdetails object')
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
      console.log('the groupname is not the same as what the user inputted')

      let thedataobject = {
        track: this.count,
        groupdetails0: {
          title: channeltitle,
          amount: items.length,
          url: this.sanitizedRssURL,
          track: this.count+1
        }
      }

      console.log('this.groupname is: ' + this.groupname)
      this.testobject[this.groupname] = thedataobject;
      this.count = this.count+2
      console.log('ADDED NEW OBJECT TO this.testobject')
    }
      
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    console.log(JSON.stringify(this.testobject))


    // for(var key in this.testobject) {
    //       if (this.testobject.hasOwnProperty(key)) {
    //           //console.log(this.testobject[key]['groupdetails0'].title);
    //       }
    //     }
    },
  }
}
</script>

<style>


/** {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
body {
    font-family: sans-serif;
    font-size: 16px;
}
nav {
    background: #222;
    padding: 0 15px;
}
a {
    color: white;
    text-decoration: none;
}
.menu,
.submenu {   
    list-style-type: none;
}
.logo {
    font-size: 20px;
    padding: 7.5px 10px 7.5px 0;
}
.item {
    padding: 10px;
}
.item.button {
    padding: 9px 5px;
}
.item:not(.button) a:hover,
.item a:hover::after {
    color: #ccc;
}


.menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
.menu li a {
    display: block;
    padding: 15px 5px;
}
.menu li.subitem a {
    padding: 15px;
}
.toggle {
    order: 1;
    font-size: 20px;
}
.item.button {
    order: 2;
}
.item {
    order: 3;
    width: 100%;
    text-align: center;
    display: none;
}
.active .item {
    display: block;
}
.button.secondary {
    border-bottom: 1px #444 solid;
}



.submenu {
    display: none;
}
.submenu-active .submenu {
   display: block;
}
.has-submenu i {
    font-size: 12px;
}
.has-submenu > a::after {
    font-family: "Font Awesome 5 Free";
    font-size: 12px;
    line-height: 16px;
    font-weight: 900; 
    content: "\f078";
    color: white;
    padding-left: 5px;
}
.subitem a {
    padding: 10px 15px;
}
.submenu-active {
    background-color: #111;
    border-radius: 3px;
}

@media all and (min-width: 700px) {
    .menu {
        justify-content: center;
    }
    .logo {
        flex: 1;
    }
    .item.button {
        width: auto;
        order: 1;
        display: block;
    }
    .toggle {
        flex: 1;
        text-align: right;
        order: 2;
    }
    .menu li.button a {
        padding: 10px 15px;
        margin: 5px 0;
    }
    .button a {
        background: #0080ff;
        border: 1px royalblue solid;
    }
    .button.secondary {
        border: 0;
    }
    .button.secondary a {
        background: transparent;
        border: 1px #0080ff solid;  
    }
    .button a:hover {
        text-decoration: none;
    }
    .button:not(.secondary) a:hover {
        background: royalblue;
        border-color: darkblue;
    }
}



@media all and (min-width: 960px) {
    .menu {
        align-items: flex-start;     
        flex-wrap: nowrap;
        background: none;
    }
    .logo {
        order: 0;
    }
    .item {
        order: 1;
        position: relative;
        display: block; 
        width: auto;
    }
    .button {
        order: 2;
    }
    .submenu-active .submenu {
        display: block;
        position: absolute;
        left: 0;
        top: 68px;
        background: #111;
    }
    .toggle {
        display: none;
    }
    .submenu-active {
        border-radius: 0;
    }
}
*/


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