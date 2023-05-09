# td-02 - Blog microservice

**Status:** Approved ✅

<!--
Draft 📝
Approved ✅
Canceled 🚫
-->

## Summary

Related #540

Create a microservice to handle the logic to retrieve a publication's latest (10) mediumPosts and
serve those when a data-graph query is made for them.

For a given mediumPost we want:

- title
- author
- link
- date: we eventually want it in this format ('MMMM Do, YYYY'), but let's send it as epoch
- thumbnail

How?

- A user's medium feed can be retrieved by https://medium.com/feed/[publication], which will return
  an rss feed with latest post information
- Use a parser to convert rss feed into a JSON object
- Format items to fit {new} model
- Order items by pubDate (orderBy param, default descending)
- Use fs-cache to hold onto results for a period of time to speed up results from messaging or the
  data-graph

## Research

see https://help.medium.com/hc/en-us/articles/214874118 - publication's medium feed

- [x] Approved?

- **Unanswered questions**
  - ~~Can we use a xml parser to parse a post's content to retrieve (for now) the image; if so, can
    we use the same library both to parse the xml and the rss?~~
    - We can use an XML parser, but we can't also use that to parse the HTML, so we will instead use
      `rss-parser` for the RSS feed parsing and `node-html-parser` for the HTML parsing.
  - ~~How long should the cached entries live for?~~
    - 1 hour!
  - ~~If one data graph resolver throws an exception, what happens to the other ones and the query
    as a whole? Does it still return some data from the other resolvers?~~
    - Opting for a partial response and then include information on the errors (if any)
  - ~~can we throw errors across the messaging package?~~
    - At the very least, we can just return an error and it will auto-serialize. We want to
      eventually be "aware" of this and reject the messaging query promise instead of resolving it.
- **New technologies**
  - RSS parser, https://www.npmjs.com/package/rss-parser potentially
  - node-html-parser, https://www.npmjs.com/package/node-html-parser
- **Proofs of concept**
  - successfully retrieved posts by querying https://medium.com/feed/carbondesign and using a rss
    parser
  - Server-side: Image only worked if user-agent is modified, got it working by loading on
    client-side instead
  - in POC, using a string matcher to find the first image in the post's content (the thumbnail),
    we'll likely want to use an xml parser for this instead if possible
    (`imgSrcMatchString = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g`) (Options: xml2js)
  - [x] Validate that we can successfully parse xml post's content -- Francine
    - We can't use an XML parser to parse the HTML, but we can use an HTML parser, which we will go
      with
  - [x] Throwing errors across messaging package -- Joe
    - see "unanswered questions"

## UI/UX design

- [x] Approved?

Info is used in mediumPosts component, which is being migrated from gatsby theme
https://github.com/carbon-design-system/gatsby-theme-carbon/tree/main/packages/gatsby-theme-carbon/src/components/MediumPosts,
no further red lines necessary since no visual changes are being made.

## APIs

- [x] Approved?

- **Programmatic APIs**

  - New Data Graph Model:

    ```ts
    // file: packages/api/data-graph/models/medium-post.model.ts

    @ObjectType({ description: 'Example user object' })
    class MediumPost {
      @Field(() => ID)
      id: string

      @Field(() => String)
      publicationName: string

      @Field(() => String)
      title: string

      @Field(() => String)
      author: string

      @Field(() => String)
      thumbnail: string

      @Field(() => String)
      link: string

      @Field(() => GraphQLTimestamp)
      date: number

      constructor(
        id: string,
        publicationName: string,
        title: string,
        author: string,
        thumbnail: string,
        link: string,
        date: number
      ) {
        this.id = id
        this.publicationName = publicationName
        this.title = title
        this.author = author
        this.thumbnail = thumbnail
        this.link = link
        this.date = date
      }
    }
    ```

- **Data graph**

  ```graphql
  query {
    mediumPosts(publicationName: carbondesign, limit: 3, order: descending) {
      id
      publicationName
      title
      date
      author
      thumbnail
      link
    }
  }
  ```

- **Messages**

  - New message: Query -
    ```ts
    medium_feed({ publicationName: string, limit: number = 3, order: 'ascending' | 'descending' = 'descending' })
    ```
    Expected return:
    ```ts
    ;[
      {
        title: string,
        link: string,
        thumbnail: string,
        author: string,
        date: number
      }
    ]
    ```
    A new queue will be used for the medium microservice to listen on: `q_medium_v1`

## Security

- [x] Approved?

- Set the service up to handle an allow list for the users that can be queried
- enforce upper limit to 10
- strip out weird characters from publication (possibly encodeURIComponent()) (we're not returning
  content so this might be a non-issue)

## Error handling

- [x] Approved?

### Messaging failures

- fetching rss feed fails:

  - publicationName could be not found (404)
    - return empty array
  - Could get an http 500-series error
    - we want to somehow return an error object
      - throw an exception (if that'll work) or return empty array with error indicator
      - `MediumWebsiteUnavailableException`
  - Query could take too long to return results
    - use promise.race() to abort fetch promise on timeout, return same as above ^^

- Error parsing RSS
  - we want to somehow return an error object
    - throw an exception (if that'll work) or return empty array with error indicator
    - `MediumXmlParsingException`
- Error parsing XML
  - we want to somehow return an error object
    - throw an exception (if that'll work) or return empty array with error indicator
    - `MediumXmlParsingException`

### Data Graph failures

- Propagate the errors from the messaging layer

## Test strategy

- [x] Approved?

How will the new feature be tested? (e.g. unit tests, manual verification, automated e2e testing,
etc.)

What interesting edge cases should be considered and tested?

- Add dev dataSet
- Add Test data in the service package
- Unit tests:
  - MicroService:
    - Validate incoming query (`InvalidInputException`)
    - Successfully get medium posts
    - `MediumXmlParsingException`
    - `MediumWebsiteUnavailableException`
    - `Not Found`
  - api/messaging package:
    - New message works

## Logging

- [x] Approved?

Detail any FFDC data (info, warning, error, debug logs) to be captured by this feature.

Data Graph

- Info: add some sort of log to announce a request is coming through

Medium Service

- logging by default on incoming/outgoing requests
- Info: cache miss, going out to get the mediumPosts
- Warning: 404
- Warning:`MediumXmlParsingException`
- Warning: `MediumWebsiteUnavailableException`
- Warning: `InvalidInputException`

## File and code layout

- [x] Approved?

Describe how the files and code for this feature will fit into the rest of the mono repo. Will there
be a new package/service? Are there existing files/directories in which the new logic should live?

- New dev dataSet in: packages/api/src/dev/data-graph
- New data-graph model in: packages/api/data-graph/models/medium-post.model.ts
- New microservice in: services/medium
- New mediumPosts resolver, service and module in: services/data-graph/src/main/medium-posts

## Issue and work breakdown

- [x] Approved?

List any issues that should be created prior to starting work on this feature

- **Epics**

  - MediumPosts Microservice

- **Issues**
  - MediumPosts - Data Graph: - New data graph Model - Resolver - Add dev dataset - Info log: add
    some sort of log to announce a request is coming through
  - MediumPosts Microservice
    - Create and Unit test
  - Integrate GraphQl MediumPosts request into Web App
