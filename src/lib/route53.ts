import { ChangeResourceRecordSetsCommand, Route53Client } from '@aws-sdk/client-route-53';

const route53 = new Route53Client();

export async function updateDnsRecord({ hostedZoneId, recordName, ip }: UpdateDnsParams) {
  const command = new ChangeResourceRecordSetsCommand({
    HostedZoneId: hostedZoneId,
    ChangeBatch: {
      Comment: '',
      Changes: [
        {
          Action: 'UPSERT',
          ResourceRecordSet: {
            Name: recordName,
            Type: 'A',
            TTL: 60,
            ResourceRecords: [{ Value: ip }]
          }
        }
      ]
    }
  })

  return route53.send(command)
}

type UpdateDnsParams = {
  hostedZoneId: string;
  recordName: string;
  ip: string;
}