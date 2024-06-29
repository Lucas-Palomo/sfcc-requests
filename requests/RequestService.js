'use strict';

const LocalServiceRegistry = require("dw/svc/LocalServiceRegistry")
const RequestBuilder = require("./internal/RequestBuilder");

/**
 * @name RequestService
 * @param {string} serviceId
 * @description Inspired in the python requests library
 * @constructor
 */
const RequestService = function (serviceId) {

    /**
     * @type {dw.svc.Service|null}
     */
    RequestService.prototype.service = null

    /**
     * @type {Error|null}
     */
    RequestService.prototype.error = null

    /**
     * @type {boolean}
     */
    RequestService.prototype.hasError = false

    try {
        this.service = LocalServiceRegistry.createService(serviceId, {})
    } catch (err) {
        this.hasError = true
        this.error = err
    }

    /**
     * @name GET
     * @param {string} resource
     * @return {RequestBuilder}
     * @description GET often used to retrieve a resource
     * @see https://www.rfc-editor.org/rfc/rfc2616#section-9.3
     */
    RequestService.prototype.GET = function (resource) {
        return new RequestBuilder("GET", this.service, resource)
    }

    /**
     * @name POST
     * @param {string} resource
     * @return {RequestBuilder}
     * @description POST often used to create a new resource
     * @see https://www.rfc-editor.org/rfc/rfc2616#section-9.5
     */
    RequestService.prototype.POST = function POST(resource) {
        return new RequestBuilder("POST", this.service, resource)
    }

    /**
     * @name PATCH
     * @param {string} resource
     * @return {RequestBuilder}
     * @description PATCH often used to update a resource
     * @see https://www.rfc-editor.org/rfc/rfc5789#section-2
     */
    RequestService.prototype.PATCH = function PATCH(resource) {
        return new RequestBuilder("PATCH", this.service, resource)
    }

    /**
     * @name PUT
     * @param {string} resource
     * @return {RequestBuilder}
     * @description PUT often used to update / replace a resource
     * @see https://www.rfc-editor.org/rfc/rfc2616#section-9.6
     */
    RequestService.prototype.PUT = function PUT(resource) {
        return new RequestBuilder("PUT", this.service, resource)
    }

    /**
     * @name DELETE
     * @param {string} resource
     * @return {RequestBuilder}
     * @description DELETE often used to delete a resource
     * @see https://www.rfc-editor.org/rfc/rfc2616#section-9.7
     */
    RequestService.prototype.DELETE = function DELETE(resource) {
        return new RequestBuilder("DELETE", this.service, resource)
    }

}

module.exports = RequestService