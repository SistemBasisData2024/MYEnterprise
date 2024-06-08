import Redis from "ioredis";

const redis = new Redis({
  host: "redis-15373.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com",
  password: "DkXJgLh2VNOzYB2bIFn4vCAsZOkzVXey",
  port: 15373,
});

export default redis;
