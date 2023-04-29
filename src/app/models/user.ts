export enum Roles {
    Viewer = "viewer",
}

export interface AnonymousUser {
    roles: string[];
}

export interface User {
    _id: number;
    username: string;
    email: string;
    roles: string[];
}