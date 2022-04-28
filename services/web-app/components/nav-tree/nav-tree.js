/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { unstable_TreeNode as TreeNode, unstable_TreeView as TreeView } from '@carbon/react'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import slugify from 'slugify'

import styles from './nav-tree.module.scss'

const NavTree = ({ activeItem, items: navItems = [], label: navLabel }) => {
  const router = useRouter()

  if (isEmpty(navItems)) return null

  const renderTree = ({ nodes }) => {
    if (!nodes) {
      return
    }
    return nodes.map(({ items, label, value, id, key, onClick, onToggle, ...nodeProps }) => (
      <TreeNode
        label={nodeProps.title}
        id={nodeProps.path || slugify(nodeProps.title, { lower: true })}
        key={nodeProps.title}
        onToggle={() => {
          return null
        }}
        onClick={() => nodeProps.path && router.push(nodeProps.path)}
        {...nodeProps}
      >
        {renderTree({ nodes: items, label, value, id, key, onClick, onToggle })}
      </TreeNode>
    ))
  }

  return (
    <TreeView
      className={styles.container}
      label={navLabel}
      hideLabel
      active={activeItem}
      selected={[activeItem]}
    >
      {renderTree({ nodes: navItems })}
    </TreeView>
  )
}

NavTree.propTypes = {
  activeItem: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      path: PropTypes.string
    })
  ),
  label: PropTypes.string
}

export default NavTree
