// 饿汉单例：重要特点,导入时，实例就创造成功了
class EagerSingleton {
  private static instance: EagerSingleton = new EagerSingleton();
  private data: Map<string, any>;

  private constructor() {
    this.data = new Map();
    this.loadData();
  }

  private loadData(): void {
    // 假设从文件加载配置
    this.data.set("apiUrl", "https://api.example.com");
    this.data.set("timeout", 5000);
    this.data.set("retryCount", 3);
  }

  public static getInstance(): EagerSingleton {
    return EagerSingleton.instance;
  }

  public get(key: string): any {
    return this.data.get(key);
  }
}
