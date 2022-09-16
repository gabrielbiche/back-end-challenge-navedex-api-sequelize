import { NotFound, Unauthorized } from '../helpers'
import db from '../models'

const Navers = db.Navers
const Projects = db.Projects

export const index = async (req, res) => {
  const { user_id } = req.params
  const { name, admission_date, job_role } = req.query

  const where = { user_id }
  if (name) where.name = name
  if (admission_date) where.admission_date = admission_date
  if (job_role) where.job_role = job_role

  const navers = await Navers.findAll({
    where,
    attributes: ['id', 'name', 'birthdate', 'admission_date', 'job_role']
  })

  return res.status(200).json(navers)
}

export const show = async (req, res) => {
  const { user_id, naver_id } = req.params

  const naverAndProjects = await Navers.findOne({
    where: { id: naver_id, user_id: user_id },
    attributes: ['id', 'name', 'birthdate', 'admission_date', 'job_role'],
    include: {
      association: 'projects',
      attributes: ['id', 'name'],
      through: { attributes: [] }
    }
  })

  if (!naverAndProjects) throw new NotFound('Naver not found')

  return res.status(200).json(naverAndProjects)
}

export const store = async (req, res) => {
  const { user_id } = req.params
  const { name, birthdate, admission_date, job_role, projects } = req.body

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
}

export const update = async (req, res) => {
  const { user_id, naver_id } = req.params
  const { name, birthdate, admission_date, job_role, projects } = req.body

  const naver = await Navers.findOne({
    where: { id: naver_id, user_id: user_id }
  })

  if (!naver)
    throw new Unauthorized(
      `User id ${user_id} does not have naver id ${naver_id}`
    )

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
}

export const destroy = async (req, res) => {
  const { user_id, naver_id } = req.params

  const naver = await Navers.findOne({
    where: { id: naver_id, user_id: user_id }
  })

  if (!naver)
    throw new Unauthorized(
      `User id ${user_id} does not have naver id ${naver_id}`
    )

  await Navers.destroy({ where: { id: naver.id } })

  return res.status(204).end()
}

export default {
  index,
  show,
  store,
  update,
  destroy
}
