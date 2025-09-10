<template>
  <div class="search-container">
    <div class="search-box">
      <NavIcon name="fas fa-search" class="search-icon" />
      <input 
        type="text" 
        class="search-input" 
        placeholder="搜索导航链接..." 
        v-model="searchQuery"
        @input="onSearch"
      />
      <button v-if="searchQuery" class="clear-button" @click="clearSearch">
        <NavIcon name="fas fa-xmark" />
      </button>
    </div>
  </div>
</template>

<script>
import NavIcon from './Icon.vue';

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default {
  name: 'NavSearch',
  components: {
    NavIcon
  },
  data() {
    return {
      searchQuery: '',
      // 创建防抖版本的搜索函数，延迟300ms
      debouncedSearch: null
    }
  },
  mounted() {
    // 初始化防抖函数
    this.debouncedSearch = debounce(this.emitSearch, 300);
  },
  methods: {
    onSearch() {
      // 使用防抖函数处理搜索
      this.debouncedSearch(this.searchQuery);
    },
    emitSearch(query) {
      // 实际触发搜索事件
      this.$emit('search', query);
    },
    clearSearch() {
      this.searchQuery = '';
      // 立即触发清空搜索
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