const httpStatus = require('http-status');
const joi = require('joi');

const clientModel = require('../models/clientModel');

const stringReq = joi.string().required();

const bodySchema = joi
  .object()
  .keys({
    firstName: stringReq,
    lastName: stringReq,
    email: stringReq.email(),
    nickName: stringReq,
    birthDate: joi.date().required()
  });

module.exports = ({ body }, res) => {
  const { error, value } = bodySchema.validate(body, { abortEarly: false });

  if (error) {
  	const message = error.details.map((d) => d.message.replace('"', '').replace('\"', '')).join(', ');
    return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus['400_NAME'], message });
  }

  clientModel.create(value)
  	.then((c) => {
    	return res
				.status(httpStatus.OK)
				.json({
					firstName: c.firstName,
					lastName: c.lastName,
					email: c.email,
					nickName: c.nickName,
					birthDate: c.birthDate
				})
				.end();
    })
    .catch((err) => {
			return res
				.status(httpStatus.INTERNAL_SERVER_ERROR)
				.json({ status: httpStatus['500_NAME'], message: 'it\'s not was possible create a new client' })
				.end();
    });
};
