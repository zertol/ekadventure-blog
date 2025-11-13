export abstract class SharedRepository {
    protected handleError<T>(error: any): T {
        console.error("Error in SharedRepository:", error);
        throw error;
    }
}