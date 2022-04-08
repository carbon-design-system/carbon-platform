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

  return (
    <TreeView
      className={styles.container}
      label={label}
      hideLabel
      active={activeItem}
      selected={[activeItem]}
    >
      {items.map((item) => (
        <TreeNode
          label={item.title}
          value={item.title}
          id={item.title.toLowerCase().replace(/\s/g, '')}
          key={item.title}
          onToggle={toggle}
          onClick={() => item.path && router.push(item.path)}
        >
          {item.items &&
            item.items.map((item2) => (
              <TreeNode
                label={item2.title}
                value={item2.title}
                id={item2.title.toLowerCase().replace(/\s/g, '')}
                key={item2.title}
                onToggle={toggle}
                onClick={() => item2.path && router.push(item2.path)}
              >
                {item2.items &&
                  item2.items.map((item3) => (
                    <TreeNode
                      label={item3.title}
                      value={item3.title}
                      id={item3.title.toLowerCase().replace(/\s/g, '')}
                      key={item3.title}
                      onToggle={toggle}
                      onClick={() => item3.path && router.push(item3.path)}
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
