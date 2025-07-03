export function validator(schema: any) {
    return (req: any, res: any, next: any): void => {
        // TODO: validate req.body against schema
        next();
    };
}
