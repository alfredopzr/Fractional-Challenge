import Card from '@/components/Card';
import CommunityCardButton from '@/components/CommunityCardButton';
import Page from '@/components/Page';

const Home = () => {
  return (
    <Page>
      <div className="flex">
        <Card className="flex-1">
          <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
          <p>Your newsfeed should be shown in this section.</p>
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
