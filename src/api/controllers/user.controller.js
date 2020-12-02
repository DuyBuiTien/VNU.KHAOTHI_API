const httpStatus = require('http-status');
const { omit } = require('lodash');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const multer = require('multer');
const APIError = require('../utils/APIError');
const storageAvatar = require('../utils/storageAvatar');

const db = require('../../config/mssql');
const User = db.users;
const Position = db.positions;
const Office = db.offices;

const { Op } = db.Sequelize;

exports.GetUserInfo = async (req, res, next) => {
  try {
    const { id, username } = req.query;
    const condition = id ? { id: id } : username ? { username: username } : { id: req.user.id };

    const user = await User.findOne({
      where: condition,
      attributes: ['id', 'username', 'fullName', 'email', 'avatarUrl', 'address', 'displayName', 'birthday', 'sex'],
      include: ['office', 'position'],
    });

    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

exports.ListUser = async (req, res, next) => {
  try {
    let currentUserId = req.user.id;

    const { q, page, perpage } = req.query;
    const { limit, offset } = getPagination(page, perpage);
    const condition = q ? { fullName: { [Op.like]: `%${q}%` } } : null;
    const attributes = ['id', 'username', 'fullName', 'email', 'avatarUrl', 'address', 'displayName', 'birthday', 'sex'];
    const include = ['office', 'position'];

    const users = await User.findAndCountAll({
      where: condition,
      limit,
      offset,
      attributes,
      include,
    });

    let queryContact = {
      [Op.and]: [{ [Op.or]: [{ userOneId: currentUserId }, { userTwoId: currentUserId }] }],
    };

    const contacts = await Contact.findAll({ where: queryContact });

    let responseUsers = [];
    users.rows.forEach((userItem) => {
      let tempItem = { ...userItem.toJSON(), type: 'notContact' };
      if (userItem.id == currentUserId) {
        tempItem.type = 'you';
      } else {
        console.log(contacts);
        contacts.forEach((contactItem) => {
          if (userItem.id === contactItem.userOneId || userItem.id === contactItem.userTwoId) {
            if (contactItem.status === 1) {
              tempItem.type = 'contact';
              tempItem.datacontact = contactItem;
              return;
            } else if (contactItem.status === 2) {
              tempItem.type = 'notContact';
              tempItem.datacontact = contactItem;
              return;
            } else if (contactItem.actionUserId === currentUserId) {
              tempItem.type = 'requestsent';
              tempItem.datacontact = contactItem;
              return;
            } else {
              tempItem.type = 'request';
              tempItem.datacontact = contactItem;
              return;
            }
          }
        });
      }

      responseUsers.push(tempItem);
    });

    const response = getPagingData({ count: users.count, rows: responseUsers }, page, limit);

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

let avatarUploadFile = multer(storageAvatar).single('avatar');

exports.UploadProfilePicture = (req, res, next) => {
  avatarUploadFile(req, res, async (err) => {
    try {
      console.log(req.file)
      if (!req.file) {
        throw new APIError({
          message: 'Please select a file.',
          status: httpStatus.BAD_REQUEST,
        });
      }

      let updateUserItem = {
        picture: req.file.filename,
        updatedAt: Date.now(),
      };

      let user = await User.get(req.user.id);

      user = Object.assign(user, { avatarUrl: req.file.filename });

      await user.save();

      let result = {
        message: 'success',
        picture: `${updateUserItem.picture}`,
      };
      return res.send(result);
    } catch (error) {
      next(error);
    }
  });
};

const getPagination = (page, perpage) => {
  const limit = perpage ? +perpage : 100;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: listItems } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    meta: {
      total: totalItems,
      pages: totalPages,
      page: currentPage,
      perpage: limit,
    },
    data: listItems,
  };
};
