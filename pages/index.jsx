import Card from '@/components/Card';
import CommunityCardButton from '@/components/CommunityCardButton';
import Page from '@/components/Page';
import AddPostForm from '@/components/AddPostForm';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router'
import Post from '@/components/Post';
import {useEffect, useState} from 'react'
import { InView } from "react-intersection-observer";

const HOME_POSTS_QUERY = gql`
  query($limit: Int, $offset: Int) {
    posts(limit: $limit, offset: $offset) {
      id
      text
      name
      profile_photo
    }
}
`;


const Home = () => {
  const { query } = useRouter();
  const { loading, error, data, fetchMore } = useQuery(HOME_POSTS_QUERY, {
    variables: {
      offset: 0,
      limit: 2
    },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const posts = data?.posts;

  return (
    <Page>
      <div className="flex">
        <Card className="flex-1">
          <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
          <p>Your newsfeed should be shown in this section.</p>
          <AddPostForm posts={posts}/>
          {posts && posts.map(({ id, name, profile_photo, text }, index) => (
                  <Card className="flex items-center my-4" style={{backgroundColor: "white"}}>
                    <Post key={index} id={id} name={name} profile_photo={profile_photo} text={text}/>
                  </Card>
          ))}
          {data && (
        <InView
          onChange={async (inView) => {
            const currentLength = posts.length || 0;
            if (inView) {
              await fetchMore({
                variables: {
                  offset: currentLength,
                  limit: currentLength + 3,
                },
              });
            }
          }}
        />
      )}
        </Card>
        <Card className="ml-4 max-w-xs flex-none">
          <h2 className="text-md font-bold">Communities</h2>
          <ul className="grid gap-4 mt-2">
            <li>
              <CommunityCardButton icon="🤠" href="/community/1">
                Dallas Fort Worth Investors
              </CommunityCardButton>
            </li>
            <li>
              <CommunityCardButton icon="🔨" href="/community/2">
                BRRRR Investors
              </CommunityCardButton>
            </li>
          </ul>
        </Card>
      </div>
    </Page>
  );
};

export default Home;
