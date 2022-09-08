import { get, query, db } from '@/server/db';
import postcss from 'postcss';
import { post } from '../Query';

// Add Post Working
export const addPost = async (_, {input} ) => {
    try {
        const post = input;
        const postQuery = await query(
            `
            INSERT INTO posts (text, user_id) 
            VALUES (?, ?);
            `,
                [input.text, input.user_id]
        );
        return post;

    } catch (e) {
        console.log(e);
    }

};

// Delete working
export const deletePost = async (_, {input} ) => {
    try{

        const post = input;
        const deleteQuery = await query(
            `
            DELETE FROM posts WHERE id = ?
            `,
                [input.id]
        );
        // console.log("post", post);
        return post;
    } catch (e){
        console.log(e);
    }
    return post;
};