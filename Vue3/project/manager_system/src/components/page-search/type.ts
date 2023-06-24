export interface ISearchConfig {
  pageName: string
  header?: {
    newTitle: string
    editTitle: string
  }
  formItems: any[]
}

export interface ISearchProps {
  searchConfig: {
    pageName: string
    formItems: any[]
    labelWidth?: number
  }
}
