import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { Container, DockerProvider, Image } from "@cdktf/provider-docker";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);
    new DockerProvider(this, "default", {});
    const dockerImage = new Image(this, "nginxImage", {
      name: "nginx:latest",
      keepLocally: false,
    });

    new Container(this, "nginxContainer", {
      image: dockerImage.latest,
      name: "cdktf-docker-nginx-container",
      ports: [
        {
          internal: 80,
          external: 8000,
        },
      ],
    });
  }
}

const app = new App();
new MyStack(app, "cdktf-docker-tutorial");
app.synth();
