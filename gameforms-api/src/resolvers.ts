import { readFileSync } from 'fs'
import { join } from 'path'
import { Queue, Work, User, AdminRole, FieldTemplate, FormTemplate } from "./graph-types"
import { Op, Sequelize } from 'sequelize'
import { initModels, formTemplate, user, queueWorkRole, queueManageRole, queue, work, adminRole, fieldTemplate, workDataList, workDataValue } from "./models/init-models"
const CONFIG = JSON.parse(readFileSync(join(__dirname, 'app-config.json')).toString('utf8'))
const sequelize = new Sequelize(CONFIG.connectionStrings.gameFormsDb, {logging: false, dialectOptions: {supportBigNumbers: true}})
initModels(sequelize)

const AmAdminQuery = async (parent: any, args: any, context: any, info: any): Promise<boolean> => {
  let adminRoles = await adminRole.findAll(({where: {
    archive: {[Op.not]: true},
    role: {[Op.or]: context.roles}
  }}))
  return adminRoles?.length > 0
}
const AmQueueWorkerQuery = async (parent: any, args: any, context: any, info: any): Promise<boolean> => {
  let workRoles = await queueWorkRole.findAll(({where: {
    archive: {[Op.not]: true},
    role: {[Op.or]: context.roles},
    queueId: args['queueId']
  }}))
  return workRoles?.length > 0
}
const AmQueueManagerQuery = async (parent: any, args: any, context: any, info: any): Promise<boolean> => {
  let manageRoles = await queueManageRole.findAll(({where: {
    archive: {[Op.not]: true},
    role: {[Op.or]: context.roles},
    queueId: args['queueId']
  }}))
  return manageRoles?.length > 0
}
const MyUserQuery = async (parent: any, args: any, context: any, info: any) => {
  let usr = await user.findOne({where: {
    archive: {[Op.not]: true},
    identity: context.identity.identity
  }})
  if(!usr) return null;
  return JSON.parse(JSON.stringify(usr))
}
const AdminRoleQuery = async (parent: any, args: any, context: any, info: any) => {
  if(!context.amAdmin) return null
  let adminRoleData = await adminRole.findByPk(args['adminRoleId'])
  if(!adminRoleData) return null
  return JSON.parse(JSON.stringify(adminRoleData))
}
const AdminRolesQuery = async (parent: any, args: any, context: any, info: any) => {
  if(!context.amAdmin) return null
  let adminRoleData = await adminRole.findAll({where: {archive: {[Op.not]: true}}})
  return JSON.parse(JSON.stringify(adminRoleData))
}
const FieldTemplateQuery = async (parent: any, args: any, context: any, info: any) => {
  let fieldTemplateData = await fieldTemplate.findByPk(args['fieldTemplateId'])
  if(!fieldTemplateData) return null
  return JSON.parse(JSON.stringify(fieldTemplateData))
}
const FieldTemplatesQuery = async (parent: any, args: any, context: any, info: any) => {
  let fieldTemplateData = await fieldTemplate.findAll({where: {archive: {[Op.not]: true}}})
  if(!fieldTemplateData) return null
  return JSON.parse(JSON.stringify(fieldTemplateData))
}
const FieldTemplatesInFormTemplateQuery = async (parent: any, args: any, context: any, info: any) => {

}
const FormTemplateQuery = async (parent: any, args: any, context: any, info: any) => {
  let formTemplateData = await formTemplate.findByPk(args['formTemplateId'])
  if(!formTemplateData) return null
  return JSON.parse(JSON.stringify(formTemplateData))
}
const FormTemplatesQuery = async (parent: any, args: any, context: any, info: any) => {
  let formTemplateData = await formTemplate.findAll({where: {archive: {[Op.not]: true}}})
  if(!formTemplateData) return null
  return JSON.parse(JSON.stringify(formTemplateData))
}
const QueueQuery = async (parent: any, args: any, context: any, info: any) => {
  let queueId = args['queueId']
  let queueWorkRoleData = await queueWorkRole.findAll({where: {
    archive: {[Op.not]: true},
    role: {[Op.or]: context.roles}
  }})
  let queueManageRoleData = await queueWorkRole.findAll({where: {
    archive: {[Op.not]: true},
    role: {[Op.or]: context.roles}
  }})
  if(
    !context.amAdmin && 
    !queueWorkRoleData.map(qwr => qwr.queueId).includes(queueId) &&
    !queueManageRoleData.map(qwr => qwr.queueId).includes(queueId)
  ) return null
  let queueData = await queue.findByPk(queueId)
  if(!queueData) return null
  return JSON.parse(JSON.stringify(queueData))
}
const QueuesQuery = async (parent: any, args: any, context: any, info: any) => {
  let workManage = args['workManage']
  let queueWorkRoleData = await queueWorkRole.findAll({where: {
    archive: {[Op.not]: true},
    role: {[Op.or]: context.roles}
  }})
  let queueManageRoleData = await queueWorkRole.findAll({where: {
    archive: {[Op.not]: true},
    role: {[Op.or]: context.roles}
  }})
  let queues = await queue.findAll({where: {
    archive: {[Op.not]: true},
    [Op.or]: [
      !workManage && context.amAdmin,
      {[Op.and]: [
        workManage === 'WORK',
        {queueId: {[Op.or]: queueWorkRoleData.map(qwr => qwr.queueId)}}
      ]},
      {[Op.and]: [
        workManage === 'MANAGE',
        {queueId: {[Op.or]: queueManageRoleData.map(qmr => qmr.queueId)}}
      ]}
    ]
  }})
  if(!queues) return null;
  return JSON.parse(JSON.stringify(queues))
}


