<script setup lang="ts">
/* import * as _page from '../assets/page.ts' */
     // let i = 0;
      //let counter;
      
</script>

<template>
<div class="container">
    <!-- random quote machine -->
    <div class="wrapper quote-machine border blue">
      <header class="border blue">
        <h1><div class="type">
      <p class="type_text" id="text"></p>
      <p class="type_text">|</p>
   </div>
   </h1>
        <span class="version border blue">ver:1.1</span>
      </header>
      <main class="border blue">

        <blockquote id="quote"></blockquote>
        <div class="block">
          <a href="#" id="newQuoteBtn" class="btn">New quote</a>
          <span id="tweet-wrapper">
          </span>
        </div>
      </main>
      <footer class="border blue">
        <p class="page-author">Coded and designed by <br/><a href="https://markostefanovic.github.io/" class="brackets" target="_blank">Marko Stefanovic</a><br/>for FreeCodeCamp © 2016</p>
      </footer>
    </div>

</div>
</template>

<style scoped>

</style>

<script lang="ts">
  export default {
  init() {},
  computed: {
    sortedData() {
    }
  },
  data() {
    return {
      words : ["tanya.exe", "tanya.cpp", "tanya.js"],
      i_ : 0,
      counter_ : 0,
    }
  },
  mounted() {
    this.typeNow();
  },
 
  methods: {
    deleteNow: function() {
       document.getElementById('quote').innerHTML += " here ?";
         let word = this.words[this.i_].split("");
         let loopDeleting = function() {
            if (word.length > 0) {
              
              document.getElementById('quote').innerHTML += "pop ?";
               word.pop();
               document.getElementById('text').innerHTML = word.join("");
            } else {
              document.getElementById('quote').innerHTML += "else";
               if (this.words.length > (this.i_ + 1)) {
                  (this.i_)++;
               } else {
                  this.i_ = 0;
               };
               this.typeNow();
               return false;
            }
            this.counter_ = setTimeout(loopDeleting, 250);
         }
         loopDeleting();
      },
     typeNow:function() {
         let word = this.words[this.i_].split("");
         let loopTyping = function() {
            if (word.length > 0) {
               document.getElementById('text').innerHTML += word.shift();
               this.counter_ = setTimeout(loopTyping, 250);
            } else {
              document.getElementById('quote').innerHTML += "end ?";
               
               return;
            };
            
         };
         loopTyping();
         this.deleteNow();
      },
    
     
  }
  
}
</script>
