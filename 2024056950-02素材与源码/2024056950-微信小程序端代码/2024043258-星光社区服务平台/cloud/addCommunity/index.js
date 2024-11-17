// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const indata = event.indata

  
  return await db.collection('community_auditing_communist').add({
      data: indata
  })
}