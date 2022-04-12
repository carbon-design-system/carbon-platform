/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { unstable_TreeNode as TreeNode, unstable_TreeView as TreeView } from '@carbon/react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import styles from './nav-tree.module.scss'

const NavTree = ({ activeItem, items = [], label }) => {
  const router = useRouter()
  const toggle = function () {
    return null
  }
  console.log('test')

  function renderTree({ items }) {
    if (!items) {
      return
    }
    return items.map(({ items, label, value, id, key, onClick, onToggle, ...nodeProps }) => (
      <TreeNode
        label={nodeProps.title}
        value={nodeProps.title}
        id={nodeProps.title.toLowerCase().replace(/\s/g, '')}
        key={nodeProps.title}
        onToggle={toggle}
        onClick={() => nodeProps.path && router.push(nodeProps.path)}
        {...nodeProps}
      >
        {renderTree({ items: items, label, value, id, key, onClick, onToggle })}
      </TreeNode>
    ))
  }

  return (
    <TreeView
      className={styles.container}
      label={label}
      hideLabel
      active={activeItem}
      selected={[activeItem]}
    >
      {renderTree({ items })}
    </TreeView>
  )
}

NavTree.propTypes = {
  activeItem: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string
    })
  ),
  label: PropTypes.string
}

export default NavTree
