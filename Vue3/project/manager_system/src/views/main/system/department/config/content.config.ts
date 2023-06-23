import type { IContentConfig } from '@/components/page-content/type'

const contentConfig: IContentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
  },
  propsList: [
    { type: 'selection', label: '选择', prop: 'selection', width: 60 },
    { type: 'index', label: '序号', prop: 'index', width: 60 },

    { type: 'normal', label: '部门名称', prop: 'name', width: 150 },
    { type: 'normal', label: '部门领导', prop: 'leader', width: 150 },
    { type: 'normal', label: '上级部门', prop: 'parentId', width: 150 },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },

    { type: 'handler', label: '操作', width: 150 }

    // { type: 'custom', label: '上级部门', prop: 'parentId', width: 150, slotName: 'parent' }
  ]
}

export default contentConfig
