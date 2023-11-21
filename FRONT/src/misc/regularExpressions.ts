const regularExpressions = {
    colorRegExp:new RegExp(/^#[0-9A-Fa-f]{6}$/),
    emailRegExp:new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/),
    urlRegExp:new RegExp(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
}

export default regularExpressions