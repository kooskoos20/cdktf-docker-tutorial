import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { DockerProvider } from "@cdktf/provider-docker";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);
    new DockerProvider(this, "default", {});
  }
}

const app = new App();
new MyStack(app, "cdktf-docker-tutorial");
app.synth();
