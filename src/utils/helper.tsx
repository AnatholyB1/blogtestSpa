import Cookies from 'js-cookie';

const TokenKey = 'token';

const getToken = () => Cookies.get(TokenKey);

const setToken = (token: any) => Cookies.set(TokenKey, token);

const removeToken = () => Cookies.remove(TokenKey);

export { getToken, removeToken, setToken };

export function classNames(...classes: [string]) {
    return classes.filter(Boolean).join(' ')
}