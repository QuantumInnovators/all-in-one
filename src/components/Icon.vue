<template>
  <span class="icon" :class="iconClass"></span>
</template>

<script>
export default {
  name: 'NavIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    iconClass() {
      return `icon-${this.name}`;
    }
  }
}
</script>

<style scoped>
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* 基本图标 */
.icon-code {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>');
}

.icon-book {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>');
}

.icon-palette {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="1.5"></circle><circle cx="17.5" cy="10.5" r="1.5"></circle><circle cx="8.5" cy="7.5" r="1.5"></circle><circle cx="6.5" cy="12.5" r="1.5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>');
}

.icon-tools {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>');
}

/* 搜索相关图标 */
.icon-search {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
}

.icon-x {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>');
}

/* 特定图标 */
.icon-github {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>');
}

.icon-stack-overflow {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20.002V14.67h2v7.333H4V14.67h2v5.333h12z"></path><path d="M15.5 14.67l-1.5-1.5-8.5 1.5 1.5 1.5 8.5-1.5z"></path><path d="M17.5 11.67l-1.5-1.5-8.5 1.5 1.5 1.5 8.5-1.5z"></path><path d="M19.5 8.67l-1.5-1.5-8.5 1.5 1.5 1.5 8.5-1.5z"></path><path d="M21.5 5.67l-1.5-1.5-8.5 1.5 1.5 1.5 8.5-1.5z"></path></svg>');
}

.icon-vue {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 22h20L12 2z"></path><path d="M12 2l4 8 4-8H12z"></path></svg>');
}

.icon-image {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>');
}

.icon-figma {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path></svg>');
}

.icon-dribbble {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path></svg>');
}

.icon-browser {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>');
}

.icon-code-json {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>');
}

.icon-code-braces {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8h-3v8h3"></path><path d="M17 16h3v-8h-3"></path><path d="M3 12h18"></path></svg>');
}

.icon-vaultwarden {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 290 60" fill="currentColor"><path d="m166 46-4.2-13q-.4-1.2-1.5-5.6h-.17q-.83 3.6-1.5 5.6l-4.3 13h-4l-6.2-23h3.6q2.2 8.6 3.3 13 1.2 4.5 1.3 6.1h.17q.23-1.2.73-3.1.52-1.9.89-3l4.2-13h3.7l4.1 13q1.2 3.6 1.6 6h.17q.083-.75.44-2.3.37-1.6 4.3-17h3.6l-6.3 23zm29 0-.69-3.2h-.17q-1.7 2.1-3.4 2.9-1.7.75-4.2.75-3.4 0-5.3-1.7-1.9-1.7-1.9-5 0-6.9 11-7.2l3.9-.12v-1.4q0-2.7-1.2-4-1.1-1.3-3.7-1.3-2.8 0-6.4 1.7l-1.1-2.6q1.7-.92 3.7-1.4 2-.52 4-.52 4.1 0 6 1.8 2 1.8 2 5.8v16zm-7.8-2.4q3.2 0 5.1-1.8 1.9-1.8 1.9-4.9v-2.1l-3.5.15q-4.1.15-5.9 1.3-1.8 1.1-1.8 3.5 0 1.9 1.1 2.8 1.1.98 3.2.98zm28-21q1.5 0 2.7.25l-.48 3.2q-1.4-.31-2.5-.31-2.8 0-4.7 2.2-2 2.2-2 5.6v12h-3.5v-23h2.8l.4 4.2h.17q1.3-2.2 3.1-3.4 1.8-1.2 3.9-1.2zm22 20h-.19q-2.4 3.5-7.2 3.5-4.5 0-7-3.1-2.5-3.1-2.5-8.7 0-5.6 2.5-8.8 2.5-3.1 6.9-3.1 4.6 0 7.1 3.4h.27l-.15-1.6-.083-1.6v-9.3h3.5v32h-2.8zm-6.9.58q3.5 0 5.1-1.9 1.6-1.9 1.6-6.2v-.73q0-4.8-1.6-6.9-1.6-2.1-5.1-2.1-3 0-4.7 2.4-1.6 2.3-1.6 6.7 0 4.4 1.6 6.6 1.6 2.2 4.7 2.2zm27 2.9q-5.1 0-8-3.1-2.9-3.1-2.9-8.5 0-5.5 2.7-8.8 2.7-3.2 7.3-3.2 4.3 0 6.8 2.8 2.5 2.8 2.5 7.4v2.2h-16q.1 4 2 6.1 1.9 2.1 5.4 2.1 3.7 0 7.3-1.5v3.1q-1.8.79-3.5 1.1-1.6.35-3.9.35zm-.94-21q-2.7 0-4.4 1.8-1.6 1.8-1.9 4.9h12q0-3.3-1.5-5-1.5-1.7-4.2-1.7zm31 20v-15q0-2.8-1.3-4.2-1.3-1.4-4-1.4-3.6 0-5.2 1.9-1.7 1.9-1.7 6.4v12h-3.5v-23h2.8l.56 3.1h.17q1.1-1.7 3-2.6 1.9-.94 4.3-.94 4.1 0 6.2 2 2.1 2 2.1 6.3v15z"/></svg>');
}

</style> 