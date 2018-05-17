import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withHandlers, withStateHandlers } from 'recompose';
import { assoc } from 'ramda';

const CreateLink = ({
  createLink,
  description,
  url,
  setDescription,
  setUrl
}) => (
  <div>
    <div className="flex flex-column mt3">
      <input
        className="mb2"
        value={ description }
        onChange={ setDescription }
        type="text"
        placeholder="A description for the link"
      />
      <input
        className="mb2"
        value={ url }
        onChange={ setUrl }
        type="text"
        placeholder="The URL for the link"
      />
    </div>
    <button onClick={ createLink }>
      Submit
    </button>
  </div>
);

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const enhanceComponent = compose(
  graphql(POST_MUTATION, { name: 'postMutation' }),
  withStateHandlers(
    { description: '', url: '' },
    {
      setDescription: (state) => (event) => assoc('description', event.target.value, state),
      setUrl: (state) => (event) => assoc('url', event.target.value, state)
    }
  ),
  withHandlers({
    createLink: ({
      description,
      url,
      postMutation
    }) => () => postMutation({
      variables: {
        description,
        url
      }
    }).then(console.log)
  }),
);

export default enhanceComponent(CreateLink);
