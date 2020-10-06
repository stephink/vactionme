import errors from 'http-errors'

const insertOne = (collection, query) => {
  return new Promise((resolve, reject) => {
    mongodb.collection(collection).insertOne(query)
      .then((res) => {
        if (res && res.ops && res.ops.length > 0) {
          resolve(res.ops[0])
        } else {
          resolve()
        }
      })
      .catch(err => {
        console.error('Error', err)
        reject(new Error('Duplicate'))
      })
  })
}
// mongo 4.2
const updateOne = (collection, query, update, options) => {
  return new Promise((resolve, reject) => {
    mongodb.collection(collection).updateOne(query, update, options)
      .then((res) => {
        const { matchedCount, modifiedCount } = res
        if (matchedCount && modifiedCount) {
          resolve(res)
        } else if (!matchedCount) {
          resolve(new errors.NotFound())
        } else {
          resolve(new errors.Conflict())
        }
      })
      .catch(err => {
        console.error('Error', err)
        reject(new Error('Failed to add'))
      })
  })
}

const deleteOne = (collection, query) => {
  return new Promise((resolve) => {
    mongodb.collection(collection).deleteOne(query).then((res) => {
      if (res) {
        resolve(res)
      } else {
        resolve()
      }
    })
  })
}

const find = (collection, query, filter = {}, limit = 0, skip = 0) => {
  return new Promise((resolve) => {
    mongodb.collection(collection).find(query, filter).limit(limit).skip(skip).toArray().then((res) => {
      if (res && res.length > 0) {
        resolve(res)
      } else {
        resolve([])
      }
    })
  })
}
// need to test
const findOne = (collection, query) => {
  return new Promise((resolve) => {
    mongodb.collection(collection).findOne(query).then((res) => {
      if (res) {
        resolve(res)
      } else {
        resolve()
      }
    })
  })
}


export {
  deleteOne,
  find,
  findOne,
  insertOne,
  updateOne
}
