/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TreeNode, TreeView } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import slugify from 'slugify'

import { dfs } from '@/utils/tree'

import styles from './nav-tree.module.scss'

const NavTree = ({ activeItem, items = [], label, visible = true }) => {
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

    // Create hierarchical, unique node ids for all nodes in the nav tree
    dfs(newItemNodeArray, (evalNode) => {
      if (!evalNode.parentNodeId) {
        evalNode.parentNodeId = 'left_nav_tree'
      }

      // Combine the parent's node id with the current node's id
      const currentNodeId = evalNode.title.toLocaleLowerCase().replace(/\s/g, '')
      evalNode.id = `${evalNode.parentNodeId}_${currentNodeId}`

      // Set the parent node id of each child of this node to the newly generated id
      evalNode.items?.forEach((child) => {
        child.parentNodeId = evalNode.id
      })

      return false
    })
    setItemNodes(newItemNodeArray)
  }, [items])

  useEffect(() => {
    requestAnimationFrame(() => {
      // Remove tabstop from headings
      document
        .querySelectorAll('[class*=section-group]')
        .forEach((heading) => heading.setAttribute('tabindex', '-1'))
    })
  }, [])

  const getItemId = (item) => {
    return item.path || slugify(item.title, { lower: true, strict: true })
  }

  const popPathName = (path) => path?.split('/')?.slice(0, -1)?.join('/')

  const removeHashAndQuery = (path) => path?.split('?')?.[0]?.split('#')?.[0]

  const isTreeNodeActive = useCallback(
    (node) => {
      return node.hasTabs
        ? popPathName(node.path) === popPathName(removeHashAndQuery(activeItem))
        : getItemId(node) === removeHashAndQuery(activeItem)
    },
    [activeItem]
  )

  const isTreeNodeExpanded = (node) => {
    return !!dfs([node], (evalNode) => evalNode.items?.some((item) => item.id === treeActiveItem))
  }

  useEffect(() => {
    const activeNode = dfs(itemNodes, isTreeNodeActive)
    setTreeActiveitem(activeNode?.id)
  }, [activeItem, isTreeNodeActive, itemNodes])

  const renderTree = (nodes) => {
    if (!nodes) {
      return
    }

    return nodes.map((node) => {
      if (node.isSection) {
        return (
          <h2 className={clsx(styles['section-heading'], styles['section-group'])} key={node.title}>
            {node.title}
          </h2>
        )
      } else {
        if (node.path) {
          label = (
            <a href={node.path} className={styles.anchor} tabIndex={visible ? 0 : '-1'}>
              {node.title}
            </a>
          )
        } else {
          label = node.title
        }

        return (
          <TreeNode
            label={label}
            id={node.id}
            key={node.id}
            isExpanded={isTreeNodeExpanded(node)}
            disabled={!visible}
            className={clsx({
              [styles['section-group']]: node.sectionGroup,
              'cds--tree-node--active': node.id === treeActiveItem,
              'cds--tree-node--selected': node.id === treeActiveItem
            })}
            onClick={() => node.path && setTreeActiveitem(node.id)}
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
  label: PropTypes.string,
  visible: PropTypes.bool
}

export default NavTree
