<template>
  <div class="nav-container">
    <div class="env-switcher">
      <a v-if="isQaView" href="/">
        <NavIcon name="arrow-left" />主页
      </a>
      <a v-else href="/qa">
        <NavIcon name="arrow-left" />QA专用
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
          {{ category.name }}
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
  </div>
</template>

<script>
import NavIcon from './Icon.vue';
import NavSearch from './NavSearch.vue';
import yaml from 'js-yaml';

export default {
  name: 'NavLinks',
  components: {
    NavIcon,
    NavSearch
  },
  data() {
    return {
      categories: [],
      searchQuery: '',
      loading: true,  // 添加加载状态
      error: null    // 添加错误状态
    }
  },
  computed: {
    isQaView() {
      return window.location.pathname.startsWith('/qa');
    },
    filteredCategories() {
      if (!this.searchQuery) {
        // 如果没有搜索查询，返回所有类别和链接
        return this.categories.map(category => ({
          ...category,
          filteredLinks: category.links
        }));
      }
      
      // 过滤链接和类别
      const query = this.searchQuery.toLowerCase();
      const filtered = this.categories
        .map(category => {
          // 过滤每个类别中的链接
          const filteredLinks = category.links.filter(link => 
            link.name.toLowerCase().includes(query) || 
            link.description.toLowerCase().includes(query) ||
            link.url.toLowerCase().includes(query)
          );
          
          // 返回包含过滤后链接的类别
          return {
            ...category,
            filteredLinks
          };
        })
        .filter(category => category.filteredLinks.length > 0); // 只保留有匹配链接的类别
      
      return filtered;
    }
  },
  mounted() {
    this.loadConfig();
  },
  methods: {
    async loadConfig() {
      // 重置状态
      this.loading = true;
      this.error = null;
      
      try {
        // 根据URL路径决定加载哪个配置文件
        const isQa = window.location.pathname.startsWith('/qa');
        const configFile = isQa ? 'config.qa.yml' : 'config.dev.yml';
        
        // 添加时间戳防止浏览器缓存
        const timestamp = new Date().getTime();
        const response = await fetch(`/${configFile}?t=${timestamp}`);
        
        // 检查响应状态
        if (!response.ok) {
          throw new Error(`配置文件加载失败: ${response.status} ${response.statusText}`);
        }
        
        const yamlText = await response.text();
        
        // 使用js-yaml解析YAML文本
        const config = yaml.load(yamlText);
        
        // 更新数据
        if (config && config.categories) {
          this.categories = config.categories;
        } else {
          throw new Error('配置文件格式不正确或为空');
        }
      } catch (error) {
        console.error('加载配置文件失败:', error);
        this.error = error.message;
        // 加载失败时使用备用数据
        this.loadFallbackData();
      } finally {
        // 无论成功还是失败，都结束加载状态
        this.loading = false;
      }
    },
    loadFallbackData() {
      // 备用数据，当配置文件加载失败时使用
      this.categories = [
        {
          name: '开发工具',
          icon: 'code',
          links: [
            {
              name: 'GitHub',
              url: 'https://github.com',
              description: '代码托管平台',
              icon: 'github'
            },
            {
              name: 'Stack Overflow',
              url: 'https://stackoverflow.com',
              description: '程序员问答社区',
              icon: 'stack-overflow'
            },
            {
              name: 'VSCode',
              url: 'https://code.visualstudio.com',
              description: '代码编辑器',
              icon: 'code'
            }
          ]
        },
        {
          name: '设计资源',
          icon: 'palette',
          links: [
            {
              name: 'Figma',
              url: 'https://figma.com',
              description: '在线设计工具',
              icon: 'figma'
            },
            {
              name: 'Dribbble',
              url: 'https://dribbble.com',
              description: '设计灵感',
              icon: 'dribbble'
            },
            {
              name: 'Unsplash',
              url: 'https://unsplash.com',
              description: '免费高质量图片',
              icon: 'image'
            }
          ]
        },
        {
          name: '学习资源',
          icon: 'book',
          links: [
            {
              name: 'MDN Web Docs',
              url: 'https://developer.mozilla.org',
              description: 'Web开发文档',
              icon: 'book'
            },
            {
              name: 'Vue.js文档',
              url: 'https://vuejs.org',
              description: 'Vue.js官方文档',
              icon: 'vue'
            },
            {
              name: 'freeCodeCamp',
              url: 'https://www.freecodecamp.org',
              description: '免费学习编程',
              icon: 'code'
            }
          ]
        },
        {
          name: '实用工具',
          icon: 'tools',
          links: [
            {
              name: 'JSON格式化',
              url: 'https://jsonformatter.curiousconcept.com',
              description: 'JSON在线格式化工具',
              icon: 'code-json'
            },
            {
              name: 'Can I Use',
              url: 'https://caniuse.com',
              description: '浏览器兼容性查询',
              icon: 'browser'
            },
            {
              name: 'Regex101',
              url: 'https://regex101.com',
              description: '正则表达式测试',
              icon: 'code-braces'
            }
          ]
        }
      ];
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

.no-results {
  text-align: center;
  padding: 60px 0;
  color: #7f8c8d;
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #bdc3c7;
}

.no-results h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #2c3e50;
}

.no-results p {
  font-size: 1rem;
}

/* 加载状态样式 */
.loading {
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

/* 错误状态样式 */
.error {
  text-align: center;
  padding: 60px 0;
  color: #7f8c8d;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #e74c3c;
}

.error h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #2c3e50;
}

.error p {
  font-size: 1rem;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
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
}
</style> 