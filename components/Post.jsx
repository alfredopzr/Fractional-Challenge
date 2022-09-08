import {React, useState} from 'react'
import { gql, useMutation } from '@apollo/client';

const DELETE_POST = gql`
  mutation DeletePost($input: DeletePostInput!){
    deletePost(input: $input){
        id
    }
}
`;

const Post = ({id, name, profile_photo, text}) => {

    const [deletePost] = useMutation(DELETE_POST);
    const [postId, setPostId] = useState(0);

    return (
        <div className="text-md flex-column">
            
            {/* Post Header */}
            <div className="flex justify-content-between font-bold mr-4 w-full pb-2 " >
                
                <div className="flex justify-items-auto pr-6">
                    <img className="h-max w-6 mr-4" src={profile_photo} />
                    <h2>{name}</h2>
                </div>
                <div className="pl-64">
                    <form onSubmit={() => {
                    console.log("VALUES", typeof id, id)
                    deletePost({ variables: { input:{ id: id }} });
                }}>   
                    <button type="submit" >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </form>     
                </div>
            </div>

            {/* Post Content */}
            <div className="flex border-b-2 pb-2 pl-10">
                <p>
                    {text}
                </p>
            </div>
        </div>
    )
}

export default Post;