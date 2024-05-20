const ResponseHandler = (res, data, message , status) => {
    return res.status(status).json({
      message,
      data,
    });
  };
  

  module.exports={ResponseHandler}