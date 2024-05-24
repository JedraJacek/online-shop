import urls from '../config/urls'
import usersMock from '../mocks/users_mock.json'
import cartMock from '../mocks/cart_mock.json'
//import addressesMock from '../mocks/addresses_mock.json'

const fetchAllBooks = async () => {
    const response = await fetch(`${urls.django}/books/`);
    return await response.json();
};

const login = async (login: string, password: string) => {
    // const response = await fetch(`${urls.django}/...`);
    for (const user of usersMock) {
        if (user.login == login && user.password == password) {
            return new Response("Zalogowano");
        }
    }
    return new Response("Błędne dane")
    // return await response.json();
};

const updateCart = async (product : {product_pk: number, user_pk: number, count: number}) : Promise<Response> => {
    const params = {
      product_pk: product.product_pk,
      user_pk: product.user_pk,
      count: product.count,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(params),
    };
    return new Response() //temporaty mocked
    return await fetch(
      `${urls.django}/cart/update/`,
      options
    );
};

export { fetchAllBooks, updateCart}