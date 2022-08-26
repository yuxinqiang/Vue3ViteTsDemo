/**
 * 菜单和树形接口数据类型
 */
declare interface Menu {
  id?: number | string // 菜单ID
  children?: Menu[] | []
  icon?: string | null // 菜单图标
  url?: string // 菜单地址
  name?: string // 菜单名称
  parentId?: string | null // 父级ID
  sort?: string // 排序
  code?: string // 资源编码
  hasChildren?: boolean //是否有子节点
  description?: string | null // 资源描述	
  parentCode?: string
  areaCode?: string
  areaName?: string
  level?: string
  remark?: string
  type?: string
}