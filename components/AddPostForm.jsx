import { gql, useMutation } from '@apollo/client';
import {React, useState} from 'react'
import Card from '@/components/Card';


const ADD_POST = gql`
  mutation AddPost($input: AddPostInput!){
    addPost(input: $input){
        id
        text
        user_id
        source_id
    }
}
`;

const AddPostForm = ({source_id}) => {
    const [addPost] = useMutation(ADD_POST);

    // Add Post States
    const [text, setText] = useState("");
    return (
        <div>
            <Card className="flex justify-items-between my-2" style={{backgroundColor: "white"}}>      
                <form
                onSubmit={() => {
                    addPost({ variables: { input: {text: text, user_id: "1", source_id: source_id} } });
                }}
                >
                        <div className="flex flex-wrap justify-items-between">
                            <div className="flex">
                                <input
                                    id="text"
                                    placeholder="Enter text"
                                    onChange={(event) => {
                                        setText(event.target.value)
                                    }}
                                    className="mr-12"
                                />
                            <div>
                                <button type="submit" 
                                style={{backgroundColor: "lightblue", marginLeft: "100px"}}
                                className="flex items-center p-2 rounded ml-auto"
                                >Add Post</button>
                            </div>
                            </div>
                        </div>
                </form>
            </Card>
      </div>
      

    );
  }

  export default AddPostForm;