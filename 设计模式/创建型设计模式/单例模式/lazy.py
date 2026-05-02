class EagerSingleton:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            print("饿汉：创建实例（类加载时）")
            cls._instance.value = 0
        return cls._instance
    
    def __init__(self):
        if not self.initialized:
            print("饿汉单例：实例化（类加载时创建）")
            self.value = 0
            self.initialized = True