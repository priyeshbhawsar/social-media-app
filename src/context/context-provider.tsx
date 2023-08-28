import { createContext, useContext, useState } from 'react';
import { IContextType, IProviderProps, IPost, IComment } from '../types';

const Context = createContext<IContextType | undefined>(undefined);

export const useContextProvider = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useContextProvider must be used in ContextProvider');
    }
    return context;
};

export const ContextProvider: React.FC<IProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [comments, setComments] = useState<IComment[]>([]);

    const addPosts = (posts: IPost[]) => {
        setPosts(posts); //set posts context
    };

    const addComments = (comments: IComment[]) => {
        setComments(comments); //set comments in context
    };

    return (
        <Context.Provider value={{ posts, comments, addPosts, addComments }}>
            {children}
        </Context.Provider>
    );
};
