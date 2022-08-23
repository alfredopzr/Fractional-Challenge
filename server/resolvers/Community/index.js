import { query } from '@/server/db';

export const members = async (community) => {
  const members = await query(`
    SELECT u.*
    FROM memberships m
    JOIN users u on m.user_id = u.id
    WHERE m.community_id = ?
  `, [community.id]);

  return members;
};
// Query for all posts in community
export const posts = async (community) => {
  const posts = await query(`
  SELECT p.*, u.name, u.profile_photo
  FROM memberships m
  JOIN posts p on m.user_id = p.user_id
  JOIN users u ON p.user_id = u.id
  WHERE m.community_id = ?
  `, [community.id]);
  console.log(posts);
  return posts;
};
