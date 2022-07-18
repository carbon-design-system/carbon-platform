/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO: delete this file
import { getAllDesignKits } from '@/lib/github'

const Library = ({ designKits }) => {
  return (
    <div>
      <ul style={{ listStyle: 'bullet' }}>
        {designKits.map((kit) => {
          return <li key={kit.id}>{kit.id}</li>
        })}
      </ul>
    </div>
  )
}

export const getServerSideProps = async () => {
  const designKits = await getAllDesignKits()

  if (!designKits) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      designKits
    }
  }
}

export default Library
