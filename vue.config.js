module.exports = {
    configureWebpack: {
        resolve: {
            extensions: [],  //后缀
            alias: {
                'views': '@/views',
                'components': '@/components',
                'network': '@/network',
                'common': '@/common',
                'assets': '@/assets',
            }
        }
    }
}