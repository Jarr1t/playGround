const db = require('../db/db')


interface DatabaseObject {
    [key: string]: any
    }

async function add(obj: DatabaseObject, table: string) {
    const data = await db(table).returning('*').insert(obj)
    return data
}
async function query(tableName: string, condition: string, option: string) {
    const data = await db(tableName).where(condition, option)
    return data
}
async function select(tableName: string) {
    const data = await db.select().table(tableName)
    return data
}
async function join(user_id: number) {
    const data = await db('favorites')
  .join('parks', 'favorites.park_id', '=', 'parks.id')
  .where('favorites.user_id', user_id)
  .select('*')
  return data
}
async function update(tableName: string, userId: number, obj: DatabaseObject) {
    const data = await db(tableName)
    .where({ id: userId })
    .update(obj)
    .returning('*')
    return data
}
async function updateTo(obj: DatabaseObject, table: string, column: string, location: string) {
    const data = await db(table).update(obj).where(column, location).returning('*')
    return data
}

async function deleteFav(obj:{ park_id: number}) {
    const data = await db("favorites").where('park_id' , obj.park_id).del()
    return data
}
async function deleteEvent(Id: number) {
    const data = await db("events").where('id' , Id).returning('*').del()
    return data
}
async function deleteBigEvents() {
    const data = await db("park_events").del()
    return data
}
async function filterJoin(tableName: string) {
    const data = await db(tableName)
    .join('parks', `${tableName}.park_name`, '=', `parks.park_name`)
    .select('*')
    return data
}


module.exports = {
    add,
    query,
    select,
    join,
    update,
    updateTo,
    deleteFav,
    filterJoin,
    deleteEvent,
    deleteBigEvents
}