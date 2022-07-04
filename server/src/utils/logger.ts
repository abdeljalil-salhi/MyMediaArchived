import pino from "pino";
import dayjs from "dayjs";

const logger = pino({
  transport: {
    // Prettifying the logs
    target: "pino-pretty",
    // Formatting the message
    options: {
      colorize: true,
      messageFormat: `${new Date(dayjs().format()).toLocaleString()} {msg}`,
    },
  },
});

export default logger;
