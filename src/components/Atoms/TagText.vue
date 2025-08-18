<template>
    <p :class="`p-1 font-small pointer focus ${colors[color]?.bg}`">
      {{ name }}
  </p>
</template>

<script setup>
defineProps(['name', 'color'])
const colors = {
  red:      { bg: 'text-red-400'},
  green:    { bg: 'text-green-400'},
  blue:     { bg: 'text-blue-400'  },
  indigo:   { bg: 'text-indigo-400'},
  yellow:   { bg: 'text-yellow-400'},
  purple:   { bg: 'text-purple-400'},
  pink:     { bg: 'text-pink-400'  },
  rose:     { bg: 'text-rose-400'  },
  orange:   { bg: 'text-orange-400'},
  amber:    { bg: 'text-amber-400' },
  lime:     { bg: 'text-lime-400'  },
  teal:     { bg: 'text-teal-400'  },
  cyan:     { bg: 'text-cyan-400'  },
  sky:      { bg: 'text-sky-400'   },
  emerald:  { bg: 'text-emerald-400'},
  fuchsia:  { bg: 'text-fuchsia-400'},
  violet:   { bg: 'text-violet-400'},
  slate:    { bg: 'text-slate-400' },
  neutral:  { bg: 'text-neutral-400'},
  zinc:     { bg: 'text-zinc-400'  },
  stone:    { bg: 'text-stone-400' },
  gray:     { bg: 'text-gray-400'  }
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