'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Addresses', [
            {
                firstName: 'Nguyen',
                lastName: 'Van A',
                email: 'vana@example.com',
                mobile: '0901234567',
                address: '123 Lê Lợi, P.Bến Thành',
                country: 'Vietnam',
                city: 'Ho Chi Minh City',
                state: 'District 1',
                zipCode: '700000',
                isDefault: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Tran',
                lastName: 'Thi B',
                email: 'thib@example.com',
                mobile: '0912345678',
                address: '456 Trần Hưng Đạo, P.Cầu Kho',
                country: 'Vietnam',
                city: 'Ho Chi Minh City',
                state: 'District 1',
                zipCode: '700000',
                isDefault: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Addresses', null, {});
    }
};