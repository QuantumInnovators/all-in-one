<template>
  <div class="side-nav">
    <div class="side-nav-header">
      <h3>部门导航</h3>
    </div>
    <ul class="department-list">
      <li 
        v-for="dept in departments" 
        :key="dept.id"
        :class="{ active: currentDepartment === dept.id }"
        @click="selectDepartment(dept.id)"
      >
        <NavIcon :name="dept.icon" />
        <span>{{ dept.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import NavIcon from './Icon.vue';

export default {
  name: 'SideNav',
  components: {
    NavIcon
  },
  props: {
    currentDepartment: {
      type: String,
      default: 'all'
    },
    departments: {
      type: Array,
      default: () => [
        { id: 'all', name: '全部', icon: 'browser' },
        { id: 'dev', name: '研发部门', icon: 'code' },
        { id: 'design', name: '设计部门', icon: 'palette' },
        { id: 'marketing', name: '市场部门', icon: 'book' },
        { id: 'operations', name: '运营部门', icon: 'tools' }
      ]
    }
  },
  methods: {
    selectDepartment(deptId) {
      this.$emit('department-change', deptId);
    }
  }
}
</script>

<style scoped>
.side-nav {
  width: 220px;
  background-color: #fff;
  border-right: 1px solid #eee;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  z-index: 999;
}

.side-nav-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.side-nav-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.department-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.department-list li {
  padding: 15px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #7f8c8d;
}

.department-list li:hover {
  background-color: #f8f9fa;
  color: #3498db;
}

.department-list li.active {
  background-color: #f0f7ff;
  color: #3498db;
  border-left: 3px solid #3498db;
}

.department-list li .icon {
  margin-right: 10px;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .side-nav {
    width: 60px;
  }
  
  .side-nav-header {
    display: none;
  }
  
  .department-list li span {
    display: none;
  }
  
  .department-list li {
    justify-content: center;
    padding: 15px 0;
  }
  
  .department-list li .icon {
    margin-right: 0;
    font-size: 1.3rem;
  }
}
</style> 