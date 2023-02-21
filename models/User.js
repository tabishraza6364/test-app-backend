import Sequelize from 'sequelize'
import bcrypt from 'bcrypt'
import db from '../database/index.js'

const User = db.define(
  'User',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true,
    tableName: 'users',
    hooks: {
      beforeCreate: async function (user) {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
      }
    }
  }
)

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

User.associate = ({ Page }) => {
  User.hasMany(Page, { onDelete: 'cascade' })
}

export default User
