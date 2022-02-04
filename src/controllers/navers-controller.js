const { NotFound, Unauthorized } = require('../helpers/errors')
const db = require('../models')

const Navers = db.Navers
const Projects = db.Projects

module.exports = {
  async index(req, res) {
    const { user_id } = req.params
    const { name, admission_date, job_role } = req.query
    try {
      const where = { user_id }
      if (name) where.name = name
      if (admission_date) where.admission_date = admission_date
      if (job_role) where.job_role = job_role
      const navers = await Navers.findAll({
        where,
        attributes: ['id', 'name', 'birthdate', 'admission_date', 'job_role']
      })
      return res.status(200).json(navers)
    } catch (error) {
      return res.status(500).json({ Message: error.message })
    }
  },

  async show(req, res) {
    const { user_id, naver_id } = req.params
    try {
      const naverAndProjects = await Navers.findOne({
        where: { id: naver_id, user_id: user_id },
        attributes: ['id', 'name', 'birthdate', 'admission_date', 'job_role'],
        include: {
          association: 'projects',
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      })
      return res.status(200).json(naverAndProjects)
    } catch (error) {
      return res.status(500).json({ Message: error.message })
    }
  },

  async store(req, res) {
    const { user_id } = req.params
    const { name, birthdate, admission_date, job_role, projects } = req.body
    try {
      if (projects) {
        const project = await Projects.findAll({
          where: { id: projects }
        })
        if (!project || project.length < projects.length)
          throw new NotFound('Project not found')
      }
      const naver = await Navers.create({
        name,
        user_id,
        birthdate,
        admission_date,
        job_role
      })
      if (projects) await naver.setProjects(projects)
      const naverAndProjects = await Navers.findByPk(naver.id, {
        attributes: ['name', 'birthdate', 'admission_date', 'job_role'],
        association: 'projects',
        include: {
          model: Projects,
          association: 'projects',
          attributes: ['id'],
          through: { attributes: [] }
        }
      })
      return res.status(201).json(naverAndProjects)
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
    const { user_id, naver_id } = req.params
    const { name, birthdate, admission_date, job_role, projects } = req.body
    try {
      const naver = await Navers.findOne({
        where: { id: naver_id, user_id: user_id }
      })
      if (!naver)
        throw new Unauthorized(`User id ${user_id} does not have naver id ${naver_id}`)
      if (projects) {
        const project = await Projects.findAll({
          where: { id: projects }
        })
        if (!project || project.length < projects.length)
          throw new NotFound('Project not found')
      }
      await Navers.update(
        { name, user_id, birthdate, admission_date, job_role },
        { where: { id: naver.id } }
      )
      if (projects) await naver.setProjects(projects)
      const updatedNaverAndProjects = await Navers.findByPk(naver.id, {
        attributes: ['name', 'birthdate', 'admission_date', 'job_role'],
        include: {
          association: 'projects',
          attributes: ['id'],
          through: { attributes: [] }
        }
      })
      return res.status(200).json(updatedNaverAndProjects)
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
    const { user_id, naver_id } = req.params
    try {
      const naver = await Navers.findOne({
        where: { id: naver_id, user_id: user_id }
      })
      if (!naver)
        throw new Unauthorized(`User id ${user_id} does not have naver id ${naver_id}`)
      await Navers.destroy({ where: { id: naver.id } })
      return res.status(204).end()
    } catch (error) {
      if (error && error instanceof Unauthorized) {
        return res.status(error.statusCode).json({ Message: error.message })
      }
      res.status(500).json({ Message: error.message })
    }
  }
}
