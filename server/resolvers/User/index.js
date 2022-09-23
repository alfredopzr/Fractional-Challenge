import { query } from '@/server/db';

export const communities = async (user) => {
  const communities = await query(`
    SELECT c.*
    FROM memberships m
    JOIN communities c on m.community_id = c.id
    WHERE m.user_id = ?
  `, [user.id]);

  return communities;
};


// Query all posts of a specific user id
export const posts = async (user, {offset, limit}) => {
  try {
    const posts = await query(`
    SELECT DISTINCT p.*, u.name, u.profile_photo
    FROM memberships m
    JOIN posts p on m.user_id = p.user_id
    INNER JOIN users u on p.user_id = u.id
    WHERE u.id = ?
    ORDER BY p.created_ts DESC;
    `, [user.id]);
  
    return posts.slice(offset, limit+offset);
  }
  catch(e) {
    console.log(e);
  }
};
