/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// TODO: replace with actual login page
import Head from 'next/head'

const Login = ({ query }) => {
  return (
    <div className="container">
      <Head>
        <title>Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">You need to login to access this page</h1>

        <form action="/api/login" method="get">
          <input type="hidden" name="next" value={query.next || ''} />
          <input type="submit" value="Log in" />
        </form>
      </main>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      query
    }
  }
}

export default Login
