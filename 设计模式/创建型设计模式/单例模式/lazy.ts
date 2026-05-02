// 懒汉单例
class LazySingleton {
  private static instance: LazySingleton | null = null;
  private data: Map<string, any>;

  private constructor() {
    this.data = new Map();
    console.log("🟢 懒汉单例：首次调用时初始化");
  }

  public static getInstance(): LazySingleton {
    if (!LazySingleton.instance) {
      LazySingleton.instance = new LazySingleton();
      // 延迟加载数据
      LazySingleton.instance.loadData();
    }
    return LazySingleton.instance;
  }

  private loadData(): void {
    this.data.set("cache", new Map());
    this.data.set("timestamp", Date.now());
  }

  public get(key: string): any {
    return this.data.get(key);
  }
}

// 线程安全的单例模式
class LazyThreadSafe {
  private static instance: LazyThreadSafe | null = null;
  // 加锁
  private static initPromise: Promise<LazyThreadSafe> | null = null;

  private data: Map<string, any>;

  private constructor() {
    this.data = new Map();
  }

  private static async initialize(): Promise<LazyThreadSafe> {
    // 模拟异步初始化
    await new Promise((resolve) => setTimeout(resolve, 100));
    const newInstance = new LazyThreadSafe();
    LazyThreadSafe.instance = newInstance;
    return newInstance;
  }

  public static async getInstance(): Promise<LazyThreadSafe> {
    // 如果实例已存在，直接返回
    if (LazyThreadSafe.instance) {
      return LazyThreadSafe.instance;
    }

    // 如果没有初始化 Promise，创建一个
    if (!LazyThreadSafe.initPromise) {
      LazyThreadSafe.initPromise = LazyThreadSafe.initialize();
    }

    // 等待初始化完成并返回
    return await LazyThreadSafe.initPromise;
  }
}
