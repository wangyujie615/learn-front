文档：[HTML 参考 - HTML（超文本标记语言） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference)
# 元素(Elements)
元素：简而言之就是html网页标签

## <iframe>
iframe：能够将另一个 HTML 页面嵌入到当前页面中

``` json
属性：
1. allow：指定其权限策略。该策略根据请求的来源规定 `<iframe>` 可以使用哪些特性（例如，访问麦克风、摄像头、电池、web 共享等）。
2. allowfullscreen：设置为 `true` 时，可以通过调用 `<iframe>` 的 ` requestFullscreen() `方法激活全屏模式。
3. allowpaymentrequest：设置为 `true` 时，跨源的 `<iframe>` 就可以调用支付请求API。
4. csp：对嵌入的资源配置内容安全策略
5. height：以 CSS 像素格式指定框架的高度。默认值为 `150`。
6. width：框架的宽度（以 CSS 像素为单位）。默认值是 。`300`
7. loading：表示浏览器应当何时加载 iframe。
	- eager：在页面加载时立即加载 iframe（默认值）。
	- lazy：**推迟 iframe 的加载，直到达到浏览器定义的可视视口的计算距离**。目的是在浏览器确定需要它前，避免占用获取框架所需的网络和存储带宽。这改进了在大多数使用场景中的性能表现，尤其是减少了页面的首次加载时间。
8. name：可定位嵌入的浏览上下文的名称。
9. sandbox：控制应用于嵌入在 `<iframe>` 中的内容的限制。该属性的值可以为空以应用所有限制，也可以为空格分隔的标记以解除特定的限制。
	- allow-downloads：允许通过带有download属性的 `<a>`或 `<area>`元素或者通过导航来下载文件，无论是用户通过点击链接触发，还是在用户没有交互的情况下通过 JS 代码触发。
	- allow-froms：允许页面提交表单。如果没有使用该关键字，表单会正常显示，但是无法校验输入内容、发送数据到 Web 服务器或是关闭对话框。
	- allow-models：允许页面通过`Window.alert()`、`Window.confirm()`、`Window.print()`和 `Window.prompt()`打开模态窗口；无论有无该关键字，打开 `<dialog>`是被允许的。它同样允许页面接收 `BeforeUnloadEvent`事件。
	- allow-orientation-lock：允许资源锁定屏幕方向。
	- allow-popups：允许弹窗。
	- allow-popups-to-escape-sandbox：允许沙箱化的文档打开新的浏览上下文，并且新浏览上下文不会继承沙箱标记。例如，安全地沙箱化一个第三方的广告页面，而不会在广告链接到的新页面中启用相同的限制条件。如果不包含这个标记，重定向的页面、弹出窗口或新标签页将受到与源 `<iframe>` 相同的沙盒限制。
	- allow-same-origin：如果没有使用该关键字，资源将被视为来自一个特殊的源。
	- allow-scripts：允许页面运行脚本（但不能创建弹窗）。如果没有使用该关键字，则不允许该操作。
	- allow-storage-access-by-user-activation：允许 `<iframe>` 中的文档通过储存访问API请求访问非分区 cookie。
10. src：被嵌入的页面的 URL 地址。使用值可以嵌入一个遵从同源策略的空白页。还需要注意的是，在 Firefox（版本 65 及更高版本）、基于 Chromium 的浏览器、Safari/iOS 中使用代码移除 的 src 属性（例如通过 `Element.removeAttribute（）`会导致被载入框架。
11. srcdoc：要嵌入的内联 HTML，会覆盖属性。其内容应遵循完整的 HTML 文档的语法（包含文档类型指令、、 标签等，虽然绝大多数标签可以被省略，仅保留主体内容）。该文档会以 作为其位置。如果浏览器不支持 属性，其会回退到属性的 URL。
```
**内容安全策略CSP：**用于检测并削弱某些特定类型的攻击，包括**跨站脚本XSS**和数据注入攻击等。无论是数据盗取、网站内容污染还是恶意软件分发，这些攻击都是主要的手段。**CSP 通过指定有效域：即浏览器认可的可执行脚本的有效来源——使服务器管理者有能力减少或消除 XSS 攻击所依赖的载体**。一个 CSP 兼容的浏览器将会仅执行从白名单域获取到的脚本文件，忽略所有的其他脚本。

---

**如何配置CSP?**
1. 网络服务器返回 Content-Security-Policy HTTP 标头。
```
HTTP
Content-Security-Policy: policy // 策略（policy）参数是一个包含了各种描述你的 CSP 策略指令的字符
```
2. `<meta>` 元素也可以被用来配置该策略
```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src https://*; child-src 'none';" />
```

**跨站脚本攻击XSS：** XSS攻击利用了浏览器对于从服务器所获取的内容的信任。恶意脚本在受害者的浏览器中得以运行，因为浏览器信任其内容来源，即使有的时候这些脚本并非来自于它本该来的地方。

---

