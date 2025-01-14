import type { Sequelize, Model } from "sequelize";
import { adminRole } from "./adminRole";
import type { adminRoleAttributes, adminRoleCreationAttributes } from "./adminRole";
import { fieldTemplate } from "./fieldTemplate";
import type { fieldTemplateAttributes, fieldTemplateCreationAttributes } from "./fieldTemplate";
import { fieldTemplateInFormTemplate } from "./fieldTemplateInFormTemplate";
import type { fieldTemplateInFormTemplateAttributes, fieldTemplateInFormTemplateCreationAttributes } from "./fieldTemplateInFormTemplate";
import { formTemplate } from "./formTemplate";
import type { formTemplateAttributes, formTemplateCreationAttributes } from "./formTemplate";
import { queue } from "./queue";
import type { queueAttributes, queueCreationAttributes } from "./queue";
import { queueManageRole } from "./queueManageRole";
import type { queueManageRoleAttributes, queueManageRoleCreationAttributes } from "./queueManageRole";
import { queueWorkRole } from "./queueWorkRole";
import type { queueWorkRoleAttributes, queueWorkRoleCreationAttributes } from "./queueWorkRole";
import { user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";
import { work } from "./work";
import type { workAttributes, workCreationAttributes } from "./work";
import { workDataList } from "./workDataList";
import type { workDataListAttributes, workDataListCreationAttributes } from "./workDataList";
import { workDataValue } from "./workDataValue";
import type { workDataValueAttributes, workDataValueCreationAttributes } from "./workDataValue";

export {
  adminRole,
  fieldTemplate,
  fieldTemplateInFormTemplate,
  formTemplate,
  queue,
  queueManageRole,
  queueWorkRole,
  user,
  work,
  workDataList,
  workDataValue,
};

export type {
  adminRoleAttributes,
  adminRoleCreationAttributes,
  fieldTemplateAttributes,
  fieldTemplateCreationAttributes,
  fieldTemplateInFormTemplateAttributes,
  fieldTemplateInFormTemplateCreationAttributes,
  formTemplateAttributes,
  formTemplateCreationAttributes,
  queueAttributes,
  queueCreationAttributes,
  queueManageRoleAttributes,
  queueManageRoleCreationAttributes,
  queueWorkRoleAttributes,
  queueWorkRoleCreationAttributes,
  userAttributes,
  userCreationAttributes,
  workAttributes,
  workCreationAttributes,
  workDataListAttributes,
  workDataListCreationAttributes,
  workDataValueAttributes,
  workDataValueCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  adminRole.initModel(sequelize);
  fieldTemplate.initModel(sequelize);
  fieldTemplateInFormTemplate.initModel(sequelize);
  formTemplate.initModel(sequelize);
  queue.initModel(sequelize);
  queueManageRole.initModel(sequelize);
  queueWorkRole.initModel(sequelize);
  user.initModel(sequelize);
  work.initModel(sequelize);
  workDataList.initModel(sequelize);
  workDataValue.initModel(sequelize);

  fieldTemplateInFormTemplate.belongsTo(fieldTemplate, { as: "fieldTemplate", foreignKey: "fieldTemplateId"});
  fieldTemplate.hasMany(fieldTemplateInFormTemplate, { as: "fieldTemplateInFormTemplates", foreignKey: "fieldTemplateId"});
  workDataList.belongsTo(fieldTemplate, { as: "fieldTemplate", foreignKey: "fieldTemplateId"});
  fieldTemplate.hasMany(workDataList, { as: "workDataLists", foreignKey: "fieldTemplateId"});
  workDataValue.belongsTo(fieldTemplate, { as: "fieldTemplate", foreignKey: "fieldTemplateId"});
  fieldTemplate.hasMany(workDataValue, { as: "workDataValues", foreignKey: "fieldTemplateId"});
  fieldTemplateInFormTemplate.belongsTo(formTemplate, { as: "formTemplate", foreignKey: "formTemplateId"});
  formTemplate.hasMany(fieldTemplateInFormTemplate, { as: "fieldTemplateInFormTemplates", foreignKey: "formTemplateId"});
  work.belongsTo(formTemplate, { as: "formTemplate", foreignKey: "formTemplateId"});
  formTemplate.hasMany(work, { as: "works", foreignKey: "formTemplateId"});
  queueManageRole.belongsTo(queue, { as: "queue", foreignKey: "queueId"});
  queue.hasMany(queueManageRole, { as: "queueManageRoles", foreignKey: "queueId"});
  queueWorkRole.belongsTo(queue, { as: "queue", foreignKey: "queueId"});
  queue.hasMany(queueWorkRole, { as: "queueWorkRoles", foreignKey: "queueId"});
  work.belongsTo(queue, { as: "queue", foreignKey: "queueId"});
  queue.hasMany(work, { as: "works", foreignKey: "queueId"});
  adminRole.belongsTo(user, { as: "archiveByUser", foreignKey: "archiveByUserId"});
  user.hasMany(adminRole, { as: "adminRoles", foreignKey: "archiveByUserId"});
  adminRole.belongsTo(user, { as: "createdByUser", foreignKey: "createdByUserId"});
  user.hasMany(adminRole, { as: "createdByUser_adminRoles", foreignKey: "createdByUserId"});
  fieldTemplateInFormTemplate.belongsTo(user, { as: "archiveByUser", foreignKey: "archiveByUserId"});
  user.hasMany(fieldTemplateInFormTemplate, { as: "fieldTemplateInFormTemplates", foreignKey: "archiveByUserId"});
  fieldTemplateInFormTemplate.belongsTo(user, { as: "createdByUser", foreignKey: "createdByUserId"});
  user.hasMany(fieldTemplateInFormTemplate, { as: "createdByUser_fieldTemplateInFormTemplates", foreignKey: "createdByUserId"});
  formTemplate.belongsTo(user, { as: "archiveByUser", foreignKey: "archiveByUserId"});
  user.hasMany(formTemplate, { as: "formTemplates", foreignKey: "archiveByUserId"});
  formTemplate.belongsTo(user, { as: "createdByUser", foreignKey: "createdByUserId"});
  user.hasMany(formTemplate, { as: "createdByUser_formTemplates", foreignKey: "createdByUserId"});
  queue.belongsTo(user, { as: "archiveByUser", foreignKey: "archiveByUserId"});
  user.hasMany(queue, { as: "queues", foreignKey: "archiveByUserId"});
  queue.belongsTo(user, { as: "createdByUser", foreignKey: "createdByUserId"});
  user.hasMany(queue, { as: "createdByUser_queues", foreignKey: "createdByUserId"});
  queueManageRole.belongsTo(user, { as: "createdByUser", foreignKey: "createdByUserId"});
  user.hasMany(queueManageRole, { as: "queueManageRoles", foreignKey: "createdByUserId"});
  queueWorkRole.belongsTo(user, { as: "archiveByUser", foreignKey: "archiveByUserId"});
  user.hasMany(queueWorkRole, { as: "queueWorkRoles", foreignKey: "archiveByUserId"});
  queueWorkRole.belongsTo(user, { as: "createdByUser", foreignKey: "createdByUserId"});
  user.hasMany(queueWorkRole, { as: "createdByUser_queueWorkRoles", foreignKey: "createdByUserId"});
  user.belongsTo(user, { as: "archiveByUser", foreignKey: "archiveByUserId"});
  user.hasMany(user, { as: "users", foreignKey: "archiveByUserId"});
  user.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasOne(user, { as: "user_user", foreignKey: "userId"});
  work.belongsTo(user, { as: "createdByUser", foreignKey: "createdByUserId"});
  user.hasMany(work, { as: "works", foreignKey: "createdByUserId"});
  workDataList.belongsTo(user, { as: "archiveByUser", foreignKey: "archiveByUserId"});
  user.hasMany(workDataList, { as: "workDataLists", foreignKey: "archiveByUserId"});
  workDataList.belongsTo(user, { as: "createdByUser", foreignKey: "createdByUserId"});
  user.hasMany(workDataList, { as: "createdByUser_workDataLists", foreignKey: "createdByUserId"});
  workDataValue.belongsTo(user, { as: "archiveByUser", foreignKey: "archiveByUserId"});
  user.hasMany(workDataValue, { as: "workDataValues", foreignKey: "archiveByUserId"});
  workDataValue.belongsTo(user, { as: "createdByUser", foreignKey: "createdByUserId"});
  user.hasMany(workDataValue, { as: "createdByUser_workDataValues", foreignKey: "createdByUserId"});
  workDataList.belongsTo(work, { as: "work", foreignKey: "workId"});
  work.hasMany(workDataList, { as: "workDataLists", foreignKey: "workId"});
  workDataValue.belongsTo(work, { as: "work", foreignKey: "workId"});
  work.hasMany(workDataValue, { as: "workDataValues", foreignKey: "workId"});

  return {
    adminRole: adminRole,
    fieldTemplate: fieldTemplate,
    fieldTemplateInFormTemplate: fieldTemplateInFormTemplate,
    formTemplate: formTemplate,
    queue: queue,
    queueManageRole: queueManageRole,
    queueWorkRole: queueWorkRole,
    user: user,
    work: work,
    workDataList: workDataList,
    workDataValue: workDataValue,
  };
}
