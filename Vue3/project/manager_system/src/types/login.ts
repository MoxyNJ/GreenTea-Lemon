/** login页面的全部interface */
export interface IAccount {
  name: string
  password: string
}

export interface IPhoneNumber {
  phoneNumber: string
  verified: string
}

export interface UserInfo {
  id?: number
  name?: string
  realname?: string
  cellphone?: number
  enable?: number
  createAt?: string
  updateAt?: string
  role?: {
    id: number
    name: string
    intro: string
    createAt: string
    updateAt?: string
  }
  department?: {
    id: number
    name: string
    parentId: number
    createAt?: string
    updateAt?: string
    leader?: string
  }
}
