import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { adminRole, adminRoleId } from './adminRole';
import type { fieldTemplateInFormTemplate, fieldTemplateInFormTemplateId } from './fieldTemplateInFormTemplate';
import type { formTemplate, formTemplateId } from './formTemplate';
import type { queue, queueId } from './queue';
import type { queueManageRole, queueManageRoleId } from './queueManageRole';
import type { queueWorkRole, queueWorkRoleId } from './queueWorkRole';
import type { work, workId } from './work';
import type { workDataList, workDataListId } from './workDataList';
import type { workDataValue, workDataValueId } from './workDataValue';

export interface userAttributes {
  userId: string;
  identity: string;
  display: string;
  createdByUserId?: string;
  archiveByUserId?: string;
  createdDate: number;
  archiveDate?: number;
  archive?: boolean;
}

export type userPk = "userId";
export type userId = user[userPk];
export type userCreationAttributes = Optional<userAttributes, userPk>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  userId!: string;
  identity!: string;
  display!: string;
  createdByUserId?: string;
  archiveByUserId?: string;
  createdDate!: number;
  archiveDate?: number;
  archive?: boolean;

  // user hasMany adminRole via archiveByUserId
  adminRoles!: adminRole[];
  getAdminRoles!: Sequelize.HasManyGetAssociationsMixin<adminRole>;
  setAdminRoles!: Sequelize.HasManySetAssociationsMixin<adminRole, adminRoleId>;
  addAdminRole!: Sequelize.HasManyAddAssociationMixin<adminRole, adminRoleId>;
  addAdminRoles!: Sequelize.HasManyAddAssociationsMixin<adminRole, adminRoleId>;
  createAdminRole!: Sequelize.HasManyCreateAssociationMixin<adminRole>;
  removeAdminRole!: Sequelize.HasManyRemoveAssociationMixin<adminRole, adminRoleId>;
  removeAdminRoles!: Sequelize.HasManyRemoveAssociationsMixin<adminRole, adminRoleId>;
  hasAdminRole!: Sequelize.HasManyHasAssociationMixin<adminRole, adminRoleId>;
  hasAdminRoles!: Sequelize.HasManyHasAssociationsMixin<adminRole, adminRoleId>;
  countAdminRoles!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany adminRole via createdByUserId
  createdByUser_adminRoles!: adminRole[];
  getCreatedByUser_adminRoles!: Sequelize.HasManyGetAssociationsMixin<adminRole>;
  setCreatedByUser_adminRoles!: Sequelize.HasManySetAssociationsMixin<adminRole, adminRoleId>;
  addCreatedByUser_adminRole!: Sequelize.HasManyAddAssociationMixin<adminRole, adminRoleId>;
  addCreatedByUser_adminRoles!: Sequelize.HasManyAddAssociationsMixin<adminRole, adminRoleId>;
  createCreatedByUser_adminRole!: Sequelize.HasManyCreateAssociationMixin<adminRole>;
  removeCreatedByUser_adminRole!: Sequelize.HasManyRemoveAssociationMixin<adminRole, adminRoleId>;
  removeCreatedByUser_adminRoles!: Sequelize.HasManyRemoveAssociationsMixin<adminRole, adminRoleId>;
  hasCreatedByUser_adminRole!: Sequelize.HasManyHasAssociationMixin<adminRole, adminRoleId>;
  hasCreatedByUser_adminRoles!: Sequelize.HasManyHasAssociationsMixin<adminRole, adminRoleId>;
  countCreatedByUser_adminRoles!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany fieldTemplateInFormTemplate via archiveByUserId
  fieldTemplateInFormTemplates!: fieldTemplateInFormTemplate[];
  getFieldTemplateInFormTemplates!: Sequelize.HasManyGetAssociationsMixin<fieldTemplateInFormTemplate>;
  setFieldTemplateInFormTemplates!: Sequelize.HasManySetAssociationsMixin<fieldTemplateInFormTemplate, fieldTemplateInFormTemplateId>;
  addFieldTemplateInFormTemplate!: Sequelize.HasManyAddAssociationMixin<fieldTemplateInFormTemplate, fieldTemplateInFormTemplateId>;
  addFieldTemplateInFormTemplates!: Sequelize.HasManyAddAssociationsMixin<fieldTemplateInFormTemplate, fieldTemplateInFormTemplateId>;
  createFieldTemplateInFormTemplate!: Sequelize.HasManyCreateAssociationMixin<fieldTemplateInFormTemplate>;
  removeFieldTemplateInFormTemplate!: Sequelize.HasManyRemoveAssociationMixin<fieldTemplateInFormTemplate, fieldTemplateInFormTemplateId>;
  removeFieldTemplateInFormTemplates!: Sequelize.HasManyRemoveAssociationsMixin<fieldTemplateInFormTemplate, fieldTemplateInFormTemplateId>;
  hasFieldTemplateInFormTemplate!: Sequelize.HasManyHasAssociationMixin<fieldTemplateInFormTemplate, fieldTemplateInFormTemplateId>;
  hasFieldTemplateInFormTemplates!: Sequelize.HasManyHasAssociationsMixin<fieldTemplateInFormTemplate, fieldTemplateInFormTemplateId>;
  countFieldTemplateInFormTemplates!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany fieldTemplateInFormTemplate via createdByUserId
  createdByUser_fieldTemplateInFormTemplates!: fieldTemplateInFormTemplate[];
  getCreatedByUser_fieldTemplateInFormTemplates!: Sequelize.HasManyGetAssociationsMixin<fieldTemplateInFormTemplate>;
  setCreatedByUser_fieldTemplateInFormTemplates!: Sequelize.HasManySetAssociationsMixin<fieldTemplateInFormTemplate, fieldTemplateInFormTemplateId>;
  addCreatedByUser_fieldTemplateInFormTemplate!: Sequelize.HasManyAddAssociationMixin<fieldTemplateInFormTemplate, fieldTemplateInFormTemplateId>;
  addCreatedByUser_fieldTemplateInFormTemplates!: Sequelize.HasManyAddAssociationsMixin<fieldTemplateInFormTemplate, fieldTemplateInFormTemplateId>;
  createCreatedByUser_fieldTemplateInFormTemplate!: Sequelize.HasManyCreateAssociationMixin<fieldTemplateInFormTemplate>;
  removeCreatedByUser_fieldTemplateInFormTemplate!: Sequelize.HasManyRemoveAssociationMixin<fieldTemplateInFormTemplate, fieldTemplateInFormTemplateId>;
  removeCreatedByUser_fieldTemplateInFormTemplates!: Sequelize.HasManyRemoveAssociationsMixin<fieldTemplateInFormTemplate, fieldTemplateInFormTemplateId>;
  hasCreatedByUser_fieldTemplateInFormTemplate!: Sequelize.HasManyHasAssociationMixin<fieldTemplateInFormTemplate, fieldTemplateInFormTemplateId>;
  hasCreatedByUser_fieldTemplateInFormTemplates!: Sequelize.HasManyHasAssociationsMixin<fieldTemplateInFormTemplate, fieldTemplateInFormTemplateId>;
  countCreatedByUser_fieldTemplateInFormTemplates!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany formTemplate via archiveByUserId
  formTemplates!: formTemplate[];
  getFormTemplates!: Sequelize.HasManyGetAssociationsMixin<formTemplate>;
  setFormTemplates!: Sequelize.HasManySetAssociationsMixin<formTemplate, formTemplateId>;
  addFormTemplate!: Sequelize.HasManyAddAssociationMixin<formTemplate, formTemplateId>;
  addFormTemplates!: Sequelize.HasManyAddAssociationsMixin<formTemplate, formTemplateId>;
  createFormTemplate!: Sequelize.HasManyCreateAssociationMixin<formTemplate>;
  removeFormTemplate!: Sequelize.HasManyRemoveAssociationMixin<formTemplate, formTemplateId>;
  removeFormTemplates!: Sequelize.HasManyRemoveAssociationsMixin<formTemplate, formTemplateId>;
  hasFormTemplate!: Sequelize.HasManyHasAssociationMixin<formTemplate, formTemplateId>;
  hasFormTemplates!: Sequelize.HasManyHasAssociationsMixin<formTemplate, formTemplateId>;
  countFormTemplates!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany formTemplate via createdByUserId
  createdByUser_formTemplates!: formTemplate[];
  getCreatedByUser_formTemplates!: Sequelize.HasManyGetAssociationsMixin<formTemplate>;
  setCreatedByUser_formTemplates!: Sequelize.HasManySetAssociationsMixin<formTemplate, formTemplateId>;
  addCreatedByUser_formTemplate!: Sequelize.HasManyAddAssociationMixin<formTemplate, formTemplateId>;
  addCreatedByUser_formTemplates!: Sequelize.HasManyAddAssociationsMixin<formTemplate, formTemplateId>;
  createCreatedByUser_formTemplate!: Sequelize.HasManyCreateAssociationMixin<formTemplate>;
  removeCreatedByUser_formTemplate!: Sequelize.HasManyRemoveAssociationMixin<formTemplate, formTemplateId>;
  removeCreatedByUser_formTemplates!: Sequelize.HasManyRemoveAssociationsMixin<formTemplate, formTemplateId>;
  hasCreatedByUser_formTemplate!: Sequelize.HasManyHasAssociationMixin<formTemplate, formTemplateId>;
  hasCreatedByUser_formTemplates!: Sequelize.HasManyHasAssociationsMixin<formTemplate, formTemplateId>;
  countCreatedByUser_formTemplates!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany queue via archiveByUserId
  queues!: queue[];
  getQueues!: Sequelize.HasManyGetAssociationsMixin<queue>;
  setQueues!: Sequelize.HasManySetAssociationsMixin<queue, queueId>;
  addQueue!: Sequelize.HasManyAddAssociationMixin<queue, queueId>;
  addQueues!: Sequelize.HasManyAddAssociationsMixin<queue, queueId>;
  createQueue!: Sequelize.HasManyCreateAssociationMixin<queue>;
  removeQueue!: Sequelize.HasManyRemoveAssociationMixin<queue, queueId>;
  removeQueues!: Sequelize.HasManyRemoveAssociationsMixin<queue, queueId>;
  hasQueue!: Sequelize.HasManyHasAssociationMixin<queue, queueId>;
  hasQueues!: Sequelize.HasManyHasAssociationsMixin<queue, queueId>;
  countQueues!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany queue via createdByUserId
  createdByUser_queues!: queue[];
  getCreatedByUser_queues!: Sequelize.HasManyGetAssociationsMixin<queue>;
  setCreatedByUser_queues!: Sequelize.HasManySetAssociationsMixin<queue, queueId>;
  addCreatedByUser_queue!: Sequelize.HasManyAddAssociationMixin<queue, queueId>;
  addCreatedByUser_queues!: Sequelize.HasManyAddAssociationsMixin<queue, queueId>;
  createCreatedByUser_queue!: Sequelize.HasManyCreateAssociationMixin<queue>;
  removeCreatedByUser_queue!: Sequelize.HasManyRemoveAssociationMixin<queue, queueId>;
  removeCreatedByUser_queues!: Sequelize.HasManyRemoveAssociationsMixin<queue, queueId>;
  hasCreatedByUser_queue!: Sequelize.HasManyHasAssociationMixin<queue, queueId>;
  hasCreatedByUser_queues!: Sequelize.HasManyHasAssociationsMixin<queue, queueId>;
  countCreatedByUser_queues!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany queueManageRole via createdByUserId
  queueManageRoles!: queueManageRole[];
  getQueueManageRoles!: Sequelize.HasManyGetAssociationsMixin<queueManageRole>;
  setQueueManageRoles!: Sequelize.HasManySetAssociationsMixin<queueManageRole, queueManageRoleId>;
  addQueueManageRole!: Sequelize.HasManyAddAssociationMixin<queueManageRole, queueManageRoleId>;
  addQueueManageRoles!: Sequelize.HasManyAddAssociationsMixin<queueManageRole, queueManageRoleId>;
  createQueueManageRole!: Sequelize.HasManyCreateAssociationMixin<queueManageRole>;
  removeQueueManageRole!: Sequelize.HasManyRemoveAssociationMixin<queueManageRole, queueManageRoleId>;
  removeQueueManageRoles!: Sequelize.HasManyRemoveAssociationsMixin<queueManageRole, queueManageRoleId>;
  hasQueueManageRole!: Sequelize.HasManyHasAssociationMixin<queueManageRole, queueManageRoleId>;
  hasQueueManageRoles!: Sequelize.HasManyHasAssociationsMixin<queueManageRole, queueManageRoleId>;
  countQueueManageRoles!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany queueWorkRole via archiveByUserId
  queueWorkRoles!: queueWorkRole[];
  getQueueWorkRoles!: Sequelize.HasManyGetAssociationsMixin<queueWorkRole>;
  setQueueWorkRoles!: Sequelize.HasManySetAssociationsMixin<queueWorkRole, queueWorkRoleId>;
  addQueueWorkRole!: Sequelize.HasManyAddAssociationMixin<queueWorkRole, queueWorkRoleId>;
  addQueueWorkRoles!: Sequelize.HasManyAddAssociationsMixin<queueWorkRole, queueWorkRoleId>;
  createQueueWorkRole!: Sequelize.HasManyCreateAssociationMixin<queueWorkRole>;
  removeQueueWorkRole!: Sequelize.HasManyRemoveAssociationMixin<queueWorkRole, queueWorkRoleId>;
  removeQueueWorkRoles!: Sequelize.HasManyRemoveAssociationsMixin<queueWorkRole, queueWorkRoleId>;
  hasQueueWorkRole!: Sequelize.HasManyHasAssociationMixin<queueWorkRole, queueWorkRoleId>;
  hasQueueWorkRoles!: Sequelize.HasManyHasAssociationsMixin<queueWorkRole, queueWorkRoleId>;
  countQueueWorkRoles!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany queueWorkRole via createdByUserId
  createdByUser_queueWorkRoles!: queueWorkRole[];
  getCreatedByUser_queueWorkRoles!: Sequelize.HasManyGetAssociationsMixin<queueWorkRole>;
  setCreatedByUser_queueWorkRoles!: Sequelize.HasManySetAssociationsMixin<queueWorkRole, queueWorkRoleId>;
  addCreatedByUser_queueWorkRole!: Sequelize.HasManyAddAssociationMixin<queueWorkRole, queueWorkRoleId>;
  addCreatedByUser_queueWorkRoles!: Sequelize.HasManyAddAssociationsMixin<queueWorkRole, queueWorkRoleId>;
  createCreatedByUser_queueWorkRole!: Sequelize.HasManyCreateAssociationMixin<queueWorkRole>;
  removeCreatedByUser_queueWorkRole!: Sequelize.HasManyRemoveAssociationMixin<queueWorkRole, queueWorkRoleId>;
  removeCreatedByUser_queueWorkRoles!: Sequelize.HasManyRemoveAssociationsMixin<queueWorkRole, queueWorkRoleId>;
  hasCreatedByUser_queueWorkRole!: Sequelize.HasManyHasAssociationMixin<queueWorkRole, queueWorkRoleId>;
  hasCreatedByUser_queueWorkRoles!: Sequelize.HasManyHasAssociationsMixin<queueWorkRole, queueWorkRoleId>;
  countCreatedByUser_queueWorkRoles!: Sequelize.HasManyCountAssociationsMixin;
  // user belongsTo user via archiveByUserId
  archiveByUser!: user;
  getArchiveByUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setArchiveByUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createArchiveByUser!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // user belongsTo user via userId
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // user hasMany work via createdByUserId
  works!: work[];
  getWorks!: Sequelize.HasManyGetAssociationsMixin<work>;
  setWorks!: Sequelize.HasManySetAssociationsMixin<work, workId>;
  addWork!: Sequelize.HasManyAddAssociationMixin<work, workId>;
  addWorks!: Sequelize.HasManyAddAssociationsMixin<work, workId>;
  createWork!: Sequelize.HasManyCreateAssociationMixin<work>;
  removeWork!: Sequelize.HasManyRemoveAssociationMixin<work, workId>;
  removeWorks!: Sequelize.HasManyRemoveAssociationsMixin<work, workId>;
  hasWork!: Sequelize.HasManyHasAssociationMixin<work, workId>;
  hasWorks!: Sequelize.HasManyHasAssociationsMixin<work, workId>;
  countWorks!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany workDataList via archiveByUserId
  workDataLists!: workDataList[];
  getWorkDataLists!: Sequelize.HasManyGetAssociationsMixin<workDataList>;
  setWorkDataLists!: Sequelize.HasManySetAssociationsMixin<workDataList, workDataListId>;
  addWorkDataList!: Sequelize.HasManyAddAssociationMixin<workDataList, workDataListId>;
  addWorkDataLists!: Sequelize.HasManyAddAssociationsMixin<workDataList, workDataListId>;
  createWorkDataList!: Sequelize.HasManyCreateAssociationMixin<workDataList>;
  removeWorkDataList!: Sequelize.HasManyRemoveAssociationMixin<workDataList, workDataListId>;
  removeWorkDataLists!: Sequelize.HasManyRemoveAssociationsMixin<workDataList, workDataListId>;
  hasWorkDataList!: Sequelize.HasManyHasAssociationMixin<workDataList, workDataListId>;
  hasWorkDataLists!: Sequelize.HasManyHasAssociationsMixin<workDataList, workDataListId>;
  countWorkDataLists!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany workDataList via createdByUserId
  createdByUser_workDataLists!: workDataList[];
  getCreatedByUser_workDataLists!: Sequelize.HasManyGetAssociationsMixin<workDataList>;
  setCreatedByUser_workDataLists!: Sequelize.HasManySetAssociationsMixin<workDataList, workDataListId>;
  addCreatedByUser_workDataList!: Sequelize.HasManyAddAssociationMixin<workDataList, workDataListId>;
  addCreatedByUser_workDataLists!: Sequelize.HasManyAddAssociationsMixin<workDataList, workDataListId>;
  createCreatedByUser_workDataList!: Sequelize.HasManyCreateAssociationMixin<workDataList>;
  removeCreatedByUser_workDataList!: Sequelize.HasManyRemoveAssociationMixin<workDataList, workDataListId>;
  removeCreatedByUser_workDataLists!: Sequelize.HasManyRemoveAssociationsMixin<workDataList, workDataListId>;
  hasCreatedByUser_workDataList!: Sequelize.HasManyHasAssociationMixin<workDataList, workDataListId>;
  hasCreatedByUser_workDataLists!: Sequelize.HasManyHasAssociationsMixin<workDataList, workDataListId>;
  countCreatedByUser_workDataLists!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany workDataValue via archiveByUserId
  workDataValues!: workDataValue[];
  getWorkDataValues!: Sequelize.HasManyGetAssociationsMixin<workDataValue>;
  setWorkDataValues!: Sequelize.HasManySetAssociationsMixin<workDataValue, workDataValueId>;
  addWorkDataValue!: Sequelize.HasManyAddAssociationMixin<workDataValue, workDataValueId>;
  addWorkDataValues!: Sequelize.HasManyAddAssociationsMixin<workDataValue, workDataValueId>;
  createWorkDataValue!: Sequelize.HasManyCreateAssociationMixin<workDataValue>;
  removeWorkDataValue!: Sequelize.HasManyRemoveAssociationMixin<workDataValue, workDataValueId>;
  removeWorkDataValues!: Sequelize.HasManyRemoveAssociationsMixin<workDataValue, workDataValueId>;
  hasWorkDataValue!: Sequelize.HasManyHasAssociationMixin<workDataValue, workDataValueId>;
  hasWorkDataValues!: Sequelize.HasManyHasAssociationsMixin<workDataValue, workDataValueId>;
  countWorkDataValues!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany workDataValue via createdByUserId
  createdByUser_workDataValues!: workDataValue[];
  getCreatedByUser_workDataValues!: Sequelize.HasManyGetAssociationsMixin<workDataValue>;
  setCreatedByUser_workDataValues!: Sequelize.HasManySetAssociationsMixin<workDataValue, workDataValueId>;
  addCreatedByUser_workDataValue!: Sequelize.HasManyAddAssociationMixin<workDataValue, workDataValueId>;
  addCreatedByUser_workDataValues!: Sequelize.HasManyAddAssociationsMixin<workDataValue, workDataValueId>;
  createCreatedByUser_workDataValue!: Sequelize.HasManyCreateAssociationMixin<workDataValue>;
  removeCreatedByUser_workDataValue!: Sequelize.HasManyRemoveAssociationMixin<workDataValue, workDataValueId>;
  removeCreatedByUser_workDataValues!: Sequelize.HasManyRemoveAssociationsMixin<workDataValue, workDataValueId>;
  hasCreatedByUser_workDataValue!: Sequelize.HasManyHasAssociationMixin<workDataValue, workDataValueId>;
  hasCreatedByUser_workDataValues!: Sequelize.HasManyHasAssociationsMixin<workDataValue, workDataValueId>;
  countCreatedByUser_workDataValues!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    user.init({
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'userId'
      }
    },
    identity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    display: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdByUserId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: "createdByUser"
    },
    archiveByUserId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: "archiveByUserId",
      references: {
        model: 'user',
        key: 'userId'
      }
    },
    createdDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "cd"
    },
    archiveDate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "ad"
    },
    archive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "arc"
    }
  }, {
    sequelize,
    tableName: 'user',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "fki_userArchiveByUserId_fkey",
        fields: [
          { name: "archiveByUserId" },
        ]
      },
      {
        name: "user_pkey",
        unique: true,
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  return user;
  }
}
