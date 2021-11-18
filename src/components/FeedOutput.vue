<template>
  <div>
    <p>{{blah}}</p>
    <div v-if="isdata == false">
      <p>Sorry there seems to be a problem with the feed, try loading another</p>
    </div>
    <div v-else>
      <div class="feed-loop" v-for="(item, index) of newitems" :key="index">
        <div class="feed-content">

          <div class="feed-container">
            <div class="img-container" v-if="isimg">
              <img class="theimg" :src="item.img" alt="image alt" />
            </div>
            <div class="content-container">
              <div class="thecontent">
                <h2 class="title" v-html="item.title"/>
                <div class="description" v-html="item.description" />
                <a class="link" :href="item.link">visit site</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "feedoutput",
  data() {
    return {
      rssUrl: "",
      items: [],
      newitems: [],
      isdata: true,
      isimg: false,
      defaultsearchterm: 'tiredness',
      currentsearchterm: '',
      apiURL: 'http://localhost:3000/',
    };
  },
  mounted(){
    this.checkSearchterm()
  },
  computed: {
      ...mapState(['newRssURL']),
      blah(){
        return this.$store.state.newRssURL
      }
  },
  watch:{
    newRssURL(newValue, oldValue){
      console.log(`updating from ${oldValue} to ${newValue}`);
      
      //console.log('newrssurl is: ' + this.blah());
      //console.log('store num is: ' + this.$store.state.num)
      //console.log('store newRssURL is: ' + this.$store.state.newRssURL)
      //this.searchUnsplash(newValue)
      
      this.rssUrl = newValue;
      this.getRss();
      //this.blah2()
    }
  },
  methods: {
    
    checkSearchterm(){
      if(this.newRssURL == ''){
        // this.searchUnsplash(this.defaultsearchterm)
        // this.currentsearchterm = this.defaultsearchterm;
        //do nothing for now
      }
      else
      {
        //this.searchUnsplash(this.searchterm)
        //this.currentsearchterm = this.searchterm;
        //call the getrss function
        this.rssUrl = this.newRssURL;
        this.getRss();
      }  
    },
    async getRss() {
      // const urlRegex = /(http|ftp|https)://[\w-]+(.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/;
      // if (!urlRegex.test(this.rssUrl)) {
      //   return;
      // }
      this.items = [];
      //console.log('getRSS');
      //console.log('rssUrl is: ' + this.rssUrl);

      const res = await fetch(
        //`https://api.allorigins.win/get?url=${this.rssUrl}`
        `${this.rssUrl}`
      )
      const { contents } = await res.json();
      const feed = new window.DOMParser().parseFromString(contents, "text/xml");
      const items = feed.querySelectorAll("item");
      console.log('items is: ' + items);

      if(items.length == 0 || items.length == null || items.length < 1){
        this.isdata = false;
      }
      else{
        this.isdata = true;
        for(let i=0; i<items.length;i++){
          let checktitle = items[i].querySelectorAll('title')[0].innerHTML;
          let checkdescription = items[i].querySelectorAll('description')[0].innerHTML;
          let checklink = items[i].querySelectorAll('link')[0].innerHTML;

          if(checktitle != null){
            if(checkdescription != null){
              if(checklink != null){
                if(i == items.length-1){
                  // this.sanitizeFunc(items);
                  this.setupNewArray(items);
                }
              }
            }
          }
        }
      } 
    },
    // sanitizeFunc(allitems){
      
    //   this.items = [...allitems].map((el) => ({
        
    //     link: el.querySelector("link").innerHTML
    //       .trim().replace(/^(\/\/\s*)?<!\[CDATA\[|(\/\/\s*)?\]\]>$/g, ''),
          
    //     title: el.querySelector("title").innerHTML
    //       .trim().replace(/^(\/\/\s*)?<!\[CDATA\[|(\/\/\s*)?\]\]>$/g, '')
    //       .replaceAll('&#038;', '&')
    //       .replaceAll('&amp;', '&')
    //       .replaceAll("&#039;", "'"),
        
    //     description: el.querySelector("description").innerHTML
    //       .trim().replace(/^(\/\/\s*)?<!\[CDATA\[|(\/\/\s*)?\]\]>$/g, '')
    //       .replaceAll('&#038;', '&')
    //       .replaceAll('&amp;', '&')
    //       .replaceAll("&#039;", "'"),
    //   }))
    // },
    setupNewArray(allitems){
      
      this.newitems = []
      console.log(allitems);
      
      for(let i=0; i<allitems.length;i++){

        let descriptioninner = allitems[i].querySelector('description').innerHTML;
        let theimgurl;

        if(descriptioninner.search('<img src=') == -1){
          console.log('allitems - description - search - img src is -1')
          this.isimg = false;
        }
        else
        {
          this.isimg = true;
          //this is the image inside the description
          let urlstart = descriptioninner.search('<img src=')+10
          let urlendindex = descriptioninner.search('/>')-2;
          theimgurl = descriptioninner.substr(urlstart, (urlendindex - urlstart))
        }
        //remove the image from the cdata if there is one
        //then add it to the object array
        //adding 10 so that the substr can start at the end of '<img src='
        //instead of the beginning. then remove the img url from the description
        
        //this is the description without the image in it
        let thedescription = descriptioninner.replace(String(theimgurl), '').replace('<img src="', '').replace('" />', '').replace('<![CDATA[', '').replace(']]>', '');
        
        //this is the title
        let thetitle = allitems[i].querySelector('title').innerHTML.replace('<![CDATA[', '').replace(']]>', '');
        
        //this is the link out link
        let thelink = allitems[i].querySelector('link').innerHTML;

        //this is the object to be filled with the data and then put into the array
        let dataobj = {
          "title": thetitle,
          "img": theimgurl,
          "description": thedescription,
          "link": thelink
        }
          
        //this is the array that the objects are being pushed into
        this.newitems.push(dataobj)

        // console.log('lastindex of is: ' + urlstart)
        // console.log('urlendindex is: ' + urlendindex)
        // console.log('theimgurl is: ' + theimgurl)
        // console.log('description is: ' + allitems[i].querySelector('description').innerHTML)
        // console.log('description trimmed is: ' + thedescription)
    
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .feed-loop{
    display:flex;
    padding-bottom:60px;
  }

  .feed-content {
    flex-direction:column;
    text-align:left;
    margin-bottom:40px;
    width:100%;
  }

  .feed-content .feed-container{
    display:flex;
    flex-wrap:wrap;
    width:100%;
  }

  .feed-content .img-container{
    width:220px;
  }

  .feed-content .img-container .theimg{
    width:200px;
    height:auto;
  }

  .feed-content .content-container{
    flex:1;
  }


  .feed-content .thecontent{
    /* height:300px; */
    height:auto;
  }

  .feed-content .title {
    font-size:18px;
    font-family: 'Roboto', sans-serif;
    font-weight:900;
    margin:0px;
    padding:0px;
    margin-top:-5px;
  }

  .feed-content .description {
    
    /* height:100px; */
    font-size:16px;
    font-family: 'Roboto', sans-serif;
    font-weight:100;
    /* display:flex; */
  }

  /* .feed-content .description img {
    height:100px;
    width:auto;
  } */

  .feed-content .link {
    font-size:14px;
    font-family: 'Roboto', sans-serif;
    font-weight:100;
    color:blue;
  }

</style>