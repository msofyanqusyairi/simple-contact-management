const TIMEOUT = 1000

async function Get(url, headers){
  let response = await fetch(url, {
    method: 'GET',
    timeout: TIMEOUT,
    headers: headers
  })
  let respJson = await response.json()
  return respJson
}

async function Post(url, body={}, headers){
  let response = await fetch(url, {
    method: 'POST',
    timeout: TIMEOUT,
    headers: headers,
    body: JSON.stringify(body)
  })
  
  let respJson = await response.json()
  return respJson
}

module.exports = {
  Get: Get,
  Post: Post
}