/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { unstable_TreeNode as TreeNode, unstable_TreeView as TreeView } from '@carbon/react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import slugify from 'slugify'

import { dfs } from '@/utils/tree'

import styles from './nav-tree.module.scss'

const NavTree = ({ activeItem, items = [], label }) => {
  const router = useRouter()
  const [itemNodes, setItemNodes] = useState([])
  const [treeActiveItem, setTreeActiveitem] = useState('')

  useEffect(() => {
    const newItemNodeArray = []
    items.forEach((item, index) => {
      newItemNodeArray.push(item)
      if (item.isSection) {
        // this is a hack so that we have two elements:
        // one to render the section title and one to render the items
        // doing this because for some reason the treeNode won't let me
        // programatically render two components
        newItemNodeArray.push({ ...item, isDummy: true })
      } else {
        if (index > 0 && items[index - 1].isSection) {
          item.addMarginTop = true
        }
      }
    })
    setItemNodes(newItemNodeArray)
  }, [items])

  const getItemId = (item) => {
    return item.path || slugify(item.title, { lower: true, strict: true })
  }

  const popPathName = (path) => path?.split('/')?.slice(0, -1)?.join('/')

  const isTreeNodeActive = useCallback(
    (node) => {
      return node.hasTabs
        ? popPathName(node.path) === popPathName(activeItem)
        : getItemId(node) === activeItem
    },
    [activeItem]
  )

  const isTreeNodeExpanded = (node) => {
    return !!dfs([node], (evalNode) => evalNode.items?.some((item) => isTreeNodeActive(item)))
  }

  useEffect(() => {
    const activeNode = dfs(items, isTreeNodeActive)
    setTreeActiveitem(activeNode?.path ?? activeItem)
  }, [activeItem, isTreeNodeActive, items])

  const renderTree = (nodes) => {
    if (!nodes) {
      return
    }

    return nodes.map((node) => {
      if (node.isSection) {
        return <h2 className={clsx(styles['section-heading'], styles.section)}>{node.title}</h2>
      } else {
        return (
          <TreeNode
            label={node.title}
            id={getItemId(node)}
            key={node.title}
            onClick={() => node.path && router.push(node.path)}
            isExpanded={isTreeNodeExpanded(node)}
            className={clsx({ [styles.section]: node.addMarginTop })}
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
      active={treeActiveItem}
      selected={[treeActiveItem]}
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
