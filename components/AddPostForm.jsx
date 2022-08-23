import { gql, useMutation } from '@apollo/client';
import {React, useState} from 'react'
import Card from '@/components/Card';

const ADD_POST = gql`
  mutation AddPost($addPostInput: AddPostInput!){
  addPost(input: $addPostInput){
    id
    text
    user_id
  }
}
`;

function AddPostForm() {
    let input;
    const [addPost, { data, loading, error }] = useMutation(ADD_POST);
  
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            // Problem is likely here
            addPost({ variables: { id: 1, text: input.value, user_id: "1" } });
            input.value = '';
          }}
        >
          <input
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }

  export default AddPostForm;