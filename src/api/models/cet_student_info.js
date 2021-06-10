const { DataTypes, Sequelize, Model } = require('sequelize');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
    class Cet_Student_Info extends Model {
    }

    Cet_Student_Info.init(
        {
            tendangnhap: {
                type: DataTypes.TEXT
            },
            Email: {
                type: DataTypes.TEXT
            },
            Hoten: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Sodienthoai: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Ngaysinh: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            Gioitinh: {
                type: DataTypes.INTEGER,
                //Nam: 1
                //Nu: 2
                allowNull: true,
            },
            Noisinh: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Noisinh: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Dienthoaicodinh: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Dantoc: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            SoCMND: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Ngaycap: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            Noicap: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            TinhTT: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            HuyenTT: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Anhhoso: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Nguoinhanthu: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Diachinhanthu: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            doituonguutien: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            Khuvuc: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Truonglop10: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Tinhlop10: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Truonglop11: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Tinhlop11: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Truonglop12: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Tinhlop12: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            Huyenlop10: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Huyenlop11: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            Huyenlop12: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            L10K1: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            L10K2: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            L10CN: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            L11K1: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            L11K2: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            L11CN: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            L12K1: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            L12K2: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            L12CN: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            NamTotnghiep: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            dToan: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            dVan: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            dNgoaingu: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            DLy: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            dHoa: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            dSinh: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            dSu: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            dDia: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
            dGDCD: {
                type: DataTypes.CHAR,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Cet_Student_Info',
            freezeTableName: true,
        },
    );

    return Cet_Student_Info;
};
