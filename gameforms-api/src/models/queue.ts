import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { queueManageRole, queueManageRoleId } from './queueManageRole';
import type { queueWorkRole, queueWorkRoleId } from './queueWorkRole';
import type { user, userId } from './user';
import type { work, workId } from './work';

export interface queueAttributes {
  queueId: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  createdByUserId: string;
  archiveDate?: string;
  archiveByUserId?: string;
  createdDate: number;
  archive?: boolean;
}

export type queuePk = "queueId";
export type queueId = queue[queuePk];
export type queueCreationAttributes = Optional<queueAttributes, queuePk>;

export class queue extends Model<queueAttributes, queueCreationAttributes> implements queueAttributes {
  queueId!: string;
  name!: string;
  description!: string;
  icon?: string;
  color?: string;
  createdByUserId!: string;
  archiveDate?: string;
  archiveByUserId?: string;
  createdDate!: number;
  archive?: boolean;

  // queue hasMany queueManageRole via queueId
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
  // queue hasMany queueWorkRole via queueId
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
  // queue hasMany work via queueId
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
  // queue belongsTo user via archiveByUserId
  archiveByUser!: user;
  getArchiveByUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setArchiveByUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createArchiveByUser!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // queue belongsTo user via createdByUserId
  createdByUser!: user;
  getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof queue {
    queue.init({
    queueId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
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
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "date of archive"
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
    archive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "arc"
    }
  }, {
    sequelize,
    tableName: 'queue',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "fki_queueArchiveByUserId_fkey",
        fields: [
          { name: "archiveByUserId" },
        ]
      },
      {
        name: "fki_queueCreatedByUserId_fkey",
        fields: [
          { name: "createdByUserId" },
        ]
      },
      {
        name: "queue_pkey",
        unique: true,
        fields: [
          { name: "queueId" },
        ]
      },
    ]
  });
  return queue;
  }
}
