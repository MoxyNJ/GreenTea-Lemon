// 枚举类型
enum CacheType {
  Local,
  Session
}

/**封装缓存方法 */
class Cache {
  storage: Storage

  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }
  /**保存 */
  setCache(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }
  /**获取 */
  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) return JSON.parse(value)
  }
  /**删除 */
  remove(key: string) {
    this.storage.removeItem(key)
  }
  /**清空 */
  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
