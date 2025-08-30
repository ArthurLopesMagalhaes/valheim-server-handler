import { EventBridgeEvent } from "aws-lambda";
import { env } from "../config/env";
import { getInstancePublicIp } from "../lib/ec2";
import { updateDnsRecord } from "../lib/route53";

type Ec2StateChangeDetail = {
  "instance-id": string;
  state:
    | "pending"
    | "running"
    | "stopping"
    | "stopped"
    | "shutting-down"
    | "terminated";
};

export async function handler(
  event: EventBridgeEvent<
    "EC2 Instance State-change Notification",
    Ec2StateChangeDetail
  >
) {
  try {
    const instanceId = event.detail["instance-id"];

    if (!instanceId) {
      console.error("No instance ID found in event payload.");
      return;
    }

    const publicIpAddress = await getInstancePublicIp({
      instanceId: instanceId,
    });

    if (!publicIpAddress) {
      console.log("Failed to retrieve public IP address.");
      return;
    }

    await updateDnsRecord({
      hostedZoneId: env.HOSTED_ZONE_ID,
      recordName: env.RECORD_NAME,
      ip: publicIpAddress,
    });
    console.log(`DNS record updated with IP: ${publicIpAddress}`);
  } catch (error) {
    console.log("Error updating DNS record:", error);
  }
}
