import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import {useEffect, useState} from 'react'
import Card from '@/components/Card';
import CardButton from '@/components/CardButton';
import Page from '@/components/Page';
import Post from '@/components/Post';
import AddPostForm from '@/components/AddPostForm';
import { InView } from "react-intersection-observer";

const COMMUNITY_QUERY = gql`
  query ($id: Int!, $limit: Int, $offset: Int) {
    community(id: $id) {
      id
      name
      description
      icon
      members {
        id
        name
        profile_photo
      }
    	posts(limit: $limit, offset: $offset) {
        id
        text
        name
        profile_photo
      }
    }
  }
`;

const CommunityPage = () => {
  
  const { query } = useRouter();
  const { data, loading,error, fetchMore } = useQuery(COMMUNITY_QUERY, {
    variables: {
      id: Number(query.id),
      offset: 0,
      limit: 2
    },
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const community = data?.community;
  const posts = data?.community.posts;


  if (!community || loading) {
    return null;
  }

  return (
    <Page>
      <div className="flex">
        <Card className="flex-1">
          <h1 className="text-2xl font-bold">Welcome to {community.name}</h1>
          <p>The community feed containing all the community’s posts should be shown in this section.</p>
          <div>
            <AddPostForm />
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
                          id: Number(query.id),
                          offset: currentLength,
                          limit: currentLength + 2,
                        },
                      });
                    }
                  }}
                />
              )}
            </div>
        </Card>
        <Card className="ml-4 py-10 max-w-xs flex-none grid justify-items-center gap-2 max-w-xs" style={{height: "100%"}}>
          <div className="text-2xl rounded-full bg-white w-14 h-14 flex items-center justify-center">
            {community.icon}
          </div>
          <h2 className="text-md font-bold">{community.name}</h2>
          <span className="text-sm text-gray-400"><strong>{community.members.length}</strong> members</span>
          <p className="text-center text-sm">{community.description}</p>
          <ul className="grid gap-4 mt-2">
            {community.members.map(({ id, name, profile_photo }) => (
              <li>
                <CardButton href={`/profile/${id}`} className="flex items-center">
                  <img className="h-6 w-6" src={profile_photo} />
                  <span className="ml-2 text-md">{name}</span>
                </CardButton>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Page>
  );
};

export default CommunityPage;
