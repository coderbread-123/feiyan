module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
	devServer: {
		// 项目运行时候的端口号
		port: 8080
	},
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'utils': '@/utils'
            }
        }
    }
}