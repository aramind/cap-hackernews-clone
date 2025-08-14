const fs = require("fs");
const path = require("path");
const { ApolloServer } = require("apollo-server");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

const resolvers = {
  Query: {
    info: () => `This is the API of Hackernews clone`,
    feed: () => links,
    // fetch single link by ID
    link: (parent, args) => {
      return links.find((link) => link.id === args.id) || null;
    },
  },

  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },

    // update
    updateLink: (parent, args) => {
      const link = links.find((link) => link.id === args.id);
      if (!link) return null;

      if (args.url !== undefined) link.url = args.url;
      if (args.description !== undefined) link.description = args.description;

      return link;
    },

    deleteLink: (parent, args) => {
      const index = links.findIndex((link) => link.id === args.id);
      if (index === -1) return null;

      const [deletedLink] = links.splice(index, 1);
      return deletedLink;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
