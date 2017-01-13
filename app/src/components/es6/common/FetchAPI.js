class FetchAPI {
    
    constructor(url="", opts={}) {
        this.url = url
        this.opts = opts
    }

    setUrl(url="") {
        this.url = url
    }

    setOpts(opts={}) {
        this.opts = opts
    }

    setHeaders(headers={}) {
        this.opts.headers = headers
    }

    setCredentials(credentials="include") {
        this.opts.credentials = credentials
    }

    setMethod(method="GET") {
        this.opts.method = method
    }

    text(response) {
        return response.text()
    }

    json(response) {
        return response.json()
    }

    fetchResponse(response) {
        if (response.ok) {
            return response
        } else {
            var error = new Error(response.statusText || response.status)
            error.response = response
            throw error
        }
    }

    fetch(url=this.url, opts=this.opts) {
        return fetch(url, opts).then(this.fetchResponse)
    }

    fetchText(url, opts) {
        return this.fetch(url, opts).then(this.text)
    }

    fetchJSON(url, opts) {
        return this.fetch(url, opts).then(this.json)
    }

}

module.exports = FetchAPI