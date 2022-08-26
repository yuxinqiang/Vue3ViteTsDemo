import _ from 'lodash'

/**
 * 是否是外部链接
 * @param {string} path
 * @return {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?|ftp|mailto|tel):/.test(path)
}

/**
 * 获取本地静态图片
 * @param name // 文件名 如 404.svg
 * @returns {*|string}
 */
export function getAssetsImages(name: string) {
  return new URL(`/src/assets/images/${name}`, import.meta.url).href;
}


/**
 * 格式化接口返回的路由配置json或者树形菜单json
 * @param treeList {Object[]} 接口返回的元原始数组
 * @param ancestorVal {string} 最大一级菜单对应的parentId或者说是祖先节点的父节点标识
 * @param parentId {string} 父级id对应的字段名称
 * @return {Array} 整合后的树形结构
 * 返回值示例 [ {id:'',name: '', children: []} ...]  具体字段名称根据接口实际返回值
 */
export function formatTree(treeList: Menu[] = [], ancestorVal: string = 'null', parentId: string = 'parentId', selfCode: string = 'id') {
  treeList.map((element: any) => {
    // 由于后端接口中存在null为祖父级，''为祖父级的混乱现象所以需要统一处理为null
    if (element[parentId] == '') {
      element[parentId] = null
    }
    return element
  })
  let treeObj = _.groupBy(treeList, parentId)
  Object.keys(treeObj).forEach((key: any) => {
    treeList.forEach((element: any) => {
      if (element[selfCode] == key) {
        element.children = _.orderBy(treeObj[key], ['sort'], ['asc'])
      }
    })
  })

  let result: Menu[] = []
  if (treeObj[ancestorVal]) {
    result = treeObj[ancestorVal]
  } else {
    result = treeList
  }

  return result
}