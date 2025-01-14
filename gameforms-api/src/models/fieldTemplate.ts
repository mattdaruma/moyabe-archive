import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { fieldTemplateInFormTemplate, fieldTemplateInFormTemplateId } from './fieldTemplateInFormTemplate';
import type { workDataList, workDataListId } from './workDataList';
import type { workDataValue, workDataValueId } from './workDataValue';

export interface fieldTemplateAttributes {
  fieldTemplateId: string;
  name: string;
  label: string;
  type: boolean;
  icon?: string;
  color?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  requiredTrue?: boolean;
  max?: number;
  min?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  archive?: boolean;
  archiveDate?: number;
  archiveByUserId?: string;
  createdDate: number;
  createdByUserId: string;
}

export type fieldTemplatePk = "fieldTemplateId";
export type fieldTemplateId = fieldTemplate[fieldTemplatePk];
export type fieldTemplateCreationAttributes = Optional<fieldTemplateAttributes, fieldTemplatePk>;

export class fieldTemplate extends Model<fieldTemplateAttributes, fieldTemplateCreationAttributes> implements fieldTemplateAttributes {
  fieldTemplateId!: string;
  name!: string;
  label!: string;
  type!: boolean;
  icon?: string;
  color?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  requiredTrue?: boolean;
  max?: number;
  min?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  archive?: boolean;
  archiveDate?: number;
  archiveByUserId?: string;
  createdDate!: number;
  createdByUserId!: string;

  // fieldTemplate hasMany fieldTemplateInFormTemplate via fieldTemplateId
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
  // fieldTemplate hasMany workDataList via fieldTemplateId
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
  // fieldTemplate hasMany workDataValue via fieldTemplateId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof fieldTemplate {
    fieldTemplate.init({
    fieldTemplateId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "fieldId",
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "name"
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "label"
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "t"
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "icon"
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "c"
    },
    hint: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "h"
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "disabled"
    },
    required: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "r"
    },
    requiredTrue: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "requiredTrue"
    },
    max: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "m"
    },
    min: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "v"
    },
    maxLength: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "maxLength"
    },
    minLength: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "minLength"
    },
    pattern: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "asdf"
    },
    archive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "a"
    },
    archiveDate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "ad"
    },
    archiveByUserId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: "ab"
    },
    createdDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "cd"
    },
    createdByUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "cb"
    }
  }, {
    sequelize,
    tableName: 'fieldTemplate',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "fieldTemplate_pkey",
        unique: true,
        fields: [
          { name: "fieldTemplateId" },
        ]
      },
    ]
  });
  return fieldTemplate;
  }
}
