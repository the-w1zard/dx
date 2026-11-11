
export function setPrev<T = any>(setter: any, k?: any, v?: any) {
  setter((prev: any) => k !== undefined ? { ...prev, [k]: v as T[XS] } : { ...prev, ...(v as Partial<any>) },
  )
}

export function setPrevB(setter: any) {
  setter((prev: any) => !prev)
}
