<template>
  <div class="nav-container">
    <div class="env-switcher">
      <a v-if="isQaView" href="/">
        <NavIcon name="arrow-left" /> 返回开发
      </a>
      <a v-else href="/qa">
        <NavIcon name="code-branch" /> 进入测试
      </a>
    </div>

    <div class="header">
      <NavLogo />
      <h1>ALL IN ONE</h1>
      <p>收集常用工具和资源的导航页面</p>
    </div>
    
    <NavSearch @search="handleSearch" />
    
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>正在加载配置...</p>
    </div>
    
    <!-- 错误状态 -->
    <div v-else-if="error" class="error">
      <div class="error-icon">
        <NavIcon name="x" />
      </div>
      <h3>加载失败</h3>
      <p>{{ error }}</p>
    </div>
    
    <!-- 内容显示 -->
    <div v-else-if="filteredCategories.length > 0" class="categories">
      <div v-for="(category, index) in filteredCategories" :key="index" class="category">
        <h2 class="category-title">
          <NavIcon :name="category.icon" />
          <span>{{ category.name }}</span>
          <button class="add-link-btn" @click="openAddModal(category.name)">+</button>
        </h2>
        <div class="links-grid">
          <a 
            v-for="(link, linkIndex) in category.filteredLinks" 
            :key="linkIndex" 
            :href="link.url" 
            target="_blank" 
            rel="noopener noreferrer"
            class="link-card"
          >
            <div class="link-icon">
              <NavIcon :name="link.icon" />
            </div>
            <div class="link-info">
              <h3>{{ link.name }}</h3>
              <p>{{ link.description }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
    
    <!-- 空结果状态 -->
    <div v-else class="no-results">
      <div class="no-results-icon">
        <NavIcon name="search" />
      </div>
      <h3>没有找到匹配的结果</h3>
      <p>尝试使用不同的关键词搜索</p>
    </div>

    <!-- 添加链接的弹窗 -->
    <AddLinkModal 
      v-if="isModalOpen"
      :category-name="selectedCategory"
      @close="closeAddModal"
      @save="handleAddNewLink"
    />
  </div>
</template>

<script>
import NavIcon from './Icon.vue';
import NavSearch from './NavSearch.vue';
import AddLinkModal from './AddLinkModal.vue'; // 引入新组件

export default {
  name: 'NavLinks',
  components: {
    NavIcon,
    NavSearch,
    AddLinkModal // 注册新组件
  },
  data() {
    return {
      categories: [],
      searchQuery: '',
      loading: true,
      error: null,
      isModalOpen: false,
      selectedCategory: ''
    }
  },
  computed: {
    isQaView() {
      return window.location.pathname.startsWith('/qa');
    },
    env() {
      return this.isQaView ? 'qa' : 'dev';
    },
    filteredCategories() {
      if (!this.searchQuery) {
        return this.categories.map(category => ({
          ...category,
          filteredLinks: category.links
        }));
      }
      
      const query = this.searchQuery.toLowerCase();
      return this.categories
        .map(category => {
          const filteredLinks = category.links.filter(link => 
            link.name.toLowerCase().includes(query) || 
            link.description.toLowerCase().includes(query) ||
            link.url.toLowerCase().includes(query)
          );
          return { ...category, filteredLinks };
        })
        .filter(category => category.filteredLinks.length > 0);
    }
  },
  mounted() {
    this.loadConfig();
  },
  methods: {
    async loadConfig() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`/api/config?env=${this.env}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `配置文件加载失败: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.categories) {
          this.categories = data.categories;
        } else {
          throw new Error('配置文件格式不正确或为空');
        }
      } catch (error) {
        console.error('加载配置文件失败:', error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    openAddModal(categoryName) {
      this.selectedCategory = categoryName;
      this.isModalOpen = true;
    },
    closeAddModal() {
      this.isModalOpen = false;
      this.selectedCategory = '';
    },
    async handleAddNewLink(link) {
      try {
        const response = await fetch('/api/config', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            env: this.env,
            categoryName: this.selectedCategory,
            link: link
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || '添加链接失败');
        }
        // 添加成功后，重新加载配置以显示新链接
        await this.loadConfig();
      } catch (error) {
        console.error('添加新链接失败:', error);
        alert(`错误: ${error.message}`); // 简单地用alert提示错误
      }
    },
    handleSearch(query) {
      this.searchQuery = query;
    }
  }
}
</script>

<style scoped>
.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
}

.env-switcher a {
  position: absolute;
  top: 25px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: #f0f4f8;
  border: 1px solid #dcdfe6;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #606266;
  text-decoration: none;
  transition: all 0.2s ease;
}

.env-switcher a:hover {
  background-color: #e4e8f0;
  border-color: #c0c4cc;
  color: #303133;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-weight: 800;
  letter-spacing: 1px;
}

.header p {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin: 0;
}

.categories {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.category-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #2c3e50;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.add-link-btn {
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 1.2rem;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.2s;
}

.add-link-btn:hover {
  background-color: #66b1ff;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.link-card {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.link-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.link-icon {
  width: 50px;
  height: 50px;
  background-color: #e9ecef;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 1.5rem;
}

.link-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.link-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.no-results, .loading, .error {
  text-align: center;
  padding: 60px 0;
  color: #7f8c8d;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 3px solid rgba(127, 140, 141, 0.2);
  border-top: 3px solid #7f8c8d;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-icon, .no-results-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}
.error-icon { color: #e74c3c; }
.no-results-icon { color: #bdc3c7; }

.error h3, .no-results h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .links-grid {
    grid-template-columns: 1fr;
  }
  .header h1 {
    font-size: 2rem;
  }
  .header p {
    font-size: 1rem;
  }
  .env-switcher a {
    top: 15px;
    right: 15px;
    padding: 4px 8px;
    font-size: 0.75rem;
  }
}
</style>