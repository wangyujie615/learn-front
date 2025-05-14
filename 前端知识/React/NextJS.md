# NextJS
Next.js 是一个用于构建全栈 Web 应用程序的 React 框架。您可以使用 React 组件构建用户界面，并使用 Next.js 实现附加功能和优化。

## 服务端渲染(SSR)和客户端渲染(CSR)

### 服务端渲染(SSR)

服务端渲染：HTML页面在服务器端完成数据的加载和组装，客户端直接请求的是一个组装完成的HTML模板；

优点：

- 首屏加载速度快
- 利于SEO

缺点：

- 服务器压力大
- 响应速度依赖于网络环境

### 客户端渲染(CSR)

客户端渲染（CSR，Client-Side Rendering）是指**服务器返回一个基本的 HTML 页面，所有页面内容通过 JavaScript 在浏览器中动态加载和渲染**。  一般的SPA应用都是通过这种方式来进行构建。

优点：

- 前后端分离

缺点：

- 首屏加载速度慢
- 不利于SEO
- 首次包加载体积大

#### SPA应用

SPA（Single Page Application，单页应用）是一种网页应用架构，特点是在**单个 HTML 页面中动态更新内容**，无需每次用户操作都重新加载整个页面。常见的技术框架包括 React、Vue、Angular 等。(路由切换页面是在客户端更新对应的代码，CSR方式进行渲染)

##### SPA 的工作机制

1. 浏览器首次加载：

- - 加载一个基本的 `index.html`
  - 加载所有必要的 JS/CSS 资源（或按需加载）

2. 后续页面更新：

- - 通过前端路由（如 React Router、Vue Router）在浏览器中“切换”页面
  - 实际是拦截 URL 跳转，在客户端更新视图，不再向服务器请求完整 HTML

##### 优点

1. **页面切换快，用户体验流畅**
   页面之间跳转无需重新加载资源，只更新局部内容，响应迅速。
2. **前后端职责清晰**
   前端处理视图与交互，后端提供数据接口（通常是 RESTful 或 GraphQL API）。
3. **更好的开发体验与可维护性**
   支持模块化开发、组件复用、状态管理、工具链完整（如 Vite、Webpack）。
4. **易于构建 PWA、移动端 Web 应用**
   可离线访问、支持缓存与推送通知等高级特性。

##### 缺点

1. **首屏加载慢**
   首次访问要加载大量 JS 文件，未优化时首屏会有明显“白屏”。
2. **SEO 支持弱**
   页面内容需由 JS 动态生成，对搜索引擎爬虫不友好（除非采用 SSR/预渲染等手段优化）。
3. **前端负担大**
   状态管理、路由控制、权限校验等都需在前端处理，复杂度上升。
4. **浏览器兼容性问题**
   部分老旧浏览器不支持 SPA 所依赖的特性（如 HTML5 History API）。

##### 典型应用场景

- 后台管理系统（如 CMS、ERP、数据仪表盘）
- 高交互性平台（如邮件客户端、社交网络、图表系统）
- 基于 API 的前端页面（适合与微服务架构结合）

### SSG静态站点生成

静态生成（SSG，Static Site Generation）是一种在**构建时（Build Time）**将页面内容渲染为静态 HTML 文件的技术。构建后的 HTML 文件直接部署在 CDN 或 Web 服务器上，用户请求时不需要服务器计算即可快速响应。这种方式兼具高性能和低成本，常用于博客、文档站点、电商产品页等内容相对稳定的场景。  

优点：

- 性能高
- 利于SEO
- 服务器压力小、可高度缓存  
- 高可用性
- 安全性高

缺点：

- **不适合频繁变动的数据**
  每次内容变更都需要重新构建，发布流程相对繁琐；不适用于高度动态的页面（如用户个性化推荐、评论区等）。  
- **构建时间随内容数量增长**
  页面多时构建时间会变长，尤其是大型站点；有些框架（如 Next.js）支持增量静态生成（ISR）以优化这一点。  

场景：

- 博客、技术文档（如使用 Hugo、Jekyll、Next.js 的静态模式）
- 公司官网、营销页
- 产品详情页（结合 ISR 可适应频繁更新）
- 文档型或展示型站点

### 混合方案

NextJS：支持混合方案的React框架

SSR+SPA：即对于首屏进行SSR,后序操作交给CSR进行SPA

## 项目结构



## 导学项目

1. 创建项目

```
npm install -g pnpm // 设置pnpm作为你的包管理器
npx create-next-app@latest nextjs-dashboard // 创建项目
npm i //安装项目需要的包
npm dev //启动开发服务器
```

2. 项目结构

```
- app:包含应用程序的所有路由、组件和逻辑。主要编写代码的地方
  - lib:包含应用程序中使用的函数
    - placeholder.ts:文件中的每个 JavaScript 对象都代表数据库中的一个表。
    - definitions.ts:定义了数据库返回的类型。
  - query
  - seed
  - ui:包含你应用的说有UI组件
  - layout.tsx
  - page.tsx
- public
- next.config.ts:nextjs配置文件
- package.json
- tailwind.config.ts:tailwind配置文件
- tsconfig.json
```

注意：可以利用Prisma可以根据数据库自动生成模型。

### CSS样式

1. 全局样式：/app/ui中包含一个`global.css`，可以使用此文件向所有的路由添加CSS规则。通过`/app/layout.tsx`并导入`global.css`文件将全局样式导入应用程序
2. CSS模块：自动创建唯一的类名将 CSS 范围限定到组件，因此您不必担心样式冲突。为CSS单独创建使用
3. 使用`clsx`库切换类名

```
import clsx from 'clsx';
 
export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
    // ...
)}
```

### 字体

Next.js 会自动优化应用程序中的字体`next/font`。它会在构建时下载字体文件，**并将其与您的其他静态资源一起托管**。这意味着当用户访问您的应用程序时，不会产生任何会影响性能的字体网络请求。

#### 添加主要的字体

在/app/ui中创建字体配置文件，在`layout.tsx`中进行字体的全局配置

```
import { Inter } from 'next/font/google';
 
export const inter = Inter({ subsets: ['latin'] });
```

```
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

### 图像

Next.js 可以在顶级文件夹下提供**静态资源**[`/public`](https://nextjs.org/docs/app/building-your-application/optimizing/static-assets)（例如图片） 。这些文件`/public`可以在你的应用程序中引用。

#### 组件<Image>

该`<Image>`组件是HTML标签的扩展`<img>`，并带有自动图像优化功能，例如：

- 加载图像时自动防止布局偏移。
- 调整图像大小以避免将大图像传送到视口较小的设备。
- 默认情况下延迟加载图像（图像进入视口时加载）。
- 提供现代格式的图像，例如[WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#webp)和[AVIF](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#avif_image)，当浏览器支持时。

### 创建布局和页面

#### 嵌套路由

Next.js 使用文件系统路由，其中**文件夹**用于创建嵌套路由。每个文件夹代表一个映射到**URL 段的**路由段。

![image-20250512230244329](D:\面试\learn-front\前端知识\img\image-20250512230244329.png)