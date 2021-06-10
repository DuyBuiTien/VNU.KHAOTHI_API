const httpStatus = require('http-status');
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs')
const jwt = require('jwt-simple');
const { omit } = require('lodash');
const axios = require('axios');
const db = require('../../config/mssql');
const { Student_Accs, Student_Infos, Student_Cathis, Dangkythi_Lephis } = db;
const APIError = require('../utils/APIError');
const { sendEmail } = require('../services/emails/emailProvider')

const randomNumber = Math.floor(Math.random() * 1000000) + 100000
const randomNumberShit = Math.floor(Math.random() * 1000000) + 100000

exports.login = async (req, res, next) => {
    try {
        const rounds = 10;
        const { tendangnhap, password } = req.body;
        try {
            const user = await Student_Accs.findOne({
                where: {
                    tendangnhap: tendangnhap
                }
            })
            var passwordCompare = await user.passwordMatches(password)
            if (user && passwordCompare) {
                return res.json(user)
            }
            else {
                res.status(httpStatus.FORBIDDEN)
                return res.json({ error: 'Đăng nhập thất bại' })
            }
        } catch (error) {
            return next('Lỗi đăng nhập');
        }
    } catch (error) {
        return next(error);
    }
};

exports.register = async (req, res, next) => {
    const content = `
<p><strong>Xin chào ${req.body.tendangnhap},</strong></p>
<p>Cảm ơn bạn đã đăng ký tài khoản tại ứng dụng Khảo thí VNU.</p>
<p>Để xác thực và sử dụng đầy đủ tính năng, vui lòng nhập mã xác nhận dưới đây vào ứng dụng:</p>
<p style="border-radius: 5px;"><span style="background-color: #2be3e3; color: #ffffff; padding: 5px 10px"><strong>${randomNumber}</strong></span></p>
<p style="border-radius: 5px; text-align: left;"><strong>Trân trọng,</strong></p>
<p style="border-radius: 5px; text-align: left;">Đội ngũ Khảo thí VNU</p>`

    const subject = '[Khaothivnu] Xác thực tài khoản'
    try {
        const userData = omit(req.body, 'id');
        const rounds = 10;

        const hash = await bcrypt.hash(userData.password, rounds);
        userData.password = hash;

        const find = await Student_Accs.findOne({ where: { Email: req.body.Email, tendangnhap: req.body.tendangnhap } })
        if (find) {
            var apiError;
            apiError.status = httpStatus.FOUND;
            apiError.message = 'Already existed';
            return next(apiError);
        }
        else {
            const user = await Student_Accs.create(userData);
            const info = await Student_Infos.create({ tendangnhap: req.body.tendangnhap, Email: req.body.Email });
            const cathi = await Student_Cathis.create({ username: req.body.tendangnhap });
            const lephi = await Dangkythi_Lephis.create({ username: req.body.tendangnhap });
            var token = jwt.encode(user.transform(), process.env.JWT_SECRET)
            res.status(httpStatus.OK);
            var x = await sendEmail(req.body.Email, content, subject);
            return res.json({ User: user.transform(), Token: token, OTP: randomNumber });
        }
    } catch (error) {
        return next(error);
    }
};

exports.sendOTP = async (req, res, next) => {
    const content = `
<p><strong>Xin chào ${req.body.tendangnhap},</strong></p>
<p>Để xác thực và thay đổi mật khẩu, vui lòng nhập mã xác nhận dưới đây vào ứng dụng:</p>
<p style="border-radius: 5px;"><span style="background-color: #2be3e3; color: #ffffff; padding: 5px 10px"><strong>${randomNumberShit}</strong></span></p>
<p style="border-radius: 5px; text-align: left;"><strong>Trân trọng,</strong></p>
<p style="border-radius: 5px; text-align: left;">Đội ngũ Khảo thí VNU</p>`

    const subject = '[Khaothivnu] Quên mật khẩu'
    try {
        const find = await Student_Accs.findOne({ where: { Email: req.body.Email, tendangnhap: req.body.tendangnhap } })
        if (find) {
            res.status(httpStatus.OK);
            var x = await sendEmail(req.body.Email, content, subject);
            res.json({ message: x, result: randomNumberShit })
        }
        else {
            var apiError;
            apiError.status = httpStatus.OK;
            apiError.message = 'Không tồn tại tài khoản này';
            return next(apiError);
        }
    } catch (error) {
        return next(error);
    }
};