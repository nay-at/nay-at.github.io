<script setup lang="ts">
/* import * as _page from '../assets/page.ts' */
</script>

<template>
  <div
    class="overflow-hidden h-screen flex justify-center items-center bg-purple-200 relative -z-20"
  >
    <div class="px-4 py-5 sm:p-6">
      <!-- Card Markup Starts -->
      <div class="w-80 h-96 bg-white flex flex-col items-center shadow-lg rounded p-4">
        <div class="border-8 border-indigo-700 w-full">
          <!-- TOP -->
          <div class="flex">
            <div class="flex flex-col w-20">
              <div class="h-20 bg-orange-400 border-b-8 border-indigo-700 dot-pattern">
                <!-- 1.1 -->
              </div>
              <div
                class="text-md space-y-1 bg-indigo-400 text-indigo-100 text-center h-20 font-extrabold"
              >
                <p>MO</p>
                <p>MO</p>
                <p>MO</p>
              </div>
            </div>
            <div
              class="flex-1 bg-cyan-200 border-l-8 border-indigo-700 text-indigo-700 text-8xl font-bold text-center pt-6 arial-black"
            >
              MO
            </div>
          </div>

          <!-- BOTTOM -->
          <div class="grid grid-cols-2 grid-flow-row border-t-8 border-indigo-700">
            <div class="h-20 bg-green-100 border-r-8 border-indigo-700 diagonal-lines-pattern">
              <!-- 03 -->
            </div>
            <div class="bg-teal-400 grid-pattern">
              <!-- 04 -->
            </div>
          </div>
        </div>

        <div class="w-full flex flex-1 w-full items-end justify-around rounded-b-lg">
          <div class="text-xs font-semibold text-indigo-800">
            <span class="block"> MOMO Art </span>
            <span class="block"> Is the most popular </span>
            <span class="block"> Design space </span>
          </div>
          <div class="border-8 border-indigo-700 flex text-sm">
            <i class="text-xl bg-yellow-400 border-r-8 border-indigo-700 p-1 fa-solid fa-star"></i>
            <button class="bg-white px-2">MOMO ART</button>
          </div>
        </div>
      </div>
      <!-- Card Markup Ends -->
    </div>

    <div class="px-4 py-5 sm:p-6">
      <!-- Card Markup Starts -->
      <div class="w-80 h-96 bg-purple-300 flex flex-col items-center shadow-lg rounded p-4">
        <div class="border-8 border-indigo-700 w-full">
          <!-- TOP -->
          <div class="flex">
            <div class="flex flex-col w-20">
              <div
                class="h-20 border-b-8 border-indigo-700 font-extrabold text-md text-indigo-700 text-center"
              >
                <p>MO</p>
                <p>MO</p>
                <p>MO</p>
              </div>
              <div class="h-20 bg-amber-400 grid-pattern">
                <!-- 1.2 -->
              </div>
            </div>
            <div
              class="flex-1 bg-yellow-300 border-l-8 border-indigo-700 text-indigo-700 text-8xl font-bold text-center pt-6 arial-black"
            >
              MO
            </div>
          </div>

          <!-- BOTTOM -->
          <div class="grid grid-cols-2 grid-flow-row border-t-8 border-indigo-700">
            <div class="h-20 bg-orange-400 border-r-8 border-indigo-700 dot-pattern">
              <!-- 03 -->
            </div>
            <div class="bg-green-100 diagonal-lines-pattern">
              <!-- 04 -->
            </div>
          </div>
        </div>

        <div class="w-full flex flex-1 w-full items-end justify-around rounded-b-lg">
          <div class="text-xs font-semibold text-indigo-800">
            <span class="block"> MOMO Art </span>
            <span class="block"> Is the most popular </span>
            <span class="block"> Design space </span>
          </div>
          <div class="border-8 border-indigo-700 flex text-sm cursor-pointer">
            <i class="text-xl bg-yellow-400 border-r-8 border-indigo-700 p-1 fa-solid fa-star"></i>
            <button class="bg-white px-2">MOMO ART</button>
          </div>
        </div>
      </div>
      <!-- Card Markup Ends -->
    </div>
  </div>
  <div class="absolute bottom-0">
    Design Inspiration:
    <a
      class="font-semibold"
      target="_blank"
      href="https://www.behance.net/gallery/88025961/MOMO-Design"
    >
      MOMO Design
    </a>
  </div>
  <!--  PROPS
props: {
  class: '',
  data: {}
  config: {}
}
--></template>

<style scoped>
:root {
  --currentColor: #fff;
}

.arial-black {
  font-family: Arial Black;
}
.dot-pattern {
  background-image: radial-gradient(rgb(253 224 71) 3px, transparent 2px);
  background-size: calc(10 * 1px) calc(10 * 1px);
  background-color: rgba(224, 255, 255, 0.5);
}

.grid-pattern {
  background-image: linear-gradient(var(--currentColor) 4px, transparent 4px),
    linear-gradient(to right, var(--currentColor) 4px, transparent 2px);
  background-size: 14px 14px;
}

.diagonal-lines-pattern {
  background-image: repeating-linear-gradient(
    45deg,
    orange 0,
    orange 4px,
    transparent 0,
    transparent 50%
  );
  background-size: 16px 16px;
}
</style>
