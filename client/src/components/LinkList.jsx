import React from "react";
import Link from "./Link";
import { gql, useQuery } from "@apollo/client";

const FEED_QUERY = gql`
  query GetFeed {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;
const LinkList = () => {
  const { data } = useQuery(FEED_QUERY);

  console.log(data);
  return (
    <div>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </div>
  );
};

export default LinkList;
