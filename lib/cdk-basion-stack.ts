import { Stack, StackProps } from 'aws-cdk-lib'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { Construct } from 'constructs'

export class CdkBasionStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const vpc = new ec2.Vpc(this, 'basionVPC', {
      cidr: '10.0.0.0/16',
      maxAzs: 1,
      subnetConfiguration: [
        {
          name: 'public-basion-subnet',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
      ],
    })

    // Security Group
    const basionSG = new ec2.SecurityGroup(this, 'basionSG', {
      vpc,
      allowAllOutbound: true,
    })
    basionSG.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Allow SSH from anywhere')

    // EC2 Instance
    const basionServer = new ec2.BastionHostLinux(this, 'basionServer', {
      vpc,
      subnetSelection: { subnetType: ec2.SubnetType.PUBLIC },
      securityGroup: basionSG,
    })
    basionServer.allowSshAccessFrom(ec2.Peer.anyIpv4())
  }
}
