import dayjs from "dayjs";
import moment from "moment";

//日期类型
const DATE_CATEGORY = {
  today: "today",
  yesterday: "yesterday",
  week: "week",
  lastWeek: "lastWeek",
  month: "month",
  lastMonth: "lastMonth",
};

//开始时间
let start = "";
//结束时间
let end = "";

export const handleDateType = {
  today: dayjs().format("YYYY-MM-DD"),
  tomorrow: dayjs().add(1, "day").format("YYYY-MM-DD"),
};
let handleDateTimeType = {
  //今日
  today: (() => {
    start = moment().format("YYYY-MM-DD") + " 00:00:00";
    end = moment().format("YYYY-MM-DD") + " 23:59:59";
    return { start, end };
  })(),
  //昨日
  yesterday: (() => {
    start = moment().subtract(1, "days").format("YYYY-MM-DD") + " 00:00:00";
    end = moment().subtract(1, "days").format("YYYY-MM-DD") + " 23:59:59";
    return { start, end };
  })(),
  //这周
  week: (() => {
    start =
      moment().week(moment().week()).startOf("week").format("YYYY-MM-DD") +
      " 00:00:00";
    end =
      moment().week(moment().week()).endOf("week").format("YYYY-MM-DD") +
      " 23:59:59";
    return { start, end };
  })(),
  //上周
  lastWeek: (() => {
    let weekOfday = parseInt(moment().format("d"));
    start = moment()
      .subtract(weekOfday + 7, "days")
      .format("YYYY-MM-DD");
    end = moment()
      .subtract(weekOfday + 1, "days")
      .format("YYYY-MM-DD");
    return { start, end };
  })(),
  //本月
  month: (() => {
    start = moment().startOf("month").format("YYYY-MM-DD") + " 00:00:00";
    end = moment().endOf("month").format("YYYY-MM-DD") + " 23:59:59";
    return { start, end };
  })(),
  //上月
  lastMonth: (() => {
    start =
      moment().subtract(1, "month").startOf("month").format("YYYY-MM-DD") +
      " 00:00:00";
    end =
      moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD") +
      " 23:59:59";
    return { start, end };
  })(),
};

export { DATE_CATEGORY, handleDateTimeType };
