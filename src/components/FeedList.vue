<template>
   <div>
      <p>feed list</p>
      <div class="group" v-for="(parent_value, parent_name, parent_index) in testobject" :key="parent_index">
        <div :class="categoryHighlightState" 
              @mouseover='showHighlight("categoryHighlightActive")' 
              @mouseout='hideHighlight("categoryHighlightActive")' 
              @click='removeItem(parent_index, null)'
              @contextmenu="doHandlerGroup($event)">
          <BootstrapIcon class="bootstrap-chevron-right" :class="rotatedState" icon="chevron-right" 
              @click='chevronfunc(parent_value)'/>

          <span>{{parent_name}}</span>
        </div>
        
        <div class="sub-group" v-for="(child_value, child_name, child_index) in parent_value" :key="child_index">
          <!-- adding .visible adds this to the object so it shows as an extra item in categories fix below -->
          <div v-show="parent_value.visible">
            <div v-if="child_index < 1"></div>
            <div v-if="child_name == 'visible' || child_name == 'track' "></div>
            <div v-else>
              <div class="row">
                <div class="feed-name column" :class="feedHighlightState" 
                @mouseover='showHighlight("feedHighlightActive")'
                @mouseout='hideHighlight("feedHighlightActive")' 
                @click="sendNewURL(child_value.url)" 
                
                @contextmenu="doHandlerSubGroup($event)">
                  <div class="left-column">
                    {{ child_value['title'] }}
                  </div>
                </div>
                <!--@contextmenu.prevent="handler"-->
                <div class="feed-name column" :class="feedHighlightState" 
                @mouseover='showHighlight("feedHighlightActive")' 
                @mouseout='hideHighlight("feedHighlightActive")' 
                @click="sendNewURL(child_value.url)" 
                
                @contextmenu="doHandlerSubGroup($event)">
                  <div class="right-column">
                    {{ child_value['amount'] }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ul id="sub-group-right-click-menu" :class="markerInfoStyle" tabindex="-1" v-show="showSubGroupRightClick" v-on:blur="closeMenu">
            <li class="right-click-sub-group">First list item</li>
            <li class="right-click-sub-group">Second list item</li>
            <li class="right-click-sub-group">
              <div class="delete-btn" @click="removeItem(child_name)">delete</div>
            </li>
          </ul>

        </div>
      
        <ul id="group-right-click-menu" :class="markerInfoStyle" tabindex="-1" v-show="showGroupRightClick" v-on:blur="closeMenu">
          <li class="right-click-sub-group">First list item</li>
          <li class="right-click-sub-group">Second list item</li>
          <li class="right-click-sub-group">
            <div class="delete-btn" @click="removeItem(parent_name)">delete</div>
          </li>
        </ul>

      </div>
   </div>
</template>

<script>
  
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'
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
      theid: '',
      navActive: false,
      categoryHighlightActive: false,
      feedHighlightActive: false,
      showSubGroupRightClick: false,
      showGroupRightClick:false,
      removethenav: false,
      mousex: 0,
      mousey: 0,
       contextMenuWidth: null,
    contextMenuHeight: null
    }
  },
  mounted(){
    this.savedURLlist = this.$store.state.savedURLS;
     document.addEventListener("mousemove", (event) => {
      this.mousex = event.clientX; // Gets Mouse X
      this.mousey = event.clientY; // Gets Mouse Y
    })
  },
  computed: {
    ...mapState(['modalNewRssURL','modalNewRssURLGroupName','savedURLS', 'saveditemslist', 'contextnav']),
    rotatedState() {
      return this.navActive ? 'nav--active' : 'nav--inactive';
    },
    categoryHighlightState() {
      return this.categoryHighlightActive ? 'highlight--active' : 'highlight--inactive';
    },
    feedHighlightState() {
      return this.feedHighlightActive ? 'highlight--active' : 'highlight--inactive';
    },
    markerInfoStyle(){
      return {
        left: this.mousex + 'px',
        top: this.mousey + 'px'
      }
    }
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
    },
    contextnav(newValue, oldValue){
      // console.log('rightclick - new value is: ' + newValue)
      // console.log('rightclick - old value is: ' + oldValue)
      if(newValue == 'close'){
        //console.log('closemenu()')
        this.closeMenu()
      }
      // else if(newValue == 'open'){
      //   this.$store.dispatch('addTheRightClickNav', 'open')
      // }
    }
  },
  methods:{

    doHandlerGroup(e){
      //do stuff
      e.preventDefault();
      // console.log('doHandler')
      // console.log(e);
      this.showGroupRightClick = true;
      let menu = document.getElementById('group-right-click-menu');
      // console.log('blah is: ' + blah.name)
      menu.style.left = e.x + 'px';
      menu.style.top = e.y + 'px';

      // console.log('blah.style.left is: ' + blah.style.left)
      // console.log('blah.style.top is: ' + blah.style.top)
      
      this.$store.dispatch('addTheRightClickNav', 'open')
     
    },
    doHandlerSubGroup(e){
      e.preventDefault();
      this.showSubGroupRightClick = true;
      this.showGroupRightClick = false;
      let menu = document.getElementById('sub-group-right-click-menu');
      menu.style.left = e.x + 'px';
      menu.style.top = e.y + 'px';
      this.$store.dispatch('addTheRightClickNav', 'open')
    },
    closeMenu() {
      console.log('context menu closed')
      this.showGroupRightClick = false;
      this.showSubGroupRightClick = false;
    },
    chevronfunc(parent_value){
      console.log('parent_value is: ' + parent_value)
      parent_value.visible = !parent_value.visible
      this.navActive = !this.navActive;
    },
    showHighlight(highlight){
      console.log(highlight)
      if(highlight == 'categoryHighlightActive'){
        this.categoryHighlightActive = true
      }
      else{
        this.feedHighlightActive = true
      }
    },
    hideHighlight(highlight){
      console.log(highlight)
      if(highlight == 'categoryHighlightActive'){
        this.categoryHighlightActive = false
      }
      else{
        this.feedHighlightActive = false
      }
    },
    sendNewURL(theURL){
      this.$store.dispatch('changeRssURL', theURL)
    },
    //need to work on this function more
    removeItem(parent_name, child_name) {
      console.log('parent_name is: ' + parent_name)
      console.log('child name is: ' + child_name)
      console.log('23902930293092329309320932090320293')
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

.nav--active {
  transform-origin: left;
  transform: translate(40%, -50%) rotate(90deg) ;
}
.nav--inactive {
  transform: rotateZ(0deg);
}
.highlight--active {
  cursor: pointer;
  background-color: #96D1EB;
  color: black;
}
.highlight--inactive {
  background-color: none;
}
.bootstrap-chevron-right{
  color: #595959;
  margin-right: 4px;
  cursor: pointer;
}
.group{
  text-align: left;
  margin-left: 20px;
  font-size: 14px;
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 700;
}
.sub-group{
  margin-left: 30px;
  padding-bottom: 10px;
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 400;
}

.row{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.column{
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
}
.left-column{
  background-color:null;
}
.right-column{
  /*background-color: green;*/
  margin-left: auto;
  margin-right: 20px;
  color: #8C8C8C;
}
.feed-name{
  cursor: pointer;
}
#group-right-click-menu, #sub-group-right-click-menu{
    background: #FAFAFA;
    border: 1px solid #BDBDBD;
    border-radius:4px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 200px;
    z-index: 999999;
    /* top: -20px; */
}

.right-click-sub-group{
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 400;
}

#group-right-click-menu li, #sub-group-right-click-menu li {
    /* border-bottom: 1px solid #E0E0E0; */
    margin: 0;
    padding: 8px 35px;
}

#group-right-click-menu li:nth-last-child(2), #sub-group-right-click-menu li:nth-last-child(2){
  padding-bottom: 14px;
  border-bottom: 1px solid #e0e0e0;
}

#group-right-click-menu li:hover, #sub-group-right-click-menu li:hover {
  cursor: pointer;
  background-color: #96D1EB;
}

.delete-btn{
  cursor: pointer;
  color:red;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 400;
  width:130px;
  height: 34px;
  top: 8px;
  position: relative;
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