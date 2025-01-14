import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { formTemplate, formTemplateId } from './formTemplate';
import type { queue, queueId } from './queue';
import type { user, userId } from './user';
import type { workDataList, workDataListId } from './workDataList';
import type { workDataValue, workDataValueId } from './workDataValue';

export interface workAttributes {
  workId: string;
  complete?: boolean;
  formTemplateId: string;
  createdByUserId: string;
  archiveByUserId?: string;
  createdDate: number;
  archive?: boolean;
  archiveDate?: number;
  queueId: string;
}

export type workPk = "workId";
export type workId = work[workPk];
export type workCreationAttributes = Optional<workAttributes, workPk>;

export class work extends Model<workAttributes, workCreationAttributes> implements workAttributes {
  workId!: string;
  complete?: boolean;
  formTemplateId!: string;
  createdByUserId!: string;
  archiveByUserId?: string;
  createdDate!: number;
  archive?: boolean;
  archiveDate?: number;
  queueId!: string;

  // work belongsTo formTemplate via formTemplateId
  formTemplate!: formTemplate;
  getFormTemplate!: Sequelize.BelongsToGetAssociationMixin<formTemplate>;
  setFormTemplate!: Sequelize.BelongsToSetAssociationMixin<formTemplate, formTemplateId>;
  createFormTemplate!: Sequelize.BelongsToCreateAssociationMixin<formTemplate>;
  // work belongsTo queue via queueId
  queue!: queue;
  getQueue!: Sequelize.BelongsToGetAssociationMixin<queue>;
  setQueue!: Sequelize.BelongsToSetAssociationMixin<queue, queueId>;
  createQueue!: Sequelize.BelongsToCreateAssociationMixin<queue>;
  // work belongsTo user via createdByUserId
  createdByUser!: user;
  getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // work hasMany workDataList via workId
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
  // work hasMany workDataValue via workId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof work {
    work.init({
    workId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "workId",
      primaryKey: true
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "complete"
    },
    formTemplateId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "formTemplateId",
      references: {
        model: 'formTemplate',
        key: 'formTemplateId'
      }
    },
    createdByUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "createdByUserId",
      references: {
        model: 'user',
        key: 'userId'
      }
    },
    archiveByUserId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: "archiveByUserId"
    },
    createdDate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    archive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "arc"
    },
    archiveDate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    queueId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'queue',
        key: 'queueId'
      }
    }
  }, {
    sequelize,
    tableName: 'work',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "fki_workCreatedByUserId_fkey",
        fields: [
          { name: "createdByUserId" },
        ]
      },
      {
        name: "fki_workFormTemplateId_fkey",
        fields: [
          { name: "formTemplateId" },
        ]
      },
      {
        name: "fki_workQueueId_fkey",
        fields: [
          { name: "queueId" },
        ]
      },
      {
        name: "work_pkey",
        unique: true,
        fields: [
          { name: "workId" },
        ]
      },
    ]
  });
  return work;
  }
}
