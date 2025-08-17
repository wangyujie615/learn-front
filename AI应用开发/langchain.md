# LangChain

## 操作案例

统一选用通义千问模型进行开发

### 1. 使用langchain进行对话和模板

- 单处理的方式

```javascript
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// 设置 DashScope API Key
process.env.OPENAI_API_KEY = "";

// 使用 Langchain 的 ChatOpenAI 初始化模型
const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    },
    modelName: "qwen-plus"
});
// 主函数：使用 Langchain 调用大模型生成回复
async function main() {
    try {
        // 使用 Langchain 的消息格式
        const messages = [
            // 创建系统消息
            new SystemMessage("You are a helpful assistant."),
            // 创建用户消息
            new HumanMessage("你是谁？"),
        ];
        
        // 调用模型
        const response = await model.invoke(messages);
        console.log(response.content);
    } catch (error) {
        console.error("调用大模型时出错：", error);
    }
}

main()
```

LangChain 还支持通过字符串或[OpenAI 格式](https://js.langchain.com/docs/concepts/messages/#openai-format)输入聊天模型。以下是等效的：

```javascript
await model.invoke("Hello");

await model.invoke([{ role: "user", content: "Hello" }]);

await model.invoke([new HumanMessage("hi!")]);
```

- 批处理的方式：

```javascript
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// 设置 DashScope API Key
process.env.OPENAI_API_KEY = "";

// 使用 Langchain 的 ChatOpenAI 初始化模型
const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    },
    modelName: "qwen-plus"
});
// 主函数：使用 Langchain 调用大模型生成回复
async function main() {
    try {
        // 定义多个消息批次
        const batchMessages = [
            [
                new SystemMessage("You are a helpful assistant."),
                new HumanMessage("你是谁？")
            ],
            [
                new SystemMessage("You are a helpful assistant."),
                new HumanMessage("你叫什么名字？")
            ],
            [
                new SystemMessage("You are a helpful assistant."),
                new HumanMessage("1+1=?")
            ]
        ];
        
        // 批量调用模型
        const responses = await model.batch(batchMessages);
        responses.forEach((response, index) => {
            console.log(`Response ${index + 1}:`, response.content);
        });
    } catch (error) {
        console.error("调用大模型时出错：", error);
    }
}

main()
```

- 流式调用的方式：

```javascript
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// 设置 DashScope API Key
process.env.OPENAI_API_KEY = "";

// 使用 Langchain 的 ChatOpenAI 初始化模型
const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    },
    modelName: "qwen-plus"
});
// 主函数：使用 Langchain 调用大模型生成回复
async function main() {
    try {
        // 定义单个消息
        const messages = [
            new SystemMessage("You are a helpful assistant."),
            new HumanMessage("你是谁？")
        ];
        
        // 流式调用模型
        const stream = await model.stream(messages);
        let fullResponse = "";
        for await (const chunk of stream) {
            fullResponse += chunk.content;
            process.stdout.write(chunk.content);
        }
        console.log("\n完整响应:", fullResponse);
    } catch (error) {
        console.error("调用大模型时出错：", error);
    }
}

main()
```

#### 提示模板

提示模板是 LangChain 中一个旨在协助进行这种转换的概念。它们接收原始用户输入并返回可传递给语言模型的数据（提示）。

在这里创建一个提示模板。它将接受两个用户变量：

- `language`：文本翻译成的语言
- `text`：要翻译的文本

```
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// 定义提示模板
const systemTemplate = "You are a helpful assistant that translates {input_language} to {output_language}.";
const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["user", "{text}"],
]);
// 设置 DashScope API Key
process.env.OPENAI_API_KEY = "";

// 使用 Langchain 的 ChatOpenAI 初始化模型
const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    },
    modelName: "qwen-plus"
});
// 主函数：使用 Langchain 调用大模型生成回复
async function main() {
    try {
        // 使用提示模板生成消息
        const formattedPrompt = await promptTemplate.formatMessages({
            input_language: "English",
            output_language: "Chinese",
            text: "Hello, how are you?"
        });
        
        // 流式调用模型
        const stream = await model.stream(formattedPrompt);
        let fullResponse = "";
        for await (const chunk of stream) {
            fullResponse += chunk.content;
            process.stdout.write(chunk.content);
        }
        console.log("\n完整响应:", fullResponse);
    } catch (error) {
        console.error("调用大模型时出错：", error);
    }
}

main()
```





## Runnable接口

使用链接：https://js.langchain.com/docs/concepts/runnables/

Runnable 方式定义了一个标准接口，允许 Runnable 组件：

- 调用：将**单个输入**转换为输出。
- 批处理：**多个输入**被有效地转换为输出。
- 流式传输：输出在生成时进行**流式传输**。
- 已检查：可以访问有关 Runnable 的输入、输出和配置的示意图信息。
- 组合：可以**组合多个 Runnable**，使用LangChain 表达语言 (LCEL)协同工作，以创建复杂的管道。

### 批处理

LangChain Runnables 提供内置`batch`API，允许您并行处理多个输入。当需要处理多个独立输入时，使用此方法可以显著提高性能，因为处理可以并行进行而不是顺序进行。

- `batch`：并行处理多个输入，按与输入相同的顺序返回结果。

`batch`该方法的默认实现是`invoke`并行执行的。

### 流式API

流式传输对于使基于 LLM 的应用程序对最终用户的响应至关重要。

Runnables 公开以下三个流 API：

1. `stream`：生成 Runnable 时产生输出。
2. `streamEvents`：更高级的流式 API，允许**流式传输中间步骤和最终输出**
3. **legacy** `streamLog`：一个传统的流式 API，用于流式传输中间步骤和最终输出

### 输入输出类型

每个`Runnable`对象都有一个输入和输出类型。这些输入和输出类型可以是任何 TypeScript 对象，由 Runnable 本身定义。

导致 Runnable 执行的 Runnable 方法（例如，`batch`，`stream`，`streamEvents`，`invoke`）适用于这些输入和输出类型。

- `invoke`：接受输入并返回输出。
- `batch`：接受输入列表并返回输出列表。
- `stream`：接受输入并返回产生输出的生成器。

输入输出因组件而不同：

|组件|输入类型|输出类型|
|:-:|:-:|:-:|
|`Prompt`|`object`|`PromptValue`|
|`ChatModel`|`string`，`PromptValue`,消息列表|`ChatMessage`|
|`LLM`|`string`，`PromptValue`,消息列表|`string`|
|`OutputParser`|`LLM`输出或`ChatModel`输出|依赖转换器的类型|
|`Retriever`|`string`|文档列表|
|`Tool`|`string` `object`,取决于选择的插件|取决于选择的插件|

### 可运行的配置

任何用于执行 Runnable 的方法（例如，`invoke`、`batch`、`stream`、`streamEvents`）都接受第二个参数，称为 `RunnableConfig`）。此参数是一个对象，其中包含 Runnable 的配置，该配置将在 Runnable 执行期间使用。

`RunnableConfig`可以定义以下属性：

| 属性             | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| `runName`        | 用于给定 Runnable 的名称（非继承）。                         |
| `runId`          | 此调用的唯一标识符。子调用将获得其自己唯一的运行 ID。        |
| `tags`           | 本次呼叫和任何子呼叫的标签。                                 |
| `metadata`       | 本次呼叫和任何子呼叫的元数据。                               |
| `callbacks`      | 本次调用和任何子调用的回调。                                 |
| `maxConcurrency` | 并行调用的最大数量（例如，按批处理使用）。                   |
| `recursionLimit` | 调用可以递归的最大次数（例如，由返回 Runnable 的 Runnable 使用） |
| `configurable`   | Runnable 的可配置属性的运行时值。                            |

传递`config`方法`invoke`如下：

```javascript
await someRunnable.invoke(someInput, {
  runName: "myRun",
  tags: ["tag1", "tag2"],
  metadata: { key: "value" },
});
```



