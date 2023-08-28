import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { IComment, IPost } from '../../types';
import { endpoints } from '../../constant';

import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';

const Dashboard: React.FC = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [comments, setComments] = useState<IComment[]>([]);

    useEffect(() => {
        getPost(endpoints);
    }, []);

    const getPost = async (api: string[]) => {
        await axios.all(api.map((endpoint) => axios.get(endpoint))).then(
            axios.spread(({ data: posts }, { data: comments }) => {
                setPosts(posts);
                setComments(comments);
            })
        ).catch(error => {
            console.error('Error fetching data:', error);
        })
    }

    const itemsPerPage = 10; // Number of items per page
    const totalPages = Math.ceil(posts.length / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(1);

    const handleClick = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const startIdx = (currentPage - 1) * itemsPerPage;

    const postData = posts.slice(startIdx, startIdx + itemsPerPage);

    const commentsCount = (id: number) => {
        return comments.filter((item: { postId: number; }) => item.postId === id).length;
    }

    const handleSignOut = () => {
        const storedUserData = localStorage.getItem('userDetails');

        if (storedUserData) {
            localStorage.removeItem('userDetails');
        }
    }

    return (
        <div>
            <div className="topnav">
                <Link className="active" to="/">Home</Link>
                <div className="topnav-right">
                    <Link to="/" onClick={handleSignOut}>SignOut</Link>
                </div>
            </div>
            <h1>Welcome to Dashboard</h1>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>title</th>
                            <th>body</th>
                            <th>comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postData.map((post: IPost) => {
                            return (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.body}</td>
                                    <td>{commentsCount(post.id)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Pagination className='page'>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item
                            key={index}
                            active={index + 1 === currentPage}
                            onClick={() => handleClick(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </div >
    )
}

export default Dashboard