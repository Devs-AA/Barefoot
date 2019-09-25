import models from '../models';

const updatedRequest = async (status, requestId) => {
  try {
    const updatedReq = await models.requests.update({ status }, {
      returning: true,
      plain: true,
      where: {
        id: requestId
      }
    });
    return updatedReq[1];
  } catch (error) {
    throw Error(error);
  }
};

export default updatedRequest;
