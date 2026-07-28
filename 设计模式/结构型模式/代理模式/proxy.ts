interface Subject {
    request(): void;
}

class RealSubject implements Subject {
    request(): void {
        console.log("🟢 RealSubject: Handling request.");
    }   
}

class ProxySubject implements Subject {
    private realSubject: Subject;

    constructor(realSubject: Subject) {
        this.realSubject = realSubject;
        console.log("🟢 Proxy: Initialized.");
    }

    request(): void {
        if (this.checkAccess()) {
            this.realSubject.request();
            this.logAccess();
        }
    }

    private checkAccess(): boolean {
        // Some real checks should go here.
        console.log('Proxy: Checking access prior to firing a real request.');

        return true;
    }

    private logAccess(): void {
        console.log('Proxy: Logging the time of request.');
    }
}

function clientCode(subject: Subject) {
    // ...

    subject.request();

    // ...
}

console.log('Client: Executing the client code with a real subject:');
const realSubject = new RealSubject();
clientCode(realSubject);

console.log('');

console.log('Client: Executing the same client code with a proxy:');
const proxy = new ProxySubject(realSubject);
clientCode(proxy);