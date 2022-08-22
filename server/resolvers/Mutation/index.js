import { get, query, db } from '@/server/db';
import postcss from 'postcss';
import { post } from '../Query';

// Add Post Working
export const addPost = async (_, {input} ) => {
    const post = input;
    const postQuery = await query(
        `
        INSERT INTO posts (id,text, user_id) 
        VALUES (?, ?, ?);
        `,
            [input.id, input.text, input.user_id]
    );
    console.log("post", post);
    return post;

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
        console.log("post", post);
        return post;
    } catch (e){
        console.log(e);
    }
    return post;
};