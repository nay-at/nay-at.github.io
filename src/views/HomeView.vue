<script setup lang="ts">

import * as _page from "../assets/page.ts"
</script>


<template>
<main>
  <header>
    <h2><span>Table</span> of content</h2>
  </header>
  <section>
    <ul class='indexes'>
      <li data-index='0'>01</li>
      <li data-index='1'>02</li>
      <li data-index='2'>03</li>
      <li data-index='3'>04</li>
    </ul>
    <ul class='tabs'>
      <li class='tab'>
        <article class='tab-content'>
          <h3>Midnight Station</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Voluptas nihil sequi doloribus obcaecati. Aut vel, recusandae ipsa
          voluptate blanditiis nemo magnam sit modi architecto officia
          maiores magni. Necessitatibus, iste aut.</p>
          <button>Read More</button>
        </article>
        <div class='tab-image'><img src='https://picsum.photos/id/345/1000/600'></div>
      </li>
      <li class='tab'>
        <article class='tab-content'>
          <h3>The Hitchhiker</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Voluptas nihil sequi doloribus obcaecati. Aut vel, recusandae ipsa
          voluptate blanditiis nemo magnam sit modi architecto officia
          maiores magni. Necessitatibus, iste aut.</p>
          <button>Read More</button>
        </article>
        <div class='tab-image'><img src='https://picsum.photos/id/352/1000/600'></div>
      </li>
      <li class='tab'>
        <article class='tab-content'>
          <h3>Missing Pages</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Voluptas nihil sequi doloribus obcaecati. Aut vel, recusandae ipsa
          voluptate blanditiis nemo magnam sit modi architecto officia
          maiores magni. Necessitatibus, iste aut.</p>
          <button>Read More</button>
        </article>
        <div class='tab-image'><img src='https://picsum.photos/id/444/1000/600'></div>
      </li>
      <li class='tab'>
        <article class='tab-content'>
          <h3>Uninvited Guests</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Voluptas nihil sequi doloribus obcaecati. Aut vel, recusandae ipsa
          voluptate blanditiis nemo magnam sit modi architecto officia
          maiores magni. Necessitatibus, iste aut.</p>
          <button>Read More</button>
        </article>
        <div class='tab-image'><img src='https://picsum.photos/id/451/1000/600'></div>
      </li>
    </ul>
  </section>
</main>
</template>

<script lang="ts">
export default {
  init() {},
  computed: {
    
  },
  data() {
    return{
    page_int: () => this.showTab(0)}
  },
  mounted() {
  },
  watch: {
  },
  methods: {
    showTab: function(i) {
  indexes[i].style.borderColor = 'rgba(211,38,38,0.6)';
  tabs[i].style.opacity = 1;
  tabs[i].style.zIndex = 5;
  tabs[i].classList.add('active');
  contents[i].classList.add('active');
},

 activate:function(e) {
  if (!e.target.matches('.indexes li')) return;
  reset();
  showTab(e.target.dataset.index);
}
      
  },
  created() {
    window.addEventListener('load',this.page_init,false);
window.addEventListener('click',this.page_init,false);
  }
}
</script>