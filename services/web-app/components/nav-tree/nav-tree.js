/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TreeNode, TreeView } from '@carbon/react'
import clsx from 'clsx'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import slugify from 'slugify'

import { dfs } from '@/utils/tree'

import styles from './nav-tree.module.scss'

const NavTree = ({ activeItem, items = [], label }) => {
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
          item.sectionGroup = true
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

  const renderTree = (nodes, parentNodeId = 'left_nav_tree') => {
    if (!nodes) {
      return
    }

    return nodes.map((node) => {
      const nodeId = `${parentNodeId}_${node.title}`.toLocaleLowerCase().replace(/\s/g, '')

      if (node.isSection) {
        return (
          <h2 className={clsx(styles['section-heading'], styles['section-group'])} key={node.title}>
            {node.title}
          </h2>
        )
      } else {
        if (node.path) {
          label = (
            <Link href={node.path}>
              <a className={styles.anchor}>{node.title}</a>
            </Link>
          )
        } else {
          label = node.title
        }

        return (
          <TreeNode
            label={label}
            id={nodeId}
            key={nodeId}
            isExpanded={isTreeNodeExpanded(node)}
            className={clsx({ [styles['section-group']]: node.sectionGroup })}
          >
            {renderTree(node.items, nodeId)}
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
      key={treeActiveItem}
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
