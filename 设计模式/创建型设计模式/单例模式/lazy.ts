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
      LazySingleton.instance.loadData();
    }
    return LazySingleton.instance;
  }

  private loadData(): void {
    // 延迟加载数据
    this.data.set("cache", new Map());
    this.data.set("timestamp", Date.now());
  }

  public get(key: string): any {
    return this.data.get(key);
  }
}
