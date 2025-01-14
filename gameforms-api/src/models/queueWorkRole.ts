import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { queue, queueId } from './queue';
import type { user, userId } from './user';

export interface queueWorkRoleAttributes {
  queueWorkRoleId: string;
  queueId: string;
  role: string;
  createdDate: number;
  createdByUserId: string;
  archiveDate?: number;
  archiveByUserId?: string;
  archive?: boolean;
}

export type queueWorkRolePk = "queueWorkRoleId";
export type queueWorkRoleId = queueWorkRole[queueWorkRolePk];
export type queueWorkRoleCreationAttributes = Optional<queueWorkRoleAttributes, queueWorkRolePk>;

export class queueWorkRole extends Model<queueWorkRoleAttributes, queueWorkRoleCreationAttributes> implements queueWorkRoleAttributes {
  queueWorkRoleId!: string;
  queueId!: string;
  role!: string;
  createdDate!: number;
  createdByUserId!: string;
  archiveDate?: number;
  archiveByUserId?: string;
  archive?: boolean;

  // queueWorkRole belongsTo queue via queueId
  queue!: queue;
  getQueue!: Sequelize.BelongsToGetAssociationMixin<queue>;
  setQueue!: Sequelize.BelongsToSetAssociationMixin<queue, queueId>;
  createQueue!: Sequelize.BelongsToCreateAssociationMixin<queue>;
  // queueWorkRole belongsTo user via archiveByUserId
  archiveByUser!: user;
  getArchiveByUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setArchiveByUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createArchiveByUser!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // queueWorkRole belongsTo user via createdByUserId
  createdByUser!: user;
  getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof queueWorkRole {
    queueWorkRole.init({
    queueWorkRoleId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    queueId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'queue',
        key: 'queueId'
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    archiveDate: {
      type: DataTypes.INTEGER,
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
    },
    archive: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'queueWorkRole',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "fki_queueWorkRoleArchiveByUserId_fkey",
        fields: [
          { name: "archiveByUserId" },
        ]
      },
      {
        name: "fki_queueWorkRoleCreatedByUserId",
        fields: [
          { name: "createdByUserId" },
        ]
      },
      {
        name: "fki_queueWorkRoleQueueId_fkey",
        fields: [
          { name: "queueId" },
        ]
      },
      {
        name: "queueWorkRole_pkey",
        unique: true,
        fields: [
          { name: "queueWorkRoleId" },
        ]
      },
    ]
  });
  return queueWorkRole;
  }
}
