import S from 'fluent-schema'
import errors from 'http-errors'
import { insertOne, findOne, updateOne, find , deleteOne } from '../../utils/dbUtils.js'
export default async function (app, opts) {
  // creating employee
  app.post('/employee/create', {
    schema: {
      body: S.object()
        .prop('empNo', S.string().required().minLength(8).maxLength(11))
        .prop('name', S.string().required())
        .prop('adress', S.string().required())
        .prop('salary', S.number().required())
        .prop('position', S.string().required())
    }
  },
  async (req, res) => {
    try {
      const empNo = await findOne('employee', { empNo: req.body.empNo })
      if (empNo) {
        return new errors.Conflict()
      }
      const employee = req.body
      const insertEmployee = await insertOne('employee', employee)
      return { data: insertEmployee }
    } catch (error) {
      if (error.toString() === 'Error: Duplicate') {
        return new errors.Conflict()
      } else {
        return new Error('Unknown Error')
      }
    }
  })
  // updating employee
  app.post('/employee/update', {
    schema: {
      body: S.object()
        .prop('empNo', S.string().required().minLength(8).maxLength(11))
        .prop('name', S.string())
        .prop('adress', S.string())
        .prop('salary', S.number())
        .prop('position', S.string())
    }
  },
  async (req, res) => {
    const exist = await findOne('employee', { empNo: req.body.empNo })
    if (!exist) {
      return new errors.NotFound()
    }
    const query = { empNo: req.body.empNo }
    const update = {
      $set: req.body
    }
    const options = { upsert: false }
    const result = await updateOne('employee', query, update, options)
    return result
  })
  // deleting employee
  app.post('/employee/delete/:empNo', {
    schema: {
      params: S.object()
        .prop('empNo', S.string().required().minLength(8).maxLength(11))
    }
  },
  async (req, res) => {
    const exist = await findOne('employee', { empNo: req.params.empNo })
    if (!exist) {
      return new errors.NotFound()
    }
    const query = { empNo: req.params.empNo }
    const result = await deleteOne('employee', query)
    return result
  })
  // details
  app.get('/employee/details/:empNo', {
    schema: {
      params: S.object()
        .prop('empNo', S.string().minLength(8).required().maxLength(11))
    }
  },
  async (req, res) => {
    const exist = await findOne('employee', { empNo: req.params.empNo })
    return ((!exist) ? new errors.NotFound() : exist)
  })
  // pagination
  app.get('/employee', {
    schema: {
      query: S.object()
        .prop('page', S.integer())
        .prop('limit', S.integer())
    }
  },
  async (req, res) => {
    const Qpage = (req.query.page) ? req.query.page : 1
    const Qlimit = (req.query.limit) ? req.query.limit : 30
    if (Qpage < 1) {
      return new Error('This page is not valid')
    }
    if (Qlimit < 1 || Qlimit > 100) {
      return new Error('This limit is not valid')
    }
    const skip = (Qlimit) * (Qpage - 1)
    const limit = Qlimit
    const check = await find('employee', {}, {}, limit, skip)
    return check
  })
}
