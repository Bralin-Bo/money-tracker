<template>
    <button :class="`px-4 py-1 rounded-lg font-small text-white pointer focus ${colors[color]?.bg} ${colors[color]?.hover}`">
      {{ name }}
  </button>
</template>

<script setup>
defineProps(['name', 'color'])
const colors = {
  red:      { bg: 'bg-red-400',       hover: 'hover:bg-red-600' },
  green:    { bg: 'bg-green-400',     hover: 'hover:bg-green-600' },
  blue:     { bg: 'bg-blue-400',      hover: 'hover:bg-blue-600' },
  indigo:   { bg: 'bg-indigo-400',    hover: 'hover:bg-indigo-600' },
  yellow:   { bg: 'bg-yellow-400',    hover: 'hover:bg-yellow-600' },
  purple:   { bg: 'bg-purple-400',    hover: 'hover:bg-purple-600' },
  pink:     { bg: 'bg-pink-400',      hover: 'hover:bg-pink-600' },
  rose:     { bg: 'bg-rose-400',      hover: 'hover:bg-rose-600' },
  orange:   { bg: 'bg-orange-400',    hover: 'hover:bg-orange-600' },
  amber:    { bg: 'bg-amber-400',     hover: 'hover:bg-amber-600' },
  lime:     { bg: 'bg-lime-400',      hover: 'hover:bg-lime-600' },
  teal:     { bg: 'bg-teal-400',      hover: 'hover:bg-teal-600' },
  cyan:     { bg: 'bg-cyan-400',      hover: 'hover:bg-cyan-600' },
  sky:      { bg: 'bg-sky-400',       hover: 'hover:bg-sky-600' },
  emerald:  { bg: 'bg-emerald-400',   hover: 'hover:bg-emerald-600' },
  fuchsia:  { bg: 'bg-fuchsia-400',   hover: 'hover:bg-fuchsia-600' },
  violet:   { bg: 'bg-violet-400',    hover: 'hover:bg-violet-600' },
  slate:    { bg: 'bg-slate-400',     hover: 'hover:bg-slate-600' },
  neutral:  { bg: 'bg-neutral-400',   hover: 'hover:bg-neutral-600' },
  zinc:     { bg: 'bg-zinc-400',      hover: 'hover:bg-zinc-600' },
  stone:    { bg: 'bg-stone-400',     hover: 'hover:bg-stone-600' },
  gray:     { bg: 'bg-gray-400',      hover: 'hover:bg-gray-600' }
}
</script>

<style>
.focus {
  animation: scalePulse 1s ease forwards;
}

@keyframes scalePulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3); 
  }
  100% {
    transform: scale(1);
  }
}

.remove {
  opacity: 0;
  translate: 0 5px;
}

</style>