import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { IComment, IPost } from '../../types';
import { useContextProvider } from '../../context/context-provider';

import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';

//dashboard page
const Dashboard: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1); //set the current page for pagination
    const { posts, comments } = useContextProvider(); // get posts and comments from context

    const itemsPerPage = 10; // Number of items per page
    const totalPages = Math.ceil(posts.length / itemsPerPage); // Number of pages for pagination

    const handleClick = (newPage: number) => { // function to set the page for pagination
        setCurrentPage(newPage);
    };

    const startIdx = (currentPage - 1) * itemsPerPage;

    const postData = posts.slice(startIdx, startIdx + itemsPerPage);

    const commentsCount = (id: number) => {
        return comments.filter((item: IComment) => item.postId === id).length; //calcuate comments count
    }

    const handleSignOut = () => {
        const storedUserData = localStorage.getItem('userDetails');

        if (storedUserData) {
            localStorage.removeItem('userDetails'); //signout the user from dashboard page
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