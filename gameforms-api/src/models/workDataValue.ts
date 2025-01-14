import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { fieldTemplate, fieldTemplateId } from './fieldTemplate';
import type { user, userId } from './user';
import type { work, workId } from './work';

export interface workDataValueAttributes {
  workDataValueId: string;
  workId?: string;
  fieldTemplateId?: string;
  key?: string;
  value?: string;
  createdDate?: string;
  createdByUserId: string;
  archive?: boolean;
  archiveDate?: string;
  archiveByUserId?: string;
}

export type workDataValuePk = "workDataValueId";
export type workDataValueId = workDataValue[workDataValuePk];
export type workDataValueCreationAttributes = Optional<workDataValueAttributes, workDataValuePk>;

export class workDataValue extends Model<workDataValueAttributes, workDataValueCreationAttributes> implements workDataValueAttributes {
  workDataValueId!: string;
  workId?: string;
  fieldTemplateId?: string;
  key?: string;
  value?: string;
  createdDate?: string;
  createdByUserId!: string;
  archive?: boolean;
  archiveDate?: string;
  archiveByUserId?: string;

  // workDataValue belongsTo fieldTemplate via fieldTemplateId
  fieldTemplate!: fieldTemplate;
  getFieldTemplate!: Sequelize.BelongsToGetAssociationMixin<fieldTemplate>;
  setFieldTemplate!: Sequelize.BelongsToSetAssociationMixin<fieldTemplate, fieldTemplateId>;
  createFieldTemplate!: Sequelize.BelongsToCreateAssociationMixin<fieldTemplate>;
  // workDataValue belongsTo user via archiveByUserId
  archiveByUser!: user;
  getArchiveByUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setArchiveByUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createArchiveByUser!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // workDataValue belongsTo user via createdByUserId
  createdByUser!: user;
  getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // workDataValue belongsTo work via workId
  work!: work;
  getWork!: Sequelize.BelongsToGetAssociationMixin<work>;
  setWork!: Sequelize.BelongsToSetAssociationMixin<work, workId>;
  createWork!: Sequelize.BelongsToCreateAssociationMixin<work>;

  static initModel(sequelize: Sequelize.Sequelize): typeof workDataValue {
    workDataValue.init({
    workDataValueId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    workId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: "workId",
      references: {
        model: 'work',
        key: 'workId'
      }
    },
    fieldTemplateId: {
      type: DataTypes.UUID,
      allowNull: true,
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
      comment: "value"
    },
    createdDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "cd"
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
    tableName: 'workDataValue',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "fki_fieldId_fkey",
        fields: [
          { name: "fieldTemplateId" },
        ]
      },
      {
        name: "fki_workDataValueArchiveByUserId_fkey",
        fields: [
          { name: "archiveByUserId" },
        ]
      },
      {
        name: "fki_workDataValueCreatedByUserId_fkey",
        fields: [
          { name: "createdByUserId" },
        ]
      },
      {
        name: "fki_workId_fkey",
        fields: [
          { name: "workId" },
        ]
      },
      {
        name: "workDataValue_pkey",
        unique: true,
        fields: [
          { name: "workDataValueId" },
        ]
      },
    ]
  });
  return workDataValue;
  }
}
