<template>
  <div id="app">
    <button class="toggle-nav" @click="toggleNav">
      <NavIcon :name="isNavVisible ? 'x' : 'browser'" />
    </button>
    <button class="toggle-manage" @click="toggleManage">
      <NavIcon :name="isManageVisible ? 'tools' : 'tools'" />
    </button>
    <SideNav 
      v-show="isNavVisible" 
      :currentDepartment="currentDepartment"
      :departments="departments"
      @department-change="handleDepartmentChange" 
    />
    <div class="main-content" :class="{ 'nav-hidden': !isNavVisible }">
      <router-view :key="linkRefreshKey" />
    </div>
    
    <LinkModal 
      :show="isManageVisible" 
      @close="isManageVisible = false"
      @links-updated="refreshLinks"
    />
  </div>
</template>

<script>
import SideNav from './components/SideNav.vue'
import NavIcon from './components/Icon.vue'
import LinkModal from './components/LinkModal.vue'
import yaml from 'js-yaml'

export default {
  name: 'App',
  components: {
    SideNav,
    NavIcon,
    LinkModal
  },
  data() {
    return {
      isNavVisible: true,
      isManageVisible: false,
      linkRefreshKey: 0,
      departments: [
        { id: 'all', name: '全部', icon: 'browser' },
        { id: 'dev', name: '研发部门', icon: 'code' },
        { id: 'design', name: '设计部门', icon: 'palette' },
        { id: 'marketing', name: '市场部门', icon: 'book' },
        { id: 'operations', name: '运营部门', icon: 'tools' }
      ]
    }
  },
  computed: {
    currentDepartment() {
      const route = this.$route;
      if (route.name === 'Department' && route.params.id) {
        return route.params.id;
      }
      return 'all';
    }
  },
  methods: {
    handleDepartmentChange(deptId) {
      if (deptId === 'all') {
        this.$router.push('/');
      } else {
        this.$router.push(`/department/${deptId}`);
      }
    },
    toggleNav() {
      this.isNavVisible = !this.isNavVisible;
    },
    toggleManage(event) {
      if (event) {
        event.stopPropagation();
      }
      this.isManageVisible = !this.isManageVisible;
    },
    refreshLinks() {
      this.linkRefreshKey += 1;
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
    }
  },
  mounted() {
    this.loadDepartments();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Nunito', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
  color: #2c3e50;
}

#app {
  width: 100%;
  min-height: 100vh;
  display: flex;
}

.toggle-nav {
  position: fixed;
  left: 20px;
  top: 20px;
  z-index: 1000;
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.toggle-nav:hover {
  background: #f8f9fa;
  transform: scale(1.05);
}

.toggle-nav .icon {
  font-size: 1.2rem;
  color: #2c3e50;
}

.toggle-manage {
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 1000;
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.toggle-manage:hover {
  background: #f8f9fa;
  transform: scale(1.05);
}

.main-content {
  flex: 1;
  margin-left: 220px;
  transition: margin-left 0.3s ease;
}

.main-content.nav-hidden {
  margin-left: 0;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 全局过渡效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 60px;
  }
  
  .main-content.nav-hidden {
    margin-left: 0;
  }
  
  .toggle-nav {
    left: 10px;
    top: 10px;
  }
}

/* 确保输入框在最上层 */
input, select, textarea {
  position: relative;
  z-index: 2000;
}
</style>
