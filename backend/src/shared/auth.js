module.exports = (event) => {
  return event.requestContext.authorizer.claims.sub;
};
