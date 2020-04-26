/** @jsx createElement */
import { createElement } from '@bikeshaving/crank';
import { renderer } from '@bikeshaving/crank/dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// A post link wrapper component
const PostLink = ({ href, children }) => (
  <div>
    <a href={href}>{children}</a>
  </div>
);

// Load and display posts
async function BlogPosts({ url }) {
  const postsRes = await fetch(url);
  const posts = await postsRes.json();
  const postEls = posts.map((p) => (
    <PostLink href={`https://nosaj.io/r/${p.slug}`}>{p.filename}</PostLink>
  ));
  return <div>{postEls}</div>;
}

// Handle the loading UI and display posts when they load from {url}
async function* LoadPosts({ url }) {
  // I actually have no idea what this is doing
  for await ({} of this) {
    yield <div>Loading...</div>;
    yield <BlogPosts url={url} />;
  }
}

// Init the app component
const App = () => {
  return (
    <section>
      <h1>My Posts</h1>
      <LoadPosts url="https://codex.nosaj.io/posts" />
    </section>
  );
};

// Mount the app
renderer.render(<App />, document.getElementById('app'));
