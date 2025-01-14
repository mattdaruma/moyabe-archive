import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { queue, queueId } from './queue';
import type { user, userId } from './user';

export interface queueManageRoleAttributes {
  queueManageRoleId: string;
  queueId: string;
  role?: string;
  createdByUserId: string;
  archive?: boolean;
  archiveByUserId?: string;
  createdDate: number;
  archiveDate?: number;
}

export type queueManageRolePk = "queueManageRoleId";
export type queueManageRoleId = queueManageRole[queueManageRolePk];
export type queueManageRoleCreationAttributes = Optional<queueManageRoleAttributes, queueManageRolePk>;

export class queueManageRole extends Model<queueManageRoleAttributes, queueManageRoleCreationAttributes> implements queueManageRoleAttributes {
  queueManageRoleId!: string;
  queueId!: string;
  role?: string;
  createdByUserId!: string;
  archive?: boolean;
  archiveByUserId?: string;
  createdDate!: number;
  archiveDate?: number;

  // queueManageRole belongsTo queue via queueId
  queue!: queue;
  getQueue!: Sequelize.BelongsToGetAssociationMixin<queue>;
  setQueue!: Sequelize.BelongsToSetAssociationMixin<queue, queueId>;
  createQueue!: Sequelize.BelongsToCreateAssociationMixin<queue>;
  // queueManageRole belongsTo user via createdByUserId
  createdByUser!: user;
  getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof queueManageRole {
    queueManageRole.init({
    queueManageRoleId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "queueManageRoleId",
      primaryKey: true
    },
    queueId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "qd",
      references: {
        model: 'queue',
        key: 'queueId'
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "r"
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
      comment: "ar"
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
    archiveDate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "archiveDate"
    }
  }, {
    sequelize,
    tableName: 'queueManageRole',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "fki_queueManageRoleCreatedByUserId_fkey",
        fields: [
          { name: "createdByUserId" },
        ]
      },
      {
        name: "fki_queueManageRoleQueueId_fkey",
        fields: [
          { name: "queueId" },
        ]
      },
      {
        name: "queueManageRole_pkey",
        unique: true,
        fields: [
          { name: "queueManageRoleId" },
        ]
      },
    ]
  });
  return queueManageRole;
  }
}
