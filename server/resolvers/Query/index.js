import { get, query } from '@/server/db';

export const user = async (parent, { id }) => {
  const user = await get(`
    SELECT * 
    FROM users 
    WHERE id = ?
  `, [id]);

  return user;
};

export const community = async (parent, { id }) => {
  const community = await get(`
    SELECT * 
    FROM communities 
    WHERE id = ?
  `, [id]);

  return community;
};


// Query all posts and join with User data
export const post = async (_, { id }) => {
  try {
    const post = await get(
      `
      SELECT posts.id, posts.text, posts.user_id, users.name, users.profile_photo
      FROM posts
      INNER JOIN users
      ON posts.user_id = users.id
      WHERE users.id = ?;
  `,
      [id]
    );
    // console.log("Post:", post)
    return post;
  } catch (e) {
    console.log(e);
  }
  return post;
};
export const posts = async (_, ) => {
  try {
    const posts = await query(
      `
      SELECT DISTINCT posts.*, users.name, users.profile_photo
      FROM posts
      INNER JOIN users
      ON posts.user_id = users.id
      ORDER BY posts.created_ts DESC;
  `,
      []
    );
    return posts;
  } catch (e) {
    console.log(e);
  }
  
};
