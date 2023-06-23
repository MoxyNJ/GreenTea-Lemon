const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  propsList: [
    { label: '菜单名称', prop: 'name', width: 150 },
    { label: '级别', prop: 'type', width: 120 },
    { label: '菜单 url', prop: 'url', width: 200 },
    { label: '菜单 icon', prop: 'icon', width: 200 },
    { label: '排序', prop: 'sort', width: 120 },
    { label: '权限', prop: 'permission', width: 180 },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: 150 }
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  }
}

export default contentConfig
