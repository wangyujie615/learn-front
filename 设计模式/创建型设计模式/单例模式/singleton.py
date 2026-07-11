

class Singleton:
    # 实例
    _instance = None
    def __init__(self, value):
        self.value = self.value
    
    @classmethod
    def getInstance(cls, value=None):
        if cls._instance is None:
            cls._instance = cls(value)
        return cls._instance
    
    def show(self):
        print(f'Value:{self.value}')