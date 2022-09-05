import Card from '@/components/Card';
import CommunityCardButton from '@/components/CommunityCardButton';
import Page from '@/components/Page';
import AddPostForm from '@/components/AddPostForm';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router'
import Post from '@/components/Post';

const HOME_POSTS_QUERY = gql`
  query {
    posts {
      id
      text
      name
      profile_photo
    }
}
`;

const Home = () => {
  const { query } = useRouter();
  const { loading, error, data } = useQuery(HOME_POSTS_QUERY);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const posts = data?.posts;
  return (
    <Page>
      <div className="flex">
        <Card className="flex-1">
          <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
          <p>Your newsfeed should be shown in this section.</p>
          <AddPostForm />
          {posts.map(({ id, name, profile_photo, text }) => (
                  <Card className="flex items-center my-4" style={{backgroundColor: "white"}}>
                    <Post id={id} name={name} profile_photo={profile_photo} text={text}/>
                  </Card>
              ))}
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
