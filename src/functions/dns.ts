import { env } from '../config/env';
import { getInstancePublicIp } from '../lib/ec2';
import { updateDnsRecord } from '../lib/route53';

export async function handler() {
  try {
    const publicIpAddress = await getInstancePublicIp({ instanceId: env.INSTANCE_ID });

    if (!publicIpAddress) {
      console.log("Failed to retrieve public IP address.");
      return;
    }

    await updateDnsRecord({
      hostedZoneId: env.HOSTED_ZONE_ID,
      recordName: env.RECORD_NAME,
      ip: publicIpAddress
    });
    console.log(`DNS record updated with IP: ${publicIpAddress}`);
  } catch (error) {
    console.log("Error updating DNS record:", error);
  }
};
