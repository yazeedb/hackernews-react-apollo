import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

const LinkList = ({
  feedQuery: { error, feed, loading }
}) => (
  <div>
    { loading && <div>Loading...</div> }
    { error && <div>Error!</div> }
    {
      feed && feed.links.map((link) => (
        <Link key={ link.id } link={ link } />
      ))
    }
  </div>
);

const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

export default graphql(FEED_QUERY, { name: 'feedQuery' }) (LinkList);
