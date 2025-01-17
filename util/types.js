
const axios = require('axios').default;
axios.get('https://uk.lxd.images.canonical.com/streams/v1/images.json').then(data => {
    var images = data.data
    var images_keys = Object.keys(images.products)
    var aliases = ""
    var len = 0
    images_keys.forEach(function (key, pindex) {
        var image = images.products[key]
        if (image.aliases) {
            image.aliases.split(',').forEach(function (alias, index) {
                len++
                if (index == 0 && pindex == 0) {
                    aliases += "export type ImageAlias = '" + alias + "' | "
                } else if (index == image.aliases.split(',').length - 1 && pindex == images_keys.length - 1) {
                    aliases += "'" + alias + "';"
                }
                else {
                    aliases += "'" + alias + "' | "
                }

            })
        }
    })
    const fs = require('fs')
    fs.writeFileSync(__dirname + '/../src/types/ImageAliases.ts', aliases)
    console.log("Successfully converted " + len + " images to types")
})
