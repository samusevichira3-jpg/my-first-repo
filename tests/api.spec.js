import { test, expect } from '@playwright/test';

test.describe('API-тесты для Restful-booker', () => {

    const baseURL = 'https://restful-booker.herokuapp.com';

    const bookingData = {
        firstname: "Ira",
        lastname: "Vladis",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-06-06",
            checkout: "2027-06-06"
        },
        additionalneeds: "Breakfast"
    }

    const updateData = {
        firstname: "Katya",
        lastname: "Petrova",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-06-06",
            checkout: "2027-06-06"
        },
        additionalneeds: "Breakfast"
    }


    async function createBooking(request) {

        const response = await request.post(`${baseURL}/booking`, {
            data: bookingData
        });

        const body = await response.json();
        return body.bookingid;
    }


    test('Создание бронирований', async ({ request }) => {

        const response = await request.post(`${baseURL}/booking`, {
            data: bookingData
        });
        console.log(`Статус-код: ${response.status()}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log('Тело ответа:', responseBody);

        expect(responseBody).toHaveProperty('bookingid');

        expect(responseBody.booking.firstname).toBe("Ira");
        expect(responseBody.booking.lastname).toBe("Vladis");
        expect(responseBody.booking.totalprice).toBe(111);
        expect(responseBody.booking.depositpaid).toBe(true);
        expect(responseBody.booking.bookingdates).toEqual({
            checkin: "2026-06-06",
            checkout: "2027-06-06"
        });
        expect(responseBody.booking.additionalneeds).toBe("Breakfast");
    });


    test('Получение информации о бронировании', async ({ request }) => {

        const bookingId = await createBooking(request);

        const getResponse = await request.get(`${baseURL}/booking/${bookingId}`);

        console.log(`Статус-код: ${getResponse.status()}`);
        expect(getResponse.status()).toBe(200);

        const getBooking = await getResponse.json();
        console.log('Тело ответа:', getBooking);

        expect(getBooking.firstname).toBe("Ira");
        expect(getBooking.lastname).toBe("Vladis");
        expect(getBooking.totalprice).toBe(111);
        expect(getBooking.depositpaid).toBe(true);
        expect(getBooking.bookingdates).toEqual({
            checkin: "2026-06-06",
            checkout: "2027-06-06"
        });
        expect(getBooking.additionalneeds).toBe("Breakfast");
    });


    test('Обновление информации о бронировании', async ({ request }) => {

        const tokenResponse = await request.post(`${baseURL}/auth`, {
            data: {
                username: "admin",
                password: "password123"
            }
        });

        const tokenBody = await tokenResponse.json();
        console.log('Тело ответа:', tokenBody);

        const bookingId = await createBooking(request);

        const putResponse = await request.put(`${baseURL}/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${tokenBody.token}`
            },

            data: updateData
        });

        console.log(`Статус-код: ${putResponse.status()}`);
        expect(putResponse.status()).toBe(200);

        const putBody = await putResponse.json();
        console.log('Тело ответа:', putBody);

        expect(putBody.firstname).toBe("Katya");
        expect(putBody.lastname).toBe("Petrova");

    });


    test('Удаление информации о бронировании', async ({ request }) => {

        const bookingId = await createBooking(request);

        const tokenResponse = await request.post(`${baseURL}/auth`, {
            data: {
                username: "admin",
                password: "password123"
            }
        });

        const tokenBody = await tokenResponse.json();
        console.log('Тело ответа:', tokenBody);

        const deleteResponse = await request.delete(`${baseURL}/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${tokenBody.token}`
            },
        });

        console.log(`Статус-код: ${deleteResponse.status()}`);
        expect(deleteResponse.status()).toBe(201);

        const getResponse = await request.get(`${baseURL}/booking/${bookingId}`);

        console.log(`Статус-код: ${getResponse.status()}`);
        expect(getResponse.status()).toBe(404);

    });

});