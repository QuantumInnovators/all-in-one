<template>
  <div class="user-links-container">
    <div class="user-links-header">
      <h2>自定义链接管理</h2>
      <p>添加、编辑或删除您的自定义链接</p>
    </div>

    <div class="add-link-form">
      <h3>添加新链接</h3>
      <div class="form-group">
        <label for="linkName">名称</label>
        <input 
          type="text" 
          id="linkName" 
          v-model="newLink.name" 
          placeholder="链接名称" 
          @click.stop
        />
      </div>
      <div class="form-group">
        <label for="linkUrl">URL</label>
        <input 
          type="text" 
          id="linkUrl" 
          v-model="newLink.url" 
          placeholder="https://example.com" 
          @click.stop
        />
      </div>
      <div class="form-group">
        <label for="linkDesc">描述</label>
        <input 
          type="text" 
          id="linkDesc" 
          v-model="newLink.description" 
          placeholder="简短描述" 
          @click.stop
        />
      </div>
      <div class="form-group">
        <label for="linkIcon">图标</label>
        <select 
          id="linkIcon" 
          v-model="newLink.icon"
          @click.stop
        >
          <option value="browser">浏览器</option>
          <option value="code">代码</option>
          <option value="book">书籍</option>
          <option value="palette">调色板</option>
          <option value="tools">工具</option>
          <option value="github">GitHub</option>
          <option value="image">图片</option>
        </select>
      </div>
      <button class="add-button" @click.prevent="addLink">添加链接</button>
    </div>

    <div class="user-links-list">
      <h3>我的自定义链接</h3>
      <div v-if="userLinks.length === 0" class="no-links">
        <p>您还没有添加任何自定义链接</p>
      </div>
      <div v-else class="links-list">
        <div v-for="(link, index) in userLinks" :key="index" class="link-item">
          <div class="link-item-content">
            <div class="link-icon">
              <NavIcon :name="link.icon" />
            </div>
            <div class="link-details">
              <h4>{{ link.name }}</h4>
              <p>{{ link.description }}</p>
              <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.url }}</a>
            </div>
          </div>
          <button class="delete-button" @click.stop="deleteLink(index)">
            <NavIcon name="x" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavIcon from './Icon.vue';

export default {
  name: 'UserLinks',
  components: {
    NavIcon
  },
  data() {
    return {
      userLinks: [],
      newLink: {
        name: '',
        url: '',
        description: '',
        icon: 'browser'
      }
    };
  },
  mounted() {
    this.loadUserLinks();
  },
  methods: {
    loadUserLinks() {
      const savedLinks = localStorage.getItem('userLinks');
      if (savedLinks) {
        try {
          this.userLinks = JSON.parse(savedLinks);
        } catch (e) {
          console.error('Failed to parse user links:', e);
          this.userLinks = [];
        }
      }
    },
    saveUserLinks() {
      localStorage.setItem('userLinks', JSON.stringify(this.userLinks));
      // 通知父组件链接已更新
      this.$emit('links-updated');
    },
    addLink() {
      // 验证输入
      if (!this.newLink.name || !this.newLink.url) {
        alert('请输入链接名称和URL');
        return;
      }
      
      // 确保URL格式正确
      if (!this.newLink.url.startsWith('http://') && !this.newLink.url.startsWith('https://')) {
        this.newLink.url = 'https://' + this.newLink.url;
      }
      
      // 添加新链接
      this.userLinks.push({
        name: this.newLink.name,
        url: this.newLink.url,
        description: this.newLink.description || '自定义链接',
        icon: this.newLink.icon
      });
      
      // 保存到localStorage
      this.saveUserLinks();
      
      // 重置表单
      this.newLink = {
        name: '',
        url: '',
        description: '',
        icon: 'browser'
      };
    },
    deleteLink(index) {
      if (confirm('确定要删除这个链接吗？')) {
        this.userLinks.splice(index, 1);
        this.saveUserLinks();
      }
    }
  }
}
</script>

<style scoped>
.user-links-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
  z-index: 100;
  position: relative;
}

.user-links-header {
  margin-bottom: 20px;
}

.user-links-header h2 {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.user-links-header p {
  margin: 0;
  color: #7f8c8d;
}

.add-link-form {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.add-link-form h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #2c3e50;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: #fff;
  position: relative;
  z-index: 200;
}

.form-group input:focus, .form-group select:focus {
  outline: 2px solid #3498db;
  border-color: #3498db;
}

.add-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.add-button:hover {
  background-color: #2980b9;
}

.user-links-list h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #2c3e50;
}

.no-links {
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  color: #7f8c8d;
}

.link-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 10px;
}

.link-item-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.link-icon {
  width: 40px;
  height: 40px;
  background-color: #e9ecef;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.link-details h4 {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.link-details p {
  margin: 0 0 5px 0;
  color: #7f8c8d;
  font-size: 14px;
}

.link-details a {
  color: #3498db;
  font-size: 12px;
  text-decoration: none;
}

.link-details a:hover {
  text-decoration: underline;
}

.delete-button {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.delete-button:hover {
  background-color: #f8d7da;
}
</style> 