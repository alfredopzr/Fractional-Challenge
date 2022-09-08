import { gql, useMutation } from '@apollo/client';
import {React, useState} from 'react'
import Card from '@/components/Card';
import { v4 as uuid } from 'uuid';



const ADD_POST = gql`
  mutation AddPost($input: AddPostInput!){
    addPost(input: $input){
        id
        text
        user_id
    }
}
`;


const AddPostForm = ({posts}) => {
    const [addPost] = useMutation(ADD_POST);

    // Add Post States
    const [postId, setPostId] = useState(0);
    const [text, setText] = useState("");

    return (
        <div>
            <Card className="flex items-center my-4" style={{backgroundColor: "white"}}>      
            <form
            onSubmit={() => {
                // console.log("VALUES", typeof parseInt(postId.value), typeof text.value)
                addPost({ variables: { input: {id: parseInt(postId), text: text, user_id: "1" } } });
            }}
            class="pure-form pure-form-aligned form"
            >
                <fieldset>
                    <div class="pure-control-group">
                        <label for="postId">ID</label>
                        <input
                            
                            id="postId"
                            placeholder="Enter Post ID"
                            onChange={(event) => {
                                setPostId(event.target.value)
                            }}
                        />
                    </div>
                    <div class="pure-control-group">
                        <label for="text">text</label>
                        <input
                            id="text"
                            placeholder="Enter a text"
                            onChange={(event) => {
                                setText(event.target.value)
                            }}
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