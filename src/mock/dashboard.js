export default [
  {
    url: "/message/selectIndex",
    method: "post",
    response: () => {
      return {
        status: 0,
        data: [
          {
            messageType: "活动消息",
            name: "张三订购了当前套餐",
            status: "待审核",
          },
          {
            messageType: "活动消息",
            name: "张三订购了当前套餐",
            status: "待审核",
          },
          {
            messageType: "活动消息",
            name: "张三订购了当前套餐",
            status: "待审核",
          },
          {
            messageType: "活动消息",
            name: "张三订购了当前套餐",
            status: "待审核",
          },
          {
            messageType: "活动消息",
            name: "张三订购了当前套餐",
            status: "待审核",
          },
          {
            messageType: "活动消息",
            name: "张三订购了当前套餐",
            status: "待审核",
          },
          {
            messageType: "活动消息",
            name: "张三订购了当前套餐",
            status: "待审核",
          },
        ],
        msg: "",
      };
    },
  },
  {
    url: "/publish/countActivityByTime",
    method: "post",
    response: () => {
      return {
        status: 0,
        data: 10,
        msg: "",
      };
    },
  },
  {
    url: "/publish/countPublishByTime",
    method: "post",
    response: () => {
      return {
        status: 0,
        data: 100,
        msg: "",
      };
    },
  },
  {
    url: "/publish/countSpendByTime",
    method: "post",
    response: () => {
      return {
        status: 0,
        data: 500,
        msg: "",
      };
    },
  },
  {
    url: "/publish/selectIndex",
    method: "post",
    response: () => {
      return {
        status: 0,
        data: {
          rows: [
            {
              no: "活动消息",
              activeName: "张三订购了当前套餐",
              cus: "待审核",
              customName: "待审核",
              cost: "待审核",
            },
            {
              no: "活动消息",
              activeName: "张三订购了当前套餐",
              cus: "待审核",
              customName: "待审核",
              cost: "待审核",
            },
            {
              no: "活动消息",
              activeName: "张三订购了当前套餐",
              cus: "待审核",
              customName: "待审核",
              cost: "待审核",
            },
            {
              no: "活动消息",
              activeName: "张三订购了当前套餐",
              cus: "待审核",
              customName: "待审核",
              cost: "待审核",
            },
            {
              no: "活动消息",
              activeName: "张三订购了当前套餐",
              cus: "待审核",
              customName: "待审核",
              cost: "待审核",
            },
            {
              no: "活动消息",
              activeName: "张三订购了当前套餐",
              cus: "待审核",
              customName: "待审核",
              cost: "待审核",
            },
            {
              no: "活动消息",
              activeName: "张三订购了当前套餐",
              cus: "待审核",
              customName: "待审核",
              cost: "待审核",
            },
            {
              no: "活动消息",
              activeName: "张三订购了当前套餐",
              cus: "待审核",
              customName: "待审核",
              cost: "待审核",
            },
            {
              no: "活动消息",
              activeName: "张三订购了当前套餐",
              cus: "待审核",
              customName: "待审核",
              cost: "待审核",
            },
            {
              no: "活动消息",
              activeName: "张三订购了当前套餐",
              cus: "待审核",
              customName: "待审核",
              cost: "待审核",
            },
          ],
          total: 80,
        },
        msg: "",
      };
    },
  },
];
