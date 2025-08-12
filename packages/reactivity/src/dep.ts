import type { ReactiveEffect } from './effect'
export type Dep = Set<ReactiveEffect>

export const createDep = (effects?: ReactiveEffect[]) => {
  return new Set<ReactiveEffect>(effects)
}
