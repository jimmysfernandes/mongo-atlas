const httpStatus = require('http-status');
const joi = require('joi');

const clientModel = require('../models/clientModel');

module.exports = ({ params }, res) => {
  const { email } = params;

  if (!email) {
    return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus['400_NAME'], message: 'email is required' });
  }

  clientModel.findOne({ email })
  	.then((c) => {
      if (!c) {
        return res.status(httpStatus.NOT_FOUND).json({ status: httpStatus['404_NAME'], message: 'client not found' });
      }
    	
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
				.json({ status: httpStatus['500_NAME'], message: 'it\'s not was possible recover client data' })
				.end();
    });
};
