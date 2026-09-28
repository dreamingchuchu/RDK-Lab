// 关联 id 校验 — 检查 id 是否在目标数据集中存在
// 对应 spec.md 5.4.3 异常场景 2：引用失效

export type RelationStatus = 'valid' | 'invalid';

export function validateRelation(
  id: string,
  validIds: string[]
): RelationStatus {
  return validIds.includes(id) ? 'valid' : 'invalid';
}

export function filterValidRelations(
  ids: string[],
  validIds: string[]
): string[] {
  return ids.filter((id) => validIds.includes(id));
}

export function findInvalidRelations(
  ids: string[],
  validIds: string[]
): string[] {
  return ids.filter((id) => !validIds.includes(id));
}

export type ResolvedRelation = {
  id: string;
  status: RelationStatus;
};

export function resolveRelations(
  ids: string[],
  validIds: string[]
): ResolvedRelation[] {
  return ids.map((id) => ({
    id,
    status: validateRelation(id, validIds),
  }));
}