import { ReactNode } from "react";

export interface IUserDetails {
    email: string,
    password: string,
}

export interface IContextType {
    posts: IPost[];
    comments: IComment[];
    addPosts: (posts: IPost[]) => void;
    addComments: (comments: IComment[]) => void;
}

export interface IProviderProps {
    children: ReactNode;
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