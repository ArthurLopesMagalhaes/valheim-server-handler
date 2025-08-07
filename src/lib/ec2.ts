import { DescribeInstancesCommand, EC2Client } from "@aws-sdk/client-ec2";

const ec2Client = new EC2Client();

export async function getInstancePublicIp({ instanceId }: GetInstancePublicIpParams) {
  try {
    const describeCommand = new DescribeInstancesCommand({
      InstanceIds: [instanceId],
    });

    const { Reservations } = await ec2Client.send(describeCommand);

    if (!Reservations || Reservations.length === 0) {
      console.log("No instances found with the specified ID.");
      return undefined;
    }

    const instance = Reservations[0].Instances?.[0];
    const publicIpAddress = instance?.PublicIpAddress;

    return publicIpAddress;
  } catch (error) {
    return undefined;
  }
}

export type GetInstancePublicIpParams = {
  instanceId: string;
}