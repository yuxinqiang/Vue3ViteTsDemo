import type { RuleType } from 'async-validator'
import { FormItemRule } from 'element-plus'

/**
 * 手机号码验证
 * 用于表单验证
 */
export function validatorMobile(rule: any, mobile: string | number, callback: Function) {
  // 允许空值，若需必填请添加多验证规则
  if (!mobile) {
    return callback()
  }
  if (!/^(1[3-9])\d{9}$/.test(mobile.toString())) {
    return callback(new Error('请输入合法有效的手机号'))
  }
  return callback()
}

/**
 * 邮箱验证码验证
 * 用于表单验证
 */
export function validatorEmail(rule: any, email: string | number, callback: Function) {
  if (!email) {
    return callback(new Error('邮箱不能为空'))
  }

  const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

  if (!mailReg.test(email.toString())) {
    return callback(new Error('请输入合法有效的邮箱'))
  }
  return callback()
}

/**
 * 昵称/姓名验证
 * 用于表单验证
 */
export function validatorName(rule: any, name: string | number, callback: Function) {
  if (!name) {
    return callback(new Error('姓名不能为空'))
  }

  const nameReg = /^[\u4e00-\u9fa5_a-zA-Z]+$/

  if (!nameReg.test(name.toString())) {
    return callback(new Error('姓名为2-16位中英文及下划线的组合'))
  }
  return callback()
}


/**
 * 账户名验证
 */
export function validatorAccount(rule: any, val: string, callback: Function) {
  if (!val) {
    return callback()
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/.test(val)) {
    return callback(new Error('请输入用户名'))
  }
  return callback()
}

/**
 * 密码验证
 */
export function regularPassword(val: string) {
  // if (/^[a-zA-Z0-9_]{6,32}$/.test(val)) return true
  // 至少8位字母数字的组合，不能为纯数字或者纯字母
  if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/.test(val)) return true
  return false
}
export function validatorPassword(rule: any, val: string, callback: Function) {
  if (!val) {
    return callback(new Error('密码不能为空'))
  }
  if (!regularPassword(val)) {
    return callback(new Error('密码格式不正确'))
  }
  return callback()
}

/**
 * 验证有1-4位小数的正实数，用于金额的表单验证
 * 用于表单验证
 * */

export function validatorMoney(rule: any, val: string, callback: Function) {
  if (!val) {
    return callback()
  }
  // if (!/^[0-9]+(.[0-9]{1,4})?$/.test(val)) { // 保留4位小数
  if (!/(^[1-9]([0-9]\d{0,7})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(val)) {
    return callback(new Error('数字格式正确（8位整数保留2位小数）'))
  }
  return callback()
}
