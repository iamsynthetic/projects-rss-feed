<template>
   <div>
      <p>feed list</p>
      
      <div v-for="(item, index) in testobject" :key="index">
        {{item}}
        the index is: {{index}}
        <br>
        <br>
        {{ item['groupname'] }}
        <div v-for="(group, gindex) in testobject[1]" :key="gindex">
         g-index is: {{gindex}}
        </div>
        <!-- {{ item['groupdetails' + index].title }}
        {{ item['groupdetails' + index].amount }}
        {{ item['groupdetails' + index].url }} -->
              <br>
                      <br>
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
      changenum: 0
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
      console.log('saveItemsList newvalue is: ' + newValue);
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
      console.log('MODAL - BLAHB ALHB ')
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

          }

          //test:[{data0:'zero'}, {data1:'one'}, {data2:'two'}],
          
          console.log('test before is: ' + this.test)

          let data3 = {
            data3: 'three'
          }
          this.test.push(data3);
          console.log('------------------')
          console.log('------------------')
          console.log('------------------')
          console.log('test is: ' + this.test)
          console.log('------------------')
          console.log('------------------')
          console.log('------------------')
          // let thefeed = {
          //   feeddata: {

          //   }
          // }
          
          let data0 = {
            groupname: this.groupname,
            groupdetails0: {
              title: channeltitle,
              amount: items.length,
              url: this.sanitizedRssURL
            }
          }
          //console.log('------ A ' + JSON.stringify(thefeed))
          //console.log('------ B ' + JSON.stringify(thefeed.feeddata))
          //this.items.push(thefeed)
          //console.log('------ C - items.thefeed is : ' +  JSON.stringify(this.items[0].feeddata));
          //this.items['data0'].push(data0)
          
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

          var blah = [];
          var obj = {};

          obj['data0'] = {};
          console.log('obj is: ' + obj)
          console.log('obj.data0 is: ' + obj.data0)

          obj['data0']['t1'] = 'title';
          obj.data0.t2 = 'url';
          console.log('obj.data0.01 is: ' + obj.data0.t1);
          console.log('obj.data0.01 is: ' + obj.data0.t2);

          blah.push(obj)
          console.log('blah is: ' + blah);
          console.log('inside blah is: ' + JSON.stringify(blah))


          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          


          // this.items['data0'] = {}
          // console.log('this.items _-gmoeingeoin---3--33-3' + this.items)
          // this.items['data0'].groupname = this.groupname;
          // this.items['data0']['groupdetails0'] = {};
          // this.items['data0']['groupdetails0'].title = channeltitle;
          // this.items['data0']['groupdetails0'].amount = items.length;
          // this.items['data0']['groupdetails0'].url = this.sanitizedRssURL;
          // this.items['data0'].push(data0)
          // console.log(this.items)

          console.log("this.items: " + JSON.stringify(this.items));
          this.items.push(thefeed)
          console.log("this.items.thefeed: " + JSON.stringify(this.items.thefeed));

          //add the object to the parent object in the array
          this.items[0]['data0'] = data0;
          console.log('this.items[0] ' + this.items[0])
          console.log('stringify this.items[0] ' + JSON.stringify(this.items[0]))
          console.log('this.items[0]["_data0"] ' + this.items[0]['data0'])
          console.log('this.items[0]["_data0"] ' + JSON.stringify(this.items[0]['data0']))
          

          this.testobject[0] = data0;

          console.log('this.testobject[data0] is: ' + this.testobject['data0'])
          console.log('this.testobject is: ' + JSON.stringify(this.testobject))
          console.log('this.testobject[data0] is: ' + JSON.stringify(this.testobject['data0']))
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          
          // let j = 1;
          // this.items[0]['_data' + j] = data0
          // console.log('this.items ' + JSON.stringify(this.items))
          

          //this.items[0]['data0'] = data0;
          //console.log('------ D - items.thefeed is : ' +  JSON.stringify(this.items[0].feeddata));
          //console.log('------ E - items json.stringified is: ' + JSON.stringify(this.items[0].feeddata['data0']));
          //console.log('------ F - items is now: ' + JSON.stringify(this.items))
          //console.log('------ G - length of feeddata: ' + _.size(this.items[0].feeddata));
        } 
        else {
        
          //console.log('this is working')
          while(this.i < _.size(this.items)){
            this.count++;
            console.log('count is: ' + this.count);
            console.log('this.i is: ' + this.i);
            console.log('length of feeddata is: '+ _.size(this.items))
            
            
            
            if(this.items[0]['data' +this.i].groupname === this.groupname){
              
              console.log('first if statement')
              console.log("this.items[0].feeddata['data' +this.i].groupname is: " + this.items[0]['data' +this.i].groupname)
              console.log('this.groupname is: ' + this.groupname)
              
              let groupdetails = {
                title: channeltitle,
                amount: items.length,
                url: this.sanitizedRssURL
              }
              
              //group name is the same, now check how many 'groupdetails' there are
              let howmanygroupdetails = _.size(this.items[0]['data' + this.i]);
              console.log('how many items are in this data object: ' + howmanygroupdetails)

              //have to minus 1 because groupname is a key in this object
              let groupdetailsnumber = howmanygroupdetails - 1;
              console.log('groupdetailsnumber is: ' + groupdetailsnumber)

              //create a new object with the new number based on what's already there
              this.items[0]['data' + this.i]['groupdetails' + groupdetailsnumber] = {}
              
              //fill the new empty object with the right content
              
              this.items[0]['data' + this.i]['groupdetails' + groupdetailsnumber].title = channeltitle;
              this.items[0]['data' + this.i]['groupdetails' + groupdetailsnumber].amount = items.length;
              this.items[0]['data' + this.i]['groupdetails' + groupdetailsnumber].url = this.sanitizedRssURL;
              
              this.$store.dispatch('saveItemsList', this.items)
              //check that all this is there and working
              console.log('new object is: ' + this.items[0]['data' + this.i]['groupdetails' + groupdetailsnumber])
              console.log('new object.title is: ' + this.items[0]['data' + this.i]['groupdetails' + groupdetailsnumber].title)
              console.log('new object.amount is: ' + this.items[0]['data' + this.i]['groupdetails' + groupdetailsnumber].amount)
              console.log('new object.url is: ' + this.items[0]['data' + this.i]['groupdetails' + groupdetailsnumber].url)
              
              break;
            }
            else{
              console.log('--**** 000 --- groupanme is different ' + this.groupname)
              //this.count++;

              let dataobj = {
                groupname: this.groupname,
                groupdetails0: {
                  title: channeltitle,
                  amount: items.length,
                  url: this.sanitizedRssURL
                }
              }
              let counter =  _.size(this.items)
              console.log('counter is: ' + counter);
              this.items[0]['data' + counter] = dataobj
              this.testobject[counter] = dataobj
              //this.i++
              console.log('this.i in else is: ' + this.i)
              this.$store.dispatch('saveItemsList', this.items)
              break;
              
            }
          }
        }
        console.log('------ G - length of feeddata: ' + _.size(this.items));
        
        console.log('OUTSIDE OF LOOP - items: ' + JSON.stringify(this.items));
        
        console.log('OUTSIDE OF LOOP - items: ' + JSON.stringify(this.testobject));
      }






      //this is for the testobject object
      if(items.length == 0 || items.length == null || items.length < 1){
        this.isdata = false;
      }
      else
      {
        this.isdata = true;

        if(this.testobject.length == 0){
          let data0 = {
            groupname: this.groupname,
            groupdetails0: {
              title: channeltitle,
              amount: items.length,
              url: this.sanitizedRssURL
            }
          }
          this.testobject[0] = data0;
        }
        else
        {
          while(this.i < _.size(this.testobject)){
            let howmany = _.size(this.testobject[this.i])
            console.log('49444040404044-3-2 --- how many items are in this data object ' + howmany)
            break;
          }
        }
       
       

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