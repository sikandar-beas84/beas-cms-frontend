//REACT_ENV=prod
const REACT_ENV = 'dev'
const dev_url = 'http://192.168.1.111:8000/'
//const dev_url = 'http://127.0.0.1:8000/'
const prod_url = 'http://127.0.0.1:8000/'

const server_url = 'http://192.168.1.111/'
const site_url = 'http://192.168.1.111:3000/'
const backend_domain = '192.168.1.111'

let prodObj = {
    BACKEND_DOMAIN: backend_domain,
    SERVER_URL: server_url,
    SITE_URL: site_url,
    API_BASE_URL: `${prod_url}api/`,
    BACKEND_BASE_URL: prod_url,
    ACCESS_TOKEN: "sHetF-JwtYi-kJtsE-TeuAa-nKwqP-LshNd-aXhwV-ZalBr",
    SITE_KEY: "6Le7mo4rAAAAAHp0irf1mq-EZntqBPN-n2Xwkjcz"
}
const devObj = {
    BACKEND_DOMAIN: backend_domain,
    SERVER_URL: server_url,
    SITE_URL: site_url,
    API_BASE_URL: `${dev_url}api/`,
    BACKEND_BASE_URL: dev_url,
    ACCESS_TOKEN: "sHetF-JwtYi-kJtsE-TeuAa-nKwqP-LshNd-aXhwV-ZalBr",
    SITE_KEY: "6Le7mo4rAAAAAHp0irf1mq-EZntqBPN-n2Xwkjcz"
}

const getEnv = () => {
    if (REACT_ENV == 'prod') {
        return prodObj
    } else if (REACT_ENV == 'dev') {
        return devObj
    }
}

export const env = getEnv();