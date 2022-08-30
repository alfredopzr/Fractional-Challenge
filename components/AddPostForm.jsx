import { gql, useMutation } from '@apollo/client';
import {React, useState} from 'react'
import Card from '@/components/Card';


const ADD_VIDEO_MUTATION = gql`
    mutation createVideo($title: String!, $url: String!, $userId: String!) {
        createVideo( input: { title: $title, url: $url, userId: $userId } ) {
            id
            title
            url
            author {
                id
                name
            }
        }
    }
`;


const ADD_POST = gql`
  mutation AddPost($id: Int!, $text: String!, $user_id: String!){
    addPost(input: {
        id: $id,
        text: $text,
        user_id: $user_id
    }){
        id
        text
        user_id
    }
}
`;

const AddPostForm = () => {
    let post_id,text,user_id;
    const [addPost] = useMutation(ADD_POST);


    return (
        <div>
            <Card className="flex items-center my-4" style={{backgroundColor: "white"}}>      
            <form
            onSubmit={e => {
                e.preventDefault();
                console.log("VALUES", typeof parseInt(post_id.value), typeof text.value)
                addPost({ variables: { id: parseInt(post_id.value), text: text.value, user_id: "1" } });
            }}
            class="pure-form pure-form-aligned form"
            >
                <fieldset>
                    <div class="pure-control-group">
                        <label for="post_id">ID</label>
                        <input
                            ref={value => post_id = value}
                            id="post_id"
                            placeholder="Enter a ID"
                        />
                    </div>
                    <div class="pure-control-group">
                        <label for="url">text</label>
                        <input
                            ref={value => text = value}
                            id="text"
                            placeholder="Enter a text"
                        />
                    </div>
                    <div class="pure-controls">
                        <button type="submit">Add Post</button>
                    </div>
                </fieldset>
            </form>
            </Card>
      </div>
      

    );
  }

  export default AddPostForm;