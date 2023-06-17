import request from '@/service'

export function getAmountListData() {
  return request.get({
    url: '/goods/amount/list'
  })
}

export function getGoodsCategoryCount() {
  return request.get({
    url: '/goods/category/count'
  })
}

export function getGoodsCategorySale() {
  return request.get({
    url: '/goods/category/sale'
  })
}

export function getGoodsCategoryFavor() {
  return request.get({
    url: '/goods/category/favor'
  })
}

export function getGoodsAddressSale() {
  return request.get({
    url: '/goods/address/sale'
  })
}
