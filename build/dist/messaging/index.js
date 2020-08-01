"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedUserTopic = exports.newUserTopic = void 0;
//send topics
const pubsub_1 = require("@google-cloud/pubsub");
const pubSubClient = new pubsub_1.PubSub();
//create topic if it doesn't exist, otherwise get the topic with topic you the topic
exports.newUserTopic = pubSubClient.topic('projects/gifted-pulsar-279818/topics/project-1-topic');
//this is fine (comments in demos for "more accurate" data)
//this is where we are sending messages (for new and updated users)
//topic for updates
exports.updatedUserTopic = pubSubClient.topic('projects/gifted-pulsar-279818/topics/project-1-updates-topic');
//call topic, or use funtion to get topics and search through them for the one we want, then set it to topic name
//see lightlyburinging demos
//# sourceMappingURL=index.js.map