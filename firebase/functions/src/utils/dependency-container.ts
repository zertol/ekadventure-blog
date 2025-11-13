export class DependencyContainer {
    private static instances = new Map<string, any>();

    static register<T>(key: string, instance: T) {
        this.instances.set(key, instance);
    }

    static resolve<T>(key: string): T {
        const instance = this.instances.get(key);
        if (!instance) {
            throw new Error(`Dependency '${key}' not found in container.`);
        }
        return instance as T;
    }
}