**同源策略：**是一个重要的安全策略，它用于限制一个源的文档或者它加载的脚本如何能与另一个源的资源进行交互。
**源：**两个 URL 的**协议、端口（如果有指定的话）和主机都相同**的话，则这两个 URL 是_同源_的。
**文件源：** 现代浏览器通常将使用 `file:///` 模式加载的文件的来源**视为_不透明的来源_**。这意味着，假如一个文件包括来自同一文件夹的其他文件，它们不会被认为来自同一来源，并可能引发CORS错误。

**跨源资源共享（Cross-Origin Resource Sharing，CORS）**：是一个由一系列传输的 HTTP 标头组成的系统。这些 HTTP 标头决定浏览器是否阻止前端 JavaScript 代码获取跨源请求的响应。由于同源策略默认阻止“跨源”获取资源。但是 CORS 给了 Web 服务器这样的权限，即**服务器可以选择允许跨源请求访问到它们的资源**。

```
cors标头：
- `Access-Control-Allow-Origin`：指示响应的资源是否可以被给定的来源共享。
- `Access-Control-Allow-Credentials`：指示当请求的凭据标记为 true 时，是否可以暴露对该请求的响应给脚本。
- `Access-Control-Allow-Headers`：用在对预检请求的响应中，指示实际的请求中可以使用哪些 HTTP 标头。
- `Access-Control-Allow-Methods`：指定对预检请求的响应中，哪些 HTTP 方法允许访问请求的资源。
- `Access-Control-Expose-Headers`：通过列出标头的名称，指示响应中的哪些标头可以暴露给脚本。
- `Access-Control-Max-Age`：指示预检请求的结果能被缓存多久。
- `Access-Control-Request-Headers`：用于发起一个预检请求，告知服务器正式请求会使用哪些 HTTP 标头。
- `Access-Control-Request-Method`：用于发起一个预检请求，告知服务器正式请求会使用哪一种HTTP 请求方法。
- `Origin`：指示获取资源的请求是从什么源发起的。
- `Timing-Allow-Origin`：指定允许查看通过资源时间 API获取的属性值的来源，否则由于跨源限制，这些属性值会被报告为零。
```

**常见的跨源操作**
- 跨源**写操作**（Cross-origin writes）一般是被允许的。例如链接、重定向以及表单提交。特定少数的 HTTP 请求需要添加预检请求。
- 跨源**资源嵌入**（Cross-origin embedding）一般是被允许的。
- 跨源**读操作**（Cross-origin reads）一般是不被允许的，但常可以通过内嵌资源来巧妙的进行读取访问。例如，你可以读取嵌入图片的高度和宽度，调用内嵌脚本的方法，或得知内嵌资源的可用性。
```
示例：
- 使用 `<script src="…"></script>` 标签嵌入的 JavaScript 脚本。语法错误信息只能被同源脚本中捕捉到。
- 使用 `<link rel="stylesheet" href="…">` 标签嵌入的 CSS。由于 CSS 的松散的语法规则，CSS 的跨源需要一个设置正确的 `Content-Type` 标头。如果样式表是跨源的，且 MIME 类型不正确，资源不以有效的 CSS 结构开始，浏览器会阻止它的加载。
- 通过 `<img>`展示的图片。
- 通过 `<video>`和 `<audio>`播放的多媒体资源。
- 通过 `<object>`和 `<embed>` 嵌入的插件。
- 通过 `@font-face` 引入的字体。一些浏览器允许跨源字体（cross-origin fonts），另一些需要同源字体（same-origin fonts）。
- 通过 `<iframe>`载入的任何资源。站点可以使用 `X-Frame-Options`标头来阻止这种形式的跨源交互。
```

**如何阻止跨源访问**
- 阻止跨源写操作，只要**检测请求中的一个不可推测的令牌（CSRF token）即可**，这个标记被称为跨站请求伪造（CSRF）令牌。你必须使用这个令牌来阻止页面的跨源读操作。
- 阻止资源的跨源读取，需要保证该资源是不可嵌入的。阻止嵌入行为是必须的，因为嵌入资源通常向其暴露信息。
- 阻止跨源嵌入，需要确保你的资源不能通过以上列出的可嵌入资源格式使用。浏览器可能不会遵守 `Content-Type` 头部定义的类型。例如，如果你在 HTML 文档中指定 `<script>` 标记，则浏览器将尝试将标签内部的 HTML 解析为 JavaScript。当资源不是网站的入口点时，还可以使用 CSRF 令牌来防止嵌入。

---

**跨站请求伪造**：是一种强制终端用户的攻击在他们所在的网页应用上执行不需要的操作目前已认证。借助一点社交工程 （例如通过电子邮件或聊天发送链接），攻击者可能会欺骗 Web应用的用户执行攻击者的操作 选择。如果受害者是普通用户，成功的CSRF攻击可以 强制用户执行状态变化请求，如传输 资金、更改邮箱地址等等。如果受害者是 管理账户，CSRF可能会攻破整个网页应用。