/** 
 * api接口的统一封装
 */
import axios from './request.js';
import Qs from 'qs';
const urlApi = 'http://localhost:8080';//本地测试

export function UserInfo() {
	return axios({
		url:'/equipment/user/get',
		method: 'get',
	})
}
/**
 * 动态菜单
 * */
export function GetUserInfo(query) {
	return axios({
		url: urlApi + '/equipment/user/getUserInfo',
		method: 'get',
		data: Qs.stringify(query)
	})
}
export function UpdatePersonal(id,sex,age,personal,phone,address,marital) {
	return axios({
		url: urlApi + '/equipment/user/updatePersonal',
		method: 'post',
		params:{
			id,
			sex,
			age,
			personal,
			phone,
			address,
			marital
		}
	})
}
export function UpdatePasswd(oldPasswd,newPasswd) {
	return axios({
		url: urlApi + '/equipment/user/updatePasswd',
		method: 'get',
		params:{
			oldPasswd,
			newPasswd
		}
	})
}
/**
 * 注册
 * */
export function Register(query) {
	return axios({
		url: urlApi + '/equipment/user/register',
		method: 'get',
		//data: Qs.stringify(query)
		params: query
	})
}
/**
 * 登录
 * */
export function Login(query) {
	return axios({
		url: urlApi + '/equipment/user/login',
		method: 'get',
		//data: Qs.stringify(query)
		params: query
	})
}
/**
 * 删除用户信息
 * */
export function Delete(query) {
	return axios({
		url: urlApi + '/equipment/user/delete',
		method: 'get',
		//data: Qs.stringify(query)
		params: query
	})
}
/**
 * 用户列表
 * */
export function List(query) {
	return axios({
		url: urlApi + '/equipment/user/list',
		method: 'get',
		params: query
	})
}

/**----------------------------------------------默认API-----------------------------------------------------------------------*/

export function EquipmentTypeList(value) {
	return axios({
		url:'/equipment/type/list',
		method: 'get',
		params:{
			value
		}
	})
}

export function EquipmentTypeAdd(type,description) {
	return axios({
		url:'/equipment/type/add',
		method: 'post',
		params:{
			type,
			description
		}
	})
}
export function EquipmentTypeDelete(id) {
	return axios({
		url:'/equipment/type/delete',
		method: 'get',
		params:{
			id
		}
	})
}

export function EquipmentTypeUpdate(id,type,description) {
	return axios({
		url:'/equipment/type/update',
		method: 'post',
		params:{
			id,
			type,
			description
		}
	})
}


export function EquipmentSubregionList(value) {
	return axios({
		url:'/equipment/subregion/list',
		method: 'get',
		params:{
			value
		}
	})
}

export function EquipmentSubregionAdd(subregionName,description,address) {
	return axios({
		url:'/equipment/subregion/add',
		method: 'post',
		params:{
			subregionName,
			address,
			description
		}
	})
}
export function EquipmentSubregionDelete(id) {
	return axios({
		url:'/equipment/subregion/delete',
		method: 'get',
		params:{
			id
		}
	})
}

export function EquipmentSubregionUpdate(id,subregionName,description,address) {
	return axios({
		url:'/equipment/subregion/update',
		method: 'post',
		params:{
			id,
			subregionName,
			description,
			address
		}
	})
}

export function EquipmentVersionList(value) {
	return axios({
		url:'/equipment/version/list',
		method: 'get',
		params:{
			value
		}
	})
}

export function EquipmentVersionAdd(type,version,description) {
	return axios({
		url:'/equipment/version/add',
		method: 'post',
		params:{
			type,
			version,
			description
		}
	})
}
export function EquipmentVersionDelete(id) {
	return axios({
		url:'/equipment/version/delete',
		method: 'get',
		params:{
			id
		}
	})
}

export function EquipmentVersionUpdate(id,type,description,version) {
	return axios({
		url:'/equipment/version/update',
		method: 'post',
		params:{
			id,
			type,
			description,
			version
		}
	})
}



export function EquipmentInfoList(type,subregionName) {
	return axios({
		url:'/equipment/info/list',
		method: 'get',
		params:{
			type,
			subregionName
		}
	})
}

export function EquipmentInfoAdd(subregionName,type,ip,cpu,memory,disc) {
	return axios({
		url:'/equipment/info/add',
		method: 'post',
		params:{
			subregionName,
			type,
			ip,
			cpu,
			memory,
			disc
		}
	})
}
export function EquipmentInfoDelete(id) {
	return axios({
		url:'/equipment/info/delete',
		method: 'get',
		params:{
			id
		}
	})
}

export function EquipmentInfoUpdate(id,subregionName,type,ip,cpu,memory,disc) {
	return axios({
		url:'/equipment/info/update',
		method: 'post',
		params:{
			id,
			subregionName,
			type,
			ip,
			cpu,
			memory,
			disc,
		}
	})
}

export function EquipmentWorkLogList(equipmentCode) {
	return axios({
		url:'/equipment/work/log/list',
		method: 'get',
		params:{
			equipmentCode
		}
	})
}

export function EquipmentMaintenanceList(type,subregionName,status) {
	return axios({
		url:'/equipment/info/maintenance',
		method: 'get',
		params:{
			type,
			subregionName,
			status
		}
	})
}
export function EquipmentStatusChange(id,status) {
	return axios({
		url:'/equipment/info/changeStatus',
		method: 'get',
		params:{
			id,
			status
		}
	})
}

export function EquipmentVersionUpgrade(id) {
	return axios({
		url:'/equipment/info/versionUpgrade',
		method: 'get',
		params:{
			id
		}
	})
}

export function EquipmentNoSubregionList() {
	return axios({
		url:'/equipment/info/noSubregionList',
		method: 'get',
	})
}

export function EquipmentAddSubregion(subregionName,equipmentCode) {
	return axios({
		url:'/equipment/info/addSubregion',
		method: 'get',
		params:{
			subregionName,
			equipmentCode
		}
	})
}
export function SubregionEquipmentList(subregionName,type) {
	return axios({
		url:'/equipment/info/subregionEquipmentList',
		method: 'get',
		params:{
			subregionName,
			type
		}
	})
}
export function EquipmentReplace(equipmentCode,replaceEquipment) {
	return axios({
		url:'/equipment/info/replace',
		method: 'get',
		params:{
			equipmentCode,
			replaceEquipment
		}
	})
}

/**
 * 搜索知识库
 *
 * */
export function Search(query) {
	return axios({
		url: urlApi + 'answering/search/search',
		method: 'get',
		params: query
	})
}
export function AddQuestion(query) {
	return axios({
		url: urlApi + 'answering/manually/addQuestion',
		method: 'get',
		params: query
	})
}



