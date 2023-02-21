import { validationResult } from 'express-validator'
import Page from '../models/Page.js'

class PageController {
  async index (req, res) {
    try {
      const pages = await Page.findAll({ where: { UserId: res.locals.userId } })

      res.json({ pages })
    } catch (err) {
      res.status(500).json({ error: 'Server error', message: err.message })
    }
  }

  async create (req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      const { data } = req.body
      await Page.create({ data, UserId: res.locals.userId })

      res.json({ message: 'Page created successfully.' })
    } catch (err) {
      res.status(500).json({ error: 'Server error', message: err.message })
    }
  }

  async update (req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      const { data, id } = req.body
      await Page.update({ data }, { where: { id: id } })

      res.json({ message: 'Page updated successfully.' })
    } catch (err) {
      res.status(500).json({ error: 'Server error', message: err.message })
    }
  }
}

export default new PageController()
