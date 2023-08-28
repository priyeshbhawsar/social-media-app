export interface IUserDetails {
    email: string,
    password: string,
}

export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface IComment {
    postId: number;
}