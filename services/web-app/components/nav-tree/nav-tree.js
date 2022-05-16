/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { unstable_TreeNode as TreeNode, unstable_TreeView as TreeView } from '@carbon/react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import slugify from 'slugify'

import styles from './nav-tree.module.scss'

const NavTree = ({ activeItem, items = [], label }) => {
  const router = useRouter()
  const [itemNodes, setItemNodes] = useState([])

  useEffect(() => {
    const newItemNodeArray = []
    items.forEach((item) => {
      newItemNodeArray.push(item)
      if (item.isSection) {
        // this is a hack so that we have two elements:
        // one to render the section title and one to render the items
        // doing this because for some reason the treeNode won't let me
        // programatically render two components
        newItemNodeArray.push({ ...item, isDummy: true })
      }
    })
    setItemNodes(newItemNodeArray)
  }, [items])

  const getItemId = (item) => {
    return item.path || slugify(item.title, { lower: true, strict: true })
  }

  const renderTree = (nodes) => {
    if (!nodes) {
      return
    }

    return nodes.map((node) => {
      if (node.isSection) {
        return <h2 className={styles['section-heading']}>{node.title}</h2>
      } else {
        return (
          <TreeNode
            label={node.title}
            id={getItemId(node)}
            key={node.title}
            onClick={() => node.path && router.push(node.path)}
            isExpanded={node.items?.some((item) => getItemId(item) === activeItem)}
          >
            {renderTree(node.items)}
          </TreeNode>
        )
      }
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
      {itemNodes.map((itemNode) => renderTree(itemNode.isDummy ? itemNode.items : [itemNode]))}
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
