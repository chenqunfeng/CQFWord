Common = new Object()

Common.loading = () ->
    searchLoading = document.querySelector ".searchLoading"
    searchWord = document.querySelector ".searchLoading .searchWord"
    @removeClass searchLoading, "hide"
    @addClass searchWord, "searchWordAnimation"

Common.loaded = () ->
    setTimeout () =>
        searchLoading = document.querySelector ".searchLoading"
        searchWord = document.querySelector ".searchLoading .searchWord"
        @addClass searchLoading, "hide"
        @removeClass searchWord, "searchWordAnimation"
    , 666

Common.addClass = (node, className) ->
    if node and node.getAttribute
        if !@hasClass(node, className)
            node.className += " "+ className;
    return @

Common.removeClass = (node, className) ->
    if node and node.getAttribute
        if @hasClass(node, className)
            oldClass = node.className
            reg = new RegExp("(^|\\s)#{className}(\\s|$)")
            node.className = oldClass.replace(reg, " ").replace(/(^\s+|\s+$)/g, "")
    return @

Common.hasClass = (node, className) ->
    if node and node.getAttribute
        reg = new RegExp("(^|\\s)#{className}(\\s|$)")
        return node.className and reg.test(node.className)
    return false

Common.isCh = (t) ->
    re = /[0-9\u4e00-\u9fa5]/
    return re.test(t)

Common.isEn = (t) ->
    re = /[a-zA-Z]/
    return re.test(t)

module.exports = Common
