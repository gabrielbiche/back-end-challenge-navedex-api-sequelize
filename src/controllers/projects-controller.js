import { NotFound, Unauthorized } from '../helpers'
import db from '../models'

const Projects = db.Projects
const Navers = db.Navers

export const index = async (req, res) => {
  const { user_id } = req.params
  const { name } = req.query

  const where = { user_id }
  if (name) where.name = name
  const projects = await Projects.findAll({
    where,
    attributes: ['id', 'name']
  })

  return res.status(200).json(projects)
}

export const show = async (req, res) => {
  const { user_id, project_id } = req.params

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
}

export const store = async (req, res) => {
  const { user_id } = req.params
  const { name, navers } = req.body

  if (navers) {
    const naver = await Navers.findAll({ where: { id: navers } })
    
    if (!naver || naver.length < navers.length) {
      throw new NotFound('Naver not found')
    }
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
}

export const update = async (req, res) => {
  const { user_id, project_id } = req.params
  const { name, navers } = req.body

  const project = await Projects.findOne({
    where: { id: project_id, user_id: user_id }
  })

  if (!project) {
    throw new Unauthorized(`User id ${user_id} does not have project id ${project_id}`)
  }

  if (navers) {
    const naver = await Navers.findAll({ where: { id: navers } })
    
    if (!naver || naver.length < navers.length) {
      throw new NotFound('Naver not found')
    }
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
}

export const destroy = async (req, res) => {
  const { user_id, project_id } = req.params

  const project = await Projects.findOne({
    where: { id: project_id, user_id: user_id }
  })

  if (!project) {
    throw new Unauthorized(`User id ${user_id} does not have project id ${project_id}`)
  }

  await Projects.destroy({ where: { id: project.id } })
  
  return res.status(204).end()
}

export default {
  index,
  show,
  store,
  update,
  destroy
}
