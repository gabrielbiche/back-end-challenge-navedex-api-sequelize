const { NotFound, Unauthorized } = require('../helpers/errors')
const db = require('../models')

const Projects = db.Projects
const Navers = db.Navers

module.exports = {
  async index(req, res) {
    const { user_id } = req.params
    const { name } = req.query
    try {
      const where = { user_id }
      if (name) where.name = name
      const projects = await Projects.findAll({
        where,
        attributes: ['id', 'name']
      })
      return res.status(200).json(projects)
    } catch (error) {
      return res.status(500).json({ Message: error.message })
    }
  },

  async show(req, res) {
    const { user_id, project_id } = req.params
    try {
      const projectAndNavers = await Projects.findOne({
        where: { id: project_id, user_id: user_id },
        attributes: ['id', 'name'],
        include: {
          association: 'navers',
          attributes: ['id', 'name', 'birthdate', 'admission_date', 'job_role'],
          through: { attributes: [] }
        }
      })
      return res.status(200).json(projectAndNavers)
    } catch (error) {
      return res.status(500).json({ Message: error.message })
    }
  },

  async store(req, res) {
    const { user_id } = req.params
    const { name, navers } = req.body
    try {
      if (navers) {
        const naver = await Navers.findAll({ where: { id: navers } })
        if (!naver || naver.length < navers.length) throw new NotFound('Naver not found')
      }
      const project = await Projects.create({ name, user_id })
      if (navers) await project.setNavers(navers)
      const projectAndNavers = await Projects.findByPk(project.id, {
        attributes: ['name'],
        include: {
          association: 'navers',
          attributes: ['id'],
          through: { attributes: [] }
        }
      })
      return res.status(201).json(projectAndNavers)
    } catch (error) {
      if (error && error instanceof NotFound) {
        return res.status(error.statusCode).json({ Message: error.message })
      } else if (error && error.name === 'SequelizeValidationError') {
        return res.status(400).json({ Message: error.message })
      }
      res.status(500).json({ Message: error.message })
    }
  },

  async update(req, res) {
    const { user_id, project_id } = req.params
    const { name, navers } = req.body
    try {
      const project = await Projects.findOne({
        where: { id: project_id, user_id: user_id }
      })
      if (!project)
        throw new Unauthorized(
          `User id ${user_id} does not have project id ${project_id}`
        )
      if (navers) {
        const naver = await Navers.findAll({ where: { id: navers } })
        if (!naver || naver.length < navers.length) throw new NotFound('Naver not found')
      }
      await Projects.update({ name: name }, { where: { id: project.id } })
      if (navers) await project.setNavers(navers)
      const updatedProjectAndNavers = await Projects.findByPk(project.id, {
        attributes: ['name'],
        include: {
          association: 'navers',
          attributes: ['id'],
          through: { attributes: [] }
        }
      })
      return res.status(200).json(updatedProjectAndNavers)
    } catch (error) {
      if (error && error instanceof NotFound) {
        return res.status(error.statusCode).json({ Message: error.message })
      } else if (error && error instanceof Unauthorized) {
        return res.status(error.statusCode).json({ Message: error.message })
      } else if (error && error.name === 'SequelizeValidationError') {
        return res.status(400).json({ Message: error.message })
      }
      res.status(500).json({ Message: error.message })
    }
  },

  async delete(req, res) {
    const { user_id, project_id } = req.params
    try {
      const project = await Projects.findOne({
        where: { id: project_id, user_id: user_id }
      })
      if (!project)
        throw new Unauthorized(
          `User id ${user_id} does not have project id ${project_id}`
        )
      await Projects.destroy({ where: { id: project.id } })
      return res.status(204).end()
    } catch (error) {
      if (error && error instanceof Unauthorized) {
        return res.status(error.statusCode).json({ Message: error.message })
      }
      res.status(500).json({ Message: error.message })
    }
  }
}
