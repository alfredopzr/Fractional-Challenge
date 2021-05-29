# Fractional product engineer coding challenge:

## Getting started
1. Clone: 
    ```bash
    git clone git@github.com:fractionalapp/product-eng-challenge.git
    cd coding-challenge
    ```
2. Install dependencies
   ```bash 
   yarn install
   ```
3. Seed local database
   ```bash 
   yarn dev:seed
   ```
4. Start server
   ```bash 
   yarn dev
   ```
3. Open `http://localhost:3000`

## The Challenge

The goal of this project is to build a simplified version of the social platform on Fractional.

On our platform, users participate across different groups to improve their knowledge and reputation on different investments. These groups generally fall into one of the following categories:
- **Followers** - followers are a user's devotees that like to hear the most from them.
- **Communities** - communities are larger groups of to-be-owners aligned on a shared operating thesis / theme.
- **Partners** - partners are the tightest circles with them being a small group of up to 10 owners working together on a given venture.

Each group typically has a fairly different overall purpose (ex. partners own a property while communities look for investments); however, what they do have in common is a public or private feed meant to facilitate updates and collaboration between their members.

Typically, a post created in a group a user is a member of will propagate to their timeline while posts a user creates in their timeline are distributed to their followers. 

## Part 1: Implementation

Implementing the group feed functionality:
- Creating posts for followers and communities.
  - Distribute posts to members and followers. 
- Deleting posts.
- (bonus) Replying to posts.
- Listing posts on communities and user timelines.
  - Posts should be sorted by date. (newest first)
  - Posts should be infinitely scrollable.

Notes:
- Feel free to change any part of the stack with what makes you most comfortable.
- Feel free to install any NPM modules that seem helpful.
- Don't worry about looks much.
- Try not to spend more than a day overall.

## Part 2: Questions

Please answer these questions after implementing:
1. If you were building this for a production environment, what changes if any would you make to improve team / code scalability?
2. If we had thousands of users creating thousands of posts do you forsee any issues with scalability? If so, what would you change to make it more scalable? 
3. What product changes do you think would be best to work on next, if we wanted to improve user engagement and connectivity.

## Part 3: Submit

1. (part 1) Implement your solution in a copy of this repo (please don't create a fork with your solution) and feel free to either add it to a private repo or bundle it in a zip file.
2. (part 2) Write your answers in a Notion, Google Doc, this README or whatever you feel most comfortable with.
3. (bonus) Record a short walk-through of your implementation on [Loom](https://www.loom.com/)
4. Send links to all of the above to [work@fractional.app](mailto:work@fractional.app)

## File Structure

- `components/`: contains our stateless React components.
- `pages/`: contains the app's routes (the file path/name represents the route)
- `server/`: contains our GraphQL schema and resolvers
- `seed.sql`: contains a basic seed of users and communities to populate the DB locally (feel free to modify this as you see fit).

## Route Structure

- `/` (home page)
  - You'll see a list of communities on this page that you can navigate to.
  - Ideally the user's timeline should be rendered in this page as well.
- `/community/[id]` (community page)
  - This page will contain individual communities and a list of members.
  - Ideally the communities posts should be rendered here.
- `/profile/[id]` (profile page)
  - This page contains some basic user information and a list of the communities they are a member of.
  - Ideally the posts created by a user should be rendered here.
- `/api/graphql` (GraphQL API)
  - Our GraphQL API is hosted here.
