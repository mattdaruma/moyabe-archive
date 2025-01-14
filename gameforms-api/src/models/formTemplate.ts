import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { fieldTemplateInFormTemplate, fieldTemplateInFormTemplateId } from './fieldTemplateInFormTemplate';
import type { user, userId } from './user';
import type { work, workId } from './work';

export interface formTemplateAttributes {
  name: string;
  formTemplateId: string;
  description?: string;
  color?: string;
  icon?: string;
  mutation?: string;
  createdDate?: string;
  createdByUserId?: string;
  archive?: boolean;
  archiveDate?: string;
  archiveByUserId?: string;
}

export type formTemplatePk = "formTemplateId";
export type formTemplateId = formTemplate[formTemplatePk];
export type formTemplateCreationAttributes = Optional<formTemplateAttributes, formTemplatePk>;

export class formTemplate extends Model<formTemplateAttributes, formTemplateCreationAttributes> implements formTemplateAttributes {
  name!: string;
  formTemplateId!: string;
  description?: string;
  color?: string;
  icon?: string;
  mutation?: string;
  createdDate?: string;
  createdByUserId?: string;
  archive?: boolean;
  archiveDate?: string;
  archiveByUserId?: string;

  // formTemplate hasMany fieldTemplateInFormTemplate via formTemplateId
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
  // formTemplate hasMany work via formTemplateId
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
  // formTemplate belongsTo user via archiveByUserId
  archiveByUser!: user;
  getArchiveByUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setArchiveByUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createArchiveByUser!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // formTemplate belongsTo user via createdByUserId
  createdByUser!: user;
  getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof formTemplate {
    formTemplate.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "name comment"
    },
    formTemplateId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "form id comment",
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "description comment"
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "color comment"
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "icon comment"
    },
    mutation: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "mutation comment"
    },
    createdDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "createdDate"
    },
    createdByUserId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: "createdByUser",
      references: {
        model: 'user',
        key: 'userId'
      }
    },
    archive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "archive"
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
    tableName: 'formTemplate',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "fki_formTemplateArchiveByUserId_fkey",
        fields: [
          { name: "archiveByUserId" },
        ]
      },
      {
        name: "fki_formTemplateCreatedByUserId_fkey",
        fields: [
          { name: "createdByUserId" },
        ]
      },
      {
        name: "formtemplate_pkey",
        unique: true,
        fields: [
          { name: "formTemplateId" },
        ]
      },
    ]
  });
  return formTemplate;
  }
}
