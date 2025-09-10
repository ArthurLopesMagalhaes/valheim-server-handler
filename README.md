🇧🇷 - Portuguese version [here](README.pt.md).

# 🎮 Valheim Server on AWS

This project provisions and runs a dedicated **Valheim** server using **AWS EC2**, **Docker**, and **Serverless Framework**, allowing the infrastructure to run in an automated and scalable way.

---

## 🚀 Technologies used

- **AWS EC2** – instance to host the dedicated server
- **AWS CloudFormation** – resource provisioning via Serverless
- **Serverless Framework** – infrastructure deployment automation
- **Docker** – Valheim server container
- **Node.js + TypeScript** – automation scripts
- **GitHub** – code versioning

---

## 🏗 Architecture

The infrastructure works as follows:

- **Serverless Framework** → provisions EC2, Lambda Function, and S3 Bucket.
- **Lambda Function** → updates the dynamic IP on the domain.
- **EC2** → when launched, downloads the `docker-compose.yml` from S3 and executes it.

It looks something like this:

## ![Server architecture](./docs/arch-diagram-en.png)

## 📦 Prerequisites

Before starting, you need to have the following installed locally:

- [Node.js](https://nodejs.org/)
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started) configured
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) configured with your credentials
- [Docker](https://docs.docker.com/get-docker/)
- A hosted zone configured in Route 53

---

## ⚙️ How to set up

1. Clone this repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/valheim-aws-server.git
   cd valheim-aws-server
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Rename the .env.example file to .env and configure the environment variables:
   ```bash
    HOSTED_ZONE_ID=
    RECORD_NAME=subdomain.my-domain.com
    S3_BUCKET_NAME=super-secret
   ```
4. Configure the `docker-compose.yml` file:
   > Check this link for more details: [repository](lloesche/valheim-server-docker)
5. Deploy the infrastructure with Serverless:
   ```bash
   sls deploy
   ```

## 🎮 How to access the server

1. Open Valheim
2. Go to Join Game
3. Enter your configured domain and password
4. Have fun :)

## 🙌 Acknowledgements and References

- [lloesche/valheim-server-docker](https://github.com/lloesche/valheim-server-docker) - Docker image used in the project.

- [Hosting your own dedicated Valheim server in the cloud](https://aws.amazon.com/pt/blogs/gametech/hosting-your-own-dedicated-valheim-server-in-the-cloud/) - Inspiration for the adopted architecture.
