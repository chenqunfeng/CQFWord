import config from './../../../../config.js'
import fetchAPI from './common/fetchAPI.js'
var searchParams = new URLSearchParams()
searchParams.set('method', 'next')
searchParams.set('params',JSON.stringify({
    offset: 10,
    start: '9'
}))
var f = new fetchAPI('https://www.zhihu.com/node/TopStory2FeedList', {
    method: 'POST',
    credentials: 'include',
    headers: config.zhihu,
    body: searchParams
})
// f.fetchJSON()