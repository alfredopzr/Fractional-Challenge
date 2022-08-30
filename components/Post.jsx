import React from 'react'
import { gql, useMutation } from '@apollo/client';

const DELETE_POST = gql`
  mutation DeletePost($id: Int!){
    deletePost(input: {
        id: $id
    }){
        id
    }
}
`;

const Post = ({id, name, profile_photo, text}) => {

    const [deletePost] = useMutation(DELETE_POST);

    return (
        <div className="text-md flex-column">
            <form onSubmit={e => {
                e.preventDefault();
                console.log("VALUES", typeof id, id)
                deletePost({ variables: { id: id} });
            }}>
            <button type="submit">Delete Post</button>
            </form>
            {/* Post Header */}
            <div className="flex justify-content-between font-bold mr-4 w-full pb-2 " >
                
                <div className="flex justify-items-auto pr-6">
                    <img className="h-max w-6 mr-4" src={profile_photo} />
                    <h2>{name}</h2>
                </div>
                <div className="pl-64">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>      
                </div>
            </div>

            {/* Post Content */}
            <div className="flex border-b-2 pb-2 pl-10">
                <p>
                    {text}
                </p>
            </div>

            {/* Comment Section */}
            <div>
                <div className="pt-4 flex">
                    <input 
                        type="text"
                        placeholder="Add Comment"
                        style={{width: '100%', height: '95%'}}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg> 
                </div>
            </div>
        </div>
    )
}

export default Post;