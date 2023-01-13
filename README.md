# thinkfon-erp-vite

## 01. 项目初始化

https://cn.vuejs.org/

## 02. 引入vue-router

### 2.1 引入依赖

```bash
npm install vue-router@4
```

### 2.2 配置

- 新建 router/index.ts
  ```typescript
  import { createRouter, createWebHashHistory } from 'vue-router'
  const routes = [
    {
      path: '/login',
      component: () => import('@/views/LoginPage.vue'),
      hidden: true,
    },
  ]
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })
  export default router
  ```
- 修改main.ts

```diff
import { createApp } from 'vue'
import App from './App.vue'
+ import router from './router'

import './assets/main.css'

createApp(App)
+ .use(router)
.mount('#app')

```

