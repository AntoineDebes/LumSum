import gql from "graphql-tag";

export default gql`
    query getLeaderBoard {
        getLeaderBoard {
            id
            name
            scores
            images
        }
    }
`;
