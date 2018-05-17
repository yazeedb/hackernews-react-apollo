import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withHandlers, withStateHandlers } from 'recompose';
import { assoc } from 'ramda';

const setStateFromEvent = (prop) => (state) => (event) => assoc(prop, event.target.value, state);

const CreateLink = ({
  createLink,
  description,
  url,
  setDescription,
  setUrl
}) => (
  <form onSubmit={ createLink }>
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
    <button type="submit">Submit</button>
  </form>
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
      setDescription: setStateFromEvent('description'),
      setUrl: setStateFromEvent('url')
    }
  ),
  withHandlers({
    createLink: ({
      description,
      url,
      postMutation
    }) => (event) => {
      event.preventDefault();

      postMutation({
        variables: {
          description,
          url
        }
      });
    }
  }),
);

export default enhanceComponent(CreateLink);
