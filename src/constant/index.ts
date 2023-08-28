import { IUserDetails } from "../types";

export const endpoints:string[] = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/comments',
];

export const defaultLoginData: IUserDetails = {
    email: '',
    password: ''
}

export const validationMessage = {
    email: 'Please enter email address',
    password: 'Password is required',
}