<script setup lang="ts">
/* import * as _page from '../assets/page.ts' */
// let i = 0;
//let cpt;
</script>

<template>
  <main id="main" class="container">
    <div id="bars">
      <div id="bar-1">
        <span class="type_text" id="text"></span> <span class="type_text">&nbsp;&nbsp;|</span>
      </div>
      <div id="bar-2"></div>
      <div id="bar-3"></div>
      <div id="bar-4"></div>
      <div id="bar-5"></div>
    </div>
    <br />
    <div id="terminal">
      <div>
        <span id="prompt"
          ><span id="pre-user">guest</span>@<span id="pre-host">tanya.dev</span>:$ ls</span
        >
      </div>
      <!-- command output will be inserted before #write-lines-->
    </div>
  </main>
</template>

<style scoped></style>

<script lang="ts">
export default {
  init() {},
  computed: {},
  data() {
    return {
      words: ['2112.exe', '2112.cpp', '2112.js'],
      i: 0,
      cpt: 0
    }
  },
  mounted() {
    this.typeNow()
  },

  methods: {
    typeNow: function () {
      let word = this.words[this.i].split('')
      let loopTyping = () => {
        if (word.length > 0) {
          document.getElementById('text').innerHTML += word.shift()
          this.cpt = setTimeout(loopTyping, 250)
        } else {
          document.getElementById('quote').innerHTML += 'end ?'
          this.cpt = setTimeout(this.deleteNow, 5000)
          return
        }
      }
      loopTyping()
      //
    },

    deleteNow: function () {
      let word = this.words[this.i].split('')
      let loopDeleting = () => {
        if (word.length > 0) {
          word.pop()
          document.getElementById('text').innerHTML = word.join('')
        } else {
          if (this.words.length > this.i + 1) {
            this.i++
          } else {
            this.i = 0
          }
          this.typeNow()
          return false
        }
        this.cpt = setTimeout(loopDeleting, 250)
      }
      loopDeleting()
    }
  }
}
</script>
