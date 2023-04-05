// import Vue from 'vue'   //引入Vue
import {
	createRouter,
	createWebHashHistory
} from 'vue-router' //引入vue-router

import home from '../views/home.vue'
import register from '../views/register.vue'
import login from '../views/login.vue'
import equipmentType from '../views/equipmentType.vue'
import equipmentSubregion from '../views/equipmentSubregion.vue'
import equipmentVersion from '../views/equipmentVersion.vue'
import equipmentInfo from '../views/equipmentInfo.vue'
import equipmentWorkLog from '../views/equipmentWorkLog.vue'
import equipmentMaintenance from '../views/equipmentMaintenance.vue'
import personalInfo from '../views/personalInfo.vue'
import update from '../views/update.vue'




const routes = [{
		path: '',
		redirect: "login"
	}, {
		path: '/',
		redirect: "login"
	},
	{
		path: '/login',
		name: 'login',
		component: login,
		meta: {
			title: '登录'
		}
	},
	{
		path: '/register',
		name: 'register',
		component: register,
		meta: {
			title: '注册',
			isTab: true
		}
	},
	{
		path: '/home',
		name: 'home',
		component: home,
		/* 子路由 */
		children: [
			{
				path: '/',
				redirect: "equipmentMaintenance"
			},{
				path: '',
				redirect: "equipmentMaintenance"
			},
			{
				path: '/equipmentMaintenance',
				name: 'equipmentMaintenance',
				component: equipmentMaintenance,
				meta: {
					title: '设备维护信息',
					isTab: true
				}
			},
			{
				path: '/equipmentInfo',
				name: 'equipmentInfo',
				component: equipmentInfo,
				meta: {
					title: '设备基础信息',
					isTab: true
				}
			},
			{
				path: '/equipmentType',
				name: 'equipmentType',
				component: equipmentType,
				meta: {
					title: '设备类型信息',
					isTab: true
				}
			},
			{
				path: '/equipmentSubregion',
				name: 'equipmentSubregion',
				component: equipmentSubregion,
				meta: {
					title: '设备分区信息',
					isTab: true
				}
			}
			,
			{
				path: '/equipmentVersion',
				name: 'equipmentVersion',
				component: equipmentVersion,
				meta: {
					title: '设备版本信息',
					isTab: true
				}
			},
			{
				path: '/equipmentWorkLog',
				name: 'equipmentWorkLog',
				component: equipmentWorkLog,
				meta: {
					title: '设备工作信息',
					isTab: true
				}
			},
			{
				path: '/equipmentWorkLog',
				name: 'equipmentWorkLog',
				component: equipmentWorkLog,
				meta: {
					title: '设备工作信息',
					isTab: true
				}
			},
			{
				path: '/personalInfo',
				name: 'personalInfo',
				component: personalInfo,
				meta: {
					title: '个人信息',
					isTab: true
				}
			},
			{
				path: '/update',
				name: 'update',
				component: update,
				meta: {
					title: '密码维护',
					isTab: true
				}
			}

		]
	}
];

const router = createRouter({
	//mode: 'hash',三张模式：hash|history|abstract，默认hash
	history: createWebHashHistory(),
	routes
})
export default router;
