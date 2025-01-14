import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user, userId } from './user';

export interface adminRoleAttributes {
  adminRoleId: string;
  role: string;
  createdByUserId: string;
  archiveByUserId?: string;
  createdDate: number;
  archiveDate?: number;
  archive?: boolean;
}

export type adminRolePk = "adminRoleId";
export type adminRoleId = adminRole[adminRolePk];
export type adminRoleCreationAttributes = Optional<adminRoleAttributes, adminRolePk>;

export class adminRole extends Model<adminRoleAttributes, adminRoleCreationAttributes> implements adminRoleAttributes {
  adminRoleId!: string;
  role!: string;
  createdByUserId!: string;
  archiveByUserId?: string;
  createdDate!: number;
  archiveDate?: number;
  archive?: boolean;

  // adminRole belongsTo user via archiveByUserId
  archiveByUser!: user;
  getArchiveByUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setArchiveByUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createArchiveByUser!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // adminRole belongsTo user via createdByUserId
  createdByUser!: user;
  getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof adminRole {
    adminRole.init({
    adminRoleId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "adminRoleId",
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "role"
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
      comment: "ab",
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
    tableName: 'adminRole',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "adminRole_pkey",
        unique: true,
        fields: [
          { name: "adminRoleId" },
        ]
      },
      {
        name: "fki_adminRoleArchiveByUserId_fkey",
        fields: [
          { name: "archiveByUserId" },
        ]
      },
      {
        name: "fki_adminRoleCreatedByUserId_fkey",
        fields: [
          { name: "createdByUserId" },
        ]
      },
    ]
  });
  return adminRole;
  }
}
