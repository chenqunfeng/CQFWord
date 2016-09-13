Component = require './Component'

class Saying extends Component.Components

    # 构造函数
    constructor: (selector) ->
        super selector
        @init()

    init: () ->
        @collection = [
            {
                saying: "你仿佛在逗我笑！？",
                author: "CQF"
            }
        ]

    getCollection: () ->
        len = @collection.length
        index = parseInt Math.random() * len
        return @collection[index]

    render: () ->
        collection = @getCollection()
        @contain.innerHTML = """
            <cite>
                #{collection.saying} -- #{collection.author}
            </cite>
        """

module.exports = Saying
