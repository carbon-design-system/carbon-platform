/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Each service gets a queue. Services bind their queue to one or more exchanges to receive
 * messages.
 */
enum Queue {
  Github = 'q_github_v1',
  Logging = 'q_logging_v1',
  Search = 'q_search_v1'
}

/**
 * EventMessages can be `emit()`ted by a `MessagingClient` and are sent to an exchange whose name is
 * the value of the corresponding EventMessage enum value.
 */
enum EventMessage {
  GithubRepoIngested = 'github_repo_ingested',

  LogLogged = 'log_logged',

  UserSearched = 'user_searched',
  UserLoggedIn = 'user_logged_in'
}

/**
 * QueryMessages can be `query()`'d by a `MessagingClient` and are sent to an exchange whose name is
 * the value of the corresponding QueryMessage enum value.
 */
enum QueryMessage {
  Example = 'example'
}

export { EventMessage, QueryMessage, Queue }
