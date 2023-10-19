Request Builder for Salesforce Commerce Cloud

```js        
        const myService = new RequestService("my-service");
        if (myService.hasServiceError) {
            return new Status(Status.ERROR, 'Error', 'Service not exists.');
        }

        const newRequest = myService.POST("/users");

        newRequest.addMultiPart(new HTTPRequestPart("name", "Lucas Palomo");

        const responseData = newRequest.call({parseResponse: true, sendAsMultiPart: true});

        if (responseData.status !== 200) {
            return new Status(Status.ERROR, 'Error', 'Failed');
        }
```        
