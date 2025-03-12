<template>
  <div class="search-container">
    <div class="search-box">
      <NavIcon name="search" class="search-icon" />
      <input 
        type="text" 
        class="search-input" 
        placeholder="搜索导航链接..." 
        v-model="searchQuery"
        @input="onSearch"
      />
      <button v-if="searchQuery" class="clear-button" @click="clearSearch">
        <NavIcon name="x" />
      </button>
    </div>
  </div>
</template>

<script>
import NavIcon from './Icon.vue';

export default {
  name: 'NavSearch',
  components: {
    NavIcon
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchQuery);
    },
    clearSearch() {
      this.searchQuery = '';
      this.$emit('search', '');
    }
  }
}
</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 15px;
  color: #7f8c8d;
  font-size: 1.2rem;
}

.search-input {
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: none;
  border-radius: 50px;
  background-color: #f1f3f5;
  font-size: 1rem;
  color: #2c3e50;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 2px 15px rgba(52, 152, 219, 0.2);
  background-color: #fff;
}

.search-input::placeholder {
  color: #95a5a6;
}

.clear-button {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  color: #7f8c8d;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-size: 1rem;
}

.clear-button:hover {
  color: #e74c3c;
}
</style> 