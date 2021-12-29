const { fs, path } = require('@vuepress/shared-utils');
const themeConfig = require('./themeConfig');

module.exports = (ctx) => ({
	base: '/',
	locales: {
		'/': {
			lang: 'zh-CN',
			title: 'Nuxt 应用性能优化指南',
			description: 'oMall站点性能优化',
		},
	},
	head: [
		['link', { rel: 'icon', href: `/logo.png` }],
		['link', { rel: 'manifest', href: '/manifest.json' }],
		['meta', { name: 'theme-color', content: '#3eaf7c' }],
		['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
		['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
		['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
		['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
		['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
		['meta', { name: 'msapplication-TileColor', content: '#000000' }],
		['meta', { name: 'apple-mobile-web-app-status-bar-style' }],
	],
	themeConfig,
	plugins: [
		['@vssue/vuepress-plugin-vssue', {
			// 设置平台，而不是 `api`
			platform: 'github-v4',

			// 其他的 Vssue 配置
			owner: 'bule-sky', // 仓库的拥有者的名称
			repo: 'oMall-PERF', // 存储 Issue 和评论的仓库的名称
			clientId: 'd10e137deffde5a7767e', // 刚保存下来的  Client ID
			clientSecret: '07a7f63c4997f29ce74ce8f72a86b986f28b6a2d', //  刚才保存下来的 Client secrets
			autoCreateIssue: true, //自动创建评论
		}],
		['@vuepress/back-to-top', true],
		[
			'@vuepress/pwa',
			{
				serviceWorker: true,
				updatePopup: true,
			},
		],
		['@vuepress/medium-zoom', true],
		// ['@vuepress/google-analytics', {
		//   ga: 'UA-145821923-1'
		// }],
		// ['vuepress-plugin-baidu-google-analytics', {
		//   hm: '009a2f9b8cfc23cb5722f109462e450f',
		//   ignore_hash: false
		// }],
		[
			'container',
			{
				type: 'vue',
				before: '<pre class="vue-container"><code>',
				after: '</code></pre>',
			},
		],
		[
			'container',
			{
				type: 'upgrade',
				before: (info) => `<UpgradePath title="${info}">`,
				after: '</UpgradePath>',
			},
		],
	],
	extraWatchFiles: ['.vuepress/nav/zh.js'],
	markdown: {
		// markdown-it-anchor 的选项
		anchor: { permalink: true },
		// markdown-it-toc 的选项
		toc: { includeLevel: [1, 2] },
		config: (md) => {
			// 使用更多的 markdown-it 插件!
			md.use(require('markdown-it-task-checkbox'));
		},
	},
});
