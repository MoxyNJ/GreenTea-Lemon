export interface IContentConfig {
  pageName: string
  header?: {
    title?: string
    btnTitle?: string
  }
  propsList: any[]
  childrenTree?: {
    rowKey: string
    treeProps?: {
      children?: string
    }
  }
}

export interface IContentProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: {
      rowKey: string
      treeProps?: {
        children?: string
      }
    }
  }
}
