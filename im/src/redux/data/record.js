import moment from 'moment';

export const xx = [
  {
    from: 5,
    to: 6,
    uuid: 'asdfsd',
    msg: {
      type: 'txt',
      content: '文本内容',
    },
    ext: {
      avatar:
        'https://c-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.jpeg',
      name: '小明',
      timestamp: moment().startOf('minute').fromNow(),
    },
  },
  {
    from: 6,
    to: 5,
    uuid: 'asdfsd',
    msg: {
      type: 'txt',
      content: '文本内容',
    },
    ext: {
      avatar:
        'https://c-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.jpeg',
      name: '小明',
      timestamp: moment().startOf('minute').fromNow(),
    },
  },
];
