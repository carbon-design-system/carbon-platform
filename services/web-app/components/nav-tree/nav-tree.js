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

  function renderTree(nodes, parentNodeId = 'left_nav_tree') {
    if (!nodes) {
      return
    }

    return nodes.map((node) => {
      const nodeId = `${parentNodeId}_${node.title}`.toLowerCase().replace(/\s/g, '')

      return (
        <TreeNode
          label={node.title}
          value={node.title}
          id={nodeId}
          key={nodeId}
          onClick={() => node.path && router.push(node.path)}
        >
          {renderTree(node.items, nodeId)}
        </TreeNode>
      )
    })
  }

  return (
    <TreeView
      className={styles.container}
      label={label}
      hideLabel
      active={activeItem}
      selected={[activeItem]}
    >
      {renderTree(items)}
    </TreeView>
  )
}

NavTree.propTypes = {
  activeItem: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string,
      items: PropTypes.array
    })
  ),
  label: PropTypes.string
}

export default NavTree
