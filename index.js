'use strict';

class AWSIAMPlugin {
    constructor(serverless, options) {
        this.serverless = serverless;
        this.options = options;

        this.hooks = {
            'after:deploy:compileEvents': this.updateAuthorizationType.bind(this)
        }
    }

    updateAuthorizationType() {
        let names = Object.keys(this.serverless.service.provider.compiledCloudFormationTemplate.Resources);
        names.forEach((name) => {
            let resource = this.serverless.service.provider.compiledCloudFormationTemplate.Resources[name];
            if (resource.Type === "AWS::ApiGateway::Method") {
                resource.Properties.AuthorizationType = "AWS_IAM";
            }
        });
    }
}

module.exports = AWSIAMPlugin;