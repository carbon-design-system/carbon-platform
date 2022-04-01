/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { unstable_TreeNode as TreeNode, unstable_TreeView as TreeView } from '@carbon/react'
import PropTypes from 'prop-types'

import styles from './nav-tree.module.scss'

const NavTree = ({ items = [], label }) => {
  const toggle = function () {}
  return (
    <TreeView className={styles.container} label={label} hideLabel>
      {items.map((item) => (
        <TreeNode label={item.title} value={item.title} key={item.title} onToggle={toggle}>
          {item.items &&
            item.items.map((item2) => (
              <TreeNode label={item2.title} value={item2.title} key={item2.title} onToggle={toggle}>
                {item2.items &&
                  item2.items.map((item3) => (
                    <TreeNode
                      label={item3.title}
                      value={item3.title}
                      key={item3.title}
                      onToggle={toggle}
                    />
                  ))}
              </TreeNode>
            ))}
        </TreeNode>
      ))}
    </TreeView>
  )
}

NavTree.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string
    })
  ),
  label: PropTypes.string
}

export default NavTree
