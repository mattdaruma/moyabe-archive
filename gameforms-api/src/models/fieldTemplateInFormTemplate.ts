import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { fieldTemplate, fieldTemplateId } from './fieldTemplate';
import type { formTemplate, formTemplateId } from './formTemplate';
import type { user, userId } from './user';

export interface fieldTemplateInFormTemplateAttributes {
  fieldTemplateInFormTemplateId: string;
  fieldTemplateId: string;
  formTemplateId: string;
  createdDate?: string;
  createdByUserId: string;
  archive?: boolean;
  archiveDate?: string;
  archiveByUserId?: string;
}

export type fieldTemplateInFormTemplatePk = "fieldTemplateInFormTemplateId";
export type fieldTemplateInFormTemplateId = fieldTemplateInFormTemplate[fieldTemplateInFormTemplatePk];
export type fieldTemplateInFormTemplateCreationAttributes = Optional<fieldTemplateInFormTemplateAttributes, fieldTemplateInFormTemplatePk>;

export class fieldTemplateInFormTemplate extends Model<fieldTemplateInFormTemplateAttributes, fieldTemplateInFormTemplateCreationAttributes> implements fieldTemplateInFormTemplateAttributes {
  fieldTemplateInFormTemplateId!: string;
  fieldTemplateId!: string;
  formTemplateId!: string;
  createdDate?: string;
  createdByUserId!: string;
  archive?: boolean;
  archiveDate?: string;
  archiveByUserId?: string;

  // fieldTemplateInFormTemplate belongsTo fieldTemplate via fieldTemplateId
  fieldTemplate!: fieldTemplate;
  getFieldTemplate!: Sequelize.BelongsToGetAssociationMixin<fieldTemplate>;
  setFieldTemplate!: Sequelize.BelongsToSetAssociationMixin<fieldTemplate, fieldTemplateId>;
  createFieldTemplate!: Sequelize.BelongsToCreateAssociationMixin<fieldTemplate>;
  // fieldTemplateInFormTemplate belongsTo formTemplate via formTemplateId
  formTemplate!: formTemplate;
  getFormTemplate!: Sequelize.BelongsToGetAssociationMixin<formTemplate>;
  setFormTemplate!: Sequelize.BelongsToSetAssociationMixin<formTemplate, formTemplateId>;
  createFormTemplate!: Sequelize.BelongsToCreateAssociationMixin<formTemplate>;
  // fieldTemplateInFormTemplate belongsTo user via archiveByUserId
  archiveByUser!: user;
  getArchiveByUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setArchiveByUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createArchiveByUser!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // fieldTemplateInFormTemplate belongsTo user via createdByUserId
  createdByUser!: user;
  getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof fieldTemplateInFormTemplate {
    fieldTemplateInFormTemplate.init({
    fieldTemplateInFormTemplateId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "fieldTemplateInFormTemplateId",
      primaryKey: true
    },
    fieldTemplateId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "fieldTemplateId",
      references: {
        model: 'fieldTemplate',
        key: 'fieldTemplateId'
      }
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
    tableName: 'fieldTemplateInFormTemplate',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "fieldTemplateInFormTemplate_pkey",
        unique: true,
        fields: [
          { name: "fieldTemplateInFormTemplateId" },
        ]
      },
      {
        name: "fki_fieldTemplateInFormTemplateArchiveByUserId_fkey",
        fields: [
          { name: "archiveByUserId" },
        ]
      },
      {
        name: "fki_fieldTemplateInFormTemplateCreatedByUserId_fkey",
        fields: [
          { name: "createdByUserId" },
        ]
      },
      {
        name: "fki_fieldTemplateInFormTemplateFieldTemplateId_fkey",
        fields: [
          { name: "fieldTemplateId" },
        ]
      },
      {
        name: "fki_fieldTemplateInFormTemplateFormTemplateId_fkey",
        fields: [
          { name: "formTemplateId" },
        ]
      },
    ]
  });
  return fieldTemplateInFormTemplate;
  }
}
