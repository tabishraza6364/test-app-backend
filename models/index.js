import Page from './Page.js'
import User from './User.js'

User.associate({ Page })
Page.associate({ User })

export { User, Page }
