module.exports = {
    plugins: {
        '@our-patches/postcss-px-to-viewport': {
            unitToConvert: 'px',
            viewportWidth: 375,
            unitPrecision: 5,
            propList: ['*'],
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            include: [/Mobile/, /^CloudTravel.vue$/],
            landscape: false,
            landscapeUnit: 'vw',
        }
    }
}