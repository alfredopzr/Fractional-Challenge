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
// Query all users posts
export const posts = async (user) => {
  const posts = await query(`
    SELECT p.*
    FROM memberships m
    JOIN posts p on m.user_id = p.user_id
    WHERE m.user_id = ?
  `, [user.id]);

  return posts;
};
