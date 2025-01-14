import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { fieldTemplate, fieldTemplateId } from './fieldTemplate';
import type { user, userId } from './user';
import type { work, workId } from './work';

export interface workDataListAttributes {
  workDataListId: string;
  workId: string;
  fieldTemplateId: string;
  key?: string;
  value?: string;
  createdDate?: string;
  createdByUserId: string;
  archive?: boolean;
  archiveDate?: string;
  archiveByUserId?: string;
}

export type workDataListPk = "workDataListId";
export type workDataListId = workDataList[workDataListPk];
export type workDataListCreationAttributes = Optional<workDataListAttributes, workDataListPk>;

export class workDataList extends Model<workDataListAttributes, workDataListCreationAttributes> implements workDataListAttributes {
  workDataListId!: string;
  workId!: string;
  fieldTemplateId!: string;
  key?: string;
  value?: string;
  createdDate?: string;
  createdByUserId!: string;
  archive?: boolean;
  archiveDate?: string;
  archiveByUserId?: string;

  // workDataList belongsTo fieldTemplate via fieldTemplateId
  fieldTemplate!: fieldTemplate;
  getFieldTemplate!: Sequelize.BelongsToGetAssociationMixin<fieldTemplate>;
  setFieldTemplate!: Sequelize.BelongsToSetAssociationMixin<fieldTemplate, fieldTemplateId>;
  createFieldTemplate!: Sequelize.BelongsToCreateAssociationMixin<fieldTemplate>;
  // workDataList belongsTo user via archiveByUserId
  archiveByUser!: user;
  getArchiveByUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setArchiveByUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createArchiveByUser!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // workDataList belongsTo user via createdByUserId
  createdByUser!: user;
  getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // workDataList belongsTo work via workId
  work!: work;
  getWork!: Sequelize.BelongsToGetAssociationMixin<work>;
  setWork!: Sequelize.BelongsToSetAssociationMixin<work, workId>;
  createWork!: Sequelize.BelongsToCreateAssociationMixin<work>;

  static initModel(sequelize: Sequelize.Sequelize): typeof workDataList {
    workDataList.init({
    workDataListId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "datalistId",
      primaryKey: true
    },
    workId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "workId",
      references: {
        model: 'work',
        key: 'workId'
      }
    },
    fieldTemplateId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "fieldId",
      references: {
        model: 'fieldTemplate',
        key: 'fieldTemplateId'
      }
    },
    key: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "key"
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "va"
    },
    createdDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "createdDate"
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
    archive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "a"
    },
    archiveDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "archiveDate"
    },
    archiveByUserId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: "archiveByUserId",
      references: {
        model: 'user',
        key: 'userId'
      }
    }
  }, {
    sequelize,
    tableName: 'workDataList',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "fki_workDataListArchiveByUserId_fkey",
        fields: [
          { name: "archiveByUserId" },
        ]
      },
      {
        name: "fki_workDataListCreatedByUserId_fkey",
        fields: [
          { name: "createdByUserId" },
        ]
      },
      {
        name: "fki_workDataListFieldId_fkey",
        fields: [
          { name: "fieldTemplateId" },
        ]
      },
      {
        name: "fki_workDataListWorkId_fkey",
        fields: [
          { name: "workId" },
        ]
      },
      {
        name: "workListData_pkey",
        unique: true,
        fields: [
          { name: "workDataListId" },
        ]
      },
    ]
  });
  return workDataList;
  }
}
