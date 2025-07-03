export function errorHandler(err: any, req: any, res: any, next: any): void {
    const status = err.status || 500;
    res.status(status).json({ message: err.message });
}