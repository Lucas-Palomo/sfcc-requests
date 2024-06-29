'use strict';

const HashMap = require('dw/util/HashMap');
const ArrayList = require('dw/util/ArrayList');
const HTTPClient = require('dw/net/HTTPClient');
const ContentTypes = require("./RequestContentTypes");


/**
 *
 * @param {'GET'|'POST'|'PATCH'|'PUT'|'DELETE'} method
 * @param {dw.svc.Service} service
 * @param {string} resource
 * @constructor
 */
const RequestBuilder = function (method, service, resource) {

    /**
     * @name __params__
     * @type {dw.util.ArrayList<string>}
     * @private
     * @description Request Params
     */
    var __params__ = new ArrayList();

    /**
     * @name __headers__
     * @type {dw.util.HashMap<string, string>}
     * @private
     * @description Request Headers
     */
    var __headers__ = new HashMap();

    /**
     * @name __multiParts__
     * @type {dw.util.ArrayList<dw.net.HTTPRequestPart>}
     * @private
     * @description Request Headers
     */
    var __multiParts__ = new ArrayList();

    /**
     * @name __body__
     * @type {string}
     * @private
     * @description Request Body
     */
    var __body__ = "";

    /**
     * @name getQueryParams
     * @return {string}
     * @public
     * @description returns the final query params
     */
    RequestBuilder.prototype.getQueryParams = function () {
        var params = ""

        if (__params__.length > 0) {
            params += "?"
        }

        for (let i = 0; i < __params__.length; i++) {
            params += __params__[i]
            if (__params__.length >= 2) {
                params += "&"
            }
        }

        return params
    }

    /**
     * @name getURL
     * @return {string}
     * @public
     * @description returns the final url
     */
    RequestBuilder.prototype.getURL = function () {
        return service.getURL() + resource + this.getQueryParams()
    }

    /**
     * @name getHeaders
     * @return {Object}
     * @public
     * @description get all request Headers
     */
    RequestBuilder.prototype.getHeaders = function () {
        const headersObject = {}
        const values = __headers__.values().toArray();
        const keys = __headers__.keySet().toArray();

        for (let i = 0; i < __headers__.size(); i++) {
            headersObject[keys[i]] = values[i]
        }

        return headersObject
    }

    /**
     * @name setHeaders
     * @param {Object} headersObject
     * @public
     * @description set request Headers
     */
    RequestBuilder.prototype.setHeaders = function (headersObject) {
        const keys = Object.keys(headersObject)
        for (let i = 0; i < keys.length; i++) {
            __headers__.put(keys[i], headersObject[keys[i]])
        }
    }

    /**
     * @name addHeader
     * @param {string} header
     * @param {string|number} value
     * @public
     * @description add a header in request headers
     */
    RequestBuilder.prototype.addHeader = function (header, value) {
        __headers__.put(header, value)
    }


    /**
     * @name addMultiPart
     * @param {dw.net.HTTPRequestPart} multiPart
     * @public
     * @description add a multipart in request body
     */
    RequestBuilder.prototype.addMultiPart = function (multiPart) {
        __multiParts__.add(multiPart)
    }


    /**
     * @name getMultiParts
     * @return {dw.net.HTTPRequestPart[]}
     * @public
     * @description get all multiparts values added in request body
     */
    RequestBuilder.prototype.getMultiParts = function () {
        return __multiParts__.toArray()
    }


    /**
     * @name setJSON
     * @param {Object} bodyObject
     * @public
     * @description set a Json Object in request body and set Content-Type as application/json
     */
    RequestBuilder.prototype.setJSON = function (bodyObject) {
        __body__ = JSON.stringify(bodyObject)
        __headers__.put("Content-Type", ContentTypes.JSON().getValue())
        this.__ContentLength__()
    }

    /**
     * @name setBody
     * @param {string} body
     * @param {string} contentType
     * @public
     * @description set a raw body to request and set the Content-Type
     * @see ContentType
     */
    RequestBuilder.prototype.setBody = function (body, contentType) {
        __body__ = body
        __headers__.put("Content-Type", contentType)
        this.__ContentLength__()
    }

    /**
     * @name getBody
     * @public
     * @return {string}
     * @description returns the raw body content
     */
    RequestBuilder.prototype.getBody = function () {
        return __body__
    }

    /**
     * @name call
     * @param {{parseResponse?: boolean, sendAsMultiPart?: boolean, timeout?: number, followRedirect?: boolean}|null} options
     * @public
     * @return {{status: number, body: Object|string, headers: Object}}
     * @description Call request, returns the response object
     */
    RequestBuilder.prototype.call = function (options) {


        this.__CheckOptions__(options);

        /**
         * @type {dw.net.HTTPClient}
         */
        var client = new HTTPClient();

        client.open(method, this.getURL());
        client.setTimeout(service.getConfiguration().getProfile().getTimeoutMillis())
        client = this.__SetRequestHeaders__(client)

        if (options && options.followRedirect) {
            client.setAllowRedirect(true);
        }

        if(options && options.timeout) {
            client.setTimeout(options.timeout);
        }

        options && options.sendAsMultiPart ? client.sendMultiPart(__multiParts__.toArray()) :  client.send(__body__)

        const response = !empty(client.getText()) || client.getText() !== null ? client.getText() : client.getErrorText()

        __body__ = ""
        __params__ = new ArrayList();
        __multiParts__ = new ArrayList();
        __headers__ = new HashMap();

        return {
            status: client.statusCode,
            body: options && options.parseResponse ? JSON.parse(response) : response,
            headers: this.__GetResponseHeaders__(client.getAllResponseHeaders())
        }
    }

    /**
     * @name __ContentLength__
     * @private
     * @description set Content-Length in request headers
     */
    RequestBuilder.prototype.__ContentLength__ = function () {
        __headers__.put("Content-Length", __body__.length)
    }

    /**
     * @name __SetRequestHeaders__
     * @param {dw.net.HTTPClient} client
     * @private
     * @return {dw.net.HTTPClient}
     * @description set Request Headers in the HTTPClient
     */
    RequestBuilder.prototype.__SetRequestHeaders__ = function (client) {
        const values = __headers__.values().toArray();
        const keys = __headers__.keySet().toArray();

        for (let i = 0; i < __headers__.size(); i++) {
            client.setRequestHeader(keys[i], values[i])
        }

        return client
    }

    /**
     * @name __GetResponseHeaders__
     * @param {dw.util.HashMap<string, dw.util.List<string>>} headers
     * @private
     * @return {Object}
     * @description return all response headers as object
     */
    RequestBuilder.prototype.__GetResponseHeaders__ = function (headers) {
        const headersObject = {}
        const keys = headers.keySet().toArray()
        const values = headers.values().toArray()

        for (let i = 0; i < headers.size(); i++) {
            headersObject[keys[i]] = values[i]
        }

        return headersObject
    }

    /**
     * @name addQueryParam
     * @param {string} key
     * @param {string} value
     * @public
     * @description add a query param to request URL
     */
    RequestBuilder.prototype.addQueryParam = function (key, value) {
        __params__.add(key+"="+value)
    }


    /**
     * @name __CheckOptions__
     * @param {{parseResponse?: boolean, sendAsMultiPart?: boolean, timeout?: number, followRedirect?: boolean}|null} options
     * @private
     * @description Check All accepted params for the RequestBuilder
     */
    RequestBuilder.prototype.__CheckOptions__ = function (options) {
        const optionsRules = new HashMap();

        optionsRules.put('parseResponse', 'boolean');
        optionsRules.put('sendAsMultiPart', 'boolean');
        optionsRules.put('followRedirect', 'boolean');
        optionsRules.put('timeout', 'number');

        const message = 'Invalid option type for #rule# value must be a #type#'

        if (options) {
            for (var key of Object.keys(options)) {
                if (optionsRules.containsKey(key)) {
                    var type = optionsRules.get(key);
                    if (typeof (options[key]) !== type) {
                        throw message.replace('#rule#', key).replace('#type#', type)
                    }
                }
            }
        }
    }
}

module.exports = RequestBuilder