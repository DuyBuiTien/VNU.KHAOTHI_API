const httpStatus = require('http-status');

exports.currentUser = async (req, res, next) => {
  var user = {
    name: 'Admin',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
  };
  res.json(user);
};

exports.login = (req, res, next) => {
  //const {​​​​​​​​ password, userName, type }​​​​​​​​ = req.body;
  var password = req.body.password;
  var userName = req.body.userName;
  var type = req.body.type;

  if (password === 'Tandan@123' && userName == 'admin') {
    res.send({
      status: 'ok',
      type: type,
      currentAuthority: 'admin',
    });
  } else if (password === 'Tandan@123' && userName === 'user') {
    res.send({
      status: 'ok',
      type: type,
      currentAuthority: 'user',
    });
  } else {
    res.status(401).send();
  }
};
