import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import { InView } from "react-intersection-observer";
import Card from '@/components/Card';
import CommunityCardButton from '@/components/CommunityCardButton';
import Page from '@/components/Page';
import Post from '@/components/Post';

const USER_QUERY = gql`
  query ($id: Int!, $limit: Int, $offset: Int) {
    user(id: $id) {
      id
      name
      profile_photo
      bio
      communities {
        id
        name
        icon
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

const ProfilePage = () => {
  const { query } = useRouter();
  const { data, loading, error, fetchMore} = useQuery(USER_QUERY, {
    skip: !query.id,
    variables: {
      id: Number(query.id),
      offset: 0,
      limit: 2
    },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const user = data?.user;
  const posts = data?.user.posts;

  if (!user || loading) {
    return null;
  }

  return (
    <Page>
      <div className="flex">
        <Card className="flex-1">
          <h1 className="text-2xl font-bold">{user.name}'s posts</h1>
          <p>Posts created by the user (the user's timeline) should be shown in this section.</p>
          <div>
          {posts && posts.map(({ id, name, profile_photo, text }, index) => (
            <div >
              <Card className="flex items-center my-4" style={{backgroundColor: "white"}}>
                <Post key={index} id={id} name={name} profile_photo={profile_photo} text={text}/>
              </Card>
            </div>
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
        <Card className="ml-4 py-10 max-w-xs flex-none grid justify-items-center gap-2 max-w-xs">
          <div className="text-2xl rounded-full bg-white w-14 h-14 flex items-center justify-center">
            <img src={user.profile_photo} />
          </div>
          <h2 className="text-md font-bold">{user.name}</h2>
          <span className="text-sm text-gray-400"><strong>{user.communities.length}</strong> communities</span>
          <p className="text-center text-sm">{user.bio}</p>
          <ul className="grid gap-4 mt-2">
            {user.communities.map(({ id, name, icon }) => (
              <li>
                <CommunityCardButton href={`/community/${id}`} icon={icon}>
                  {name}
                </CommunityCardButton>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Page>
  );
};

export default ProfilePage;
