import Sequelize from 'sequelize'
import db from '../database/index.js'

const Page = db.define(
  'Page',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    UserId: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'id'
      }
    },
    data: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  },
  {
    timestamps: true,
    tableName: 'pages'
  }
)

Page.associate = ({ User }) => {
  Page.belongsTo(User)
}

export default Page