const UserQuery = async (parent: any, args: any, context: any, info: any) => {
  let userId = args['userId']
  if(context.amAdmin){
    let userData = await user.findByPk(userId)
    if(!userData) return null;
    return JSON.parse(JSON.stringify(userData))
  }
}
const UsersQuery = async (parent: any, args: any, context: any, info: any) => {
  if(!context.amAdmin) return null
  let users = await user.findAll({where: {
    archive: {[Op.not]: true}
  }})
  if(!users) return null
  return JSON.parse(JSON.stringify(users))
}
const AmQueueMember = async (queueId: string, roles: string[]) => {
  let queueRole = await queueWorkRole.findOne({where: {
    archive: {[Op.not]: true},
    queueId: queueId,
    role: {[Op.or]: roles}
  }})
  let queueRoleManage = await queueManageRole.findOne({where: {
    archive: {[Op.not]: true},
    queueId: queueId,
    role: {[Op.or]: roles}
  }})
  return queueRole || queueRoleManage ? true : false
}
const WorkQuery = async (parent: any, args: any, context: any, info: any) => {
  let workId = args['workId']
  let workItem = await work.findByPk(workId)
  if(!workItem) return null
  let amQueueWorker = await AmQueueMember(workItem.queueId, context.roles)
  if(amQueueWorker) return workItem
  return null
}
const WorksQuery = async (parent: any, args: any, context: any, info: any) => {
  let queueId = args['queueId']
  let queueIds = [] as string[]
  if(queueId){
    let amQueueMember = await AmQueueMember(queueId, context.roles)
    if(!amQueueMember) return null
    queueIds.push(queueId)
  }else{
    let workQueues: queue[] = await QueuesQuery(parent, {}, context, info)
    queueIds.concat(workQueues.map(wq => wq.queueId))
  }
  let works = await work.findAll({where: {
    archive: {[Op.not]: true},
    queueId: {[Op.or]: queueIds}
  }})
  if(!works) return null
  return JSON.parse(JSON.stringify(works))
}
const WorkDataListQuery = async (parent: any, args: any, context: any, info: any) => {
  let workId = args['workId']
  let fieldTemplateId = args['fieldTemplateId']
  let workItem = await work.findByPk(workId)
  if(!workItem) return null
  let amQueueMember = AmQueueMember(workItem.queueId, context.roles)
  if(!amQueueMember) return null
  let workDataListData = await workDataList.findAll({where: {
    archive: {[Op.not]: true},
    workId: workId,
    fieldTemplateId: fieldTemplateId
  }})
  if(!workDataListData) return null
  return JSON.parse(JSON.stringify(workDataListData))
}
const WorkDataListsQuery = async (parent: any, args: any, context: any, info: any) => {
  let workId = args['workId']
  let workItem = await work.findByPk(workId)
  if(!workItem) return null
  let amQueueMember = AmQueueMember(workItem.queueId, context.roles)
  if(!amQueueMember) return null
  let workDataListData = await workDataList.findAll({where: {
    archive: {[Op.not]: true},
    workId: workId
  }})
  if(!workDataListData) return null
  return JSON.parse(JSON.stringify(workDataListData))
}
const WorkDataValueQuery = async (parent: any, args: any, context: any, info: any) => {
  let workId = args['workId']
  let fieldTemplateId = args['fieldTemplateId']
  let workItem = await work.findByPk(workId)
  if(!workItem) return null
  let amQueueMember = AmQueueMember(workItem.queueId, context.roles)
  if(!amQueueMember) return null
  let workDataValueData = await workDataValue.findOne({where: {
    archive: {[Op.not]: true},
    workId: workId,
    fieldTemplateId: fieldTemplateId
  }})
  if(!workDataValueData) return null
  return JSON.parse(JSON.stringify(workDataValueData))
}
const WorkDataValuesQuery = async (parent: any, args: any, context: any, info: any) => {
  let workId = args['workId']
  let workItem = await work.findByPk(workId)
  if(!workItem) return null
  let amQueueMember = AmQueueMember(workItem.queueId, context.roles)
  if(!amQueueMember) return null
  let workDataValueData = await workDataValue.findAll({where: {
    archive: {[Op.not]: true},
    workId: workId
  }})
  if(!workDataValueData) return null
  return JSON.parse(JSON.stringify(workDataValueData))
}
export const Query = {
  AmAdmin: AmAdminQuery,
  AmQueueWorker: AmQueueWorkerQuery,
  AmQueueManager: AmQueueManagerQuery,
  MyUser: MyUserQuery,
  AdminRole: AdminRoleQuery,
  AdminRoles: AdminRolesQuery,
  FieldTemplate: FieldTemplateQuery,
  FieldTemplates: FieldTemplatesQuery,
  FieldTemplatesInFormTemplate: FieldTemplatesInFormTemplateQuery,
  FormTemplate: FormTemplateQuery,
  FormTemplates: FormTemplatesQuery,
  Queue: QueueQuery,
  Queues: QueuesQuery,
  User: UserQuery,
  Users: UsersQuery,
  Work: WorkQuery,
  Works: WorksQuery,
  WorkDataList: WorkDataListQuery,
  WorkDataLists: WorkDataListsQuery,
  WorkDataValue: WorkDataValueQuery,
  WorkDataValues: WorkDataValuesQuery
}

export const Mutation = {
  createForm: (parent: any, args: any, context: any, info: any) => {}
}

export const Subscription = {}







