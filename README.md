Request Builder for Salesforce Commerce Cloud

```js        
        const facebookService = new RequestService("facebook.service");
        if (facebookService.hasServiceError) {
            return new Status(Status.ERROR, 'Error', 'Service not exists.');
        }

        const feedRequest = facebookService.POST("/".concat(catalogID, InstagramAppConstants.ENDPOINTS.CREATE_FEED));

        const token = instagramAppHandler.getAccessToken();

        if (empty(token)) {
            return new Status(Status.ERROR, 'Error', 'Unauthorized access, invalid access token!');
        }

        feedRequest.addMultiPart(new HTTPRequestPart("access_token", token));
        feedRequest.addMultiPart(new HTTPRequestPart("name", targetFile.getName()));

        const feedResponse = feedRequest.call({parseResponse: true, sendAsMultiPart: true});

        if (feedResponse.status !== 200 || empty(feedResponse.body.id)) {
            return new Status(Status.ERROR, 'Error', 'Failed to create a feed');
        }
```        
