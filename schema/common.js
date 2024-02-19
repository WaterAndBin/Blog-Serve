const joi = require('joi')

exports.pageRules = {
    currentPage: joi.number().required().error(new Error('当前页出错')),
    pageSize: joi.number().required().error(new Error('页码大小出错'))
}