const readFileList = require('../../scripts/build.js');
// https://github.com/bule-sky/oMall-PERF
module.exports = {
	repo: 'bule-sky/oMall-PERF',
	lastUpdated: 'Last Updated',
	smoothScroll: true,
	docsBranch: 'master',
	docsDir: 'docs',
	editLinks: false,
	editLinkText: '帮助我们改善此页面！',
	algolia: {
		apiKey: 'b80b47c727f364f3981d61e69f2fe2e7',
		indexName: 'Speed-oMall',
		inputSelector: '',
		debug: false,
	},
	locales: {
		'/': {
			editLinkText: '在 GitHub 上编辑此页',
			// nav: require('./nav/zh'),
			sidebar: {
				'/notes/': renderSiderBar(),
			},
		},
	},
};

function renderSiderBar() {
	return [
		// ["/notes/", "首页"],
		{
			title: '基础篇',
			collapsable: false,
			children: readFileList('base'),
		},
		{
			title: '缓存篇',
			collapsable: false,
			children: readFileList('cache'),
		},
		// {
		// 	title: '内置模块',
		// 	collapsable: true,
		// 	children: readFileList('modules'),
		// },
		// {
		// 	title: '进阶篇',
		// 	collapsable: true,
		// 	children: readFileList('advance'),
		// },
		// {
		// 	title: 'Express',
		// 	collapsable: true,
		// 	children: readFileList('express'),
		// },
		// {
		// 	title: 'Koa2',
		// 	collapsable: true,
		// 	children: readFileList('koa2'),
		// },
		// {
		// 	title: '其他',
		// 	collapsable: false,
		// 	children: readFileList('other'),
		// },
	];
}
