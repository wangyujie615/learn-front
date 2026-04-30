// 实现方式：私有构造函数
class Singleton {
  // 保证只有一个实例
  private static instance: Singleton;
  private _value: Number;

  // 1. 私有化构造方法

  private constructor(value: Number) {
    this._value = value;
  }

  // 2. 编写类方法 全局访问方法

  public static getInstance(value: Number): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(value ?? 0);
    }
    return Singleton.instance;
  }

  public get value(): Number {
    return this._value;
  }

  public set value(val: Number) {
    this._value = val;
  }

  public show(): void {
    console.log(`Value:${this._value}`);
  }
}
