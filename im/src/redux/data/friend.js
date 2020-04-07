export const friend = {
  id: 5,
  name: '小丽',
  avatar:
    'https://c-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.jpeg',
  status: 'online',
  latestTime: '2020-01-02',
  latestMessage: '啥时候还钱',
};

export const friendList = [
  friend,
  {
    ...friend,
    id: 7,
  },
];

export default {
  friend,
  friendList,
};
