<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h3>向 `{{ categoryName }}` 添加新链接</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">名称</label>
          <input id="name" v-model="form.name" type="text" required>
        </div>
        <div class="form-group">
          <label for="url">URL</label>
          <input id="url" v-model="form.url" type="url" required>
        </div>
        <div class="form-group">
          <label for="description">描述</label>
          <input id="description" v-model="form.description" type="text" required>
        </div>
        <div class="form-group">
          <label for="icon">图标</label>
          <input id="icon" v-model="form.icon" type="text" required>
          <small>请输入一个图标名称, 例如: 'link'</small>
        </div>
        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="close">取消</button>
          <button type="submit" class="btn-submit">提交</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddLinkModal',
  props: {
    categoryName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: {
        name: '',
        url: '',
        description: '',
        icon: 'link'
      }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    handleSubmit() {
      this.$emit('save', { ...this.form });
      this.close();
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 25px 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 0.9rem;
  color: #606266;
}

.form-group input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group small {
  font-size: 0.8rem;
  color: #909399;
  margin-top: 4px;
}

.form-actions {
  margin-top: 25px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-cancel, .btn-submit {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-cancel {
  background-color: #f2f2f2;
  border: 1px solid #dcdfe6;
}

.btn-submit {
  background-color: #409eff;
  color: white;
}
</style>
