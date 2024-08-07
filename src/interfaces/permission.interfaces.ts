export interface IPermission {
    id?: number,
    roleId: number,
    entityId: number,
    canCreate: boolean,
    canUpdate: boolean,
    canDelete: boolean,
    canRead: boolean
}