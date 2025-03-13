<template>
  <div class="nav-container">
    <div class="header">
      <NavLogo />
      <h1>ALL IN ONE</h1>
      <p>收集常用工具和资源的导航页面</p>
      <div class="current-department" v-if="departmentId !== 'all'">
        当前部门: {{ getDepartmentName(departmentId) }}
      </div>
    </div>
    
    <NavSearch @search="handleSearch" />
    
    <div v-if="filteredCategories.length > 0" class="categories">
      <div v-if="userLinks.length > 0" class="category">
        <h2 class="category-title">
          <NavIcon name="browser" />
          我的自定义链接
        </h2>
        <div class="links-grid">
          <a 
            v-for="(link, linkIndex) in filteredUserLinks" 
            :key="`user-${linkIndex}`" 
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
import NavLogo from './NavLogo.vue';
import NavSearch from './NavSearch.vue';
import yaml from 'js-yaml';

export default {
  name: 'NavLinks',
  components: {
    NavIcon,
    NavLogo,
    NavSearch
  },
  props: {
    departmentId: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      allCategories: [],
      userLinks: [],
      searchQuery: '',
      departments: [
        { id: 'all', name: '全部' },
        { id: 'dev', name: '研发部门' },
        { id: 'design', name: '设计部门' },
        { id: 'marketing', name: '市场部门' },
        { id: 'operations', name: '运营部门' }
      ],
      configLoaded: false
    }
  },
  computed: {
    categories() {
      return this.allCategories;
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
    },
    filteredUserLinks() {
      if (!this.searchQuery) {
        return this.userLinks;
      }
      
      const query = this.searchQuery.toLowerCase();
      return this.userLinks.filter(link => 
        link.name.toLowerCase().includes(query) || 
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query)
      );
    }
  },
  mounted() {
    this.loadConfig();
    this.loadDepartments();
    this.loadUserLinks();
  },
  methods: {
    getDepartmentName(id) {
      const dept = this.departments.find(d => d.id === id);
      return dept ? dept.name : id;
    },
    async loadDepartments() {
      try {
        const timestamp = new Date().getTime();
        const response = await fetch(`/config.yml?t=${timestamp}`);
        const yamlText = await response.text();
        
        // 解析YAML
        const config = yaml.load(yamlText);
        
        if (config && config.departments) {
          this.departments = config.departments;
        }
      } catch (error) {
        console.error('加载部门配置失败:', error);
      }
    },
    async loadConfig() {
      try {
        console.log('开始加载配置...');
        const timestamp = new Date().getTime();
        const response = await fetch(`/config.yml?t=${timestamp}`);
        const yamlText = await response.text();
        
        // 解析YAML
        const config = yaml.load(yamlText);
        console.log('加载的配置:', config);
        
        if (!config) {
          throw new Error('配置为空');
        }
        
        let allCategories = [];
        
        // 1. 添加全局类别
        if (config.categories && Array.isArray(config.categories)) {
          allCategories = [...allCategories, ...config.categories];
          console.log('添加全局类别后:', allCategories);
        }
        
        // 2. 根据当前部门添加部门特有类别
        if (this.departmentId === 'all') {
          // 如果是"all"，添加所有部门的类别
          const departmentIds = ['dev', 'design', 'marketing', 'operations'];
          departmentIds.forEach(deptId => {
            if (config[deptId] && config[deptId].categories && Array.isArray(config[deptId].categories)) {
              allCategories = [...allCategories, ...config[deptId].categories];
            }
          });
        } else if (config[this.departmentId] && config[this.departmentId].categories && Array.isArray(config[this.departmentId].categories)) {
          // 添加特定部门的类别
          allCategories = [...allCategories, ...config[this.departmentId].categories];
        }
        
        console.log('最终类别列表:', allCategories);
        this.allCategories = allCategories;
        this.configLoaded = true;
      } catch (error) {
        console.error('加载配置文件失败:', error);
        console.error(error.stack);
        this.loadFallbackData();
      }
    },
    loadFallbackData() {
      console.log('使用备用数据');
      // 备用数据，当配置文件加载失败时使用
      this.allCategories = [
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
        }
      ];
      this.configLoaded = true;
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
    loadUserLinks() {
      const savedLinks = localStorage.getItem('userLinks');
      if (savedLinks) {
        this.userLinks = JSON.parse(savedLinks);
      }
    }
  },
  watch: {
    departmentId() {
      // 当部门变化时，重新加载配置并清空搜索
      this.searchQuery = '';
      this.loadConfig();
    },
    '$route'() {
      // 路由变化时重新加载用户链接
      this.loadUserLinks();
    }
  }
}
</script>

<style scoped>
.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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

.current-department {
  margin-top: 10px;
  padding: 5px 15px;
  background-color: #f0f7ff;
  color: #3498db;
  border-radius: 20px;
  display: inline-block;
  font-weight: 600;
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