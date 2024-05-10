import urls from '../config/urls'
import usersMock from '../mocks/users_mock.json'
// import cartMock from '../mocks/cart_mock.json'
// import addressesMock from '../mocks/addresses_mock.json'

export const fetchAllBooks = async () => {
    const response = await fetch(`${urls.django}/books/`);
    return await response.json();
};

export const login = async (login: string, password: string) => {
    // const response = await fetch(`${urls.django}/...`);
    for (const user of usersMock) {
        if (user.login == login && user.password == password) {

        }
    }
    return new Response()
    // return await response.json();
};

